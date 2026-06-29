import React from 'react';
import { Plus, Coffee } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({
  kind,
  label,
  items,
  editingId,
  draftItem,
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {label} <span className="text-gray-400 font-normal">({items.length})</span>
        </h2>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add {label.slice(0, -1)}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
          <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No {label.toLowerCase()} yet</p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          >
            <Plus className="w-4 h-4" /> Add First {label.slice(0, -1)}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isEditingThis = editingId === item._id;
            return (
              <ProductCard
                key={item._id}
                kind={kind}
                product={isEditingThis ? draftItem : item}
                isEditing={isEditingThis}
                onEdit={() => onEdit(item)}
                onCancel={onCancel}
                onSave={onSave}
                onDelete={() => onDelete(item._id)}
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

export default ProductGrid;