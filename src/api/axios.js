import axios from 'axios';
const BASE_URL = 'http://localhost:3002/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

//g5254c!wfM5YAsP contraseña