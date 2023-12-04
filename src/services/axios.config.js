import axios from 'axios';

const URL = 'https://656a5bb4de53105b0dd86a7e.mockapi.io/api/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})