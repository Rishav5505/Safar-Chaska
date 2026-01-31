import axios from 'axios';

const API = axios.create({
    baseURL: 'https://safar-chaska.onrender.com/api'
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
