// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/front/HomePage.vue'),
    meta: { title: '首页', requiresAuth: false, keepAlive: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/front/auth/LoginPage.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/front/auth/RegisterPage.vue'),
    meta: { title: '注册', requiresAuth: false }
  },
  {
    path: '/attractions',
    name: 'Attractions',
    component: () => import('@/views/front/attraction/AttractionList.vue'),
    meta: { title: '景点列表', requiresAuth: false, keepAlive: true }
  },
  {
    path: '/attractions/:id',
    name: 'AttractionDetail',
    component: () => import('@/views/front/attraction/AttractionDetail.vue'),
    meta: { title: '景点详情', requiresAuth: false }
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: () => import('@/views/front/hotel/HotelList.vue'),
    meta: { title: '酒店列表', requiresAuth: true, keepAlive: true }
  },
  {
    path: '/hotels/:id',
    name: 'HotelDetail',
    component: () => import('@/views/front/hotel/HotelDetail.vue'),
    meta: { title: '酒店详情', requiresAuth: true }
  },
  {
    path: '/ai-assistant',
    name: 'AIAssistant',
    component: () => import('@/views/front/ai/AIAssistant.vue'),
    meta: { title: 'AI助手', requiresAuth: false, keepAlive: true }
  },
  {
    path: '/travel-planner',
    name: 'TravelPlanner',
    component: () => import('@/views/front/travel/TravelPlanner.vue'),
    meta: { title: '智能旅游规划', requiresAuth: false, keepAlive: true }
  },
  {
    path: '/share',
    name: 'Share',
    component: () => import('@/views/front/share/TripShare.vue'),
    meta: { title: '行程分享', requiresAuth: false, keepAlive: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 更新页面标题
  document.title = to.meta.title as string || '智能旅游指南'

  // 简单的权限控制示例
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = true // 这里应该从实际的认证状态获取

  if (requiresAuth && !isAuthenticated) {
    // 如果需要认证但未登录，重定向到登录页
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router