import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const StringListEditor = ({ label, items, setItems, placeholder = '' }) => {
  const updateItem = (index, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addItem = () => setItems((prev) => [...prev, '']);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <button onClick={addItem} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Plus className="w-4 h-4" /> Add Line
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

export default StringListEditor;