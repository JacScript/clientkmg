import axios from "axios";
import { store } from "../redux/store"; // adjust path to your redux store
import { clearCredentials } from "../redux/slices/userSlice";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

// Response interceptor — if any request gets a 401, clear the user and redirect to login
api.interceptors.response.use(
    (response) => response, // pass through successful responses
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(clearCredentials()); // clear Redux + localStorage
            window.location.href = "/login";   // redirect to login page
        }
        return Promise.reject(error);
    }
);


//API ENDPOINTS
//home page data. endpoints
export const getHomePageData = () => api.get("/api/v2/homepage");
export const updateHomePageData = (id, data) => api.put(`/api/v2/homepage/${id}`, data);
export const updateHomePageSection = (id, sectionName, data) => api.patch(`/api/v2/homepage/${id}/section/${sectionName}`, data);

//about page data. endpoints
export const getAboutData = () => api.get("/api/v2/about");
export const updateAboutData = (id, data) => api.put(`/api/v2/about/${id}`, data);
export const updateAboutSection = (id, sectionName, data) => api.patch(`/api/v2/about/${id}/section/${sectionName}`, data);
export const deleteAboutData = () => api.delete("/api/v2/about");

//User endpoints
export const login = (data) => api.post("/api/v1/auth/login", data);
export const logout = (data) => api.post("/api/v1/auth/logout", data);

//testimonial endpoints
export const getTestimonials = () => api.get("/api/testimonial");
export const createTestimonial = (data) => api.post("/api/testimonial", data);
export const deleteTestimonial = (id) => api.delete(`/api/testimonial/${id}`);
export const updateTestimonial = (id, data) => api.put(`/api/testimonial/${id}`, data);


//create a response
export const createRequests = (data) => api.post("/api/request", data);  
export const getRequests = () => api.get("/api/request");  

//get packages
export const getPackages = () => api.get("/api/package");
export const createPackage = (data) => api.post("/api/package", data);
export const deletePackage = (id) => api.delete(`/api/package/${id}`);
export const updatePackage = (id, data) => api.put(`/api/package/${id}`, data);

//get home
export const getHome = () => api.get("/api/home");
export const updateHome = (id,data) => api.put(`/api/home/${id}`, data);

//holiday home page endpoints (hero + listings copy, apartments linked by id)
export const getHolidayHomePageData = () => api.get("/api/v2/holiday-home");
export const createHolidayHomePageData = (data) => api.post("/api/v2/holiday-home", data);
export const updateHolidayHomePageData = (id, data) => api.put(`/api/v2/holiday-home/${id}`, data);
export const updateHolidayHomeSection = (id, sectionName, data) => api.patch(`/api/v2/holiday-home/${id}/section/${sectionName}`, data);
export const linkApartmentToHolidayHome = (pageId, apartmentId) => api.patch(`/api/v2/holiday-home/${pageId}/apartments/${apartmentId}`);
export const unlinkApartmentFromHolidayHome = (pageId, apartmentId) => api.delete(`/api/v2/holiday-home/${pageId}/apartments/${apartmentId}`);

//apartment listing endpoints
export const getApartments = () => api.get("/api/v2/apartment");
export const getApartmentBySlug = (slug) => api.get(`/api/v2/apartment/slug/${slug}`);
export const getApartmentById = (id) => api.get(`/api/v2/apartment/${id}`);
export const createApartment = (data) => api.post("/api/v2/apartment", data);
export const updateApartment = (id, data) => api.put(`/api/v2/apartment/${id}`, data);
export const deleteApartment = (id) => api.delete(`/api/v2/apartment/${id}`);

//order / checkout / invoice endpoints
export const createOrder = (data) => api.post("/api/v1/orders", data);
export const getOrders = () => api.get("/api/v1/orders");
export const getOrderByInvoice = (invoiceNumber) => api.get(`/api/v1/orders/invoice/${invoiceNumber}`);
export const getOrderById = (id) => api.get(`/api/v1/orders/${id}`);
export const updateOrderStatus = (id, status) => api.patch(`/api/v1/orders/${id}/status`, { status });
export const markOrderSent = (id) => api.patch(`/api/v1/orders/${id}/sent`);

//nespresso machine endpoints
export const getNespressoMachines = () => api.get("/api/v1/nespresso-machines");
export const getNespressoMachineById = (id) => api.get(`/api/v1/nespresso-machines/${id}`);
export const createNespressoMachine = (data) => api.post("/api/v1/nespresso-machines", data);
export const updateNespressoMachine = (id, data) => api.put(`/api/v1/nespresso-machines/${id}`, data);
export const deleteNespressoMachine = (id) => api.delete(`/api/v1/nespresso-machines/${id}`);

//nespresso capsule endpoints
export const getNespressoCapsules = () => api.get("/api/v1/nespresso-capsules");
export const getNespressoCapsuleById = (id) => api.get(`/api/v1/nespresso-capsules/${id}`);
export const createNespressoCapsule = (data) => api.post("/api/v1/nespresso-capsules", data);
export const updateNespressoCapsule = (id, data) => api.put(`/api/v1/nespresso-capsules/${id}`, data);
export const deleteNespressoCapsule = (id) => api.delete(`/api/v1/nespresso-capsules/${id}`);

//nespresso accessory endpoints
export const getNespressoAccessories = () => api.get("/api/v1/nespresso-accessories");
export const getNespressoAccessoryById = (id) => api.get(`/api/v1/nespresso-accessories/${id}`);
export const createNespressoAccessory = (data) => api.post("/api/v1/nespresso-accessories", data);
export const updateNespressoAccessory = (id, data) => api.put(`/api/v1/nespresso-accessories/${id}`, data);
export const deleteNespressoAccessory = (id) => api.delete(`/api/v1/nespresso-accessories/${id}`);

//nespresso page endpoints (hero/sustainability/club copy, products linked by id)
export const getNespressoPageData = () => api.get("/api/v1/nespresso-page");
export const createNespressoPageData = (data) => api.post("/api/v1/nespresso-page", data);
export const updateNespressoPageData = (id, data) => api.put(`/api/v1/nespresso-page/${id}`, data);
export const updateNespressoPageSection = (id, sectionName, data) => api.patch(`/api/v1/nespresso-page/${id}/section/${sectionName}`, data);
export const linkNespressoProduct = (pageId, productType, productId) => api.patch(`/api/v1/nespresso-page/${pageId}/link/${productType}/${productId}`);
export const unlinkNespressoProduct = (pageId, productType, productId) => api.delete(`/api/v1/nespresso-page/${pageId}/link/${productType}/${productId}`);

//kiswahili institute page endpoints
export const getKiswahiliPageData = () => api.get("/api/v1/kiswahili-page");
export const createKiswahiliPageData = (data) => api.post("/api/v1/kiswahili-page", data);
export const updateKiswahiliPageData = (id, data) => api.put(`/api/v1/kiswahili-page/${id}`, data);
export const updateKiswahiliPageSection = (id, sectionName, data) => api.patch(`/api/v1/kiswahili-page/${id}/section/${sectionName}`, data);

//gallery photo endpoints — pass a category slug to filter, or call with no args for all photos
export const getPhotos = (category) => api.get(`/api/v1/photos${category && category !== "all" ? `?category=${category}` : ""}`);
export const getPhotoById = (id) => api.get(`/api/v1/photos/${id}`);
export const createPhoto = (data) => api.post("/api/v1/photos", data);
export const updatePhoto = (id, data) => api.put(`/api/v1/photos/${id}`, data);
export const deletePhoto = (id) => api.delete(`/api/v1/photos/${id}`);

//gallery category (filter button) endpoints
export const getGalleryCategories = () => api.get("/api/v1/gallery-category");
export const createGalleryCategory = (data) => api.post("/api/v1/gallery-category", data);
export const updateGalleryCategory = (id, data) => api.put(`/api/v1/gallery-category/${id}`, data);
export const deleteGalleryCategory = (id) => api.delete(`/api/v1/gallery-category/${id}`);

//gallery page endpoints (heading + stats band)
export const getGalleryPageData = () => api.get("/api/v1/gallery");
export const createGalleryPageData = (data) => api.post("/api/v1/gallery", data);
export const updateGalleryPageData = (id, data) => api.put(`/api/v1/gallery/${id}`, data);