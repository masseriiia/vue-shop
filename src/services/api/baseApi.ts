import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { deleteToken, getAuthToken } from './authTokenService'

export const instance = axios.create({
  baseURL: 'https://shop-api.public.homekube.ru/api',
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAuthToken()
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`
    }
  }
  return config as InternalAxiosRequestConfig;
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((resp) => {
  return resp
},(error) => {
  if (axios.isAxiosError(error) && error.status === 401) {
    deleteToken()
  }
  return Promise.reject(error)
})
