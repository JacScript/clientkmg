import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

// Matches the ICONS map in the public LanguageHeroSection (masterySection benefits).
const ICON_OPTIONS = ['users', 'globe', 'zap', 'book-open'];

const BenefitsListEditor = ({ items, setItems }) => {
  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addItem = () => setItems((prev) => [...prev, { icon: 'users', text: '' }]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Benefits</label>
        <button onClick={addItem} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
            <select
              value={item.icon}
              onChange={(e) => updateItem(index, 'icon', e.target.value)}
              className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={item.text}
              onChange={(e) => updateItem(index, 'text', e.target.value)}
              placeholder="Benefit text"
              className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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

export default BenefitsListEditor;