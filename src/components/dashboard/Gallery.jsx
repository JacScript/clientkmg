import React, { useState, useEffect } from 'react';
import { keepPreviousData, useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import {
  getGalleryPageData,
  createGalleryPageData,
  updateGalleryPageData,
  getGalleryCategories,
  createGalleryCategory,
  updateGalleryCategory,
  deleteGalleryCategory,
  getPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from '../../http';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';
import PageForm from './galleryComponent/PageForm';
import CategoriesManager from './galleryComponent/CategoriesManager';
import PhotosManager from './galleryComponent/PhotosManager';
import AddPhotoModal from './galleryComponent/AddPhotoModal';

// Matches the Dashboard sidebar's section keys exactly. These aren't
// "sections of one document" like the other admin pages — Page/Categories/
// Photos are three separate concerns (a singleton doc + two collections).
const SECTION_TABS = [
  { key: 'page', label: 'Page' },
  { key: 'categories', label: 'Categories' },
  { key: 'photos', label: 'Photos' },
];

const Gallery = ({ activeSection }) => {
  const [visibleSection, setVisibleSection] = useState('page');
  const [pageForm, setPageForm] = useState({ heading: '', stats: [] });
  const [photoFilter, setPhotoFilter] = useState('all');
  const [editingPhotoId, setEditingPhotoId] = useState(null);
  const [draftPhoto, setDraftPhoto] = useState(null);
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: pageRes, isLoading: pageLoading, isError: pageError } = useQuery({
    queryKey: ['gallery-page'],
    queryFn: getGalleryPageData,
    placeholderData: keepPreviousData,
  });
  const pageData = pageRes?.data?.data;

  const { data: categoriesRes, isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: getGalleryCategories,
    placeholderData: keepPreviousData,
  });
  const categories = categoriesRes?.data?.data || [];

  const { data: photosRes, isLoading: photosLoading, isError: photosError } = useQuery({
    queryKey: ['photos', photoFilter],
    queryFn: () => getPhotos(photoFilter),
    placeholderData: keepPreviousData,
  });
  const photos = photosRes?.data?.data || [];

  useEffect(() => {
    if (pageData) {
      setPageForm({ heading: pageData.heading || '', stats: pageData.stats || [] });
    }
  }, [pageData]);

  // Dashboard sidebar section keys match these tab keys exactly.
  useEffect(() => {
    if (SECTION_TABS.some((t) => t.key === activeSection)) {
      setVisibleSection(activeSection);
    }
  }, [activeSection]);

  // GalleryPage has no PATCH-section route — it's create-or-update via
  // POST/PUT, same singleton pattern as About.
  const pageMutation = useMutation({
    mutationFn: (data) => (pageData?._id ? updateGalleryPageData(pageData._id, data) : createGalleryPageData(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-page'] });
      enqueueSnackbar('Gallery page saved!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to save: ' + error.message, { variant: 'error' });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: createGalleryCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-categories'] });
      enqueueSnackbar('Category created!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to create category: ' + error.message, { variant: 'error' });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => updateGalleryCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-categories'] });
      enqueueSnackbar('Category updated!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update category: ' + error.message, { variant: 'error' });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteGalleryCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-categories'] });
      enqueueSnackbar('Category deleted', { variant: 'info' });
    },
    onError: (error) => {
      enqueueSnackbar(
        'Failed to delete category: ' + error.message + ' (check no photos still use this category)',
        { variant: 'error' }
      );
    },
  });

  const createPhotoMutation = useMutation({
    mutationFn: createPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      enqueueSnackbar('Photo added!', { variant: 'success' });
      setIsAddPhotoModalOpen(false);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to add photo: ' + error.message, { variant: 'error' });
    },
  });

  const updatePhotoMutation = useMutation({
    mutationFn: ({ id, data }) => updatePhoto(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      enqueueSnackbar('Photo updated!', { variant: 'success' });
      setEditingPhotoId(null);
      setDraftPhoto(null);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update photo: ' + error.message, { variant: 'error' });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: deletePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      enqueueSnackbar('Photo deleted', { variant: 'info' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to delete photo: ' + error.message, { variant: 'error' });
    },
  });

  const startEditPhoto = (photo) => {
    setEditingPhotoId(photo._id);
    setDraftPhoto({ ...photo });
  };

  const cancelEditPhoto = () => {
    setEditingPhotoId(null);
    setDraftPhoto(null);
  };

  const handlePhotoDraftChange = (field, value) => {
    setDraftPhoto((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePhoto = () => {
    if (!draftPhoto?._id) return;
    updatePhotoMutation.mutate({ id: draftPhoto._id, data: draftPhoto });
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Delete this photo? This cannot be undone.')) {
      deletePhotoMutation.mutate(id);
    }
  };

  if (pageLoading || categoriesLoading) return <LoadingSpinner />;
  if (pageError || categoriesError) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
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
        {visibleSection === 'page' && (
          <PageForm
            form={pageForm}
            setForm={setPageForm}
            onSave={() => pageMutation.mutate(pageForm)}
            isSaving={pageMutation.isPending}
          />
        )}

        {visibleSection === 'categories' && (
          <CategoriesManager
            categories={categories}
            onCreate={(data) => createCategoryMutation.mutate(data)}
            onUpdate={(id, data) => updateCategoryMutation.mutate({ id, data })}
            onDelete={(id) => {
              if (window.confirm('Delete this category? Photos using it will keep their category value but it will no longer have a matching filter button.')) {
                deleteCategoryMutation.mutate(id);
              }
            }}
            isSaving={updateCategoryMutation.isPending}
          />
        )}

        {visibleSection === 'photos' &&
          (photosLoading ? (
            <LoadingSpinner />
          ) : photosError ? (
            <ErrorDisplay />
          ) : (
            <>
              <PhotosManager
                photos={photos}
                categories={categories}
                activeFilter={photoFilter}
                onFilterChange={setPhotoFilter}
                editingId={editingPhotoId}
                draftPhoto={draftPhoto}
                onAddClick={() => setIsAddPhotoModalOpen(true)}
                onEdit={startEditPhoto}
                onCancel={cancelEditPhoto}
                onSave={handleSavePhoto}
                onDelete={handleDeletePhoto}
                onChange={handlePhotoDraftChange}
                isSaving={updatePhotoMutation.isPending}
              />
              <AddPhotoModal
                isOpen={isAddPhotoModalOpen}
                categories={categories}
                onClose={() => setIsAddPhotoModalOpen(false)}
                onAdd={(data) => createPhotoMutation.mutate(data)}
                isSaving={createPhotoMutation.isPending}
              />
            </>
          ))}
      </main>
    </div>
  );
};

export default Gallery;