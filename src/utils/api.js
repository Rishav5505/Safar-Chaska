import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000/api'
});

// Add token to requests if available
API.interceptors.request.use((req) => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
        req.headers.Authorization = `Bearer ${JSON.parse(storedUser).token}`;
    }
    return req;
});

export default API;
