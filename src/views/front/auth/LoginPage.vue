# 在项目根目录创建登录页面文件

<template>
  <div class="login-container">
    <div class="login-wrapper animate-fade-in">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <i class="logo-icon">✈️</i>
            <h1>智慧旅游推荐系统</h1>
          </div>
          <p class="login-subtitle">欢迎回来，请登录您的账户</p>
        </div>
        
        <div class="login-form">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginRules"
            size="large"
            @submit.prevent="handleLogin"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名/手机号/邮箱"
                :prefix-icon="User"
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                clearable
                class="form-input"
                @keyup.enter="handleLogin"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <div class="login-options">
              <el-checkbox v-model="rememberMe" class="remember-checkbox">记住我</el-checkbox>
              <router-link to="/forgot-password" class="forgot-password">
                忘记密码？
              </router-link>
            </div>
            
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                @click="handleLogin"
                class="login-btn"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
          
          <div class="login-divider">
            <span>其他登录方式</span>
          </div>
          
          <div class="social-login">
            <el-button class="social-btn wechat" @click="handleWechatLogin">
              <el-icon><ChatDotRound /></el-icon>
              <span>微信登录</span>
            </el-button>
            <el-button class="social-btn qq" @click="handleQQLogin">
              <el-icon><ChatLineRound /></el-icon>
              <span>QQ登录</span>
            </el-button>
          </div>
          
          <div class="register-link">
            还没有账号？
            <router-link to="/register" class="register-text">立即注册</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="login-background">
      <div class="background-overlay"></div>
      <div class="background-content animate-slide-up">
        <div class="background-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <h2>探索世界，智慧旅行</h2>
        <p class="background-desc">为您推荐最合适的旅游路线</p>
        <p class="background-desc">个性化景点推荐，让旅行更精彩</p>
        <div class="background-features">
          <div class="feature-item">
            <i class="feature-icon">🎯</i>
            <span>智能推荐</span>
          </div>
          <div class="feature-item">
            <i class="feature-icon">📱</i>
            <span>便捷出行</span>
          </div>
          <div class="feature-item">
            <i class="feature-icon">💡</i>
            <span>AI规划</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Lock, ChatDotRound, ChatLineRound } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)
const isInputFocused = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 处理输入框聚焦
const handleInputFocus = () => {
  isInputFocused.value = true
}

// 处理输入框失焦
const handleInputBlur = () => {
  isInputFocused.value = false
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    // 调用登录接口
    await authStore.login({
      username: loginForm.username,
      password: loginForm.password
    })
    
    ElMessage.success('登录成功！')
    
    // 跳转到首页或原计划页面
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || '/')
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage.error('用户名或密码错误')
  } finally {
    loading.value = false
  }
}

// 微信登录
const handleWechatLogin = () => {
  ElMessage.info('微信登录功能开发中')
}

// QQ登录
const handleQQLogin = () => {
  ElMessage.info('QQ登录功能开发中')
}

// 页面加载时检查记住我
onMounted(() => {
  const savedUsername = localStorage.getItem('rememberedUsername')
  if (savedUsername) {
    loginForm.username = savedUsername
    rememberMe.value = true
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.login-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, $primary-dark 0%, $primary-accent 100%);
  overflow: hidden;
  position: relative;
  
  // 背景装饰
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  .login-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    z-index: 1;
    
    .login-card {
      width: 100%;
      max-width: 420px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      padding: 48px 36px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        transform: translateY(-5px);
      }
    }
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 48px;
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      
      .logo-icon {
        font-size: 32px;
        margin-right: 12px;
        animation: bounce 2s infinite;
      }
      
      h1 {
        font-size: 28px;
        font-weight: 700;
        background: $gradient-primary;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
    }
    
    .login-subtitle {
      color: $text-secondary;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
    }
  }
  
  .login-form {
    .form-input {
      border-radius: $border-radius-lg;
      border: 1px solid $border-base;
      transition: all $transition-normal;
      background: rgba(255, 255, 255, 0.8);
      
      &:focus-within {
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        background: white;
      }
    }
    
    .login-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      
      .remember-checkbox {
        font-size: 14px;
        color: $text-secondary;
        
        .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: $primary-color;
          border-color: $primary-color;
        }
        
        .el-checkbox__input.is-focus .el-checkbox__inner {
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        }
      }
      
      .forgot-password {
        color: $primary-color;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all $transition-normal;
        
        &:hover {
          text-decoration: underline;
          color: $primary-light;
        }
      }
    }
    
    .login-btn {
      width: 100%;
      background: $gradient-primary;
      border: none;
      height: 52px;
      font-size: 16px;
      font-weight: 600;
      border-radius: $border-radius-lg;
      transition: all $transition-normal;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
      }
      
      &:hover {
        background: $gradient-accent;
        box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);
        transform: translateY(-2px);
        
        &::before {
          left: 100%;
        }
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    .login-divider {
      position: relative;
      text-align: center;
      margin: 32px 0;
      
      span {
        background: rgba(255, 255, 255, 0.95);
        padding: 0 24px;
        color: #9CA3AF;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        z-index: 1;
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, #E5E7EB, transparent);
      }
    }
    
    .social-login {
      display: flex;
      gap: 16px;
      margin-bottom: 32px;
      
      .social-btn {
        flex: 1;
        height: 48px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        
        &.wechat {
          background: #07C160;
          border-color: #07C160;
          color: white;
          
          &:hover {
            background: #06B358;
            border-color: #06B358;
            box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
            transform: translateY(-2px);
          }
        }
        
        &.qq {
          background: #12B7F5;
          border-color: #12B7F5;
          color: white;
          
          &:hover {
            background: #0EA5E9;
            border-color: #0EA5E9;
            box-shadow: 0 4px 12px rgba(18, 183, 245, 0.3);
            transform: translateY(-2px);
          }
        }
      }
    }
    
    .register-link {
      text-align: center;
      color: #6B7280;
      font-size: 14px;
      font-weight: 400;
      
      .register-text {
        color: $primary-color;
        text-decoration: none;
        font-weight: 600;
        margin-left: 4px;
        transition: all $transition-normal;
        
        &:hover {
          text-decoration: underline;
          color: $primary-light;
        }
      }
    }
  }
  
  .login-background {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px;
    overflow: hidden;
    
    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
    
    .background-content {
      position: relative;
      z-index: 2;
      color: white;
      text-align: center;
      max-width: 500px;
      
      .background-shapes {
        position: absolute;
        top: -50px;
        left: -50px;
        right: -50px;
        bottom: -50px;
        z-index: -1;
        
        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
          
          &.shape-1 {
            width: 200px;
            height: 200px;
            top: 20%;
            left: 20%;
            animation-delay: 0s;
          }
          
          &.shape-2 {
            width: 150px;
            height: 150px;
            top: 60%;
            right: 20%;
            animation-delay: 2s;
          }
          
          &.shape-3 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            left: 40%;
            animation-delay: 4s;
          }
        }
      }
      
      h2 {
        font-size: 42px;
        font-weight: 800;
        margin-bottom: 24px;
        line-height: 1.2;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      .background-desc {
        font-size: 18px;
        margin-bottom: 16px;
        opacity: 0.9;
        font-weight: 400;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
      
      .background-features {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-top: 48px;
        
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          
          .feature-icon {
            font-size: 28px;
            animation: bounce 2s infinite;
          }
          
          span {
            font-size: 14px;
            font-weight: 500;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .login-container {
    .login-background {
      padding: 40px;
      
      .background-content {
        h2 {
          font-size: 36px;
        }
        
        .background-features {
          gap: 30px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    
    .login-wrapper {
      padding: 24px;
      order: 2;
      
      .login-card {
        padding: 36px 24px;
      }
    }
    
    .login-background {
      order: 1;
      height: 40vh;
      padding: 24px;
      
      .background-content {
        h2 {
          font-size: 28px;
        }
        
        .background-desc {
          font-size: 16px;
        }
        
        .background-features {
          margin-top: 32px;
          gap: 20px;
          
          .feature-item {
            .feature-icon {
              font-size: 24px;
            }
            
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .login-container {
    .login-wrapper {
      padding: 16px;
      
      .login-card {
        padding: 28px 16px;
      }
    }
    
    .login-background {
      padding: 16px;
      
      .background-content {
        h2 {
          font-size: 24px;
        }
        
        .background-features {
          gap: 16px;
        }
      }
    }
  }
}

// 动画类
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
EOF