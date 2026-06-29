import React, { useState, useEffect } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Save, 
  Edit3, 
  Image, 
  Phone, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Building,
  Target,
  Eye,
  Users,
  X,
  Upload,
  Loader
} from 'lucide-react';
import { getAboutData, updateAboutData } from '../../../http';
import LoadingSpinner from '../../LoadingComponents';
import ErrorDisplay from '../../ErrorComponent';

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// =============================================================================
// COMPONENT: Image Uploader
// =============================================================================
const ImageUploader = ({ currentImage, onImageChange, isEditing, compact = false }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => setWidgetLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const openWidget = () => {
    if (!widgetLoaded || !window.cloudinary) {
      alert("Cloudinary widget is still loading. Please wait.");
      return;
    }

    setIsUploading(true);
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        maxFileSize: 5000000, // 5MB
        cropping: true,
        croppingAspectRatio: 1,
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#3B82F6",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#3B82F6",
            action: "#10B981",
            inactiveTabIcon: "#0E2F5A",
            error: "#EF4444",
            inProgress: "#3B82F6",
            complete: "#10B981",
            sourceBg: "#F8FAFC"
          }
        }
      },
      (error, result) => {
        setIsUploading(false);
        if (!error && result && result.event === "success") {
          onImageChange(result.info.secure_url);
        }
        if (error) {
          console.error('Cloudinary upload error:', error);
        }
      }
    );
    widget.open();
  };

  const handleRemoveImage = () => {
    onImageChange('');
  };

  return (
    <>
      <div className={compact ? "mb-3" : "mb-6"}>
        {!compact && (
          <label className=" text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Image className="h-4 w-4 mr-2 text-gray-500" />
            Company Image
          </label>
        )}
        
        <div className={
          compact
            ? "flex flex-row items-center gap-4"
            : "flex flex-col sm:flex-row items-start sm:space-x-6 space-y-4 sm:space-y-0"
        }>
          {/* Image Preview */}
          <div className="relative flex-shrink-0">
            {currentImage ? (
              <div className="relative group">
                <img 
                  src={currentImage} 
                  alt="Preview" 
                  className={`${compact ? 'w-16 h-16' : 'w-24 h-24 sm:w-32 sm:h-32'} rounded-xl object-cover border-2 border-gray-200 cursor-pointer transition-all group-hover:shadow-lg group-hover:scale-105`}
                  onClick={() => setShowViewer(true)}
                />
                {!compact && (
                  <>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-xl flex items-center justify-center transition-all">
                      <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-100 rounded-full p-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className={`${compact ? 'w-16 h-16' : 'w-24 h-24 sm:w-32 sm:h-32'} rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center`}>
                <Image className={compact ? "h-6 w-6 text-gray-400" : "h-10 w-10 text-gray-400"} />
              </div>
            )}
          </div>
          
          {/* Upload Controls */}
          <div className="flex-1 space-y-3 w-full">
            {isEditing ? (
              <div className={compact ? "flex flex-wrap gap-2" : "flex flex-col sm:flex-row gap-3"}>
                <button
                  type="button"
                  onClick={openWidget}
                  disabled={isUploading}
                  className={`inline-flex items-center justify-center ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border border-transparent shadow-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all`}
                >
                  {isUploading ? (
                    <>
                      <Loader className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-1.5 animate-spin`} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-1.5`} />
                      {currentImage ? 'Change' : 'Upload'}
                    </>
                  )}
                </button>
                
                {currentImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className={`inline-flex items-center justify-center ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border border-gray-300 shadow-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all`}
                  >
                    <Trash2 className={`${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} mr-1.5`} />
                    Remove
                  </button>
                )}
              </div>
            ) : (
              !compact && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    {currentImage ? (
                      <span className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Click image to preview • Image uploaded successfully
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        No image uploaded
                      </span>
                    )}
                  </p>
                </div>
              )
            )}
            
            {!compact && (
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Upload Guidelines:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• Recommended: Square aspect ratio (1:1)</li>
                      <li>• Max file size: 5MB</li>
                      <li>• Formats: JPG, PNG, GIF, WebP</li>
                      <li>• Will be cropped to square automatically</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Viewer Modal */}
      {showViewer && currentImage && (
        <ImageViewerModal 
          imageUrl={currentImage} 
          onClose={() => setShowViewer(false)} 
        />
      )}
    </>
  );
};

// =============================================================================
// COMPONENT: Image Viewer Modal
// =============================================================================
const ImageViewerModal = ({ imageUrl, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="relative max-w-4xl max-h-full w-full">
      <button
        onClick={onClose}
        className="absolute -top-12 right-0 sm:-top-12 sm:right-0 bg-white rounded-full p-2 hover:bg-gray-200 transition-colors shadow-lg z-10"
      >
        <X className="h-6 w-6" />
      </button>
      <img 
        src={imageUrl} 
        alt="Company Preview" 
        className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl"
      />
    </div>
  </div>
);

// =============================================================================
// COMPONENT: Notification
// =============================================================================
const Notification = ({ type, message, onClose }) => (
  <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-xl border-l-4 max-w-md ${
    type === 'success' 
      ? 'bg-green-50 text-green-800 border-green-400' 
      : 'bg-red-50 text-red-800 border-red-400'
  } animate-slide-in`}>
    <div className="flex items-start justify-between">
      <div className="flex items-start">
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-3 text-green-600 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 mr-3 text-red-600 mt-0.5" />
        )}
        <div>
          <p className="font-medium">
            {type === 'success' ? 'Success!' : 'Error!'}
          </p>
          <p className="text-sm mt-1">{message}</p>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className={`ml-4 rounded-full p-1 hover:bg-opacity-20 transition-colors ${
          type === 'success' ? 'hover:bg-green-200' : 'hover:bg-red-200'
        }`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
);

// =============================================================================
// COMPONENT: Section Header
// =============================================================================
const SectionHeader = ({ icon, title, color, editingSection, sectionName, setEditingSection }) => (
  <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center">
        <div className={`p-2.5 rounded-lg ${color.replace('text-', 'bg-')}-100 mr-4 flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {editingSection === sectionName ? 'Currently editing' : 'Click edit to modify'}
          </p>
        </div>
      </div>
      <button
        onClick={() => setEditingSection(editingSection === sectionName ? null : sectionName)}
        className={`inline-flex items-center justify-center px-4 py-2 text-sm rounded-lg font-medium transition-all w-full sm:w-auto ${
          editingSection === sectionName 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            : `${color} hover:bg-opacity-10 hover:${color.replace('text-', 'bg-')}`
        }`}
      >
        {editingSection === sectionName ? (
          <>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </>
        ) : (
          <>
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Section
          </>
        )}
      </button>
    </div>
  </div>
);

// =============================================================================
// COMPONENT: Editable Field
// =============================================================================
const EditableField = ({ 
  label, 
  value, 
  onChange, 
  isEditing, 
  type = "text", 
  icon,
  rows = 3,
  placeholder = "",
  description
}) => (
  <div className="mb-6">
    <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
      {icon && <span className="mr-2 text-gray-500">{icon}</span>}
      {label}
    </label>
    {description && (
      <p className="text-xs text-gray-500 mb-3">{description}</p>
    )}
    {isEditing ? (
      type === "textarea" ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      )
    ) : (
      <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[2.75rem] flex items-center">
        {value ? (
          <span className="text-gray-900">{value}</span>
        ) : (
          <span className="text-gray-400 italic">Not specified</span>
        )}
      </div>
    )}
  </div>
);

// =============================================================================
// COMPONENT: Service Item
// =============================================================================
const ServiceItem = ({ 
  service, 
  index, 
  isEditing, 
  onTitleChange, 
  onDescriptionChange, 
  onImageChange,
  onRemove 
}) => (
  <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all bg-white">
    <ImageUploader
      currentImage={service.image}
      onImageChange={(value) => onImageChange(value, index)}
      isEditing={isEditing}
      compact
    />
    <div className="flex justify-between items-start mb-3">
      {isEditing ? (
        <input
          type="text"
          value={service.title}
          onChange={(e) => onTitleChange(e.target.value, index)}
          className="font-semibold text-gray-900 border-none p-0 focus:outline-none focus:ring-0 bg-transparent w-full text-lg"
          placeholder="Service title"
        />
      ) : (
        <h4 className="font-semibold text-gray-900 text-lg">{service.title}</h4>
      )}
      {isEditing && (
        <button
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all ml-2 flex-shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}
    </div>
    {isEditing ? (
      <textarea
        value={service.description}
        onChange={(e) => onDescriptionChange(e.target.value, index)}
        rows={4}
        className="w-full text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Service description"
      />
    ) : (
      <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
    )}
  </div>
);

// =============================================================================
// COMPONENT: Add Service Modal
// =============================================================================
const AddServiceModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAdd({ title: title.trim(), description: description.trim(), image });

    setTitle('');
    setDescription('');
    setImage('');
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Service</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <ImageUploader currentImage={image} onImageChange={setImage} isEditing={true} />

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Service Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. KM Logistics"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Brief description of this service or division"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =============================================================================
// COMPONENT: Value Item
// =============================================================================
const ValueItem = ({ 
  value, 
  index, 
  isEditing, 
  onTitleChange, 
  onDescriptionChange 
}) => (
  <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all bg-white">
    <div className="mb-4">
      {isEditing ? (
        <input
          type="text"
          value={value.title}
          onChange={(e) => onTitleChange(e.target.value, index)}
          className="font-semibold text-xl text-gray-900 border-none p-0 focus:outline-none focus:ring-0 bg-transparent w-full"
          placeholder="Value title"
        />
      ) : (
        <h3 className="font-semibold text-xl text-gray-900">{value.title}</h3>
      )}
    </div>
    {isEditing ? (
      <textarea
        value={value.description}
        onChange={(e) => onDescriptionChange(e.target.value, index)}
        rows={4}
        className="w-full text-gray-600 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Value description"
      />
    ) : (
      <p className="text-gray-600 leading-relaxed">{value.description}</p>
    )}
  </div>
);

// =============================================================================
// MAIN COMPONENT: About Page Admin
// =============================================================================
const SECTION_TABS = [
  { key: 'mainContent', label: 'Main Content' },
  { key: 'whoweareSection', label: 'Who We Are' },
  { key: 'valueSection', label: 'Mission & Vision' },
];

const AboutPageAdmin = ({ activeSection }) => {
  const [editingSection, setEditingSection] = useState(null);
  const [visibleSection, setVisibleSection] = useState('mainContent');
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState(null);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['about'],
    queryFn: async () => await getAboutData(),
    placeholderData: keepPreviousData,
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateAboutData(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['about']);
      setNotification({ type: 'success', message: 'All changes have been saved successfully!' });
      setEditingSection(null);
    },
    onError: (error) => {
      setNotification({ 
        type: 'error', 
        message: 'Failed to save changes. Please check your connection and try again.' 
      });
      console.error('Update error:', error);
    },
  });

  const aboutPageData = resData?.data?.data;

  useEffect(() => {
    if (aboutPageData) {
      setFormData(aboutPageData);
    }
  }, [aboutPageData]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Sidebar section keys (mainContent, whoweareSection, valueSection)
  // already match this component's own section names exactly, so no
  // translation map is needed — unlike HomePageAdmin's heroSection -> 'hero'.
  // Switches which single section is rendered, and opens it for editing.
  useEffect(() => {
    if (SECTION_TABS.some((tab) => tab.key === activeSection)) {
      setVisibleSection(activeSection);
      setEditingSection(activeSection);
    }
  }, [activeSection]);

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (section === 'mainContent') {
        newData.mainContent = { ...newData.mainContent, [field]: value };
      } else if (section === 'whoweareSection') {
        if (field === 'service' && index !== null) {
          newData.whoweareSection.service[index] = { ...newData.whoweareSection.service[index], ...value };
        } else {
          newData.whoweareSection = { ...newData.whoweareSection, [field]: value };
        }
      } else if (section === 'valueSection' && index !== null) {
        newData.valueSection[index] = { ...newData.valueSection[index], [field]: value };
      }
      
      return newData;
    });
  };

  // Opens the Add Service modal instead of pushing a blank card straight
  // into the grid — the modal collects title/description/image up front.
  const handleAddService = (newService) => {
    setFormData(prev => ({
      ...prev,
      whoweareSection: {
        ...prev.whoweareSection,
        service: [
          ...prev.whoweareSection.service,
          { ...newService, _id: `new_${Date.now()}` }
        ]
      }
    }));
    setIsAddServiceModalOpen(false);
  };

  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      whoweareSection: {
        ...prev.whoweareSection,
        service: prev.whoweareSection.service.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = () => {
    if (!aboutPageData?._id) {
      setNotification({ type: 'error', message: 'Unable to save: Missing data ID' });
      return;
    }
    updateMutation.mutate({ id: aboutPageData._id, data: formData });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">About Page Management</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Manage your company's about page content and settings</p>
            </div>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all w-full sm:w-auto whitespace-nowrap"
            >
              <Save className="h-5 w-5 mr-2" />
              {updateMutation.isPending ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <Notification 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAdd={handleAddService}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Section Tabs */}
        <div className="flex gap-1 mb-6 sm:mb-8 border-b border-gray-200 overflow-x-auto">
          {SECTION_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setVisibleSection(tab.key);
                setEditingSection(tab.key);
              }}
              className={`whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm transition-colors ${
                visibleSection === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-6 sm:space-y-8">
          
          {/* Main Content Section */}
          {visibleSection === 'mainContent' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <SectionHeader 
              icon={<Building className="h-5 w-5 text-blue-600" />}
              title="Main Content"
              color="text-blue-600"
              editingSection={editingSection}
              sectionName="mainContent"
              setEditingSection={setEditingSection}
            />
            <div className="p-4 sm:p-6">
              <ImageUploader
                currentImage={formData.mainContent?.image}
                onImageChange={(value) => handleInputChange('mainContent', 'image', value)}
                isEditing={editingSection === 'mainContent'}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EditableField
                  label="Company Title"
                  value={formData.mainContent?.title}
                  onChange={(value) => handleInputChange('mainContent', 'title', value)}
                  isEditing={editingSection === 'mainContent'}
                  placeholder="Enter company title"
                  description="The main heading that will appear on your about page"
                />
                
                <EditableField
                  label="Phone Number"
                  value={formData.mainContent?.phoneNumber}
                  onChange={(value) => handleInputChange('mainContent', 'phoneNumber', value)}
                  isEditing={editingSection === 'mainContent'}
                  type="tel"
                  icon={<Phone className="h-4 w-4" />}
                  placeholder="Enter phone number"
                  description="Contact phone number for customer inquiries"
                />
              </div>
              
              <EditableField
                label="Main Description"
                value={formData.mainContent?.description}
                onChange={(value) => handleInputChange('mainContent', 'description', value)}
                isEditing={editingSection === 'mainContent'}
                type="textarea"
                rows={4}
                placeholder="Enter main description"
                description="Primary description of your company and services"
              />
              
              <EditableField
                label="Sub Description"
                value={formData.mainContent?.subdescription}
                onChange={(value) => handleInputChange('mainContent', 'subdescription', value)}
                isEditing={editingSection === 'mainContent'}
                type="textarea"
                rows={3}
                placeholder="Enter sub description"
                description="Additional details or secondary description"
              />
            </div>
          </div>
          )}

          {/* Who We Are Section */}
          {visibleSection === 'whoweareSection' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <SectionHeader 
              icon={<Users className="h-5 w-5 text-green-600" />}
              title="Who We Are"
              color="text-green-600"
              editingSection={editingSection}
              sectionName="whoweareSection"
              setEditingSection={setEditingSection}
            />
            <div className="p-4 sm:p-6">
              <EditableField
                label="Section Title"
                value={formData.whoweareSection?.title}
                onChange={(value) => handleInputChange('whoweareSection', 'title', value)}
                isEditing={editingSection === 'whoweareSection'}
                placeholder="Enter section title"
                description="Heading for the services/divisions section"
              />
              
              {/* Services */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Services & Divisions</label>
                    <p className="text-xs text-gray-500 mt-1">Manage your company's key services or business divisions</p>
                  </div>
                  {editingSection === 'whoweareSection' && (
                    <button
                      onClick={() => setIsAddServiceModalOpen(true)}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 border border-green-200 transition-all w-full sm:w-auto"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.whoweareSection?.service?.map((service, index) => (
                    <ServiceItem
                      key={service._id}
                      service={service}
                      index={index}
                      isEditing={editingSection === 'whoweareSection'}
                      onTitleChange={(value, index) => handleInputChange('whoweareSection', 'service', { title: value }, index)}
                      onDescriptionChange={(value, index) => handleInputChange('whoweareSection', 'service', { description: value }, index)}
                      onImageChange={(value, index) => handleInputChange('whoweareSection', 'service', { image: value }, index)}
                      onRemove={removeService}
                    />
                  ))}
                </div>
                {formData.whoweareSection?.service?.length === 0 && editingSection === 'whoweareSection' && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No services added yet</p>
                    <button
                      onClick={() => setIsAddServiceModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Service
                    </button>
                  </div>
                )}
              </div>
              
              <EditableField
                label="Bottom Text"
                value={formData.whoweareSection?.bottomtext}
                onChange={(value) => handleInputChange('whoweareSection', 'bottomtext', value)}
                isEditing={editingSection === 'whoweareSection'}
                type="textarea"
                rows={3}
                placeholder="Enter bottom text"
                description="Concluding text for the services section"
              />
            </div>
          </div>
          )}

          {/* Values Section */}
          {visibleSection === 'valueSection' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <SectionHeader 
              icon={<Target className="h-5 w-5 text-purple-600" />}
              title="Mission & Vision"
              color="text-purple-600"
              editingSection={editingSection}
              sectionName="valueSection"
              setEditingSection={setEditingSection}
            />
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600">Define your company's core mission and vision statements</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {formData.valueSection?.map((value, index) => (
                  <ValueItem
                    key={value._id}
                    value={value}
                    index={index}
                    isEditing={editingSection === 'valueSection'}
                    onTitleChange={(value, index) => handleInputChange('valueSection', 'title', value, index)}
                    onDescriptionChange={(value, index) => handleInputChange('valueSection', 'description', value, index)}
                  />
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Footer Info */}
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Last Updated</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {aboutPageData?.updatedAt ? 
                    new Date(aboutPageData.updatedAt).toLocaleString() : 
                    'Never'
                  }
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-medium text-gray-900">Status</h3>
                <p className="text-sm text-green-600 mt-1 flex items-center justify-end sm:justify-start">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  All changes saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPageAdmin;