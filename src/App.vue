<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavBar />
    
    <!-- 路由视图容器 -->
    <router-view v-slot="{ Component, route }">
      <!-- 使用 transition 添加页面切换动画 -->
      <transition
        name="fade-transform"
        mode="out-in"
        @before-enter="handleBeforeEnter"
        @after-enter="handleAfterEnter"
      >
        <!-- 使用 keep-alive 缓存页面状态 -->
        <keep-alive :include="cachedViews">
          <component
            :is="Component"
            :key="route.fullPath"
            class="app-main"
          />
        </keep-alive>
      </transition>
    </router-view>

    <!-- 全局加载指示器 -->
    <div v-if="globalLoading" class="global-loading">
      <div class="loading-content">
        <el-icon class="loading-icon" :size="40">
          <Loading />
        </el-icon>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Loading } from '@element-plus/icons-vue'
import { useAppStore } from '@/stores/app'
import NavBar from '@/components/NavBar.vue'

// 路由实例
const route = useRoute()

// 应用状态管理
const appStore = useAppStore()

// 全局加载状态
const globalLoading = ref(false)

// 缓存的视图组件名称列表
const cachedViews = ref<string[]>([])

// 页面切换动画钩子
const handleBeforeEnter = () => {
  // 页面进入前的逻辑
  globalLoading.value = true
}

const handleAfterEnter = () => {
  // 页面进入后的逻辑
  globalLoading.value = false
}

// 监听路由变化，管理缓存视图
watch(
  () => route.name,
  (newName) => {
    if (newName && !cachedViews.value.includes(newName as string)) {
      // 根据路由元信息决定是否缓存
      if (route.meta?.keepAlive) {
        cachedViews.value.push(newName as string)
      }
    }
    
    // 更新当前页面标题
    if (route.meta?.title) {
      document.title = `${route.meta.title} - 智慧旅游推荐系统`
    } else {
      document.title = '智慧旅游推荐系统'
    }
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  { immediate: true }
)

// 监听全局加载状态变化
watch(
  () => appStore.loading,
  (newVal) => {
    if (newVal) {
      globalLoading.value = true
    } else {
      globalLoading.value = false
    }
  }
)
</script>

<style lang="scss">
// 全局样式重置
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #303133;
  background-color: #f5f7fa;
  line-height: 1.5;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 页面切换动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s ease;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// 全局加载样式
.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  
  .loading-content {
    text-align: center;
    
    .loading-icon {
      animation: rotate 1.5s linear infinite;
      color: #409EFF;
      margin-bottom: 16px;
    }
    
    p {
      color: #606266;
      font-size: 16px;
      margin-top: 8px;
    }
  }
}

// 旋转动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 滚动条样式
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
  
  &:hover {
    background: #a8a8a8;
  }
}

// 工具类
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.flex {
  display: flex;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

// 边距工具类
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }

.ml-1 { margin-left: 0.25rem; }
.ml-2 { margin-left: 0.5rem; }
.ml-4 { margin-left: 1rem; }

.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
.mr-4 { margin-right: 1rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-8 { padding: 2rem; }

// 响应式容器
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0 8px;
  }
}

// 通用卡片样式
.common-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: box-shadow 0.3s;
  
  &:hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  }
}

// 通用按钮样式
.primary-button {
  background: linear-gradient(135deg, #409EFF, #1E88E5);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: linear-gradient(135deg, #66b1ff, #409EFF);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 链接样式
a {
  color: #409EFF;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #66b1ff;
    text-decoration: underline;
  }
}
</style>