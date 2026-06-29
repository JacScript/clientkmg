import React, { useState, useEffect } from 'react';
import { keepPreviousData, useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  getNespressoPageData,
  updateNespressoPageSection,
  createNespressoMachine,
  updateNespressoMachine,
  deleteNespressoMachine,
  createNespressoCapsule,
  updateNespressoCapsule,
  deleteNespressoCapsule,
  createNespressoAccessory,
  updateNespressoAccessory,
  deleteNespressoAccessory,
  getOrders,
  updateOrderStatus,
} from '../../http';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';
import HeroSectionForm from './nespressoComponent/HeroSectionForm';
import CopySectionForm from './nespressoComponent/CopySectionForm';
import SustainabilitySectionForm from './nespressoComponent/SustainabilitySectionForm';
import ProductGrid from './nespressoComponent/ProductGrid';
import AddProductModal from './nespressoComponent/AddProductModal';
import OrdersTable from './nespressoComponent/OrdersTable';

// Matches the Dashboard sidebar's section keys exactly.
const SECTION_TABS = [
  { key: 'heroSection', label: 'Hero' },
  { key: 'machinesSection', label: 'Machines' },
  { key: 'capsulesSection', label: 'Capsules' },
  { key: 'accessoriesSection', label: 'Accessories' },
  { key: 'sustainabilitySection', label: 'Sustainability' },
  { key: 'orders', label: 'Orders' },
];

// Maps each product "kind" to its real API functions, so the generic
// create/update/delete mutations below don't need separate copies per type.
const PRODUCT_API = {
  machine: { create: createNespressoMachine, update: updateNespressoMachine, delete: deleteNespressoMachine },
  capsule: { create: createNespressoCapsule, update: updateNespressoCapsule, delete: deleteNespressoCapsule },
  accessory: { create: createNespressoAccessory, update: updateNespressoAccessory, delete: deleteNespressoAccessory },
};

const Nespresso = ({ activeSection }) => {
  const [visibleSection, setVisibleSection] = useState('heroSection');

  const [heroForm, setHeroForm] = useState({ eyebrow: '', title: '', subheading: '', backgroundImage: [] });
  const [machinesForm, setMachinesForm] = useState({ eyebrow: '', heading: '' });
  const [capsulesForm, setCapsulesForm] = useState({ eyebrow: '', heading: '', subheading: '' });
  const [accessoriesForm, setAccessoriesForm] = useState({ eyebrow: '', heading: '', subheading: '' });
  const [sustainabilityForm, setSustainabilityForm] = useState({ heading: '', subheading: '', stats: [] });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editingKind, setEditingKind] = useState(null);
  const [draftProduct, setDraftProduct] = useState(null);
  const [addModalKind, setAddModalKind] = useState(null);

  const queryClient = useQueryClient();

  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['nespresso-page'],
    queryFn: getNespressoPageData,
    placeholderData: keepPreviousData,
  });

  const pageData = resData?.data?.data;
  const machines = pageData?.machines || [];
  const capsules = pageData?.capsules || [];
  const accessories = pageData?.accessories || [];

  // Orders aren't part of the NespressoPage document — separate collection,
  // fetched independently. Currently the only checkout flow on the site
  // runs through the Nespresso cart, so it lives under this menu for now.
  const { data: ordersRes, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
    placeholderData: keepPreviousData,
  });
  const orders = ordersRes?.data?.data || [];

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      enqueueSnackbar('Order status updated', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update status: ' + error.message, { variant: 'error' });
    },
  });

  useEffect(() => {
    if (!pageData) return;
    setHeroForm({
      eyebrow: pageData.heroSection?.eyebrow || '',
      title: pageData.heroSection?.title || '',
      subheading: pageData.heroSection?.subheading || '',
      backgroundImage: pageData.heroSection?.backgroundImage || [],
    });
    setMachinesForm({
      eyebrow: pageData.machinesSection?.eyebrow || '',
      heading: pageData.machinesSection?.heading || '',
    });
    setCapsulesForm({
      eyebrow: pageData.capsulesSection?.eyebrow || '',
      heading: pageData.capsulesSection?.heading || '',
      subheading: pageData.capsulesSection?.subheading || '',
    });
    setAccessoriesForm({
      eyebrow: pageData.accessoriesSection?.eyebrow || '',
      heading: pageData.accessoriesSection?.heading || '',
      subheading: pageData.accessoriesSection?.subheading || '',
    });
    setSustainabilityForm({
      heading: pageData.sustainabilitySection?.heading || '',
      subheading: pageData.sustainabilitySection?.subheading || '',
      stats: pageData.sustainabilitySection?.stats || [],
    });
  }, [pageData]);

  // Dashboard sidebar section keys match these tab keys exactly.
  useEffect(() => {
    if (SECTION_TABS.some((t) => t.key === activeSection)) {
      setVisibleSection(activeSection);
    }
  }, [activeSection]);

  const sectionMutation = useMutation({
    mutationFn: ({ sectionName, data }) => updateNespressoPageSection(pageData?._id, sectionName, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nespresso-page'] });
      enqueueSnackbar('Saved successfully!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to save: ' + error.message, { variant: 'error' });
    },
  });

  // machinesSection/capsulesSection/etc. are separate top-level fields from
  // the machines/capsules/accessories arrays themselves (not nested), so
  // saving section copy never risks touching the linked products.
  const saveSection = (sectionName, data) => {
    if (!pageData?._id) return;
    sectionMutation.mutate({ sectionName, data });
  };

  const createMutation = useMutation({
    mutationFn: ({ kind, data }) => PRODUCT_API[kind].create(data),
    onSuccess: () => {
      // Backend auto-links new products to this page on creation.
      queryClient.invalidateQueries({ queryKey: ['nespresso-page'] });
      enqueueSnackbar('Created!', { variant: 'success' });
      setAddModalKind(null);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create: ' + error.message, { variant: 'error' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ kind, id, data }) => PRODUCT_API[kind].update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nespresso-page'] });
      enqueueSnackbar('Updated!', { variant: 'success' });
      setEditingProductId(null);
      setEditingKind(null);
      setDraftProduct(null);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update: ' + error.message, { variant: 'error' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ kind, id }) => PRODUCT_API[kind].delete(id),
    onSuccess: () => {
      // Backend also pulls the deleted product's ID out of the page.
      queryClient.invalidateQueries({ queryKey: ['nespresso-page'] });
      enqueueSnackbar('Deleted', { variant: 'info' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to delete: ' + error.message, { variant: 'error' });
    },
  });

  const startEdit = (kind, product) => {
    setEditingKind(kind);
    setEditingProductId(product._id);
    setDraftProduct({ ...product });
  };

  const cancelEdit = () => {
    setEditingKind(null);
    setEditingProductId(null);
    setDraftProduct(null);
  };

  const handleDraftChange = (field, value) => {
    setDraftProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!draftProduct?._id || !editingKind) return;
    updateMutation.mutate({ kind: editingKind, id: draftProduct._id, data: draftProduct });
  };

  const handleDelete = (kind, id) => {
    if (window.confirm('Delete this item? This cannot be undone.')) {
      deleteMutation.mutate({ kind, id });
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Nespresso Page Management</h1>
        </div>
        <div className="border-b border-gray-200 w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto py-2 sm:py-0 space-x-4 sm:space-x-8">
            {SECTION_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setVisibleSection(tab.key)}
                className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-sm ${
                  visibleSection === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {visibleSection === 'heroSection' && (
          <HeroSectionForm
            heroForm={heroForm}
            setHeroForm={setHeroForm}
            onSave={() => saveSection('heroSection', heroForm)}
            isSaving={sectionMutation.isPending}
          />
        )}

        {visibleSection === 'machinesSection' && (
          <div className="space-y-8">
            <CopySectionForm
              title="Machines Section"
              form={machinesForm}
              setForm={setMachinesForm}
              onSave={() => saveSection('machinesSection', machinesForm)}
              isSaving={sectionMutation.isPending}
              showSubheading={false}
            />
            <ProductGrid
              kind="machine"
              label="Machines"
              items={machines}
              editingId={editingKind === 'machine' ? editingProductId : null}
              draftItem={draftProduct}
              onAddClick={() => setAddModalKind('machine')}
              onEdit={(item) => startEdit('machine', item)}
              onCancel={cancelEdit}
              onSave={handleSave}
              onDelete={(id) => handleDelete('machine', id)}
              onChange={handleDraftChange}
              isSaving={updateMutation.isPending}
            />
          </div>
        )}

        {visibleSection === 'capsulesSection' && (
          <div className="space-y-8">
            <CopySectionForm
              title="Capsules Section"
              form={capsulesForm}
              setForm={setCapsulesForm}
              onSave={() => saveSection('capsulesSection', capsulesForm)}
              isSaving={sectionMutation.isPending}
            />
            <ProductGrid
              kind="capsule"
              label="Capsules"
              items={capsules}
              editingId={editingKind === 'capsule' ? editingProductId : null}
              draftItem={draftProduct}
              onAddClick={() => setAddModalKind('capsule')}
              onEdit={(item) => startEdit('capsule', item)}
              onCancel={cancelEdit}
              onSave={handleSave}
              onDelete={(id) => handleDelete('capsule', id)}
              onChange={handleDraftChange}
              isSaving={updateMutation.isPending}
            />
          </div>
        )}

        {visibleSection === 'accessoriesSection' && (
          <div className="space-y-8">
            <CopySectionForm
              title="Accessories Section"
              form={accessoriesForm}
              setForm={setAccessoriesForm}
              onSave={() => saveSection('accessoriesSection', accessoriesForm)}
              isSaving={sectionMutation.isPending}
            />
            <ProductGrid
              kind="accessory"
              label="Accessories"
              items={accessories}
              editingId={editingKind === 'accessory' ? editingProductId : null}
              draftItem={draftProduct}
              onAddClick={() => setAddModalKind('accessory')}
              onEdit={(item) => startEdit('accessory', item)}
              onCancel={cancelEdit}
              onSave={handleSave}
              onDelete={(id) => handleDelete('accessory', id)}
              onChange={handleDraftChange}
              isSaving={updateMutation.isPending}
            />
          </div>
        )}

        {visibleSection === 'sustainabilitySection' && (
          <SustainabilitySectionForm
            form={sustainabilityForm}
            setForm={setSustainabilityForm}
            onSave={() => saveSection('sustainabilitySection', sustainabilityForm)}
            isSaving={sectionMutation.isPending}
          />
        )}

        {visibleSection === 'orders' &&
          (ordersLoading ? (
            <LoadingSpinner />
          ) : (
            <OrdersTable
              orders={orders}
              onStatusChange={(id, status) => statusMutation.mutate({ id, status })}
              isUpdating={statusMutation.isPending}
            />
          ))}
      </main>

      <AddProductModal
        isOpen={!!addModalKind}
        kind={addModalKind}
        onClose={() => setAddModalKind(null)}
        onAdd={(data) => createMutation.mutate({ kind: addModalKind, data })}
        isSaving={createMutation.isPending}
      />
    </div>
  );
};

export default Nespresso;