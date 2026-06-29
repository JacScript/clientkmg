import React, { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, Upload, MapPin, Users, Camera, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/Cloudinaryupload';

const ApartmentCard = ({ apartment, isEditing, onEdit, onCancel, onSave, onDelete, onChange, onImagesChange, isSaving }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const images = apartment.images || [];

  const nextImage = () => images.length && setCurrentImageIndex((p) => (p + 1) % images.length);
  const prevImage = () => images.length && setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);

  const handleAddImages = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setIsUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadToCloudinary));
      onImagesChange([...images, ...urls]);
      enqueueSnackbar(`${urls.length} image(s) added`, { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Image upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    onImagesChange(images.filter((_, i) => i !== index));
    setCurrentImageIndex(0);
  };

  const handleFeatureChange = (index, value) => {
    const next = [...(apartment.features || [])];
    next[index] = value;
    onChange('features', next);
  };

  const addFeature = () => onChange('features', [...(apartment.features || []), 'New feature']);
  const removeFeature = (index) => onChange('features', (apartment.features || []).filter((_, i) => i !== index));

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* Image carousel */}
      <div className="relative h-56 bg-gray-100">
        {images.length > 0 ? (
          <>
            <img src={images[currentImageIndex]} alt={apartment.title} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
            {isEditing && (
              <button
                onClick={() => handleRemoveImage(currentImageIndex)}
                className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow"
                title="Remove this image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera className="w-10 h-10" />
          </div>
        )}
      </div>

      {isEditing && (
        <div className="px-4 pt-3">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
            {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? 'Uploading...' : 'Add photos'}
            <input type="file" accept="image/*" multiple onChange={handleAddImages} className="hidden" disabled={isUploading} />
          </label>
        </div>
      )}

      <div className="p-4 space-y-3">
        {isEditing ? (
          <>
            <input
              type="text"
              value={apartment.title || ''}
              onChange={(e) => onChange('title', e.target.value)}
              placeholder="Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              value={apartment.subtitle || ''}
              onChange={(e) => onChange('subtitle', e.target.value)}
              placeholder="Short subtitle"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={apartment.type || ''}
                onChange={(e) => onChange('type', e.target.value)}
                placeholder="Type (e.g. Studio)"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                value={apartment.slug || ''}
                onChange={(e) => onChange('slug', e.target.value)}
                placeholder="slug-for-url"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </>
        ) : (
          <div>
            <h3 className="font-bold text-lg text-gray-900">{apartment.title || 'Untitled'}</h3>
            <p className="text-sm text-gray-500">{apartment.subtitle}</p>
            <p className="text-xs text-gray-400 mt-1">{apartment.type} · /{apartment.slug}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2">
            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
            {isEditing ? (
              <input
                type="text"
                value={apartment.location || ''}
                onChange={(e) => onChange('location', e.target.value)}
                placeholder="Location"
                className="bg-transparent text-sm w-full focus:outline-none"
              />
            ) : (
              <span className="text-sm text-gray-700 truncate">{apartment.location || 'No location'}</span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2">
            <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={apartment.guests ?? ''}
                onChange={(e) => onChange('guests', parseInt(e.target.value) || 0)}
                className="bg-transparent text-sm w-16 focus:outline-none"
              />
            ) : (
              <span className="text-sm text-gray-700">Up to {apartment.guests || 0} guests</span>
            )}
          </div>
        </div>

        {/* Features */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Features</span>
            {isEditing && (
              <button onClick={addFeature} className="text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {(apartment.features || []).map((feature, i) =>
              isEditing ? (
                <div key={i} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(i, e.target.value)}
                    className="bg-transparent text-xs w-24 focus:outline-none"
                  />
                  <button onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                  {feature}
                </span>
              )
            )}
            {(apartment.features || []).length === 0 && !isEditing && (
              <span className="text-xs text-gray-400 italic">No features listed</span>
            )}
          </div>
        </div>

        {/* Description */}
        {isEditing ? (
          <textarea
            value={apartment.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            rows={3}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed">{apartment.description || 'No description yet.'}</p>
        )}

        {/* Availability + Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {isEditing ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onChange('availability', !apartment.availability)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  apartment.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {apartment.availability ? 'Available' : 'Not Available'}
              </button>
              {!apartment.availability && (
                <input
                  type="text"
                  value={apartment.availableFrom || ''}
                  onChange={(e) => onChange('availableFrom', e.target.value)}
                  placeholder="Available from..."
                  className="text-xs px-2 py-1.5 border border-gray-300 rounded-lg w-32 focus:outline-none"
                />
              )}
            </div>
          ) : (
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                apartment.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {apartment.availability
                ? 'Available'
                : apartment.availableFrom
                ? `From ${apartment.availableFrom}`
                : 'Not Available'}
            </span>
          )}

          {isEditing ? (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">Tsh</span>
              <input
                type="number"
                min="0"
                value={apartment.price ?? ''}
                onChange={(e) => onChange('price', parseInt(e.target.value) || 0)}
                className="w-24 text-right font-bold text-purple-700 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          ) : (
            <span className="font-bold text-purple-700">
              Tsh {(apartment.price || 0).toLocaleString()}
              <span className="text-xs text-gray-400 font-normal"> /night</span>
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
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

export default ApartmentCard;