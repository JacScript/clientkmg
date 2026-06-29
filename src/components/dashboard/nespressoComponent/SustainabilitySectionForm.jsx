import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SustainabilitySectionForm = ({ form, setForm, onSave, isSaving }) => {
  const updateStat = (index, field, value) => {
    setForm((prev) => {
      const stats = [...prev.stats];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setForm((prev) => ({ ...prev, stats: [...prev.stats, { value: '', label: '' }] }));
  };

  const removeStat = (index) => {
    setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Sustainability Section</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Heading</label>
        <input
          type="text"
          value={form.heading}
          onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Subheading</label>
        <textarea
          value={form.subheading}
          onChange={(e) => setForm((p) => ({ ...p, subheading: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Stats</label>
          <button onClick={addStat} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
            <Plus className="w-4 h-4" /> Add Stat
          </button>
        </div>
        <div className="space-y-3">
          {form.stats.map((stat, index) => (
            <div key={index} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, 'value', e.target.value)}
                placeholder="Value, e.g. 80%"
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, 'label', e.target.value)}
                placeholder="Label"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button onClick={() => removeStat(index)} className="text-red-500 hover:text-red-600 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {form.stats.length === 0 && <p className="text-sm text-gray-400 italic">No stats yet.</p>}
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Sustainability Section'}
        </button>
      </div>
    </div>
  );
};

export default SustainabilitySectionForm;