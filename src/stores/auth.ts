// src/stores/auth.ts
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token')
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => state.user
  },
  
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await api.auth.login(credentials)
        this.token = response.token
        this.user = response.user
        localStorage.setItem('token', response.token)
        return response
      } catch (error) {
        throw error
      }
    },
    
    async register(userData: any) {
      try {
        const response = await api.auth.register(userData)
        return response
      } catch (error) {
        throw error
      }
    },
    
    async logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      router.push('/login')
    },
    
    async fetchUserInfo() {
      if (!this.token) return
      
      try {
        const user = await api.auth.getUserInfo()
        this.user = user
      } catch (error) {
        this.logout()
      }
    }
  }
})