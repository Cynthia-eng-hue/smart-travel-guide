
<template>
  <div class="register-container">
    <div class="register-wrapper animate-fade-in">
      <div class="register-card">
        <div class="register-header">
          <div class="logo">
            <i class="logo-icon">✈️</i>
            <h1>创建账户</h1>
          </div>
          <p class="register-subtitle">加入智慧旅游，开启精彩旅程</p>
        </div>
        
        <div class="register-form">
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerRules"
            size="large"
          >
            <el-form-item prop="username">
              <el-input
                v-model="registerForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item prop="email">
              <el-input
                v-model="registerForm.email"
                placeholder="请输入邮箱"
                :prefix-icon="Message"
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item prop="phone">
              <el-input
                v-model="registerForm.phone"
                placeholder="请输入手机号"
                :prefix-icon="Iphone"
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                placeholder="请输入密码"
                :prefix-icon="Lock"
                show-password
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item prop="confirmPassword">
              <el-input
                v-model="registerForm.confirmPassword"
                type="password"
                placeholder="请确认密码"
                :prefix-icon="Lock"
                show-password
                clearable
                class="form-input"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
              />
            </el-form-item>
            
            <el-form-item>
              <el-checkbox v-model="agreeTerms" class="agree-checkbox">
                我已阅读并同意 <a href="#" @click.prevent="showTerms" class="terms-link">《用户协议》</a> 和 <a href="#" @click.prevent="showPrivacy" class="terms-link">《隐私政策》</a>
              </el-checkbox>
            </el-form-item>
            
            <el-form-item>
              <el-button
                type="primary"
                size="large"
                :loading="loading"
                @click="handleRegister"
                class="register-btn"
              >
                注册
              </el-button>
            </el-form-item>
          </el-form>
          
          <div class="login-link">
            已有账号？
            <router-link to="/login" class="login-text">立即登录</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <div class="register-background">
      <div class="background-overlay"></div>
      <div class="background-content animate-slide-up">
        <div class="background-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
        <h2>加入我们，享受特权</h2>
        <div class="background-features">
          <div class="feature-item">
            <i class="feature-icon">✨</i>
            <span>个性化景点推荐</span>
          </div>
          <div class="feature-item">
            <i class="feature-icon">🎫</i>
            <span>优先预订优惠</span>
          </div>
          <div class="feature-item">
            <i class="feature-icon">🤖</i>
            <span>AI行程规划助手</span>
          </div>
          <div class="feature-item">
            <i class="feature-icon">👥</i>
            <span>旅游社区互动</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { User, Message, Iphone, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const registerFormRef = ref<FormInstance>()
const loading = ref(false)
const agreeTerms = ref(false)
const isInputFocused = ref(false)

const registerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const handleInputFocus = () => {
  isInputFocused.value = true
}

const handleInputBlur = () => {
  isInputFocused.value = false
}

const validatePass = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  if (!registerFormRef.value) return
  
  if (!agreeTerms.value) {
    ElMessage.warning('请同意用户协议和隐私政策')
    return
  }
  
  try {
    await registerFormRef.value.validate()
    loading.value = true
    
    // 模拟注册
    setTimeout(() => {
      ElMessage.success('注册成功！请登录')
      router.push('/login')
    }, 1500)
  } catch (error) {
    console.error('注册失败:', error)
    ElMessage.error('注册失败，请检查输入')
  } finally {
    loading.value = false
  }
}

const showTerms = () => {
  ElMessage.info('用户协议内容')
}

const showPrivacy = () => {
  ElMessage.info('隐私政策内容')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.register-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, $primary-dark 0%, $primary-color 100%);
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
  
  .register-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    z-index: 1;
    
    .register-card {
      width: 100%;
      max-width: 500px;
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
  
  .register-header {
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
    
    .register-subtitle {
      color: $text-secondary;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
    }
  }
  
  .register-form {
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
    
    .agree-checkbox {
      font-size: 14px;
      color: $text-secondary;
      margin-bottom: 32px;
      
      .terms-link {
        color: $primary-color;
        text-decoration: none;
        font-weight: 500;
        transition: all $transition-normal;
        
        &:hover {
          text-decoration: underline;
          color: $primary-light;
        }
      }
      
      .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: $primary-color;
        border-color: $primary-color;
      }
      
      .el-checkbox__input.is-focus .el-checkbox__inner {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
      }
    }
    
    .register-btn {
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
    
    .login-link {
      text-align: center;
      margin-top: 32px;
      color: $text-secondary;
      font-size: 14px;
      font-weight: 400;
      
      .login-text {
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
  
  .register-background {
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
            right: 20%;
            animation-delay: 0s;
          }
          
          &.shape-2 {
            width: 150px;
            height: 150px;
            top: 60%;
            left: 20%;
            animation-delay: 2s;
          }
          
          &.shape-3 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            right: 40%;
            animation-delay: 4s;
          }
        }
      }
      
      h2 {
        font-size: 36px;
        font-weight: 800;
        margin-bottom: 48px;
        line-height: 1.2;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      
      .background-features {
        display: flex;
        flex-direction: column;
        gap: 24px;
        
        .feature-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          
          .feature-icon {
            font-size: 24px;
            animation: bounce 2s infinite;
          }
          
          span {
            font-size: 18px;
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
  .register-container {
    .register-background {
      padding: 40px;
      
      .background-content {
        h2 {
          font-size: 30px;
        }
        
        .background-features {
          .feature-item {
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    
    .register-wrapper {
      padding: 24px;
      order: 2;
      
      .register-card {
        padding: 36px 24px;
      }
    }
    
    .register-background {
      order: 1;
      height: 50vh;
      padding: 24px;
      
      .background-content {
        h2 {
          font-size: 24px;
          margin-bottom: 32px;
        }
        
        .background-features {
          gap: 16px;
          
          .feature-item {
            gap: 12px;
            
            .feature-icon {
              font-size: 20px;
            }
            
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .register-container {
    .register-wrapper {
      padding: 16px;
      
      .register-card {
        padding: 28px 16px;
      }
    }
    
    .register-background {
      padding: 16px;
      
      .background-content {
        h2 {
          font-size: 20px;
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