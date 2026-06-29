import React, { useState } from 'react';
import { Plus, Trash2, Upload, Loader } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Upload failed');
  return data.secure_url;
}

// --- A small reusable editor for an array of plain strings (used for both
// heading lines and each search-bar field's options list). ---
const StringListEditor = ({ label, items, onChange, placeholder = '' }) => {
  const updateItem = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const addItem = () => onChange([...items, '']);
  const removeItem = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button onClick={addItem} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-600 p-1">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-gray-400 italic">None yet.</p>}
      </div>
    </div>
  );
};

// --- Editor for one searchBar field (destination or activity): label,
// placeholder, icon, and its options list. ---
const SearchFieldEditor = ({ title, field, onChange }) => {
  const update = (key, value) => onChange({ ...field, [key]: value });

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
      <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          value={field.label || ''}
          onChange={(e) => update('label', e.target.value)}
          placeholder="Label"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="text"
          value={field.placeholder || ''}
          onChange={(e) => update('placeholder', e.target.value)}
          placeholder="Placeholder"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <input
          type="text"
          value={field.icon || ''}
          onChange={(e) => update('icon', e.target.value)}
          placeholder="Icon name"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <p className="text-xs text-gray-400">
        Don't re-add "{field.placeholder || 'the placeholder text'}" as one of the options below — the
        placeholder already covers the unselected state, and the public form filters out an exact (trimmed)
        match anyway.
      </p>
      <StringListEditor
        label="Options"
        items={field.options || []}
        onChange={(options) => update('options', options)}
        placeholder="Option text"
      />
    </div>
  );
};

const HeroSection = ({ heroSection, handleInputChange, addImage, removeImage, onImageUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const searchBar = heroSection.searchBar || { destination: {}, activity: {}, contact: {} };

  const updateSearchBarField = (fieldKey, updatedField) => {
    handleInputChange('heroSection', 'searchBar', { ...searchBar, [fieldKey]: updatedField });
  };

  const updateContact = (key, value) => {
    handleInputChange('heroSection', 'searchBar', {
      ...searchBar,
      contact: { ...searchBar.contact, [key]: value },
    });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      handleInputChange('heroSection', 'backgroundImage', url, index, 'url');
      onImageUploaded?.();
    } catch (err) {
      enqueueSnackbar('Upload failed: ' + err.message, { variant: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic copy */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Badge</label>
          <input
            type="text"
            value={heroSection.badge || ''}
            onChange={(e) => handleInputChange('heroSection', 'badge', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <StringListEditor
          label="Heading Lines (each as 'from X to Y')"
          items={heroSection.heading || []}
          onChange={(lines) => handleInputChange('heroSection', 'heading', lines)}
          placeholder="from Tanzania to France"
        />

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Subheading</label>
          <textarea
            value={heroSection.subheading || ''}
            onChange={(e) => handleInputChange('heroSection', 'subheading', e.target.value)}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Button Text</label>
            <input
              type="text"
              value={heroSection.buttonText || ''}
              onChange={(e) => handleInputChange('heroSection', 'buttonText', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Button Link</label>
            <input
              type="text"
              value={heroSection.buttonLink || ''}
              onChange={(e) => handleInputChange('heroSection', 'buttonLink', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Search bar — destination, activity, contact */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Search Bar</h3>
        <SearchFieldEditor
          title="Destination"
          field={searchBar.destination || {}}
          onChange={(updated) => updateSearchBarField('destination', updated)}
        />
        <SearchFieldEditor
          title="Activity"
          field={searchBar.activity || {}}
          onChange={(updated) => updateSearchBarField('activity', updated)}
        />
        <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-800">Contact Icon</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={searchBar.contact?.icon || ''}
              onChange={(e) => updateContact('icon', e.target.value)}
              placeholder="Icon name (e.g. mail)"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={searchBar.contact?.link || ''}
              onChange={(e) => updateContact('link', e.target.value)}
              placeholder="Link (e.g. #homecontact)"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-400">
            Heads up: nothing in the current Hero or SendRequestForm components actually renders this contact
            icon/link yet — it's stored but inert, same situation as a few other "exists in the schema but not
            wired up visually" fields elsewhere in this project.
          </p>
        </div>
      </div>

      {/* Background images */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Background Images</label>
          <button
            onClick={() => addImage('heroSection', 'backgroundImage')}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(heroSection.backgroundImage || []).map((img, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="relative h-40 bg-gray-100 rounded-lg overflow-hidden">
                {img.url ? (
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                )}
                <label className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-xs font-medium text-blue-600 px-2.5 py-1.5 rounded-lg shadow cursor-pointer">
                  {isUploading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                  {isUploading ? '...' : img.url ? 'Replace' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <input
                type="text"
                value={img.title || ''}
                onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, index, 'title')}
                placeholder="Title"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                value={img.description || ''}
                onChange={(e) => handleInputChange('heroSection', 'backgroundImage', e.target.value, index, 'description')}
                placeholder="Description"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => removeImage('heroSection', 'backgroundImage', index)}
                className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          ))}
        </div>
        {(heroSection.backgroundImage || []).length === 0 && (
          <p className="text-sm text-gray-400 italic">No images yet — the hero carousel needs at least one.</p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;