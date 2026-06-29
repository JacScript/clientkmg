import React, { useState } from 'react';
import { Plus, Trash2, Save, Edit, X } from 'lucide-react';

const CategoriesManager = ({ categories, onCreate, onUpdate, onDelete, isSaving }) => {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [newCategory, setNewCategory] = useState({ slug: '', label: '', icon: '', order: categories.length });

  const startEdit = (cat) => {
    setEditingId(cat._id);
    setDraft({ ...cat });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    onUpdate(draft._id, draft);
    setEditingId(null);
    setDraft(null);
  };

  const handleCreate = () => {
    if (!newCategory.slug.trim() || !newCategory.label.trim()) return;
    onCreate({ ...newCategory, slug: newCategory.slug.toLowerCase().replace(/\s+/g, '-') });
    setNewCategory({ slug: '', label: '', icon: '', order: categories.length + 1 });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-5">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Gallery Categories</h2>
      <p className="text-xs text-gray-400">
        Note: the public gallery currently shows the same icon for every category regardless of what's set here —
        the "Icon" field exists on the model but isn't wired up to anything visually yet.
      </p>

      <div className="space-y-2">
        {categories.map((cat) => {
          const isEditing = editingId === cat._id;
          const row = isEditing ? draft : cat;
          return (
            <div key={cat._id} className="flex flex-wrap items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <input
                type="text"
                value={row.slug}
                disabled={!isEditing}
                onChange={(e) => setDraft((p) => ({ ...p, slug: e.target.value }))}
                placeholder="slug"
                className="w-28 px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                value={row.label}
                disabled={!isEditing}
                onChange={(e) => setDraft((p) => ({ ...p, label: e.target.value }))}
                placeholder="Label"
                className="flex-1 min-w-[120px] px-2 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                value={row.icon || ''}
                disabled={!isEditing}
                onChange={(e) => setDraft((p) => ({ ...p, icon: e.target.value }))}
                placeholder="Icon"
                className="w-24 px-2 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="number"
                value={row.order ?? 0}
                disabled={!isEditing}
                onChange={(e) => setDraft((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                placeholder="Order"
                className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {isEditing ? (
                <div className="flex gap-1">
                  <button onClick={saveEdit} disabled={isSaving} className="text-green-600 hover:text-green-700 p-1.5">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-600 p-1.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-1">
                  <button onClick={() => startEdit(cat)} className="text-blue-600 hover:text-blue-700 p-1.5">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(cat._id)} className="text-red-500 hover:text-red-600 p-1.5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {categories.length === 0 && <p className="text-sm text-gray-400 italic">No categories yet.</p>}
      </div>

      <div className="pt-3 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Add Category</p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={newCategory.slug}
            onChange={(e) => setNewCategory((p) => ({ ...p, slug: e.target.value }))}
            placeholder="slug"
            className="w-28 px-2 py-1.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newCategory.label}
            onChange={(e) => setNewCategory((p) => ({ ...p, label: e.target.value }))}
            placeholder="Label"
            className="flex-1 min-w-[120px] px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newCategory.icon}
            onChange={(e) => setNewCategory((p) => ({ ...p, icon: e.target.value }))}
            placeholder="Icon"
            className="w-24 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="number"
            value={newCategory.order}
            onChange={(e) => setNewCategory((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
            placeholder="Order"
            className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesManager;