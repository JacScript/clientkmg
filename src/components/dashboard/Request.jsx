import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Activity,
  Mail,
  Filter,
  X,
  Users,
  TrendingUp,
  Clock,
  Globe,
  Sparkles,
  AlertCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaPlus, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineFilter } from "react-icons/hi";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequests } from "../../http";
import ErrorDisplay from "../ErrorComponent";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActivity, setFilterActivity] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const queryClient = useQueryClient();

  // Handle scroll effect for sticky elements
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // React Query for fetching requests
  const { data: resData, isError, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      return await getRequests();
    },
    placeholderData: keepPreviousData,
  });

  // Update requests state with fetched data
  useEffect(() => {
    if (resData?.data?.data) {
      setRequests(resData.data.data);
    }
  }, [resData]);

  // Get unique activities for filter
  const uniqueActivities = requests.length > 0 
    ? [...new Set(requests.map((req) => req.activity).filter(Boolean))]
    : [];

  // Filter requests based on search and filter criteria
  const filteredRequests = requests.filter((request) => {
    const destination = request.destination || "";
    const activity = request.activity || "";
    const email = request.email || "";
    
    const matchesSearch =
      destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActivity === "" || activity === filterActivity;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (date) => {
    if (!date) return "N/A";
    
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    
    try {
      return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  // Get activity statistics
  const activityStats = uniqueActivities.map(activity => ({
    name: activity,
    count: requests.filter(r => r.activity === activity).length,
    percentage: ((requests.filter(r => r.activity === activity).length / requests.length) * 100).toFixed(1)
  })).sort((a, b) => b.count - a.count);

  // Get recent requests (last 7 days)
  const recentRequests = requests.filter(request => {
    const requestDate = new Date(request.createdAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return requestDate >= sevenDaysAgo;
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-blue-600 mx-auto"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading requests...</p>
          <p className="text-gray-400 text-sm mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
     <ErrorDisplay error={error} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-12">
      {/* Sticky Header with Glass Effect */}
      <div className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 backdrop-blur-xl border-b border-gray-100' 
          : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Globe className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Request Management
                </h1>
                <p className="text-gray-600 text-sm mt-0.5">
                  Track and manage all travel requests
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                <Users className="text-blue-600" size={18} />
                <span className="text-sm font-semibold text-blue-900">{requests.length} Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search and Filter Bar with Glass Effect */}
      <div className={`sticky top-[88px] z-10 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by destination, activity, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="relative group">
              <HiOutlineFilter
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500"
                size={18}
              />
              <select
                value={filterActivity}
                onChange={(e) => setFilterActivity(e.target.value)}
                className="pl-12 pr-10 py-3 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-300 cursor-pointer appearance-none font-medium"
              >
                <option value="">All Activities</option>
                {uniqueActivities.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <Activity className="text-blue-700" size={20} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{filteredRequests.length}</span>
            </div>
            <p className="text-gray-600 font-medium">Active Requests</p>
            <p className="text-xs text-gray-400 mt-1">Currently showing</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                <Clock className="text-green-700" size={20} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{recentRequests.length}</span>
            </div>
            <p className="text-gray-600 font-medium">Recent Requests</p>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
                <TrendingUp className="text-purple-700" size={20} />
              </div>
              <span className="text-3xl font-bold text-gray-900">{uniqueActivities.length}</span>
            </div>
            <p className="text-gray-600 font-medium">Activity Types</p>
            <p className="text-xs text-gray-400 mt-1">Unique activities</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                <MapPin className="text-orange-700" size={20} />
              </div>
              <span className="text-3xl font-bold text-gray-900">
                {[...new Set(requests.map(r => r.destination).filter(Boolean))].length}
              </span>
            </div>
            <p className="text-gray-600 font-medium">Destinations</p>
            <p className="text-xs text-gray-400 mt-1">Unique locations</p>
          </div>
        </div>

        {/* Activity Distribution */}
        {activityStats.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <HiOutlineSparkles className="text-blue-600" />
              Activity Distribution
            </h3>
            <div className="space-y-3">
              {activityStats.slice(0, 3).map((stat, index) => (
                <div key={stat.name} className="flex items-center gap-3">
                  <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${
                    index === 0 ? 'bg-gold-100 text-gold-700' :
                    index === 1 ? 'bg-silver-100 text-silver-700' :
                    'bg-bronze-100 text-bronze-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{stat.name}</span>
                      <span className="text-sm text-gray-500">{stat.count} requests ({stat.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                          'bg-gradient-to-r from-orange-300 to-orange-400'
                        }`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests Table */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="text-blue-600" size={20} />
                All Requests
                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {filteredRequests.length}
                </span>
              </h2>
              {searchTerm || filterActivity ? (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterActivity("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <X size={16} />
                  Clear filters
                </button>
              ) : null}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <p className="text-xl font-medium text-gray-700 mb-2">No requests found</p>
              <p className="text-gray-500 mb-6">
                {requests.length === 0 
                  ? "No requests have been created yet"
                  : "Try adjusting your search or filter criteria"
                }
              </p>
              {(searchTerm || filterActivity) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterActivity("");
                  }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredRequests.map((request, index) => (
                    <tr 
                      key={request._id} 
                      className="hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group"
                      onClick={() => setSelectedRequest(request)}
                      style={{
                        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <FaMapMarkerAlt className="text-blue-600" size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {request.destination || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">Location</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-sm">
                          <Activity size={12} />
                          {request.activity || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-100 rounded-lg">
                            <FaEnvelope className="text-gray-600" size={12} />
                          </div>
                          <a
                            href={`mailto:${request.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors flex items-center gap-1"
                          >
                            {request.email || "N/A"}
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gray-100 rounded-lg">
                            <FaCalendarAlt className="text-gray-600" size={12} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(request.createdAt)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatTime(request.createdAt)}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Request Detail Modal */}
      {selectedRequest && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedRequest(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl transform transition-all animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-blue-600 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium text-gray-900">{selectedRequest.destination}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Activity className="text-green-600 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Activity</p>
                  <p className="font-medium text-gray-900">{selectedRequest.activity}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="text-purple-600 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href={`mailto:${selectedRequest.email}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="text-orange-600 mt-1" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(selectedRequest.createdAt)} at {formatTime(selectedRequest.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setSelectedRequest(null)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedRequest.email}`}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}

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
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
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

export default Request;