import axios from "axios";
require('dotenv').config();
const BACK = import.meta.env.VITE_URI
const api = axios.create({
    baseURL:BACK
});

export default api;
