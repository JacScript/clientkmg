import React from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import PhotoCard from './PhotoCard';

const PhotosManager = ({
  photos,
  categories,
  activeFilter,
  onFilterChange,
  editingId,
  draftPhoto,
  onAddClick,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  onChange,
  isSaving,
}) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-900">
            Photos <span className="text-gray-400 font-normal">({photos.length})</span>
          </h2>
          <select
            value={activeFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No photos in this category yet</p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => {
            const isEditingThis = editingId === photo._id;
            return (
              <PhotoCard
                key={photo._id}
                photo={isEditingThis ? draftPhoto : photo}
                categories={categories}
                isEditing={isEditingThis}
                onEdit={() => onEdit(photo)}
                onCancel={onCancel}
                onSave={onSave}
                onDelete={() => onDelete(photo._id)}
                onChange={onChange}
                isSaving={isSaving}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PhotosManager;