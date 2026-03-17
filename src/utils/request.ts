// src/utils/request.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authStore = useAuthStore()
    if (authStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    
    if (res.code !== 200) {
      // 处理业务错误
      ElMessage.error(res.message || '请求失败')
      
      // 401 未授权
      if (res.code === 401) {
        const authStore = useAuthStore()
        authStore.logout()
      }
      
      return Promise.reject(new Error(res.message || 'Error'))
    }
    
    return res
  },
  (error) => {
    // 处理 HTTP 错误
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
    }
    
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service