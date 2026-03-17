
<template>
  <div class="not-found-container">
    <div class="error-content">
      <!-- 错误动画/图片 -->
      <div class="error-illustration">
        <div class="animation-container">
          <div class="lost-traveler">
            <div class="backpack"></div>
            <div class="person"></div>
            <div class="map"></div>
          </div>
          <div class="compass"></div>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="error-message">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">页面走丢了</h2>
        <p class="error-description">
          您访问的页面可能已经不存在，或者被移动到了其他地方
        </p>
        
        <!-- 建议操作 -->
        <div class="suggestions">
          <p>您可以尝试：</p>
          <ul>
            <li>检查输入的网址是否正确</li>
            <li>返回上一页重新操作</li>
            <li>回到首页寻找您需要的内容</li>
          </ul>
        </div>
        
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button 
            type="primary" 
            size="large" 
            @click="goBack"
            class="back-btn"
          >
            <el-icon><ArrowLeft /></el-icon>
            返回上一页
          </el-button>
          <el-button 
            type="success" 
            size="large" 
            @click="goHome"
            class="home-btn"
          >
            <el-icon><HomeFilled /></el-icon>
            返回首页
          </el-button>
          <el-button 
            size="large" 
            @click="goToSearch"
            class="search-btn"
          >
            <el-icon><Search /></el-icon>
            搜索景点
          </el-button>
        </div>
        
        <!-- 快速导航 -->
        <div class="quick-links">
          <h3>热门页面</h3>
          <div class="link-grid">
            <router-link to="/attractions" class="link-card">
              <div class="link-icon">🏞️</div>
              <span>景点推荐</span>
            </router-link>
            <router-link to="/hotels" class="link-card">
              <div class="link-icon">🏨</div>
              <span>酒店预订</span>
            </router-link>
            <router-link to="/ai-assistant" class="link-card">
              <div class="link-icon">🤖</div>
              <span>AI助手</span>
            </router-link>
            <router-link to="/strategy" class="link-card">
              <div class="link-icon">📝</div>
              <span>旅游攻略</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 背景装饰 -->
    <div class="background-elements">
      <div class="mountain"></div>
      <div class="cloud cloud-1"></div>
      <div class="cloud cloud-2"></div>
      <div class="cloud cloud-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeft, HomeFilled, Search } from '@element-plus/icons-vue'

const router = useRouter()

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

// 返回首页
const goHome = () => {
  router.push('/')
}

// 跳转到搜索页面
const goToSearch = () => {
  router.push('/attractions')
}
</script>

<style scoped lang="scss">
.not-found-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  
  .error-content {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    padding: 60px;
    max-width: 900px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    position: relative;
    z-index: 2;
  }
  
  .error-illustration {
    display: flex;
    align-items: center;
    justify-content: center;
    
    .animation-container {
      position: relative;
      width: 300px;
      height: 300px;
    }
    
    .lost-traveler {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      animation: float 3s ease-in-out infinite;
      
      .backpack {
        position: absolute;
        width: 60px;
        height: 80px;
        background: #4a5568;
        border-radius: 10px;
        top: 60px;
        left: 100px;
        transform: rotate(15deg);
        
        &::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 30px;
          background: #2d3748;
          border-radius: 5px;
          top: -15px;
          left: 20px;
        }
      }
      
      .person {
        position: absolute;
        width: 100px;
        height: 180px;
        background: #4299e1;
        border-radius: 50px 50px 0 0;
        top: 20px;
        left: 70px;
        
        &::before {
          content: '';
          position: absolute;
          width: 40px;
          height: 40px;
          background: #fbbf24;
          border-radius: 50%;
          top: -20px;
          left: 30px;
        }
      }
      
      .map {
        position: absolute;
        width: 80px;
        height: 60px;
        background: #f7fafc;
        border: 2px dashed #cbd5e0;
        border-radius: 8px;
        top: 100px;
        left: 140px;
        transform: rotate(-10deg);
        
        &::before {
          content: '🗺️';
          position: absolute;
          font-size: 24px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    
    .compass {
      position: absolute;
      width: 80px;
      height: 80px;
      border: 4px solid #e53e3e;
      border-radius: 50%;
      top: 30px;
      right: 30px;
      animation: spin 10s linear infinite;
      
      &::before, &::after {
        content: '';
        position: absolute;
        background: #e53e3e;
      }
      
      &::before {
        width: 4px;
        height: 40px;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
      }
      
      &::after {
        width: 40px;
        height: 4px;
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  
  .error-message {
    .error-code {
      font-size: 120px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      line-height: 1;
    }
    
    .error-title {
      font-size: 36px;
      color: #2d3748;
      margin: 20px 0;
    }
    
    .error-description {
      font-size: 18px;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .suggestions {
      background: #f7fafc;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 40px;
      
      p {
        font-weight: 500;
        color: #2d3748;
        margin-bottom: 12px;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          color: #4a5568;
          padding: 6px 0;
          padding-left: 24px;
          position: relative;
          
          &::before {
            content: '•';
            color: #667eea;
            font-size: 20px;
            position: absolute;
            left: 0;
          }
        }
      }
    }
    
    .action-buttons {
      display: flex;
      gap: 16px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      
      .back-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
      }
      
      .home-btn {
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        border: none;
      }
      
      .search-btn {
        background: #edf2f7;
        color: #4a5568;
        border: none;
      }
    }
    
    .quick-links {
      h3 {
        font-size: 20px;
        color: #2d3748;
        margin-bottom: 20px;
      }
      
      .link-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }
      
      .link-card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        background: #f7fafc;
        border-radius: 12px;
        text-decoration: none;
        color: #4a5568;
        transition: all 0.3s;
        
        &:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }
        
        .link-icon {
          font-size: 24px;
        }
        
        span {
          font-weight: 500;
        }
      }
    }
  }
  
  .background-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    
    .mountain {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to top, rgba(74, 85, 104, 0.2), transparent);
      clip-path: polygon(0% 100%, 100% 100%, 100% 50%, 90% 60%, 80% 40%, 70% 70%, 60% 50%, 50% 80%, 40% 60%, 30% 90%, 20% 70%, 10% 95%, 0% 80%);
    }
    
    .cloud {
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 100px;
      
      &.cloud-1 {
        width: 200px;
        height: 80px;
        top: 20%;
        left: 10%;
        animation: float-cloud 20s linear infinite;
      }
      
      &.cloud-2 {
        width: 150px;
        height: 60px;
        top: 40%;
        right: 15%;
        animation: float-cloud 25s linear infinite reverse;
      }
      
      &.cloud-3 {
        width: 180px;
        height: 70px;
        top: 60%;
        left: 20%;
        animation: float-cloud 30s linear infinite;
      }
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes float-cloud {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100vw);
  }
}

@media (max-width: 768px) {
  .not-found-container {
    padding: 20px;
    
    .error-content {
      grid-template-columns: 1fr;
      gap: 40px;
      padding: 40px 20px;
    }
    
    .error-illustration {
      display: none;
    }
    
    .error-code {
      font-size: 80px !important;
      text-align: center;
    }
    
    .error-title {
      text-align: center;
    }
    
    .action-buttons {
      justify-content: center;
    }
  }
}
</style>
