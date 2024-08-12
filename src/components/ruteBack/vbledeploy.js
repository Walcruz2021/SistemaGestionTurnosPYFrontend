import axios from 'axios';

const BASE_URL = 'https://backend-app-peluqueria-lk7q7jcw4-walcruz198821s-projects.vercel.app';
//const BASE_URL ='https://peluqueriapichichu.onrender.com'
export const axiosInstance=axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

const host={
    //development:"https://peluqueriapichichu.onrender.com"
    development:BASE_URL
}

export default host