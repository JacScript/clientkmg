import React from 'react';
import TextPairListEditor from './TextPairListEditor';

const PageForm = ({ form, setForm, onSave, isSaving }) => {
  const setStats = (updater) =>
    setForm((prev) => ({ ...prev, stats: typeof updater === 'function' ? updater(prev.stats) : updater }));

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-5">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Gallery Page</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Heading</label>
        <input
          type="text"
          value={form.heading}
          onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter heading..."
        />
      </div>

      <TextPairListEditor
        label="Stats"
        items={form.stats}
        setItems={setStats}
        fieldAKey="value"
        fieldALabel="Value (e.g. 150+)"
        fieldBKey="label"
        fieldBLabel="Label"
      />

      <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="text-sm text-gray-500 hidden sm:block">
          {/* Optional status message */}
        </div>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-sm sm:text-base transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Gallery Page'}
        </button>
      </div>
    </div>
  );
};

export default PageForm;