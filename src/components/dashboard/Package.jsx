// import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react';
// import {
//   FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSave, FaTimes,
//   FaImage, FaMapMarkerAlt, FaClock, FaUsers, FaDollarSign, FaCalendar,
//   FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCopy, FaCheck,
//   FaChevronLeft, FaChevronRight
// } from 'react-icons/fa';
// import { createPackage, deletePackage, getPackages, updatePackage } from '../../http/index';
// import PackageForm from './FormPackage';
// import PackageViewModalContent from './PackageViewModalContent';
// import PackageListView from './PackageListView';
// import PackageGridCard from './PackageGridCard';
// import { enqueueSnackbar } from 'notistack';
// import LoadingSpinner from '../LoadingComponents';
// import ErrorDisplay from '../ErrorComponent';

// const Package = () => {
//   const queryClient = useQueryClient();
//   const [packages, setPackages] = useState([]);
//   const [view, setView] = useState('grid');
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [modalType, setModalType] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [sortBy, setSortBy] = useState('lastUpdated');
//   const [expandedCards, setExpandedCards] = useState({});
//   const [copiedId, setCopiedId] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//   // Delete modal state
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [packageToDelete, setPackageToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     title: '',
//     subtitle: '',
//     duration: '',
//     price: '',
//     priceNote: '/person',
//     description: '',
//     longDescription: '',
//     includes: [''],
//     images: [''],
//     color: 'from-blue-500 to-purple-500',
//     status: 'draft'
//   });

//   const colorOptions = [
//     { name: 'Red to Orange', value: 'from-red-500 to-orange-500' },
//     { name: 'Blue to Purple', value: 'from-blue-500 to-purple-500' },
//     { name: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
//     { name: 'Yellow to Cyan', value: 'from-yellow-500 to-cyan-500' },
//     { name: 'Pink to Rose', value: 'from-pink-500 to-rose-500' },
//     { name: 'Indigo to Blue', value: 'from-indigo-500 to-blue-500' }
//   ];

//   const { data: resData, isLoading, isError } = useQuery({
//     queryKey: ['packages'],
//     queryFn: async () => {
//       return await getPackages();
//     },
//     placeholderData: keepPreviousData,
//   });

//   // Fixed delete mutation
//   const deletePackageMutation = useMutation({
//     mutationFn: (id) => {
//       return deletePackage(id);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['packages'] });
//       enqueueSnackbar('Package deleted successfully!', { variant: 'success' });
//       setShowDeleteModal(false);
//       setPackageToDelete(null);
//     },
//     onError: (error) => {
//       // console.error('Delete error:', error);
//       enqueueSnackbar('Failed to delete package. Please try again.', { variant: 'error' });
//       setShowDeleteModal(false);
//       setPackageToDelete(null);
//     }
//   });

//   useEffect(() => {
//     if (resData?.data?.data) {
//       setPackages(resData.data.data);
//     }
//   }, [resData]);

//   // Add packages mutation
//   const addPackageMutation = useMutation({
//     mutationFn: createPackage,
//     onSuccess: (result) => {
//       queryClient.invalidateQueries({ queryKey: ['packages'] });
//       closeModal();
//       enqueueSnackbar('Package added successfully!', { variant: 'success' });
//     },
//     onError: (error) => {
//       enqueueSnackbar('Failed to save Package. Please try again.', { variant: 'error' });
//       closeModal();
//     }
//   });

//   // Update package mutation
//   const updatePackageMutation = useMutation({
//     mutationFn: (packageData) => updatePackage(packageData._id, packageData),
//     onSuccess: (result) => {
//       queryClient.invalidateQueries({ queryKey: ['packages'] });
//       enqueueSnackbar('Package updated successfully!', { variant: 'success' });
//       closeModal();
//     },
//     onError: (error) => {
//       enqueueSnackbar('Failed to update package. Please try again.', { variant: 'error' });
//       closeModal();
//     }
//   });

//   if (isLoading) {
//     return (
//      <LoadingSpinner/>
//     );
//   }

//   if (isError) {
//     return (
//      <ErrorDisplay
//      />
//     );
//   }

//   const stats = {
//     totalPackages: packages.length,
//     activePackages: packages.filter(p => p.status === 'active').length,
//   };

//   const filteredPackages = packages
//     .filter(pkg =>
//       pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter(pkg => filterStatus === 'all' || pkg.status === filterStatus)
//     .sort((a, b) => {
//       switch(sortBy) {
//         case 'title': 
//           return (a.title || '').localeCompare(b.title || '');
//         case 'price': 
//           return (parseInt((a.price || '0').toString().replace(/,/g, '')) || 0) - 
//                  (parseInt((b.price || '0').toString().replace(/,/g, '')) || 0);
//         default: 
//           return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
//       }
//     });

//   const openModal = (type, pkg = null) => {
//     console.log('Opening modal with package:', pkg);
//     setModalType(type);
//     setSelectedPackage(pkg);
//     setCurrentImageIndex(0);
    
//     if (type === 'edit' && pkg) {
//       setFormData({
//         title: pkg.title || '',
//         subtitle: pkg.subtitle || '',
//         duration: pkg.duration || '',
//         price: pkg.price || '',
//         priceNote: pkg.priceNote || '/person',
//         description: pkg.description || '',
//         longDescription: pkg.longDescription || '',
//         includes: (pkg.features && pkg.features.length > 0) ? [...pkg.features] : [''],
//         images: (pkg.images && pkg.images.length > 0) ? [...pkg.images] : [''],
//         color: pkg.color || 'from-blue-500 to-purple-500',
//         status: pkg.status || 'draft'
//       });
//     } else if (type === 'add') {
//       setFormData({
//         title: '',
//         subtitle: '',
//         duration: '',
//         price: '',
//         priceNote: '/person',
//         description: '',
//         longDescription: '',
//         includes: [''],
//         images: [''],
//         color: 'from-blue-500 to-purple-500',
//         status: 'draft'
//       });
//     }
//   };

//   const closeModal = () => {
//     setModalType('');
//     setSelectedPackage(null);
//     setFormData({
//       title: '',
//       subtitle: '',
//       duration: '',
//       price: '',
//       priceNote: '/person',
//       description: '',
//       longDescription: '',
//       includes: [''],
//       images: [''],
//       color: 'from-blue-500 to-purple-500',
//       status: 'draft'
//     });
//     setCurrentImageIndex(0);
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     // console.log('Saving package with formData:', formData);

//     if (!formData?.title?.trim() || !formData?.subtitle?.trim() || !formData?.price || !formData?.description?.trim()) {
//       alert('Please fill in all required fields: Title, Subtitle, Price, and Description.');
//       return;
//     }

//     const cleanedFormData = {
//       ...formData,
//       features: formData.includes.filter(item => item.trim() !== ''),
//       images: formData.images.filter(item => item.trim() !== ''),
//       price: formData.price,
//     };

//     if (modalType === 'edit' && selectedPackage) {
//       updatePackageMutation.mutate({ 
//         _id: selectedPackage._id, 
//         ...cleanedFormData 
//       });
//     } else if (modalType === 'add') {
//       addPackageMutation.mutate(cleanedFormData);
//     }
//   };

//   // Fixed delete handler - opens confirmation modal
//   const handleDelete = (pkg) => {
//     // console.log('Requesting delete for package:', pkg);
//     setPackageToDelete(pkg);
//     setShowDeleteModal(true);
//   };

//   // Confirm delete handler
//   const confirmDelete = () => {
//     // console.log('Confirming delete for package:', packageToDelete);
//     // setShowDeleteModal(false);
//     // setPackageToDelete(null);
//     if (packageToDelete) {
//       deletePackageMutation.mutate(packageToDelete._id);
//     }
//   };

//   // Cancel delete handler
//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setPackageToDelete(null);
//   };

//   const toggleExpanded = (id) => {
//     setExpandedCards(prev => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const copyPackage = (pkg) => {
//     const newPackage = {
//       ...pkg,
//       _id: Date.now().toString(),
//       title: pkg.title + ' (Copy)',
//       status: 'draft',
//       bookings: 0,
//       revenue: '0',
//       lastUpdated: new Date().toISOString().split('T')[0]
//     };
//     setPackages([...packages, newPackage]);
//     setCopiedId(newPackage._id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleArrayChange = (field, index, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].map((item, i) => i === index ? value : item)
//     }));
//   };

//   const addArrayItem = (field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: [...prev[field], '']
//     }));
//   };

//   const removeArrayItem = (field, index) => {
//     if ((field === 'images' || field === 'includes') && formData[field].length === 1) {
//       alert(`You must have at least one ${field === 'images' ? 'image' : 'include'} URL.`);
//       return;
//     }
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].filter((_, i) => i !== index)
//     }));
//   };

//   const isSubmitting = addPackageMutation.isLoading || updatePackageMutation.isLoading;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <div className="w-4/5 mx-auto shadow-sm">
//         <div className="bg-white border-b border-gray-200 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
//               <p className="text-sm text-gray-600">Manage your travel packages and bookings</p>
//             </div>
//             <button
//               onClick={() => openModal('add')}
//               className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
//             >
//               <FaPlus className="w-4 h-4" />
//               Add Package
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Packages</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.totalPackages}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Active Packages</p>
//                 <p className="text-3xl font-bold text-green-600">{stats.activePackages}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <FaCheck className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
//             <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search packages..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
//                 />
//               </div>
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="draft">Draft</option>
//                 <option value="archived">Archived</option>
//               </select>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="lastUpdated">Last Updated</option>
//                 <option value="title">Title</option>
//                 <option value="price">Price</option>
//               </select>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setView('grid')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   view === 'grid'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 Grid
//               </button>
//               <button
//                 onClick={() => setView('list')}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ${
//                   view === 'list'
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 List
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Packages Grid/List */}
//         {filteredPackages.length === 0 ? (
//           <div className="text-center py-10 text-gray-500 text-lg">
//             No packages found matching your criteria.
//           </div>
//         ) : view === 'grid' ? (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredPackages.map((pkg) => (
//               <PackageGridCard
//                 key={pkg._id}
//                 pkg={pkg}
//                 expandedCards={expandedCards}
//                 toggleExpanded={toggleExpanded}
//                 copiedId={copiedId}
//                 copyPackage={copyPackage}
//                 openModal={openModal}
//                 handleDelete={handleDelete}
//               />
//             ))}
//           </div>
//         ) : (
//           <PackageListView
//             filteredPackages={filteredPackages}
//             openModal={openModal}
//             copyPackage={copyPackage}
//             handleDelete={handleDelete}
//           />
//         )}
//       </div>

//       {/* Main Modal */}
//       {modalType && (
//         <div className="fixed inset-0  flex items-center justify-center p-4 z-50 backdrop-blur-sm bg-black/30 min-h-screen">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {modalType === 'view' ? 'View Package' : modalType === 'edit' ? 'Edit Package' : 'Add New Package'}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <FaTimes className="w-5 h-5 text-gray-500" />
//               </button>
//             </div>

//             <div className="p-6">
//               {modalType === 'view' ? (
//                 <PackageViewModalContent
//                   selectedPackage={selectedPackage}
//                   currentImageIndex={currentImageIndex}
//                   setCurrentImageIndex={setCurrentImageIndex}
//                 />
//               ) : (
//                 <PackageForm
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   handleArrayChange={handleArrayChange}
//                   addArrayItem={addArrayItem}
//                   removeArrayItem={removeArrayItem}
//                   handleSave={handleSave}
//                   closeModal={closeModal}
//                   modalType={modalType}
//                   colorOptions={colorOptions}
//                   isLoading={isSubmitting}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Package</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete the package{' '}
//               <span className="font-medium">"{packageToDelete?.title}"</span>? This action cannot be undone.
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={cancelDelete}
//                 disabled={deletePackageMutation.isPending}
//                 className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 disabled={deletePackageMutation.isPending}
//                 className={`px-4 py-2 rounded-lg text-white transition-colors ${
//                   deletePackageMutation.isPending
//                     ? 'bg-red-400 cursor-not-allowed'
//                     : 'bg-red-600 hover:bg-red-700'
//                 }`}
//               >
//                 {deletePackageMutation.isPending ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Package;












import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState, useMemo } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSave, FaTimes,
  FaImage, FaMapMarkerAlt, FaClock, FaUsers, FaDollarSign, FaCalendar,
  FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCopy, FaCheck,
  FaChevronLeft, FaChevronRight, FaStar, FaHeart, FaShare, FaDownload, FaGlobe, FaTag, FaBookmark, FaArrowRight, FaBolt,
  FaChartLine, FaLayerGroup, FaGem, FaRocket, FaMagic
} from 'react-icons/fa';
import { createPackage, deletePackage, getPackages, updatePackage } from '../../http/index';
import PackageForm from './FormPackage';
import PackageViewModalContent from './PackageViewModalContent';
import PackageListView from './PackageListView';
import PackageGridCard from './PackageGridCard';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';
import { Sparkle, Sparkles, TrendingUp } from 'lucide-react';

const Package = () => {
  const queryClient = useQueryClient();
  const [packages, setPackages] = useState([]);
  const [view, setView] = useState('grid');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [expandedCards, setExpandedCards] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    duration: '',
    price: '',
    priceNote: '/person',
    description: '',
    longDescription: '',
    includes: [''],
    images: [''],
    color: 'from-blue-500 to-purple-500',
    status: 'draft'
  });

  const colorOptions = [
    { name: 'Sunset Blaze', value: 'from-red-500 to-orange-500', preview: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { name: 'Ocean Dreams', value: 'from-blue-500 to-purple-500', preview: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { name: 'Forest Magic', value: 'from-green-500 to-emerald-500', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { name: 'Golden Sunrise', value: 'from-yellow-500 to-cyan-500', preview: 'bg-gradient-to-r from-yellow-500 to-cyan-500' },
    { name: 'Rose Garden', value: 'from-pink-500 to-rose-500', preview: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { name: 'Midnight Sky', value: 'from-indigo-500 to-blue-500', preview: 'bg-gradient-to-r from-indigo-500 to-blue-500' },
    { name: 'Aurora Borealis', value: 'from-purple-600 to-pink-600', preview: 'bg-gradient-to-r from-purple-600 to-pink-600' },
    { name: 'Tropical Sunset', value: 'from-orange-600 to-red-600', preview: 'bg-gradient-to-r from-orange-600 to-red-600' }
  ];

  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      return await getPackages();
    },
    placeholderData: keepPreviousData,
  });

  // Delete mutation with enhanced feedback
  const deletePackageMutation = useMutation({
    mutationFn: (id) => {
      return deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      enqueueSnackbar('🎉 Package deleted successfully!', { variant: 'success' });
      setShowDeleteModal(false);
      setPackageToDelete(null);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    },
    onError: (error) => {
      enqueueSnackbar('❌ Failed to delete package. Please try again.', { variant: 'error' });
      setShowDeleteModal(false);
      setPackageToDelete(null);
    }
  });

  useEffect(() => {
    if (resData?.data?.data) {
      setPackages(resData.data.data);
    }
  }, [resData]);

  // Add packages mutation with enhanced feedback
  const addPackageMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      closeModal();
      enqueueSnackbar('🚀 Package created successfully!', { variant: 'success' });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    },
    onError: (error) => {
      enqueueSnackbar('⚠️ Failed to save Package. Please try again.', { variant: 'error' });
      closeModal();
    }
  });

  // Update package mutation with enhanced feedback
  const updatePackageMutation = useMutation({
    mutationFn: (packageData) => updatePackage(packageData._id, packageData),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      enqueueSnackbar('✨ Package updated successfully!', { variant: 'success' });
      closeModal();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    },
    onError: (error) => {
      enqueueSnackbar('⚠️ Failed to update package. Please try again.', { variant: 'error' });
      closeModal();
    }
  });

  // Enhanced stats calculation
  const stats = useMemo(() => {
    const totalPackages = packages.length;
    const activePackages = packages.filter(p => p.status === 'active').length;
    const draftPackages = packages.filter(p => p.status === 'draft').length;
    const archivedPackages = packages.filter(p => p.status === 'archived').length;
    const totalRevenue = packages.reduce((sum, pkg) => {
      const revenue = parseFloat((pkg.revenue || '0').toString().replace(/,/g, '')) || 0;
      return sum + revenue;
    }, 0);

    return {
      totalPackages,
      activePackages,
      draftPackages,
      archivedPackages,
      totalRevenue: totalRevenue.toLocaleString()
    };
  }, [packages]);

  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg =>
        pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(pkg => filterStatus === 'all' || pkg.status === filterStatus)
      .sort((a, b) => {
        switch(sortBy) {
          case 'title': 
            return (a.title || '').localeCompare(b.title || '');
          case 'price': 
            return (parseInt((a.price || '0').toString().replace(/,/g, '')) || 0) - 
                   (parseInt((b.price || '0').toString().replace(/,/g, '')) || 0);
          default: 
            return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
        }
      });
  }, [packages, searchTerm, filterStatus, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaRocket className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading amazing packages...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTimes className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-4">We couldn't load your packages. Please try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const openModal = (type, pkg = null) => {
    setModalType(type);
    setSelectedPackage(pkg);
    setCurrentImageIndex(0);
    
    if (type === 'edit' && pkg) {
      setFormData({
        title: pkg.title || '',
        subtitle: pkg.subtitle || '',
        duration: pkg.duration || '',
        price: pkg.price || '',
        priceNote: pkg.priceNote || '/person',
        description: pkg.description || '',
        longDescription: pkg.longDescription || '',
        includes: (pkg.features && pkg.features.length > 0) ? [...pkg.features] : [''],
        images: (pkg.images && pkg.images.length > 0) ? [...pkg.images] : [''],
        color: pkg.color || 'from-blue-500 to-purple-500',
        status: pkg.status || 'draft'
      });
    } else if (type === 'add') {
      setFormData({
        title: '',
        subtitle: '',
        duration: '',
        price: '',
        priceNote: '/person',
        description: '',
        longDescription: '',
        includes: [''],
        images: [''],
        color: 'from-blue-500 to-purple-500',
        status: 'draft'
      });
    }
  };

  const closeModal = () => {
    setModalType('');
    setSelectedPackage(null);
    setFormData({
      title: '',
      subtitle: '',
      duration: '',
      price: '',
      priceNote: '/person',
      description: '',
      longDescription: '',
      includes: [''],
      images: [''],
      color: 'from-blue-500 to-purple-500',
      status: 'draft'
    });
    setCurrentImageIndex(0);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData?.title?.trim() || !formData?.subtitle?.trim() || !formData?.price || !formData?.description?.trim()) {
      enqueueSnackbar('⚠️ Please fill in all required fields: Title, Subtitle, Price, and Description.', { variant: 'warning' });
      return;
    }

    const cleanedFormData = {
      ...formData,
      features: formData.includes.filter(item => item.trim() !== ''),
      images: formData.images.filter(item => item.trim() !== ''),
      price: formData.price,
    };

    if (modalType === 'edit' && selectedPackage) {
      updatePackageMutation.mutate({ 
        _id: selectedPackage._id, 
        ...cleanedFormData 
      });
    } else if (modalType === 'add') {
      addPackageMutation.mutate(cleanedFormData);
    }
  };

  const handleDelete = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (packageToDelete) {
      deletePackageMutation.mutate(packageToDelete._id);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };

  const toggleExpanded = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyPackage = (pkg) => {
    const newPackage = {
      ...pkg,
      _id: Date.now().toString(),
      title: pkg.title + ' (Copy)',
      status: 'draft',
      bookings: 0,
      revenue: '0',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPackages([...packages, newPackage]);
    setCopiedId(newPackage._id);
    enqueueSnackbar('📋 Package copied successfully!', { variant: 'info' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if ((field === 'images' || field === 'includes') && formData[field].length === 1) {
      enqueueSnackbar(`⚠️ You must have at least one ${field === 'images' ? 'image' : 'include'} URL.`, { variant: 'warning' });
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const isSubmitting = addPackageMutation.isPending || updatePackageMutation.isPending;

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: FaCheck },
      draft: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: FaEdit },
      archived: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: FaBookmark }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.color} capitalize`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const EnhancedPackageCard = ({ pkg }) => {
    const isExpanded = expandedCards[pkg._id];
    const images = Array.isArray(pkg.images) && pkg.images.length > 0 ? pkg.images : ['https://via.placeholder.com/400x300?text=No+Image'];
    
    return (
      <div className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${isAnimating ? 'animate-pulse' : ''}`}>
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color || 'from-blue-500 to-purple-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
        
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl">
          <img
            src={images[0]}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <StatusBadge status={pkg.status} />
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-1">
              <FaDollarSign className="w-4 h-4 text-green-600" />
              <span className="font-bold text-gray-900">{pkg.price || '0'}</span>
              <span className="text-sm text-gray-600">{pkg.priceNote || ''}</span>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <button
              onClick={() => openModal('view', pkg)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300 hover:scale-110"
              title="View Details"
            >
              <FaEye className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => openModal('edit', pkg)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-emerald-50 transition-all duration-300 hover:scale-110"
              title="Edit Package"
            >
              <FaEdit className="w-4 h-4 text-emerald-600" />
            </button>
            <button
              onClick={() => copyPackage(pkg)}
              className={`p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 hover:scale-110 ${
                copiedId === pkg._id ? 'bg-indigo-100' : ''
              }`}
              title="Copy Package"
            >
              {copiedId === pkg._id ? (
                <FaCheck className="w-4 h-4 text-green-600" />
              ) : (
                <FaCopy className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title and Subtitle */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {pkg.title || 'Untitled Package'}
            </h3>
            <p className="text-gray-600 text-sm">{pkg.subtitle || 'No subtitle provided'}</p>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaClock className="w-4 h-4" />
              <span>{pkg.duration || 'Duration not set'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendar className="w-4 h-4" />
              <span>{pkg.lastUpdated || 'Never'}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed">
            {isExpanded 
              ? (pkg.description || 'No description provided') 
              : `${(pkg.description || 'No description provided').substring(0, 100)}${(pkg.description?.length || 0) > 100 ? '...' : ''}`
            }
          </p>

          {/* Features Preview */}
          {pkg.features && pkg.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-800">Features:</h4>
              <div className="flex flex-wrap gap-1">
                {(isExpanded ? pkg.features : pkg.features.slice(0, 3)).map((feature, index) => (
                  <span key={index} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                    <Sparkle className="w-3 h-3" />
                    {feature}
                  </span>
                ))}
                {!isExpanded && pkg.features.length > 3 && (
                  <span className="text-xs text-gray-500">+{pkg.features.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => toggleExpanded(pkg._id)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <FaChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <FaChevronDown className="w-4 h-4" />
                  Show More
                </>
              )}
            </button>
            
            <button
              onClick={() => handleDelete(pkg)}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded-lg"
            >
              <FaTrash className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>

        {/* Floating Magic Effect */}
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse">
          <FaMagic className="w-4 h-4 text-white m-1" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ✨ Amazing Package Management
                </h1>
                <p className="text-gray-600">Create, manage, and optimize your travel experiences</p>
              </div>
              <button
                onClick={() => openModal('add')}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <FaPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Package</span>
                  <FaRocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Packages</p>
                <p className="text-4xl font-bold text-gray-900 mt-1">{stats.totalPackages}</p>
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  All packages
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-2xl shadow-lg">
                <FaLayerGroup className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Packages</p>
                <p className="text-4xl font-bold text-emerald-600 mt-1">{stats.activePackages}</p>
                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                  <FaBolt className="w-3 h-3" />
                  Ready to book
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-4 rounded-2xl shadow-lg">
                <FaRocket className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Draft Packages</p>
                <p className="text-4xl font-bold text-amber-600 mt-1">{stats.draftPackages}</p>
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <FaEdit className="w-3 h-3" />
                  In progress
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                <FaEdit className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                <p className="text-4xl font-bold text-purple-600 mt-1">${stats.totalRevenue}</p>
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <FaChartLine className="w-3 h-3" />
                  All packages
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <FaGem className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-8 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none px-6 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="active">✅ Active</option>
                  <option value="draft">📝 Draft</option>
                  <option value="archived">📦 Archived</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-6 py-3 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 text-gray-700 font-medium"
                >
                  <option value="lastUpdated">🕒 Last Updated</option>
                  <option value="title">🔤 Title</option>
                  <option value="price">💰 Price</option>
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setView('grid')}
                className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                  view === 'grid'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaLayerGroup className="w-4 h-4" />
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-6 py-2 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                  view === 'list'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaFilter className="w-4 h-4" />
                List
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <FaSearch className="w-4 h-4" />
                Showing {filteredPackages.length} of {packages.length} packages
              </span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Packages Display */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-12 max-w-md mx-auto border border-white/50">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No packages found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterStatus !== 'all' 
                  ? "Try adjusting your search or filters" 
                  : "Get started by creating your first amazing package!"
                }
              </p>
              {(!searchTerm && filterStatus === 'all') && (
                <button
                  onClick={() => openModal('add')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Create Your First Package
                </button>
              )}
            </div>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <EnhancedPackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Package</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Updated</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50">
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg._id} className="hover:bg-gray-50/30 transition-colors duration-200">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pkg.color || 'from-blue-500 to-purple-500'} flex items-center justify-center shadow-lg`}>
                            <FaMapMarkerAlt className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{pkg.title || 'Untitled'}</h3>
                            <p className="text-xs text-gray-500">{pkg.subtitle || 'No subtitle'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <FaClock className="w-4 h-4 text-gray-400" />
                          {pkg.duration || 'Not set'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                          <FaDollarSign className="w-4 h-4 text-green-600" />
                          {pkg.price || '0'}
                          <span className="text-xs text-gray-500">{pkg.priceNote || ''}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={pkg.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendar className="w-4 h-4 text-gray-400" />
                          {pkg.lastUpdated || 'Never'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openModal('view', pkg)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                            title="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openModal('edit', pkg)}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors duration-200"
                            title="Edit"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyPackage(pkg)}
                            className={`p-2 hover:bg-indigo-50 rounded-xl transition-colors duration-200 ${
                              copiedId === pkg._id ? 'text-green-600' : 'text-indigo-600'
                            }`}
                            title="Copy"
                          >
                            {copiedId === pkg._id ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(pkg)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                            title="Delete"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Main Modal */}
      {modalType && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm bg-black/40">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-in slide-in-from-bottom-4 duration-500 mt-12">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${
                  modalType === 'view' ? 'from-blue-500 to-cyan-500' :
                  modalType === 'edit' ? 'from-emerald-500 to-green-500' :
                  'from-purple-500 to-pink-500'
                } flex items-center justify-center shadow-lg`}>
                  {modalType === 'view' ? <FaEye className="w-6 h-6 text-white" /> :
                   modalType === 'edit' ? <FaEdit className="w-6 h-6 text-white" /> :
                   <FaPlus className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modalType === 'view' ? '👁️ View Package' : 
                     modalType === 'edit' ? '✏️ Edit Package' : 
                     '🚀 Create New Package'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {modalType === 'view' ? 'Package details and information' :
                     modalType === 'edit' ? 'Modify package information' :
                     'Design your next amazing adventure'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 group hover:scale-110"
              >
                <FaTimes className="w-6 h-6 text-gray-500 group-hover:text-gray-700 group-hover:rotate-90 transition-all duration-300" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {modalType === 'view' ? (
                <PackageViewModalContent
                  selectedPackage={selectedPackage}
                  currentImageIndex={currentImageIndex}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
              ) : (
                <div className="space-y-8">
                  {/* Enhanced Form Header */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-gray-600">Package Information</span>
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <div className="h-px flex-1 bg-gradient-to-r from-gray-300 via-gray-300 to-transparent"></div>
                    </div>
                  </div>

                  <PackageForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleArrayChange={handleArrayChange}
                    addArrayItem={addArrayItem}
                    removeArrayItem={removeArrayItem}
                    handleSave={handleSave}
                    closeModal={closeModal}
                    modalType={modalType}
                    colorOptions={colorOptions}
                    isLoading={isSubmitting}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-red-100 animate-in slide-in-from-bottom-4 duration-300">
            {/* Warning Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTrash className="w-8 h-8 text-red-600" />
            </div>
            
            {/* Content */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Delete Package</h3>
              <p className="text-gray-600">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">"{packageToDelete?.title}"</span>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-sm text-red-800">
                    <p className="font-medium">This action cannot be undone.</p>
                    <p>All package data will be permanently removed.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={cancelDelete}
                disabled={deletePackageMutation.isPending}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletePackageMutation.isPending}
                className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  deletePackageMutation.isPending
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {deletePackageMutation.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="w-4 h-4" />
                    Delete Package
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-bottom-4 {
          animation-name: slideInFromBottom;
        }
        @keyframes slideInFromBottom {
          from {
            transform: translateY(1rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Package;