import React, { useState } from 'react';
import { Edit, Save, X, Trash2, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const SIZE_OPTIONS = ['small', 'medium', 'large', 'wide'];

const PhotoCard = ({ photo, categories, isEditing, onEdit, onCancel, onSave, onDelete, onChange, isSaving }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange('src', url);
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        {photo.src ? (
          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
        )}
        {isEditing && (
          <label className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-xs font-medium text-blue-600 px-2.5 py-1.5 rounded-lg shadow cursor-pointer">
            {isUploading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {isUploading ? 'Uploading...' : 'Replace'}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
          </label>
        )}
      </div>

      <div className="p-4 space-y-3">
        {isEditing ? (
          <input
            type="text"
            value={photo.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <h3 className="font-bold text-gray-900">{photo.title || 'Untitled'}</h3>
        )}

        {isEditing ? (
          <textarea
            value={photo.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        ) : (
          <p className="text-sm text-gray-600 line-clamp-2">{photo.description}</p>
        )}

        {isEditing ? (
          <input
            type="text"
            value={photo.alt || ''}
            onChange={(e) => onChange('alt', e.target.value)}
            placeholder="Alt text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          {isEditing ? (
            <select
              value={photo.category || ''}
              onChange={(e) => onChange('category', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full self-start">{photo.category}</span>
          )}

          {isEditing ? (
            <select
              value={photo.size || 'medium'}
              onChange={(e) => onChange('size', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {SIZE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full self-start">{photo.size}</span>
          )}
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-100">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                disabled={isSaving}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold"
              >
                <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={onCancel} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button onClick={onDelete} className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-semibold">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;