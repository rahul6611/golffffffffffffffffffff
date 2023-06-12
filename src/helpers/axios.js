import axios from "axios"

export const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_baseURL
})

axiosApi.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("access")}`
