import React, { useState, useEffect } from 'react';
import { keepPreviousData, useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getKiswahiliPageData, updateKiswahiliPageSection } from '../../http';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';
import HeroSectionForm from './kiswahiliComponent/HeroSectionForm';
import FeaturesSectionForm from './kiswahiliComponent/FeaturesSectionForm';
import MasterySectionForm from './kiswahiliComponent/MasterySectionForm';
import CtaSectionForm from './kiswahiliComponent/CtaSectionForm';

// Matches the Dashboard sidebar's section keys exactly.
const SECTION_TABS = [
  { key: 'heroSection', label: 'Hero' },
  { key: 'featuresSection', label: 'Features' },
  { key: 'masterySection', label: 'Mastery' },
  { key: 'ctaSection', label: 'CTA' },
];

const Kiswahili = ({ activeSection }) => {
  const [visibleSection, setVisibleSection] = useState('heroSection');

  const [heroForm, setHeroForm] = useState({
    badge: '', heading: '', headingAccent: '', headingAccentPrefix: '', subheading: '',
    description: '', buttonText: '', buttonLink: '', backgroundImage: [],
  });
  const [features, setFeatures] = useState([]);
  const [masteryForm, setMasteryForm] = useState({
    headingLines: [], description: '', stats: [], levels: [], benefits: [], buttonText: '', buttonLink: '',
  });
  const [ctaForm, setCtaForm] = useState({ badge: '', heading: '', description: '', buttonText: '', buttonLink: '', image: '' });

  const queryClient = useQueryClient();

  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['kiswahili-page'],
    queryFn: getKiswahiliPageData,
    placeholderData: keepPreviousData,
  });

  const pageData = resData?.data?.data;

  useEffect(() => {
    if (!pageData) return;
    setHeroForm({
      badge: pageData.heroSection?.badge || '',
      heading: pageData.heroSection?.heading || '',
      headingAccent: pageData.heroSection?.headingAccent || '',
      headingAccentPrefix: pageData.heroSection?.headingAccentPrefix || '',
      subheading: pageData.heroSection?.subheading || '',
      description: pageData.heroSection?.description || '',
      buttonText: pageData.heroSection?.buttonText || '',
      buttonLink: pageData.heroSection?.buttonLink || '',
      backgroundImage: pageData.heroSection?.backgroundImage || [],
    });
    setFeatures(pageData.featuresSection?.features || []);
    setMasteryForm({
      headingLines: pageData.masterySection?.headingLines || [],
      description: pageData.masterySection?.description || '',
      stats: pageData.masterySection?.stats || [],
      levels: pageData.masterySection?.levels || [],
      benefits: pageData.masterySection?.benefits || [],
      buttonText: pageData.masterySection?.buttonText || '',
      buttonLink: pageData.masterySection?.buttonLink || '',
    });
    setCtaForm({
      badge: pageData.ctaSection?.badge || '',
      heading: pageData.ctaSection?.heading || '',
      description: pageData.ctaSection?.description || '',
      buttonText: pageData.ctaSection?.buttonText || '',
      buttonLink: pageData.ctaSection?.buttonLink || '',
      image: pageData.ctaSection?.image || '',
    });
  }, [pageData]);

  // Dashboard sidebar section keys match these tab keys exactly.
  useEffect(() => {
    if (SECTION_TABS.some((t) => t.key === activeSection)) {
      setVisibleSection(activeSection);
    }
  }, [activeSection]);

  const sectionMutation = useMutation({
    mutationFn: ({ sectionName, data }) => updateKiswahiliPageSection(pageData?._id, sectionName, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kiswahili-page'] });
      enqueueSnackbar('Saved successfully!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to save: ' + error.message, { variant: 'error' });
    },
  });

  const saveSection = (sectionName, data) => {
    if (!pageData?._id) return;
    sectionMutation.mutate({ sectionName, data });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Kiswahili Institute Page Management</h1>
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

        {visibleSection === 'featuresSection' && (
          <FeaturesSectionForm
            features={features}
            setFeatures={setFeatures}
            onSave={() => saveSection('featuresSection', { features })}
            isSaving={sectionMutation.isPending}
          />
        )}

        {visibleSection === 'masterySection' && (
          <MasterySectionForm
            form={masteryForm}
            setForm={setMasteryForm}
            onSave={() => saveSection('masterySection', masteryForm)}
            isSaving={sectionMutation.isPending}
          />
        )}

        {visibleSection === 'ctaSection' && (
          <CtaSectionForm
            form={ctaForm}
            setForm={setCtaForm}
            onSave={() => saveSection('ctaSection', ctaForm)}
            isSaving={sectionMutation.isPending}
          />
        )}
      </main>
    </div>
  );
};

export default Kiswahili;