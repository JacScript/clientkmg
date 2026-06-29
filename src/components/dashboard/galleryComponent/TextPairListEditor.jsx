import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TextPairListEditor = ({ label, items, setItems, fieldAKey, fieldALabel, fieldBKey, fieldBLabel }) => {
  const updateItem = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addItem = () => {
    setItems((prev) => [...prev, { [fieldAKey]: '', [fieldBKey]: '' }]);
  };

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button 
          onClick={addItem} 
          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center bg-gray-50 p-3 sm:p-2 rounded-lg border border-gray-200">
            <input
              type="text"
              value={item[fieldAKey]}
              onChange={(e) => updateItem(index, fieldAKey, e.target.value)}
              placeholder={fieldALabel}
              className="w-full sm:w-32 px-3 sm:px-2 py-2 sm:py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <input
              type="text"
              value={item[fieldBKey]}
              onChange={(e) => updateItem(index, fieldBKey, e.target.value)}
              placeholder={fieldBLabel}
              className="w-full sm:flex-1 px-3 sm:px-2 py-2 sm:py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={() => removeItem(index)} 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 sm:p-1 rounded-lg transition-colors self-end sm:self-center w-full sm:w-auto flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="sm:hidden ml-2 text-sm">Remove</span>
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-gray-400 italic text-center sm:text-left py-2">None yet.</p>
        )}
      </div>
    </div>
  );
};

export default TextPairListEditor;