import React from 'react';
import StringListEditor from './StringListEditor';
import TextPairListEditor from './TextPairListEditor';
import BenefitsListEditor from './BenefitsListEditor';

const MasterySectionForm = ({ form, setForm, onSave, isSaving }) => {
  const setHeadingLines = (updater) =>
    setForm((prev) => ({ ...prev, headingLines: typeof updater === 'function' ? updater(prev.headingLines) : updater }));

  const setStats = (updater) =>
    setForm((prev) => ({ ...prev, stats: typeof updater === 'function' ? updater(prev.stats) : updater }));

  const setLevels = (updater) =>
    setForm((prev) => ({ ...prev, levels: typeof updater === 'function' ? updater(prev.levels) : updater }));

  const setBenefits = (updater) =>
    setForm((prev) => ({ ...prev, benefits: typeof updater === 'function' ? updater(prev.benefits) : updater }));

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Mastery Section</h2>

      <StringListEditor
        label="Heading Lines"
        items={form.headingLines}
        setItems={setHeadingLines}
        placeholder="e.g. Master"
      />

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <TextPairListEditor
        label="Stats"
        items={form.stats}
        setItems={setStats}
        fieldAKey="value"
        fieldALabel="Value (e.g. 100)"
        fieldBKey="label"
        fieldBLabel="Label"
      />

      <TextPairListEditor
        label="Levels"
        items={form.levels}
        setItems={setLevels}
        fieldAKey="title"
        fieldALabel="Title"
        fieldBKey="subtitle"
        fieldBLabel="Subtitle"
      />

      <BenefitsListEditor items={form.benefits} setItems={setBenefits} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Button Text</label>
          <input
            type="text"
            value={form.buttonText}
            onChange={(e) => setForm((p) => ({ ...p, buttonText: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Button Link</label>
          <input
            type="text"
            value={form.buttonLink}
            onChange={(e) => setForm((p) => ({ ...p, buttonLink: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Mastery Section'}
        </button>
      </div>
    </div>
  );
};

export default MasterySectionForm;