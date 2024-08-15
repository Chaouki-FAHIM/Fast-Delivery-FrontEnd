import axios, { AxiosInstance } from 'axios';

const APIClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8181',
    headers: {
        'Content-Type': 'application/json',
    },
});

APIClient.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default APIClient;
