import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})


//API ENDPOINTS
//create a response
export const createRequests = (data) => api.post("/api/request", data);  

//get packages
export const getPackages = () => api.get("/api/package");

//get home
export const getHome = () => api.get("/api/home");

