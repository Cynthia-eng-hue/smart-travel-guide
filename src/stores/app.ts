// src/stores/app.ts
import { defineStore } from 'pinia'
import type { AppState } from '@/types/app'

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    loading: false,
    theme: 'light',
    language: 'zh-CN',
    sidebar: {
      opened: true,
      withoutAnimation: false
    }
  }),
  
  getters: {
    isLoading: (state) => state.loading,
    getTheme: (state) => state.theme,
    getLanguage: (state) => state.language
  },
  
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
    },
    
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
      // 可以在这里添加主题切换的逻辑
    },
    
    setLanguage(lang: string) {
      this.language = lang
      // 可以在这里添加语言切换的逻辑
    }
  }
})