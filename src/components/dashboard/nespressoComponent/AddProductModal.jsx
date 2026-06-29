import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

const KIND_LABELS = { machine: 'Machine', capsule: 'Capsule', accessory: 'Accessory' };

const AddProductModal = ({ isOpen, kind, onClose, onAdd, isSaving }) => {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState(0);
  const [intensity, setIntensity] = useState(5);
  const [description, setDescription] = useState('');
  const [onDemand, setOnDemand] = useState(false);
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const reset = () => {
    setName('');
    setTagline('');
    setPrice(0);
    setIntensity(5);
    setDescription('');
    setOnDemand(false);
    setImage('');
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
      setImage(url);
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    let payload = { name: name.trim(), image };
    if (kind === 'machine') {
      payload = { ...payload, tagline, price };
    } else if (kind === 'capsule') {
      payload = { ...payload, intensity, price, servings: [] };
    } else if (kind === 'accessory') {
      payload = { ...payload, description, onDemand, sizes: [] };
    }

    onAdd(payload);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white/20  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="bg-white  shadow-2xl shadow-black/40 border border-white/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New {KIND_LABELS[kind]}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Image</label>
            <div className="flex items-center gap-4">
              {image ? (
                <img src={image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
              ) : (
                <div className="w-20 h-20 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                  No image
                </div>
              )}
              <label className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                {isUploading ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isUploading ? 'Uploading...' : image ? 'Replace' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
              </label>
            </div>
          </div>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {kind === 'machine' && (
            <>
              <input
                type="text"
                placeholder="Tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                min="0"
                placeholder="Price (TZS)"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </>
          )}

          {kind === 'capsule' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="1"
                  max="13"
                  placeholder="Intensity (1-13)"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Price (TZS)"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}

          {kind === 'accessory' && (
            <>
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={onDemand} onChange={(e) => setOnDemand(e.target.checked)} />
                Available on demand (no sizes/prices)
              </label>
            </>
          )}

          <p className="text-xs text-gray-500">
            {kind === 'capsule' ? 'Servings' : kind === 'accessory' && !onDemand ? 'Sizes' : 'Other details'} can be added after creating it.
          </p>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={handleClose} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-medium"
            >
              {isSaving ? 'Creating...' : `Create ${KIND_LABELS[kind]}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;