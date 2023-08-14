import axios from "axios";

export const Api = axios.create({
    baseURL: 'https://apistock-15q2.onrender.com'
})