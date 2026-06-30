import React, { useState } from 'react';
import { X, Upload, Loader, Trash2, Plus } from 'lucide-react';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  if (!data.secure_url) throw new Error('Upload failed');
  return data.secure_url;
}

const INITIAL_FORM = {
  title: '',
  slug: '',
  type: '',
  subtitle: '',
  location: '',
  guests: 1,
  price: 0,
  availability: true,
  availableFrom: '',
  description: '',
};

const AddApartmentModal = ({ isOpen, onClose, onAdd, isSaving }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState([]);
  const [features, setFeatures] = useState(['']);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  if (!isOpen) return null;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // ── image handlers ──
  const handleFiles = async (files) => {
    if (!files.length) return;
    setIsUploading(true);
    setUploadError('');
    try {
      const urls = await Promise.all(Array.from(files).map(uploadToCloudinary));
      setImages((prev) => [...prev, ...urls]);
    } catch (_) {
      setUploadError('One or more uploads failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  const removeImage = (index) => setImages((prev) => prev.filter((_, i) => i !== index));

  // ── feature handlers ──
  const updateFeature = (index, value) => {
    setFeatures((prev) => prev.map((f, i) => (i === index ? value : f)));
  };
  const addFeature = () => setFeatures((prev) => [...prev, '']);
  const removeFeature = (index) => {
    if (features.length === 1) return; // keep at least one row
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setImages([]);
    setFeatures(['']);
    setUploadError('');
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    const cleanFeatures = features.map((f) => f.trim()).filter(Boolean);
    onAdd({ ...form, images, features: cleanFeatures });
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Apartment</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ── Photos ── */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Photos <span className="text-gray-400 font-normal">(optional — add more later)</span>
            </label>
            <label
              onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              onDragOver={(e) => e.preventDefault()}
              className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                isUploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center gap-2 text-blue-600">
                  <Loader className="w-6 h-6 animate-spin" />
                  <span className="text-sm">Uploading...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">Click or drag photos here</span>
                  <span className="text-xs">You can select multiple at once</span>
                </div>
              )}
              <input type="file" accept="image/*" multiple className="hidden" disabled={isUploading} onChange={(e) => handleFiles(e.target.files)} />
            </label>
            {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {images.map((url, index) => (
                  <div key={index} className="relative group">
                    <img src={url} alt={`Photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    {index === 0 && <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">Cover</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Identity ── */}
          <input type="text" placeholder="Title (e.g. Garden Studio)" value={form.title} onChange={(e) => set('title', e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Slug (e.g. garden-studio)" value={form.slug} onChange={(e) => set('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Type (e.g. Studio, Private Room)" value={form.type} onChange={(e) => set('type', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Subtitle (e.g. Comfortable single room in share house)" value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <input type="text" placeholder="Location (e.g. Dar es Salaam, Tanzania)" value={form.location} onChange={(e) => set('location', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />

          {/* ── Guests + Price ── */}
          <div className="grid grid-cols-2 gap-3">
            <input type="number" min="1" placeholder="Guests" value={form.guests} onChange={(e) => set('guests', parseInt(e.target.value) || 1)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            <input type="number" min="0" placeholder="Price / night (TZS)" value={form.price} onChange={(e) => set('price', parseInt(e.target.value) || 0)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {/* ── Features ── */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Features</label>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1} (e.g. WiFi included)`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                  className="text-red-400 hover:text-red-600 disabled:opacity-30 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <p className="text-xs text-gray-400 pt-1">Empty rows are ignored on save.</p>
          </div>

          {/* ── Availability ── */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Availability</span>
              <button
                type="button"
                onClick={() => set('availability', !form.availability)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${form.availability ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.availability ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {form.availability ? 'Currently available for booking.' : 'Not available — fill in the date below so guests know when it will be.'}
            </p>
            {!form.availability && (
              <input
                type="text"
                placeholder="Available from (e.g. September 2025)"
                value={form.availableFrom}
                onChange={(e) => set('availableFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {/* ── Description ── */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
            <textarea
              placeholder="Describe the apartment — location highlights, what's nearby, what makes it special..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">Cancel</button>
            <button type="submit" disabled={isSaving || isUploading} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium">
              {isSaving ? 'Creating...' : 'Create Apartment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddApartmentModal;