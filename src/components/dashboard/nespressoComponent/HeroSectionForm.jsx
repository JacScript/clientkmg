import React, { useState } from 'react';
import { Upload, Loader, Trash2 } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const HeroSectionForm = ({ heroForm, setHeroForm, onSave, isSaving }) => {
  const [isUploading, setIsUploading] = useState(false);
  const images = heroForm.backgroundImage || [];

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setIsUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      setHeroForm((prev) => ({ ...prev, backgroundImage: [...(prev.backgroundImage || []), ...urls] }));
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index) => {
    setHeroForm((prev) => ({
      ...prev,
      backgroundImage: (prev.backgroundImage || []).filter((_, i) => i !== index),
    }));
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
          <label className="text-sm font-medium text-gray-700">Background Images</label>
          <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
            {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? 'Uploading...' : 'Add images'}
            <input type="file" accept="image/*" multiple onChange={handleAddImages} className="hidden" disabled={isUploading} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`Background ${index + 1}`} className="w-full h-64 object-cover rounded-lg border border-gray-200" />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <p className="text-sm text-gray-400 italic">No images yet — the hero needs at least one.</p>
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