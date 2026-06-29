import React, { useState } from 'react';
import { Plus, Trash2, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { uploadToCloudinary } from '../../../utils/cloudinaryUpload';

// Matches the ICONS map in the public FeaturesSection component.
const ICON_OPTIONS = ['user', 'settings', 'bar-chart'];

const FeatureItem = ({ feature, index, onChange, onRemove }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(index, 'backgroundImage', url);
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="relative h-32 w-full sm:w-48 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
          {feature.backgroundImage ? (
            <img src={feature.backgroundImage} alt={feature.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
          )}
          <label className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 bg-white/90 hover:bg-white text-xs font-medium text-blue-600 px-2 py-1 rounded-lg shadow cursor-pointer">
            {isUploading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {isUploading ? '...' : 'Upload'}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={isUploading} />
          </label>
        </div>
        <button onClick={() => onRemove(index)} className="text-red-500 hover:text-red-600 p-2 self-start">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={feature.icon}
          onChange={(e) => onChange(index, 'icon', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={feature.title}
          onChange={(e) => onChange(index, 'title', e.target.value)}
          placeholder="Title"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <textarea
        value={feature.description}
        onChange={(e) => onChange(index, 'description', e.target.value)}
        placeholder="Description"
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={feature.buttonText}
          onChange={(e) => onChange(index, 'buttonText', e.target.value)}
          placeholder="Button text"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="text"
          value={feature.buttonLink}
          onChange={(e) => onChange(index, 'buttonLink', e.target.value)}
          placeholder="Button link"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

const FeaturesSectionForm = ({ features, setFeatures, onSave, isSaving }) => {
  const updateFeature = (index, field, value) => {
    setFeatures((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addFeature = () => {
    setFeatures((prev) => [
      ...prev,
      { icon: 'user', title: '', description: '', buttonText: 'Get Started', buttonLink: '#enroll', backgroundImage: '' },
    ]);
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Features Section</h2>
        <button onClick={addFeature} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus className="w-4 h-4" /> Add Feature
        </button>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} onChange={updateFeature} onRemove={removeFeature} />
        ))}
        {features.length === 0 && <p className="text-sm text-gray-400 italic">No features yet.</p>}
      </div>

      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Features Section'}
        </button>
      </div>
    </div>
  );
};

export default FeaturesSectionForm;