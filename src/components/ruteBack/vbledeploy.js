import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

export const axiosInstance=axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

const host={
    development:"https://peluqueriapichichu.onrender.com"
    //development:BASE_URL
}

export default host