import axios from "axios"
import axiosInstance from "./axiosInstance"

const {VITE_BASE_URL} = import.meta.env

export const registerUser = (payload) => {
    return  axios.post(`${VITE_BASE_URL}/register`, payload)
}

export const login = (payload) => {
    return axios.post(`${VITE_BASE_URL}/login`, payload)
}

export const logout = (payload) => {
    return axios.post(`${VITE_BASE_URL}/logout`, payload)
}

export const createCar = (payload) => {
    return axiosInstance.post(`${VITE_BASE_URL}/mobil`, payload)
}

export const getCar = () => {
    return axiosInstance.get(`${VITE_BASE_URL}/mobil`)
}

export const getHistoryRental = () => {
    return axiosInstance.get(`${VITE_BASE_URL}/rent`)
}

export const createRental = (payload) => {
    return axiosInstance.post(`${VITE_BASE_URL}/rent`, payload)
}

export const returnRental = (payload) => {
    return axiosInstance.post(`${VITE_BASE_URL}/rent/return`, payload)
}

export const getAllUsers = () => {
    return axiosInstance.get(`${VITE_BASE_URL}/users`)
}