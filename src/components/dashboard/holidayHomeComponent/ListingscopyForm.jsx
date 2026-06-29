import React from 'react';

const ListingsCopyForm = ({ listingsForm, setListingsForm, onSave, isSaving }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Listings Section Copy</h2>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Badge</label>
        <input
          type="text"
          value={listingsForm.badge}
          onChange={(e) => setListingsForm((p) => ({ ...p, badge: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Heading</label>
        <input
          type="text"
          value={listingsForm.heading}
          onChange={(e) => setListingsForm((p) => ({ ...p, heading: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Subheading</label>
        <textarea
          value={listingsForm.subheading}
          onChange={(e) => setListingsForm((p) => ({ ...p, subheading: e.target.value }))}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>

      <div className="pt-2 border-t border-gray-200">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold"
        >
          {isSaving ? 'Saving...' : 'Save Listings Copy'}
        </button>
      </div>
    </div>
  );
};

export default ListingsCopyForm;