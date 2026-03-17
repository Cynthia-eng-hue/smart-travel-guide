// src/types/app.ts
export interface AppState {
    loading: boolean
    theme: 'light' | 'dark'
    language: string
    sidebar: {
      opened: boolean
      withoutAnimation: boolean
    }
  }
  
  export interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    requiresAdmin?: boolean
    keepAlive?: boolean
  }
  
  export interface RouteConfig {
    path: string
    name: string
    component: any
    meta: RouteMeta
  }