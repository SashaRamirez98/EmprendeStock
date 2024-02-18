import axios from 'axios';

const URL = 'https://65d2631d987977636bfc4ada.mockapi.io/api/stockproducts'
//'https://656a5bb4de53105b0dd86a7e.mockapi.io/api/stockproducts'

export const axiosInstance = axios.create({
    baseURL: URL
})