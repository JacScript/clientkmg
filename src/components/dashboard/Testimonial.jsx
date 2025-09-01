import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { CiStar, CiEdit, CiTrash, CiSearch, CiFilter } from "react-icons/ci";
import { FaPlus, FaStar, FaQuoteLeft, FaTrophy, FaChartLine } from "react-icons/fa";
import { HiSparkles, HiOutlineCalendar } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";
import { getTestimonials, deleteTestimonial } from '../../http';
import AddTestimonialModal from './AddTestimonialModal';
import EditTestimonialModal from './EditTestimonialModal';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [testimonialToEdit, setTestimonialToEdit] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const queryClient = useQueryClient();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch testimonials using React Query
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      return await getTestimonials();
    },
    placeholderData: keepPreviousData,
  });

  // Mutation for deleting a testimonial
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      enqueueSnackbar('Testimonial deleted successfully!', { variant: 'success' });
      setShowDeleteModal(false);
      setTestimonialToDelete(null);
    },
    onError: (error) => {
      enqueueSnackbar('Testimonial deletion failed. Please try again.', { variant: 'error' });
      setShowDeleteModal(false);
    },
  });

  // Update testimonials when data is fetched
  useEffect(() => {
    if (resData?.data?.data) {
      setTestimonials(resData.data.data);
    }
  }, [resData]);

  if (isLoading) {
    return (
     <LoadingSpinner/>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">Error loading testimonials</p>
          <button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ['testimonials'] })}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === 'all' || testimonial.rating?.toString() === filterRating;
    
    return matchesSearch && matchesRating;
  });

  const handleEdit = (testimonial) => {
    setTestimonialToEdit(testimonial);
    setShowEditModal(true);
  };

  const handleDelete = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (testimonialToDelete?._id) {
      deleteMutation.mutate(testimonialToDelete._id);
    }
  };

  const toggleFeatured = (id) => {
    setTestimonials(testimonials.map(t => 
      t._id === id ? { ...t, featured: !t.featured } : t
    ));
  };

  const handleAddTestimonial = (newTestimonial) => {
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        size={18}
        className={`${i < rating ? 'text-yellow-400' : 'text-gray-200'} transition-colors`}
      />
    ));
  };

  // Calculate statistics
  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1) 
    : '0.0';
  const featuredCount = testimonials.filter(t => t.featured).length;
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-12">
      {/* Sticky Header with Glass Effect */}
      <div className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <HiSparkles className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Testimonials
                </h1>
                <p className="text-gray-600 text-sm mt-1">Manage customer feedback and reviews</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <FaPlus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium">Add Testimonial</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Filters with Glass Effect */}
      <div className={`sticky top-[88px] z-10 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by name, company, or content..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 rounded-xl border-2 border-gray-200 focus-within:border-blue-500 transition-colors">
              <CiFilter className="text-gray-400" size={20} />
              <select
                className="bg-transparent border-0 py-2.5 pr-8 focus:outline-none cursor-pointer"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                <option value="3">⭐⭐⭐ 3 Stars</option>
                <option value="2">⭐⭐ 2 Stars</option>
                <option value="1">⭐ 1 Star</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{testimonials.length}</span>
            </div>
            <div className="text-gray-600 font-medium">Total Reviews</div>
            <div className="text-xs text-gray-400 mt-1">All time</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <FaTrophy className="text-green-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{featuredCount}</span>
            </div>
            <div className="text-gray-600 font-medium">Featured</div>
            <div className="text-xs text-gray-400 mt-1">Currently active</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <FaStar className="text-yellow-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
            </div>
            <div className="text-gray-600 font-medium">Avg Rating</div>
            <div className="text-xs text-gray-400 mt-1">Out of 5.0</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <HiSparkles className="text-purple-600 text-xl" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{fiveStarCount}</span>
            </div>
            <div className="text-gray-600 font-medium">5-Star Reviews</div>
            <div className="text-xs text-gray-400 mt-1">
              {testimonials.length > 0 ? `${Math.round((fiveStarCount / testimonials.length) * 100)}%` : '0%'} of total
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <div 
              key={testimonial._id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {testimonial.featured && (
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white text-sm font-semibold px-4 py-2.5 flex items-center gap-2">
                  <FaTrophy className="animate-pulse" />
                  <span>Featured Testimonial</span>
                </div>
              )}
              
              <div className="p-6">
                {/* Header with Profile */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonial.profileImg || `https://ui-avatars.com/api/?name=${testimonial.name}&background=3B82F6&color=fff&size=128`}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {testimonial.rating}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <BiWorld className="text-blue-500" />
                        <span className="text-blue-600 font-medium">{testimonial.flag || 'Global'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit testimonial"
                    >
                      <CiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete testimonial"
                    >
                      <CiTrash size={20} />
                    </button>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex gap-0.5">
                    {renderStars(testimonial.rating || 0)}
                  </div>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    {testimonial.rating || 0}.0
                  </span>
                </div>

                {/* Testimonial Content */}
                <div className="relative mb-4">
                  <FaQuoteLeft className="absolute -top-2 -left-2 text-3xl text-blue-100" />
                  <blockquote className="relative z-10 text-gray-700 italic leading-relaxed pl-6">
                    {testimonial.description}
                  </blockquote>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <HiOutlineCalendar />
                    <span>{testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'No date'}</span>
                  </div>
                  <button
                    onClick={() => toggleFeatured(testimonial._id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all transform hover:scale-105 ${
                      testimonial.featured
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {testimonial.featured ? '⭐ Featured' : 'Make Featured'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results State */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-gray-600 text-xl font-semibold mb-2">No testimonials found</div>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRating('all');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Testimonial Modal */}
        <AddTestimonialModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTestimonial}
        />

        {/* Edit Testimonial Modal */}
        <EditTestimonialModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setTestimonialToEdit(null);
          }}
          testimonial={testimonialToEdit}
        />

        {/* Enhanced Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all animate-slideUp">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CiTrash className="text-red-600 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Testimonial</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete the testimonial from{' '}
                  <span className="font-semibold text-gray-900">{testimonialToDelete?.name}</span>?
                </p>
                <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all ${
                    deleteMutation.isPending
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 transform hover:scale-105'
                  }`}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Testimonial;