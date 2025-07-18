// src/lib/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // Change to your backend URL
  withCredentials: true // send cookies
})

export default axiosInstance
