import React from 'react';
import { Plus, Home } from 'lucide-react';
import ApartmentCard from './ApartmentCard';

const ApartmentsGrid = ({
  apartments,
  editingApartmentId,
  draftApartment,
  onAddClick,
  onEdit,
  onCancel,
  onSave,
  onDelete,
  onChange,
  onImagesChange,
  isSaving,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Apartments <span className="text-gray-400 font-normal">({apartments.length})</span>
        </h2>
        <button
          onClick={onAddClick}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
        >
          <Plus className="w-4 h-4" /> Add Apartment
        </button>
      </div>

      {apartments.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No apartments yet</p>
          <button
            onClick={onAddClick}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm"
          >
            <Plus className="w-4 h-4" /> Add First Apartment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apartment) => {
            const isEditingThis = editingApartmentId === apartment._id;
            return (
              <ApartmentCard
                key={apartment._id}
                apartment={isEditingThis ? draftApartment : apartment}
                isEditing={isEditingThis}
                onEdit={() => onEdit(apartment)}
                onCancel={onCancel}
                onSave={onSave}
                onDelete={() => onDelete(apartment._id)}
                onChange={onChange}
                onImagesChange={onImagesChange}
                isSaving={isSaving}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApartmentsGrid;