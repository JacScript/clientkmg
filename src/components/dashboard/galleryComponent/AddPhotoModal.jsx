import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const SIZE_OPTIONS = ['small', 'medium', 'large', 'wide'];

const AddPhotoModal = ({ isOpen, categories, onClose, onAdd, isSaving }) => {
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]?.slug || '');
  const [size, setSize] = useState('medium');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const reset = () => {
    setSrc('');
    setTitle('');
    setAlt('');
    setDescription('');
    setCategory(categories[0]?.slug || '');
    setSize('medium');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setSrc(url);
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!src || !title.trim() || !category) return;
    onAdd({ src, title: title.trim(), alt, description, category, size });
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Photo</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Image</label>
            <div className="flex items-center gap-4">
              {src ? (
                <img src={src} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
              ) : (
                <div className="w-24 h-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                  Required
                </div>
              )}
              <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isUploading ? 'Uploading...' : src ? 'Replace' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Alt text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {categories.length === 0 && (
            <p className="text-xs text-amber-600">No categories exist yet — add one first, or this photo won't show up under any filter.</p>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !src}
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium"
            >
              {isSaving ? 'Creating...' : 'Add Photo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhotoModal;