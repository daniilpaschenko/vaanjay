import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('vaanjay_token')
  if (token && token.startsWith('local_')) {
    config.headers.Authorization = ''
    return config
  }
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return Promise.resolve({ data: { data: [], success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config })
    }
    if (error.response?.status === 401) {
      const token = localStorage.getItem('vaanjay_token')
      if (!token || !token.startsWith('local_')) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        if (typeof window !== 'undefined') window.location.href = '/auth/login'
      }
    }
    return Promise.resolve({ data: { data: [], success: true }, status: 200, statusText: 'OK', headers: {}, config: error.config })
  }
)

export default api
