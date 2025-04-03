import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://shop-api.public.homekube.ru/api',
})

instance.interceptors.request.use((config) => {
  if (localStorage.getItem('auth')) {
    config.headers = {
      'authorization': `Bearer ${JSON.parse(localStorage.getItem('auth'))}`
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((config) => {
  if (localStorage.getItem('auth')) {
    config.headers = {
      'authorization': `Bearer ${localStorage.getItem('auth')}`
    }
  }
  return config
},(error) => {
  return Promise.reject(error)
})
