<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <span class="logo-text">🌍 智慧旅游</span>
        </router-link>
      </div>
      
      <nav class="nav">
        <router-link to="/attractions" class="nav-item">景点推荐</router-link>
        <router-link to="/hotels" class="nav-item">酒店预订</router-link>
        <router-link to="/travel-planner" class="nav-item">智能规划</router-link>
        <router-link to="/share" class="nav-item">行程分享</router-link>
        <router-link to="/ai-assistant" class="nav-item">
          🤖 AI助手
        </router-link>
      </nav>
      
      <div class="user-actions">
        <template v-if="!isLoggedIn">
          <el-button type="primary" @click="$router.push('/login')">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </template>
        <template v-else>
          <el-dropdown>
            <div class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">{{ user?.username }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/profile')">个人中心</el-dropdown-item>
                <el-dropdown-item @click="$router.push('/orders')">我的订单</el-dropdown-item>
                <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const user = ref({ username: '游客' })
const isScrolled = ref(false)

// 滚动监听处理
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始检查
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const logout = () => {
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(76, 175, 80, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.15);
    height: 60px;
    
    .container {
      height: 60px;
    }
  }
  
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 70px;
    max-width: 1200px;
    margin: 0 auto;
    transition: height 0.3s ease;
  }
  
  .logo {
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    .logo-text {
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.5px;
    }
  }
  
  .nav {
    display: flex;
    gap: 36px;
    align-items: center;
    
    .nav-item {
      text-decoration: none;
      color: $text-regular;
      font-size: 16px;
      font-weight: 400;
      transition: all 0.3s ease;
      position: relative;
      padding: 8px 0;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, $primary-color, $primary-light);
        transition: width 0.3s ease;
        border-radius: 2px;
      }
      
      &:hover {
        color: $primary-color;
        transform: translateY(-2px);
        
        &::after {
          width: 100%;
        }
      }
      
      &.router-link-active {
        color: $primary-color;
        font-weight: 500;
        
        &::after {
          width: 100%;
        }
      }
    }
  }
  
  .user-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .el-button {
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
      }
    }
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    background: $green-transparent;
    
    &:hover {
      background: rgba(76, 175, 80, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    }
    
    .username {
      font-size: 14px;
      font-weight: 500;
      color: $text-regular;
    }
    
    .el-avatar {
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}

// 自定义按钮样式
.el-button--primary {
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid $primary-color;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  transition: all 0.3s ease;
  color: $primary-color;
  
  &:hover {
    background: rgba(76, 175, 80, 0.25);
    border-color: $primary-dark;
    color: $primary-dark;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.el-button {
  border-radius: 8px;
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: $primary-color;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $primary-color;
    background: rgba(76, 175, 80, 0.1);
    color: $primary-dark;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    .container {
      padding: 0 16px;
      height: 60px;
    }
    
    .logo {
      .logo-text {
        font-size: 20px;
      }
    }
    
    .nav {
      display: none;
    }
    
    .user-actions {
      display: none;
    }
    
    &.scrolled {
      height: 56px;
      
      .container {
        height: 56px;
      }
    }
  }
}

@media (max-width: 480px) {
  .header {
    .container {
      padding: 0 12px;
    }
  }
}
</style>