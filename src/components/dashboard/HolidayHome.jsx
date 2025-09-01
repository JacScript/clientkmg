
import React, { useEffect, useState, useCallback } from 'react';
import { Edit, Save, X, Plus, Trash2, Upload, Star, MapPin, Users, DollarSign, Home, Camera, ChevronLeft, ChevronRight, Calendar, Zap, TrendingUp, Eye, Heart, Award, Shield } from 'lucide-react';
import { keepPreviousData, useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getHome, updateHome } from '../../http';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from '../LoadingComponents';
import ErrorDisplay from '../ErrorComponent';

// Floating particles background component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

// Enhanced PropertyCard with glassmorphism and micro-animations
const PropertyCard = React.memo(({ data, type, isEditing, onEdit, onSave, onCancel, onImageUpload, onAddImage, onDeleteImage, onAddAmenity, onRemoveAmenity, onAmenityChange, onInputChange, isLoading }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  
  if (!data || Object.keys(data).length === 0) {
    return (
      <div 
        className="relative bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-white/20 p-4 sm:p-0 lg:p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] sm:hover:scale-[1.02] group mx-2 sm:mx-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative text-center text-gray-500 py-6 sm:py-8 lg:py-12">
          <div className="relative bg-gradient-to-r from-blue-100 to-purple-100 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <Home className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500 transform transition-all duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl sm:rounded-2xl blur-xl transform scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          </div>
          <p className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent px-2">
            No {type === 'room' ? 'room' : 'house'} data available
          </p>
          <button 
            onClick={onEdit}
            className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 mx-auto hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 group/btn text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover/btn:opacity-30 transition-all duration-500" />
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transform transition-all duration-300 group-hover/btn:rotate-90" />
            <span className="relative z-10 font-semibold">Add {type === 'room' ? 'Room' : 'House'}</span>
          </button>
        </div>
      </div>
    );
  }

  const images = data.images || [];
  
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setImageLoaded(false);
    }
  };
  
  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setImageLoaded(false);
    }
  };
  
  return (
    <div 
      className="relative bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-white/30 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.01] sm:hover:scale-[1.02] group mx-2 sm:mx-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      <div className="relative">
        <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
          {images.length > 0 ? (
            <>
              <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((img, index) => (
                  <div key={index} className="relative min-w-full h-full group/image">
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 animate-pulse ${imageLoaded ? 'hidden' : 'block'}`} />
                    <img 
                      src={img} 
                      alt={`${data.title || 'Property'} ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
                      style={{ opacity: imageLoaded ? 1 : 0 }}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 sm:gap-4 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                        <button 
                          onClick={() => onImageUpload(type, index)}
                          className="bg-white/90 backdrop-blur-md text-gray-800 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-1 sm:gap-2 transform hover:scale-105"
                        >
                          <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Replace</span>
                        </button>
                        <button 
                          onClick={() => onDeleteImage(type, index)}
                          className="bg-red-500/90 backdrop-blur-md text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-1 sm:gap-2 transform hover:scale-105"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-x-1"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 hover:scale-110 hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </button>
                  
                  <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 lg:gap-3">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setImageLoaded(false);
                        }}
                        className={`transition-all duration-500 rounded-full ${
                          index === currentImageIndex 
                            ? 'w-6 sm:w-7 lg:w-8 h-2 sm:h-2.5 lg:h-3 bg-white shadow-xl' 
                            : 'w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 bg-white/60 hover:bg-white/80 hover:scale-125'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 bg-black/60 backdrop-blur-md text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm font-semibold">
                {currentImageIndex + 1} of {images.length}
              </div>
              
              {isEditing && (
                <button
                  onClick={() => onAddImage(type)}
                  className="absolute bottom-3 sm:bottom-4 lg:bottom-6 right-3 sm:right-4 lg:right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 group/add"
                  title="Add new image"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transform transition-all duration-300 group-hover/add:rotate-12" />
                </button>
              )}
            </>
          ) : (
            <div className="h-full bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50 flex items-center justify-center">
              {isEditing ? (
                <button
                  onClick={() => onAddImage(type)}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center gap-3 sm:gap-4 transform hover:scale-105 group/btn"
                >
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transform transition-all duration-300 group-hover/btn:rotate-12" />
                  <span className="font-semibold text-base sm:text-lg">Add Images</span>
                </button>
              ) : (
                <div className="text-center p-4 sm:p-6 lg:p-8">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                    <Camera className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-600 font-semibold text-base sm:text-lg">No images yet</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">Add some stunning photos to showcase this property</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          {data.rating && (
            <div className="bg-white/90 backdrop-blur-md px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg flex items-center gap-1 sm:gap-2 border border-yellow-200">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-500 fill-current animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-gray-800">{data.rating}</span>
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl lg:rounded-2xl text-xs sm:text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-105">
            {type === 'room' ? 'Private Room' : 'Entire House'}
          </div>
        </div>
      </div>
      
      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex-1 w-full">
            {isEditing ? (
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => onInputChange(type, 'title', e.target.value)}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 w-full focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-inner"
                  placeholder="Property title"
                />
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) => onInputChange(type, 'subtitle', e.target.value)}
                  className="text-sm sm:text-base lg:text-lg text-gray-600 bg-gradient-to-r from-gray-50 to-purple-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 w-full focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 shadow-inner"
                  placeholder="Short description"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight">
                  {data.title || 'Untitled Property'}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-3 sm:mb-4 leading-relaxed">{data.subtitle || 'No subtitle provided'}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 sm:gap-3 self-end sm:self-start">
            {isEditing ? (
              <>
                <button
                  onClick={onSave}
                  disabled={isLoading}
                  className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group/save transform hover:scale-105"
                  title="Save changes"
                >
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transform transition-all duration-300 group-hover/save:scale-110" />
                  {isLoading && <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 animate-pulse" />}
                </button>
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group/cancel transform hover:scale-105"
                  title="Cancel editing"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transform transition-all duration-300 group-hover/cancel:rotate-90" />
                </button>
              </>
            ) : (
              <button
                onClick={onEdit}
                className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 sm:p-3.5 lg:p-4 rounded-xl sm:rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center group/edit transform hover:scale-105"
                title="Edit property"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover/edit:opacity-30 transition-all duration-500" />
                <Edit className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 relative z-10 transform transition-all duration-300 group-hover/edit:rotate-12" />
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-50 to-blue-100/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-200/50 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-lg">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={data.location || ''}
                onChange={(e) => onInputChange(type, 'location', e.target.value)}
                className="text-xs sm:text-sm bg-transparent border-none focus:outline-none flex-1 placeholder-blue-400 font-medium"
                placeholder="Add location"
              />
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-gray-800">{data.location || 'Location not specified'}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-green-50 to-emerald-100/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-200/50 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl shadow-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            {isEditing ? (
              <input
                type="number"
                value={data.guests || ''}
                onChange={(e) => onInputChange(type, 'guests', parseInt(e.target.value) || 0)}
                className="text-xs sm:text-sm bg-transparent border-none focus:outline-none w-16 sm:w-20 placeholder-green-400 font-medium"
                min="0"
                placeholder="0"
              />
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-gray-800">Up to {data.guests || 0} guests</span>
            )}
          </div>
        </div>
        
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-3 sm:mb-4 lg:mb-5 flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-0.5 sm:w-1 h-4 sm:h-5 lg:h-6 rounded-full" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Premium Features
            </span>
            {isEditing && (
              <button
                onClick={() => onAddAmenity(type)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                title="Add amenity"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            )}
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {(data.features || []).map((amenity, index) => (
              <div key={index} className="flex items-center">
                {isEditing ? (
                  <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => onAmenityChange(type, index, e.target.value)}
                      className="bg-transparent border-none focus:outline-none text-xs sm:text-sm font-medium w-24 sm:w-32 lg:w-36"
                      placeholder="Amenity name"
                    />
                    <button
                      onClick={() => onRemoveAmenity(type, index)}
                      className="text-red-500 hover:text-red-700 transition-all duration-200 transform hover:scale-110"
                      title="Remove amenity"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs sm:text-sm bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border-2 border-blue-100 font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
                    {amenity}
                  </span>
                )}
              </div>
            ))}
            {(data.features || []).length === 0 && !isEditing && (
              <p className="text-gray-500 text-xs sm:text-sm italic bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-200">No amenities listed yet</p>
            )}
          </div>
        </div>
        
        <div className="mb-4 sm:mb-6 lg:mb-8">
          {isEditing ? (
            <div className="relative">
              <textarea
                value={data.description || ''}
                onChange={(e) => onInputChange(type, 'description', e.target.value)}
                className="w-full bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 shadow-inner resize-none"
                rows="4"
                placeholder="Paint a picture with words... Describe what makes this property special and unforgettable for your guests."
              />
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 right-2 sm:right-3 lg:right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
                {(data.description || '').length} characters
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-inner">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                {data.description || 'No description available - add one to attract more guests!'}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-gradient-to-r border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 sm:gap-3 shadow-lg transition-all duration-300 ${
              data.available 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200' 
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-200'
            }`}>
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full shadow-sm ${data.available ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              {data.available ? 'Available Now' : 'Currently Booked'}
            </div>
            {isEditing && (
              <button
                onClick={() => onInputChange(type, 'available', !data.available)}
                className="text-blue-600 hover:text-blue-800 transition-all duration-200 text-xs sm:text-sm font-bold bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:bg-blue-100 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                Toggle Status
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {isEditing ? (
              <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-purple-200 w-full sm:w-auto">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="text-purple-700 font-semibold text-xs sm:text-sm">Tsh</span>
                <input
                  type="number"
                  value={data.price || ''}
                  onChange={(e) => onInputChange(type, 'price', parseInt(e.target.value) || 0)}
                  className="text-base sm:text-lg lg:text-xl font-bold bg-transparent border-none focus:outline-none w-20 sm:w-24 lg:w-28 text-purple-800"
                  min="0"
                  placeholder="0"
                />
                <span className="text-purple-600 text-xs sm:text-sm font-semibold">/ night</span>
              </div>
            ) : (
              <div className="text-right bg-gradient-to-r from-purple-50 to-pink-50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-lg w-full sm:w-auto">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Tsh {data.price?.toLocaleString() || 0}
                </div>
                <div className="text-xs sm:text-sm text-purple-600 font-semibold">per night</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const HolidayHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingRoom, setEditingRoom] = useState(false);
  const [editingHouse, setEditingHouse] = useState(false);
  // State to hold the data for editing, initialized from fetched data
  const [roomData, setRoomData] = useState({});
  const [houseData, setHouseData] = useState({});
  // State to store the original fetched data for 'cancel' operations
  const [originalRoomData, setOriginalRoomData] = useState({});
  const [originalHouseData, setOriginalHouseData] = useState({});
  
  const queryClient = useQueryClient();
  
  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  
  // Fetch houseData
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return await getHome();
    },
    placeholderData: keepPreviousData,
  });
  
  // Mutation for updating home/room data
  const homeMutation = useMutation({
    mutationFn: async ({ id, data }) => updateHome(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
      enqueueSnackbar('Property updated successfully!', {
        variant: 'success',
        autoHideDuration: 3000,
      });
      // After successful update, also update the original data state
      if (result.data?.data) {
        if (result.data.data._id === roomData._id) {
          setOriginalRoomData(result.data.data);
        } else if (result.data.data._id === houseData._id) {
          setOriginalHouseData(result.data.data);
        }
      }
    },
    onError: (error) => {
      enqueueSnackbar('Error updating property: ' + error.message, {
        variant: 'error',
        autoHideDuration: 4000,
      });
    },
  });
  
  // Update roomData and houseData with fetched data and set original data for rollback
  useEffect(() => {
    if (resData?.data?.data && resData.data.data.length > 0) {
      const fetchedRoom = resData.data.data.find(item => item.type === 'room') || {};
      const fetchedHouse = resData.data.data.find(item => item.type === 'house') || {};
      setRoomData(fetchedRoom);
      setOriginalRoomData(fetchedRoom);
      
      setHouseData(fetchedHouse);
      setOriginalHouseData(fetchedHouse);
    }
  }, [resData]);
  
  // Handler for replacing an existing image
  const handleImageUpload = useCallback(async (type, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      // Show loading state
      enqueueSnackbar('Uploading image...', { variant: 'info', autoHideDuration: 2000 });
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        const newImageUrl = data.secure_url;
        if (!newImageUrl) throw new Error('Upload failed');
        
        if (type === 'room') {
          setRoomData(prev => {
            const newImages = [...(prev.images || [])];
            newImages[index] = newImageUrl;
            return { ...prev, images: newImages };
          });
        } else {
          setHouseData(prev => {
            const newImages = [...(prev.images || [])];
            newImages[index] = newImageUrl;
            return { ...prev, images: newImages };
          });
        }
        
        enqueueSnackbar('Image replaced successfully!', { variant: 'success', autoHideDuration: 3000 });
      } catch (error) {
        enqueueSnackbar('Failed to upload image: ' + error.message, { variant: 'error', autoHideDuration: 4000 });
      }
    };
    input.click();
  }, [CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME]);
  
  // Handler for adding a new image
  const handleAddImage = useCallback(async (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true; // Allow multiple file selection
    input.onchange = async (event) => {
      const files = Array.from(event.target.files);
      if (files.length === 0) return;
      
      enqueueSnackbar(`Uploading ${files.length} image(s)...`, { variant: 'info', autoHideDuration: 2000 });
      
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          return data.secure_url;
        } catch (error) {
          console.error('Failed to upload image:', error);
          return null;
        }
      });
      
      try {
        const uploadedUrls = await Promise.all(uploadPromises);
        const validUrls = uploadedUrls.filter(url => url !== null);
        
        if (validUrls.length === 0) {
          throw new Error('No images were uploaded successfully');
        }
        
        if (type === 'room') {
          setRoomData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...validUrls]
          }));
        } else {
          setHouseData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...validUrls]
          }));
        }
        
        enqueueSnackbar(`${validUrls.length} image(s) added successfully!`, { variant: 'success', autoHideDuration: 3000 });
      } catch (error) {
        enqueueSnackbar('Failed to add images: ' + error.message, { variant: 'error', autoHideDuration: 4000 });
      }
    };
    input.click();
  }, [CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME]);
  
  // Handler for deleting an image
  const handleDeleteImage = useCallback((type, index) => {
    if (type === 'room') {
      setRoomData(prev => ({
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== index)
      }));
    } else {
      setHouseData(prev => ({
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== index)
      }));
    }
    enqueueSnackbar('Image removed', { variant: 'info', autoHideDuration: 2000 });
  }, []);
  
  const addAmenity = useCallback((type) => {
    const newAmenity = 'New Amenity';
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, features: [...(prev.features || []), newAmenity] }));
    } else {
      setHouseData(prev => ({ ...prev, features: [...(prev.features || []), newAmenity] }));
    }
  }, []);
  
  const removeAmenity = useCallback((type, index) => {
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    } else {
      setHouseData(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    }
  }, []);
  
  const handleAmenityItemChange = useCallback((type, amenityIndex, value) => {
    if (type === 'room') {
      setRoomData(prev => {
        const newAmenities = [...(prev.features || [])];
        newAmenities[amenityIndex] = value;
        return { ...prev, features: newAmenities };
      });
    } else {
      setHouseData(prev => {
        const newAmenities = [...(prev.features || [])];
        newAmenities[amenityIndex] = value;
        return { ...prev, features: newAmenities };
      });
    }
  }, []);
  
  const handlePropertyInputChange = useCallback((type, field, value) => {
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, [field]: value }));
    } else {
      setHouseData(prev => ({ ...prev, [field]: value }));
    }
  }, []);
  
  // Handler for saving room data
  const handleSaveRoom = useCallback(() => {
    if (roomData._id) {
      homeMutation.mutate({ id: roomData._id, data: roomData });
      setEditingRoom(false);
    } else {
      enqueueSnackbar('Room ID not found, cannot save.', { variant: 'error', autoHideDuration: 3000 });
    }
  }, [roomData, homeMutation]);
  
  // Handler for canceling room edit
  const handleCancelRoom = useCallback(() => {
    setRoomData(originalRoomData);
    setEditingRoom(false);
    enqueueSnackbar('Changes discarded', { variant: 'info', autoHideDuration: 2000 });
  }, [originalRoomData]);
  
  // Handler for saving house data
  const handleSaveHouse = useCallback(() => {
    if (houseData._id) {
      homeMutation.mutate({ id: houseData._id, data: houseData });
      setEditingHouse(false);
    } else {
      enqueueSnackbar('House ID not found, cannot save.', { variant: 'error', autoHideDuration: 3000 });
    }
  }, [houseData, homeMutation]);
  
  // Handler for canceling house edit
  const handleCancelHouse = useCallback(() => {
    setHouseData(originalHouseData);
    setEditingHouse(false);
    enqueueSnackbar('Changes discarded', { variant: 'info', autoHideDuration: 2000 });
  }, [originalHouseData]);
  
  // Calculate total revenue and metrics
  const totalProperties = (roomData._id ? 1 : 0) + (houseData._id ? 1 : 0);
  const availableProperties = (roomData.available ? 1 : 0) + (houseData.available ? 1 : 0);
  const totalGuests = (roomData.guests || 0) + (houseData.guests || 0);
  const totalRevenue = (roomData.price || 0) + (houseData.price || 0);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (isError) {
    return <ErrorDisplay />;
  }
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Enhanced Header with glassmorphism */}
      <div className="bg-white backdrop-blur-xl border-b border-white/30 shadow-xl sticky top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 w-[80%] mx-auto" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="relative flex flex-col sm:flex-row overflow-x-auto">
            {[
              { id: 'overview', label: 'Portfolio Overview', icon: Home },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 py-4 px-4 border-b-3 font-bold text-sm transition-all duration-500 group relative ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${activeTab === id ? 'transform rotate-12 scale-110' : 'group-hover:scale-110'}`} />
                <span className="relative whitespace-nowrap">
                  {label}
                  {activeTab === id && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main scrollable content */}
      <div className="h-[calc(100vh-88px)] overflow-y-auto scrollbar-hide">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8 sm:space-y-10">
              {/* Hero Stats Section */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
                <div className="relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                      <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                        Property Portfolio
                      </h2>
                      <p className="text-gray-600 font-medium">Manage your vacation rental empire</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <Home className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            {totalProperties}
                          </p>
                          <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full ml-auto" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Properties</h3>
                      <p className="text-gray-600 text-sm">Total listings</p>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                            {availableProperties}
                          </p>
                          <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full ml-auto" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Available</h3>
                      <p className="text-gray-600 text-sm">Ready to book</p>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">
                            {totalGuests}
                          </p>
                          <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full ml-auto" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Capacity</h3>
                      <p className="text-gray-600 text-sm">Total guests</p>
                    </div>
                    
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-white/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
                            {totalRevenue.toLocaleString()}
                          </p>
                          <div className="w-8 h-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-full ml-auto" />
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">Revenue</h3>
                      <p className="text-gray-600 text-sm">Per night (Tsh)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Properties Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
                <PropertyCard
                  data={roomData}
                  type="room"
                  isEditing={editingRoom}
                  onEdit={() => setEditingRoom(true)}
                  onSave={handleSaveRoom}
                  onCancel={handleCancelRoom}
                  onImageUpload={handleImageUpload}
                  onAddImage={handleAddImage}
                  onDeleteImage={handleDeleteImage}
                  onAddAmenity={addAmenity}
                  onRemoveAmenity={removeAmenity}
                  onAmenityChange={handleAmenityItemChange}
                  onInputChange={handlePropertyInputChange}
                  isLoading={homeMutation.isPending}
                />
                
                <PropertyCard
                  data={houseData}
                  type="house"
                  isEditing={editingHouse}
                  onEdit={() => setEditingHouse(true)}
                  onSave={handleSaveHouse}
                  onCancel={handleCancelHouse}
                  onImageUpload={handleImageUpload}
                  onAddImage={handleAddImage}
                  onDeleteImage={handleDeleteImage}
                  onAddAmenity={addAmenity}
                  onRemoveAmenity={removeAmenity}
                  onAmenityChange={handleAmenityItemChange}
                  onInputChange={handlePropertyInputChange}
                  isLoading={homeMutation.isPending}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8">
              <div className="text-center py-16 sm:py-20">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
                <p className="text-gray-600 max-w-md mx-auto">Coming soon - Track your performance, revenue, and guest satisfaction</p>
              </div>
            </div>
          )}
          
          {activeTab === 'bookings' && (
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8">
              <div className="text-center py-16 sm:py-20">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Booking Management</h3>
                <p className="text-gray-600 max-w-md mx-auto">Coming soon - Manage reservations, check-ins, and guest communications</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom CSS for enhanced effects */}
      <style jsx>{`
        .border-b-3 {
          border-bottom-width: 3px;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default HolidayHome;