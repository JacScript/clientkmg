import React, { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import PhotoCard from './PhotoCard';
import { IoGridOutline, IoLayersOutline } from "react-icons/io5";
import { getPhotos, getGalleryCategories, getGalleryPageData } from '../../http';

// Cycles through the same 3 gradient styles the original hardcoded stats
// used, regardless of how many stats actually come back from the backend.
const STAT_STYLES = [
  { bg: 'from-blue-50 to-purple-50', text: 'text-blue-600' },
  { bg: 'from-purple-50 to-pink-50', text: 'text-purple-600' },
  { bg: 'from-pink-50 to-orange-50', text: 'text-pink-600' },
];

const PhotoGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const { data: photosRes, isLoading: photosLoading } = useQuery({
    queryKey: ['photos', activeFilter],
    queryFn: () => getPhotos(activeFilter),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const photos = useMemo(() => photosRes?.data?.data || [], [photosRes]);

  const { data: categoriesRes } = useQuery({
    queryKey: ['gallery-categories'],
    queryFn: getGalleryCategories,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const fetchedCategories = useMemo(() => categoriesRes?.data?.data || [], [categoriesRes]);

  // "All Photos" is synthetic — it's not a real GalleryCategory document,
  // it just tells getPhotos() to skip the category filter entirely.
  const categories = useMemo(
    () => [
      { slug: 'all', label: 'All Photos', icon: IoGridOutline },
      ...fetchedCategories.map((cat) => ({
        slug: cat.slug,
        label: cat.label,
        icon: IoLayersOutline,
      })),
    ],
    [fetchedCategories]
  );

  const { data: pageRes } = useQuery({
    queryKey: ['gallery-page'],
    queryFn: getGalleryPageData,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const stats = useMemo(() => pageRes?.data?.data?.stats || [], [pageRes]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.slug}
              onClick={() => setActiveFilter(category.slug)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.slug
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-purple-300'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Masonry Grid */}
      {!photosLoading && photos.length === 0 ? (
        <p className="text-center text-gray-500">No photos in this category yet.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <div
              key={photo._id}
              className={`break-inside-avoid animate-fade-in ${
                photo.size === 'large' ? 'sm:col-span-2' :
                photo.size === 'wide' ? 'lg:col-span-2' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PhotoCard
                src={photo.src}
                alt={photo.alt}
                title={photo.title}
                description={photo.description}
              />
            </div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => {
            const style = STAT_STYLES[i % STAT_STYLES.length];
            return (
              <div
                key={stat.label}
                className={`text-center p-6 bg-gradient-to-br ${style.bg} rounded-2xl`}
              >
                <div className={`text-3xl font-bold mb-2 ${style.text}`}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;