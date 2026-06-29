import React, { useState } from 'react';
import { Edit, Save, X, Plus, Trash2, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/Cloudinaryupload';


const ProductCard = ({ kind, product, isEditing, onEdit, onCancel, onSave, onDelete, onChange, isSaving }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange('image', url);
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  // --- servings (capsule only) ---
  const updateServing = (index, value) => {
    const next = [...(product.servings || [])];
    next[index] = value;
    onChange('servings', next);
  };
  const addServing = () => onChange('servings', [...(product.servings || []), '']);
  const removeServing = (index) => onChange('servings', (product.servings || []).filter((_, i) => i !== index));

  // --- sizes (accessory only) ---
  const updateSize = (index, field, value) => {
    const next = [...(product.sizes || [])];
    next[index] = { ...next[index], [field]: value };
    onChange('sizes', next);
  };
  const addSize = () => onChange('sizes', [...(product.sizes || []), { label: '', price: 0 }]);
  const removeSize = (index) => onChange('sizes', (product.sizes || []).filter((_, i) => i !== index));

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="relative h-40 bg-gray-100">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
        )}
        {isEditing && (
          <label className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-xs font-medium text-blue-600 px-2.5 py-1.5 rounded-lg shadow cursor-pointer">
            {isUploading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {isUploading ? 'Uploading...' : product.image ? 'Replace' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
          </label>
        )}
      </div>

      <div className="p-4 space-y-3">
        {isEditing ? (
          <input
            type="text"
            value={product.name || ''}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <h3 className="font-bold text-gray-900">{product.name || 'Untitled'}</h3>
        )}

        {/* Machine: tagline */}
        {kind === 'machine' && (
          isEditing ? (
            <input
              type="text"
              value={product.tagline || ''}
              onChange={(e) => onChange('tagline', e.target.value)}
              placeholder="Tagline"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <p className="text-sm text-gray-500">{product.tagline}</p>
          )
        )}

        {/* Capsule: intensity + servings */}
        {kind === 'capsule' && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Intensity</span>
              {isEditing ? (
                <input
                  type="number"
                  min="1"
                  max="13"
                  value={product.intensity ?? ''}
                  onChange={(e) => onChange('intensity', parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-800">{product.intensity}/13</span>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Servings</span>
                {isEditing && (
                  <button onClick={addServing} className="text-blue-600 hover:text-blue-700">
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {(product.servings || []).map((serving, i) =>
                  isEditing ? (
                    <div key={i} className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
                      <input
                        type="text"
                        value={serving}
                        onChange={(e) => updateServing(i, e.target.value)}
                        className="bg-transparent text-xs w-24 focus:outline-none"
                      />
                      <button onClick={() => removeServing(i)} className="text-red-500 hover:text-red-600">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">
                      {serving}
                    </span>
                  )
                )}
                {(product.servings || []).length === 0 && !isEditing && (
                  <span className="text-xs text-gray-400 italic">No servings listed</span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Accessory: description + onDemand + sizes */}
        {kind === 'accessory' && (
          <>
            {isEditing ? (
              <textarea
                value={product.description || ''}
                onChange={(e) => onChange('description', e.target.value)}
                rows={2}
                placeholder="Description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            ) : (
              <p className="text-sm text-gray-600">{product.description}</p>
            )}

            {isEditing ? (
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={product.icon || ''}
                  onChange={(e) => onChange('icon', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
                >
                  <option value="">No icon</option>
                  <option value="spray">Spray</option>
                  <option value="box">Box</option>
                </select>
                <button
                  type="button"
                  onClick={() => onChange('onDemand', !product.onDemand)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                    product.onDemand ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {product.onDemand ? 'On demand' : 'Shoppable (has sizes)'}
                </button>
              </div>
            ) : (
              <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {product.onDemand ? 'Available on demand' : 'Shoppable'}
              </span>
            )}

            {!product.onDemand && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sizes & Prices</span>
                  {isEditing && (
                    <button onClick={addSize} className="text-blue-600 hover:text-blue-700">
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(product.sizes || []).map((size, i) =>
                    isEditing ? (
                      <div key={i} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
                        <input
                          type="text"
                          value={size.label}
                          onChange={(e) => updateSize(i, 'label', e.target.value)}
                          placeholder="Label"
                          className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none"
                        />
                        <input
                          type="number"
                          min="0"
                          value={size.price}
                          onChange={(e) => updateSize(i, 'price', parseInt(e.target.value) || 0)}
                          placeholder="Price"
                          className="w-24 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none"
                        />
                        <button onClick={() => removeSize(i)} className="text-red-500 hover:text-red-600">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div key={i} className="flex justify-between text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
                        <span className="text-gray-700">{size.label}</span>
                        <span className="font-semibold text-gray-900">Tsh {(size.price || 0).toLocaleString()}</span>
                      </div>
                    )
                  )}
                  {(product.sizes || []).length === 0 && (
                    <p className="text-xs text-gray-400 italic">No sizes yet.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Price — machine and capsule only */}
        {kind !== 'accessory' && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">Price</span>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Tsh</span>
                <input
                  type="number"
                  min="0"
                  value={product.price ?? ''}
                  onChange={(e) => onChange('price', parseInt(e.target.value) || 0)}
                  className="w-24 text-right font-bold text-purple-700 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
                />
              </div>
            ) : (
              <span className="font-bold text-purple-700">Tsh {(product.price || 0).toLocaleString()}</span>
            )}
          </div>
        )}

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

export default ProductCard;