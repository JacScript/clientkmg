import React, { useState } from 'react';
import { Trash2, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/Cloudinaryupload';

const HeroSectionForm = ({ heroForm, setHeroForm, onSave, isSaving }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setIsUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setHeroForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls.map((url) => ({ url, alt: '', label: '' }))],
      }));
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const updateImageField = (index, field, value) => {
    setHeroForm((prev) => {
      const next = [...prev.images];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, images: next };
    });
  };

  const removeImage = (index) => {
    setHeroForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Hero Section</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Eyebrow</label>
        <input
          type="text"
          value={heroForm.eyebrow}
          onChange={(e) => setHeroForm((p) => ({ ...p, eyebrow: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
        <input
          type="text"
          value={heroForm.title}
          onChange={(e) => setHeroForm((p) => ({ ...p, title: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Subheading</label>
        <textarea
          value={heroForm.subheading}
          onChange={(e) => setHeroForm((p) => ({ ...p, subheading: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Carousel Images</label>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
            {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? 'Uploading...' : 'Add images'}
            <input type="file" accept="image/*" multiple onChange={handleAddImages} className="hidden" disabled={isUploading} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {heroForm.images.map((img, index) => (
            <div key={index} className="flex gap-3 border border-gray-200 rounded-lg p-3">
              <img src={img.url} alt={img.alt} className="w-20 h-20 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
              <div className="flex-1 space-y-1.5">
                <input
                  type="text"
                  value={img.label || ''}
                  onChange={(e) => updateImageField(index, 'label', e.target.value)}
                  placeholder="Label (e.g. Living room)"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={img.alt || ''}
                  onChange={(e) => updateImageField(index, 'alt', e.target.value)}
                  placeholder="Alt text"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button onClick={() => removeImage(index)} className="text-red-500 hover:text-red-600 self-start">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {heroForm.images.length === 0 && (
          <p className="text-sm text-gray-400 italic">No images yet — the hero carousel needs at least one.</p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Hero Section'}
        </button>
      </div>
    </div>
  );
};

export default HeroSectionForm;