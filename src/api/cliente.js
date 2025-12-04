import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor para adjuntar el token si existe
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // o sessionStorage si prefieres
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res.data, // devolver solo data
    (error) => {
        const status = error?.response?.status;
        const message = error?.response?.data?.message || error.message;
        return Promise.reject({ status, message });
    }
);



export default api;
