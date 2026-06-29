import React, { useState } from 'react';
import { Upload, Loader, Trash2 } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const CtaSectionForm = ({ form, setForm, onSave, isSaving }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((prev) => ({ ...prev, image: url }));
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">CTA Section</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Badge</label>
        <input
          type="text"
          value={form.badge}
          onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Heading</label>
        <input
          type="text"
          value={form.heading}
          onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Button Text</label>
          <input
            type="text"
            value={form.buttonText}
            onChange={(e) => setForm((p) => ({ ...p, buttonText: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Button Link</label>
          <input
            type="text"
            value={form.buttonLink}
            onChange={(e) => setForm((p) => ({ ...p, buttonLink: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Image</label>
        <p className="text-xs text-gray-400 mb-2">
          Not currently used by the public CTA section, which is a hand-drawn illustration — but stored on the
          page in case that changes later.
        </p>
        <div className="flex items-center gap-4">
          {form.image ? (
            <div className="relative">
              <img src={form.image} alt="CTA" className="w-32 h-20 object-cover rounded-lg border border-gray-200" />
              <button
                onClick={() => setForm((p) => ({ ...p, image: '' }))}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
          <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
            {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? 'Uploading...' : form.image ? 'Replace' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save CTA Section'}
        </button>
      </div>
    </div>
  );
};

export default CtaSectionForm;