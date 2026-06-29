import React from 'react';

// Reused for machinesSection (no subheading field), capsulesSection, and
// accessoriesSection — all three share this eyebrow/heading/subheading
// shape, just pass showSubheading={false} for machinesSection.
const CopySectionForm = ({ title, form, setForm, onSave, isSaving, showSubheading = true }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Eyebrow</label>
        <input
          type="text"
          value={form.eyebrow}
          onChange={(e) => setForm((p) => ({ ...p, eyebrow: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Heading</label>
        <input
          type="text"
          value={form.heading}
          onChange={(e) => setForm((p) => ({ ...p, heading: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {showSubheading && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Subheading</label>
          <textarea
            value={form.subheading}
            onChange={(e) => setForm((p) => ({ ...p, subheading: e.target.value }))}
            rows={2}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>
      )}

      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Section Copy'}
        </button>
      </div>
    </div>
  );
};

export default CopySectionForm;