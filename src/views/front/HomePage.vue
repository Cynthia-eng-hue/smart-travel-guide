
<template>
  <div class="home-page">
    <div class="main-content">
      <!-- 城市选择侧边栏 -->
      <aside class="city-sidebar">
        <div class="sidebar-header">
          <h3>选择城市</h3>
          <p>发现热门景点</p>
        </div>
        <div class="city-selector">
          <el-cascader
            v-model="selectedCity"
            :options="cityData"
            :props="cascaderProps"
            placeholder="请选择城市"
            clearable
            size="large"
            @change="handleCityChange"
            class="city-cascader"
          />
        </div>
        <div class="city-list">
          <div 
            v-for="city in hotCities" 
            :key="city.id"
            class="city-item"
            @click="navigateToCityAttractions(city.name)"
          >
            <div class="city-name">{{ city.name }}</div>
            <div class="city-count">{{ city.attractionCount }}个景点</div>
          </div>
        </div>
      </aside>

      <!-- 主内容区 -->
      <div class="content-area">
        <!-- 搜索区域 -->
        <section class="search-section">
          <div class="container">
            <div class="search-box">
              <el-input
                v-model="searchKeyword"
                placeholder="搜索景点、酒店、攻略..."
                class="search-input"
                size="large"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-button 
                type="primary" 
                size="large"
                @click="handleSearch"
              >
                搜索
              </el-button>
            </div>
          </div>
        </section>

        <!-- 轮播图 -->
        <section class="carousel-section">
          <div class="container">
            <el-carousel height="450px" :interval="5000" arrow="always">
              <el-carousel-item v-for="item in carouselItems" :key="item.id">
                <img :src="item.image" :alt="item.title" class="carousel-image" />
                <div class="carousel-caption">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                  <a href="#" class="btn-explore">立即探索</a>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </section>

        <!-- 推荐景点 -->
        <section class="recommend-section scroll-reveal">
          <div class="container">
            <div class="section-header">
              <h2>热门推荐</h2>
              <router-link to="/attractions" class="view-all">
                查看全部 →
              </router-link>
            </div>
            
            <div class="attraction-grid">
              <div v-for="(item, i) in recommendedAttractions" :key="i" class="attraction-card scroll-reveal" :style="{ animationDelay: `${i * 0.1}s` }">
                <div class="attraction-image-container">
                  <img :src="item.image" :alt="item.name" />
                  <div class="attraction-badge">热门</div>
                </div>
                <div class="attraction-info">
                  <h3>{{ item.name }}</h3>
                  <div class="attraction-rating">
                    <div class="rating-stars">⭐⭐⭐⭐⭐</div>
                    <div class="rating-count">4.5 (1200+评价)</div>
                  </div>
                  <div class="attraction-price">
                    <span class="price">￥{{ item.price }}起</span>
                    <button class="btn-view">查看详情</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    <!-- 功能入口 -->
    <section class="features-section scroll-reveal">
      <div class="container">
        <div class="section-header scroll-reveal">
          <h2>智能旅游服务</h2>
          <p>一站式解决方案，让您的旅行更加轻松愉快</p>
        </div>
        <div class="features-grid">
          <div class="feature-card scroll-reveal" @click="$router.push('/hotels')" :style="{ animationDelay: '0.1s' }">
            <div class="feature-icon">🏨</div>
            <div class="feature-content">
              <h3>酒店预订</h3>
              <p>海量酒店，全网比价，为您找到最适合的住宿选择</p>
            </div>
            <div class="feature-arrow">→</div>
          </div>
          <div class="feature-card scroll-reveal" @click="$router.push('/travel-planner')" :style="{ animationDelay: '0.2s' }">
            <div class="feature-icon">🧭</div>
            <div class="feature-content">
              <h3>智能规划</h3>
              <p>智能规划，行程定制，为您打造个性化旅行方案</p>
            </div>
            <div class="feature-arrow">→</div>
          </div>
          <div class="feature-card scroll-reveal" @click="$router.push('/ai-assistant')" :style="{ animationDelay: '0.3s' }">
            <div class="feature-icon">🤖</div>
            <div class="feature-content">
              <h3>AI助手</h3>
              <p>智能规划，行程定制，为您打造个性化旅行方案</p>
            </div>
            <div class="feature-arrow">→</div>
          </div>
          <div class="feature-card scroll-reveal" @click="$router.push('/share')" :style="{ animationDelay: '0.4s' }">
            <div class="feature-icon">✨</div>
            <div class="feature-content">
              <h3>行程分享</h3>
              <p>一键生成精美行程单与海报，分享您的旅行点滴</p>
            </div>
            <div class="feature-arrow">→</div>
          </div>
        </div>
      </div>
    </section>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="footer scroll-reveal">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>智慧旅游</h4>
            <p>为您提供最佳的旅游体验，智能推荐，个性化定制，让每一次旅行都成为难忘的回忆。</p>
            <div class="social-links">
              <a href="#" title="微信">📱</a>
              <a href="#" title="邮箱">📧</a>
              <a href="#" title="抖音">📺</a>
              <a href="#" title="微博">📱</a>
            </div>
          </div>
          <div class="footer-section">
            <h4>快速链接</h4>
            <div class="footer-links">
              <a href="/">首页</a>
              <a href="/attractions">景点推荐</a>
              <a href="/hotels">酒店预订</a>
              <a href="/travel-planner">智能规划</a>
              <a href="/share">行程分享</a>
              <a href="/ai-assistant">AI助手</a>
            </div>
          </div>
          <div class="footer-section">
            <h4>联系我们</h4>
            <p>邮箱: contact@smarttravel.com</p>
            <p>电话: 400-123-4567</p>
            <p>地址: 北京市朝阳区建国路88号</p>
          </div>
          <div class="footer-section">
            <h4>服务支持</h4>
            <div class="footer-links">
              <a href="#">关于我们</a>
              <a href="#">隐私政策</a>
              <a href="#">用户协议</a>
              <a href="#">常见问题</a>
              <a href="#">意见反馈</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="logo">
            <span class="logo-text">🌍 智慧旅游</span>
          </div>
          <div class="copyright">
            © 2024 智慧旅游推荐系统. All rights reserved.
          </div>
          <div class="legal-links">
            <a href="#">隐私政策</a>
            <a href="#">用户协议</a>
            <a href="#">Cookie政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const searchKeyword = ref('')
const isLoggedIn = ref(false)
const user = ref({ username: '游客' })
const selectedCity = ref<string[]>([])

const carouselItems = ref([
  { id: 1, title: '杭州西湖', description: '人间天堂，最美西湖', image: 'https://youimg1.c-ctrip.com/target/100d14000000vu15e552D_D_10000_1200.jpg?proc=autoorient' },
  { id: 2, title: '北京故宫', description: '千年紫禁城，中华文明瑰宝', image: 'https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg' },
  { id: 3, title: '张家界', description: '奇峰三千，秀水八百', image: 'https://dimg04.c-ctrip.com/images/100p0y000000m0n4d5A06_C_1180_462.jpg' }
])

// 推荐景点数据
const recommendedAttractions = ref([
  { name: '北京故宫', image: 'https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg', price: 60 },
  { name: '杭州西湖', image: 'https://youimg1.c-ctrip.com/target/100d14000000vu15e552D_D_10000_1200.jpg?proc=autoorient', price: 0 },
  { name: '张家界', image: 'https://dimg04.c-ctrip.com/images/100p0y000000m0n4d5A06_C_1180_462.jpg', price: 248 },
  { name: '广西北海', image: 'https://dimg04.c-ctrip.com/images/10080y000000m1f3e22AD_W_2048_1536.jpg_.webp?_fr=wc', price: 120 },
  { name: '漓江风景名胜区', image: 'https://dimg04.c-ctrip.com/images/01059120005qzc6xp3CF2_W_2048_1536.jpg_.webp?_fr=wc', price: 210 },
  { name: '九寨沟', image: 'https://dimg04.c-ctrip.com/images/0102h1200087cp3l4406C_C_1180_462.jpg', price: 220 }
])

// 热门城市数据
const hotCities = ref([
  { id: 1, name: '北京', attractionCount: 156 },
  { id: 2, name: '上海', attractionCount: 128 },
  { id: 3, name: '广州', attractionCount: 98 },
  { id: 4, name: '深圳', attractionCount: 86 },
  { id: 5, name: '杭州', attractionCount: 112 },
  { id: 6, name: '成都', attractionCount: 134 },
  { id: 7, name: '重庆', attractionCount: 142 },
  { id: 8, name: '西安', attractionCount: 105 },
  { id: 9, name: '南京', attractionCount: 92 },
  { id: 10, name: '武汉', attractionCount: 88 }
])

// 城市数据（包含省份、城市、县区）
const cityData = ref([
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'beijing_city',
        label: '北京市',
        children: [
          { value: 'dongcheng', label: '东城区' },
          { value: 'xicheng', label: '西城区' },
          { value: 'chaoyang', label: '朝阳区' },
          { value: 'haidian', label: '海淀区' },
          { value: 'fengtai', label: '丰台区' },
          { value: 'shijingshan', label: '石景山区' },
          { value: 'tongzhou', label: '通州区' },
          { value: 'shunyi', label: '顺义区' },
          { value: 'changping', label: '昌平区' },
          { value: 'daxing', label: '大兴区' },
          { value: 'mentougou', label: '门头沟区' },
          { value: 'fangshan', label: '房山区' },
          { value: 'pinggu', label: '平谷区' },
          { value: 'huairou', label: '怀柔区' },
          { value: 'miyun', label: '密云区' },
          { value: 'yanqing', label: '延庆区' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'shanghai_city',
        label: '上海市',
        children: [
          { value: 'huangpu', label: '黄浦区' },
          { value: 'xuhui', label: '徐汇区' },
          { value: 'changning', label: '长宁区' },
          { value: 'jingan', label: '静安区' },
          { value: 'putuo', label: '普陀区' },
          { value: 'hongkou', label: '虹口区' },
          { value: 'yangpu', label: '杨浦区' },
          { value: 'minhang', label: '闵行区' },
          { value: 'baoshan', label: '宝山区' },
          { value: 'pudong', label: '浦东新区' },
          { value: 'jinshan', label: '金山区' },
          { value: 'songjiang', label: '松江区' },
          { value: 'qingpu', label: '青浦区' },
          { value: 'fengxian', label: '奉贤区' },
          { value: 'chongming', label: '崇明区' }
        ]
      }
    ]
  },
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'shangcheng', label: '上城区' },
          { value: 'jianggan', label: '江干区' },
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
          { value: 'xiaoshan', label: '萧山区' },
          { value: 'yuhang', label: '余杭区' },
          { value: 'fuyang', label: '富阳区' },
          { value: 'tonglu', label: '桐庐县' },
          { value: '淳安', label: '淳安县' },
          { value: '建德', label: '建德市' },
          { value: 'linan', label: '临安市' }
        ]
      },
      {
        value: 'ningbo',
        label: '宁波市',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
          { value: 'zhenhai', label: '镇海区' },
          { value: 'beilun', label: '北仑区' },
          { value: 'yinzhou', label: '鄞州区' },
          { value: 'xiangshan', label: '象山县' },
          { value: 'ninghai', label: '宁海县' },
          { value: 'yuyao', label: '余姚市' },
          { value: 'cixi', label: '慈溪市' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'yuexiu', label: '越秀区' },
          { value: 'haizhu', label: '海珠区' },
          { value: 'liwan', label: '荔湾区' },
          { value: 'tianhe', label: '天河区' },
          { value: 'baiyun', label: '白云区' },
          { value: 'huangpu', label: '黄埔区' },
          { value: 'panyu', label: '番禺区' },
          { value: 'huadu', label: '花都区' },
          { value: 'nansha', label: '南沙区' },
          { value: '从化', label: '从化区' },
          { value: 'zengcheng', label: '增城区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'luohu', label: '罗湖区' },
          { value: 'futian', label: '福田区' },
          { value: 'nanshan', label: '南山区' },
          { value: 'yantian', label: '盐田区' },
          { value: 'baoan', label: '宝安区' },
          { value: 'longgang', label: '龙岗区' },
          { value: 'longhua', label: '龙华区' },
          { value: 'pingshan', label: '坪山区' },
          { value: 'dapeng', label: '大鹏新区' }
        ]
      }
    ]
  },
  {
    value: 'sichuan',
    label: '四川省',
    children: [
      {
        value: 'chengdu',
        label: '成都市',
        children: [
          { value: 'jinjiang', label: '锦江区' },
          { value: 'qingyang', label: '青羊区' },
          { value: 'wuhou', label: '武侯区' },
          { value: 'jinniu', label: '金牛区' },
          { value: 'chenghua', label: '成华区' },
          { value: 'longquanyi', label: '龙泉驿区' },
          { value: '青白江', label: '青白江区' },
          { value: 'doujiangyan', label: '都江堰市' },
          { value: 'pengzhou', label: '彭州市' },
          { value: 'qionglai', label: '邛崃市' },
          { value: 'dujiangyan', label: '都江堰市' },
          { value: 'xinjin', label: '新津县' },
          { value: 'dayi', label: '大邑县' },
          { value: 'pujiang', label: '蒲江县' },
          { value: 'jintang', label: '金堂县' }
        ]
      }
    ]
  },
  {
    value: 'hunan',
    label: '湖南省',
    children: [
      {
        value: 'zhangjiajie',
        label: '张家界市',
        children: [
          { value: '永定', label: '永定区' },
          { value: 'wulingyuan', label: '武陵源区' },
          { value: '慈利', label: '慈利县' },
          { value: '桑植', label: '桑植县' }
        ]
      }
    ]
  },
  {
    value: 'guangxi',
    label: '广西壮族自治区',
    children: [
      {
        value: 'beihai',
        label: '北海市',
        children: [
          { value: 'haicheng', label: '海城区' },
          { value: 'yinzhou', label: '银海区' },
          { value: 'tiexiangqiao', label: '铁山港区' },
          { value: '合浦', label: '合浦县' }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: '江苏省',
    children: [
      {
        value: 'nanjing',
        label: '南京市',
        children: [
          { value: '玄武', label: '玄武区' },
          { value: '白下', label: '白下区' },
          { value: '秦淮', label: '秦淮区' },
          { value: '建邺', label: '建邺区' },
          { value: '鼓楼', label: '鼓楼区' },
          { value: '下关', label: '下关区' },
          { value: '浦口', label: '浦口区' },
          { value: '栖霞', label: '栖霞区' },
          { value: '雨花台', label: '雨花台区' },
          { value: '江宁', label: '江宁区' },
          { value: '六合', label: '六合区' },
          { value: '溧水', label: '溧水县' },
          { value: '高淳', label: '高淳县' }
        ]
      }
    ]
  }
])

// 级联选择器配置
const cascaderProps = {
  expandTrigger: 'hover',
  label: 'label',
  value: 'value',
  children: 'children'
}

// 导航到城市景点页面
const navigateToCityAttractions = (cityName: string) => {
  router.push(`/attractions?city=${encodeURIComponent(cityName)}`)
}

// 处理城市选择变化
const handleCityChange = (value: string[]) => {
  if (value && value.length > 0) {
    // 获取选中的城市名称
    const selectedOptions = cityData.value
    let cityName = ''
    
    // 查找选中的城市
    for (const province of selectedOptions) {
      if (province.value === value[0]) {
        if (value.length > 1) {
          for (const city of province.children) {
            if (city.value === value[1]) {
              cityName = city.label
              break
            }
          }
        }
        break
      }
    }
    
    if (cityName) {
      navigateToCityAttractions(cityName)
    }
  }
}

// 滚动监听处理
let observer: IntersectionObserver | null = null

const initScrollReveal = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
        // 一次性动画，观察到后即可停止观察
        observer?.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
  scrollRevealElements.forEach(el => observer?.observe(el))
}

// 生命周期钩子
onMounted(() => {
  initScrollReveal()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const handleSearch = () => {
  if (searchKeyword.value) {
    router.push(`/attractions?search=${searchKeyword.value}`)
  }
}

const logout = () => {
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<style scoped lang="scss">
.home-page {
  .main-content {
    display: flex;
    min-height: calc(100vh - 60px);
  }
  
  // 城市侧边栏
  .city-sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #E2E8F0;
    padding: 32px 24px;
    position: sticky;
    top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    
    .sidebar-header {
      margin-bottom: 24px;
      
      h3 {
        font-size: 20px;
        font-weight: 700;
        color: $text-primary;
        margin-bottom: 8px;
      }
      
      p {
        font-size: 14px;
        color: $text-secondary;
      }
    }
    
    .city-selector {
      margin-bottom: 32px;
      
      .city-cascader {
        width: 100%;
        
        .el-cascader__wrapper {
          border-radius: $border-radius-lg;
          border: 1px solid #E2E8F0;
          transition: all 0.3s ease;
          
          &:hover {
            border-color: $primary-color;
          }
          
          &.is-focus {
            border-color: $primary-color;
            box-shadow: 0 0 0 3px rgba(93, 201, 185, 0.1);
          }
        }
      }
    }
    
    .city-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .city-item {
      padding: 16px 20px;
      border-radius: $border-radius-lg;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid #E2E8F0;
      
      &:hover {
        background: rgba(93, 201, 185, 0.1);
        border-color: $primary-color;
        transform: translateX(4px);
      }
      
      .city-name {
        font-size: 16px;
        font-weight: 600;
        color: $text-primary;
        margin-bottom: 4px;
      }
      
      .city-count {
        font-size: 12px;
        color: $text-secondary;
      }
    }
  }
  
  // 主内容区
  .content-area {
    flex: 1;
    background: $travel-bg;
  }
  
  // 搜索区域
  .search-section {
    background: white;
    padding: 32px 0;
    border-bottom: 1px solid #E2E8F0;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .search-box {
      display: flex;
      gap: 16px;
      background: #F8FAFC;
      border-radius: $border-radius-xl;
      padding: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      
      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        
        .el-input__wrapper {
          border: none;
          box-shadow: none;
          background: transparent;
        }
        
        .el-input__prefix {
          color: $text-secondary;
        }
      }
      
      .el-button {
        border-radius: $border-radius-lg;
        padding: 12px 32px;
        font-weight: 600;
        font-size: 16px;
        background: linear-gradient(135deg, #58C9B9 0%, #6DA5C0 100%);
        border: none;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(93, 201, 185, 0.4);
          background: linear-gradient(135deg, #6DA5C0 0%, #58C9B9 100%);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
  
  // 动画定义
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .carousel-section {
    padding: 60px 0;
    background: white;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .el-carousel {
      border-radius: $border-radius-2xl;
      overflow: hidden;
      box-shadow: $box-shadow-hover;
      
      .el-carousel__item {
        transition: transform 0.5s ease;
        
        &:hover {
          transform: scale(1.02);
        }
      }
      
      .el-carousel__indicators {
        bottom: 20px;
        
        .el-carousel__button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          
          &:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.2);
          }
          
          &.is-active {
            background: white;
            width: 30px;
            border-radius: 6px;
          }
        }
      }
      
      .el-carousel__arrow {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        font-size: 20px;
        
        &:hover {
          background: rgba(255, 255, 255, 0.4);
          transform: scale(1.1);
        }
      }
    }
    
    .carousel-image {
      width: 100%;
      height: 450px;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .carousel-caption {
      position: absolute;
      bottom: 60px;
      left: 60px;
      color: white;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      animation: fadeInUp 0.8s ease-out;
      
      h3 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 16px;
        line-height: 1.2;
      }
      
      p {
        font-size: 18px;
        margin-bottom: 24px;
        opacity: 0.9;
      }
      
      .btn-explore {
        display: inline-block;
        padding: 12px 32px;
        background: rgba(255, 255, 255, 0.95);
        color: $travel-primary;
        border-radius: $border-radius-full;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        
        &:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  
  .recommend-section {
    padding: 80px 0;
    background: $travel-bg;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      
      h2 {
        font-size: 32px;
        font-weight: 700;
        color: $text-primary;
        position: relative;
        padding-bottom: 12px;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, $primary-color, $travel-secondary);
          border-radius: 2px;
        }
      }
      
      .view-all {
        color: $primary-color;
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        
        &:hover {
          color: $primary-dark;
          transform: translateX(4px);
        }
      }
    }
    
    .attraction-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 32px;
    }
    
    .attraction-card {
      background: white;
      border-radius: $border-radius-xl;
      overflow: hidden;
      box-shadow: $box-shadow-base;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: $box-shadow-hover;
        
        img {
          transform: scale(1.05);
        }
        
        .attraction-badge {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .attraction-image-container {
        position: relative;
        overflow: hidden;
        height: 220px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .attraction-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(88, 201, 185, 0.9);
          color: white;
          padding: 6px 12px;
          border-radius: $border-radius-full;
          font-size: 12px;
          font-weight: 600;
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
        }
      }
      
      .attraction-info {
        padding: 20px;
        
        h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: $text-primary;
          line-height: 1.3;
        }
        
        .attraction-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          
          .rating-stars {
            color: #F59E0B;
            font-size: 14px;
          }
          
          .rating-count {
            color: $text-secondary;
            font-size: 14px;
          }
        }
        
        .attraction-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 16px;
          
          .price {
            color: #EF4444;
            font-weight: 700;
            font-size: 22px;
          }
          
          .btn-view {
            background: $primary-color;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: $border-radius-lg;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
              background: $primary-dark;
              transform: translateY(-2px);
            }
          }
        }
      }
    }
  }
  
  .features-section {
    padding: 80px 0;
    background: white;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 10% 20%, rgba(88, 201, 185, 0.05) 0%, rgba(109, 165, 192, 0.05) 100%);
      pointer-events: none;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 60px;
      
      h2 {
        font-size: 32px;
        font-weight: 700;
        color: $text-primary;
        margin-bottom: 16px;
      }
      
      p {
        font-size: 18px;
        color: $text-secondary;
        max-width: 600px;
        margin: 0 auto;
      }
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
    }
    
    .feature-card {
      text-align: center;
      padding: 40px 32px;
      border-radius: $border-radius-xl;
      background: rgba(241, 245, 249, 0.5);
      cursor: pointer;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(226, 232, 240, 0.5);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(88, 201, 185, 0.1), transparent);
        transition: left 0.6s ease;
      }
      
      &:hover {
        background: white;
        color: $text-primary;
        transform: translateY(-8px);
        box-shadow: $box-shadow-hover;
        border-color: $primary-color;
        
        &::before {
          left: 100%;
        }
        
        .feature-icon {
          transform: scale(1.15) rotate(5deg);
          color: $primary-color;
        }
        
        .feature-content {
          transform: translateY(-5px);
        }
      }
      
      .feature-icon {
        font-size: 64px;
        margin-bottom: 24px;
        transition: all 0.4s ease;
        position: relative;
        z-index: 1;
      }
      
      .feature-content {
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease;
        
        h3 {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 12px;
          color: $text-primary;
        }
        
        p {
          font-size: 15px;
          color: $text-secondary;
          line-height: 1.6;
        }
      }
      
      .feature-arrow {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 16px;
        color: $text-secondary;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(10px);
      }
      
      &:hover .feature-arrow {
        opacity: 1;
        transform: translateX(0);
        color: $primary-color;
      }
    }
  }
  
  .footer {
    background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
    color: white;
    padding: 80px 0 40px;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
      pointer-events: none;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 60px;
      margin-bottom: 60px;
    }
    
    .footer-section {
      h4 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 24px;
        color: white;
        position: relative;
        padding-bottom: 12px;
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, $primary-color, $travel-secondary);
          border-radius: 2px;
        }
      }
      
      p {
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 16px;
        font-size: 15px;
        line-height: 1.6;
      }
      
      .footer-links {
        display: flex;
        flex-direction: column;
        gap: 12px;
        
        a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 15px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          
          &:hover {
            color: white;
            transform: translateX(4px);
          }
        }
      }
      
      .social-links {
        display: flex;
        gap: 16px;
        margin-top: 20px;
        
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 20px;
          transition: all 0.3s ease;
          
          &:hover {
            background: $primary-color;
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          }
        }
      }
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .logo {
        margin-bottom: 24px;
        
        .logo-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #58C9B9 0%, #6DA5C0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      
      .copyright {
        text-align: center;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
        margin-bottom: 16px;
      }
      
      .legal-links {
        display: flex;
        gap: 24px;
        margin-top: 16px;
        
        a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
          
          &:hover {
            color: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .home-page {
    .main-content {
      flex-direction: column;
    }
    
    .city-sidebar {
      width: 100%;
      height: auto;
      position: static;
      border-right: none;
      border-bottom: 1px solid #E2E8F0;
      padding: 24px;
      
      .city-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
      }
      
      .city-item {
        text-align: center;
        padding: 12px;
      }
    }
    
    .container {
      padding: 0 20px;
    }
    
    .header {
      .container {
        padding: 0 20px;
      }
    }
    
    .attraction-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }
    
    .features-grid {
      gap: 32px;
    }
  }
}

@media (max-width: 992px) {
  .home-page {
    .carousel-section {
      padding: 40px 0;
      
      .el-carousel {
        height: 400px;
      }
      
      .carousel-image {
        height: 400px;
      }
      
      .carousel-caption {
        bottom: 40px;
        left: 40px;
        
        h3 {
          font-size: 28px;
        }
        
        p {
          font-size: 16px;
        }
      }
    }
    
    .recommend-section {
      padding: 60px 0;
      
      .section-header {
        h2 {
          font-size: 28px;
        }
      }
    }
    
    .features-section {
      padding: 60px 0;
      
      .section-header {
        h2 {
          font-size: 28px;
        }
        
        p {
          font-size: 16px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home-page {
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
    
    .city-sidebar {
      padding: 16px;
      
      .city-list {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
      }
      
      .city-item {
        padding: 10px;
        
        .city-name {
          font-size: 14px;
        }
        
        .city-count {
          font-size: 12px;
        }
      }
    }
    
    .search-section {
      padding: 20px 0;
      
      .container {
        padding: 0 16px;
      }
      
      .search-box {
        flex-direction: column;
        gap: 12px;
        
        .el-button {
          width: 100%;
        }
      }
    }
    
    .carousel-section {
      padding: 30px 0;
      
      .container {
        padding: 0 16px;
      }
      
      .el-carousel {
        height: 300px;
      }
      
      .carousel-image {
        height: 300px;
      }
      
      .carousel-caption {
        bottom: 20px;
        left: 20px;
        
        h3 {
          font-size: 20px;
        }
        
        p {
          font-size: 14px;
          margin-bottom: 16px;
        }
        
        .btn-explore {
          padding: 8px 20px;
          font-size: 14px;
        }
      }
      
      .el-carousel__arrow {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }
    }
    
    .recommend-section {
      padding: 50px 0;
      
      .container {
        padding: 0 16px;
      }
      
      .section-header {
        h2 {
          font-size: 24px;
        }
        
        .view-all {
          font-size: 14px;
        }
      }
      
      .attraction-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .attraction-card {
        .attraction-image-container {
          height: 200px;
        }
        
        .attraction-info {
          padding: 16px;
          
          h3 {
            font-size: 18px;
          }
          
          .attraction-price {
            .price {
              font-size: 20px;
            }
            
            .btn-view {
              padding: 6px 12px;
              font-size: 12px;
            }
          }
        }
      }
    }
    
    .features-section {
      padding: 50px 0;
      
      .container {
        padding: 0 16px;
      }
      
      .section-header {
        h2 {
          font-size: 24px;
        }
        
        p {
          font-size: 14px;
        }
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .feature-card {
        padding: 32px 24px;
        
        .feature-icon {
          font-size: 56px;
        }
        
        .feature-content {
          h3 {
            font-size: 20px;
          }
          
          p {
            font-size: 14px;
          }
        }
      }
    }
    
    .footer {
      padding: 60px 0 30px;
      
      .container {
        padding: 0 16px;
      }
      
      .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      
      .footer-section {
        h4 {
          font-size: 18px;
        }
        
        .social-links {
          justify-content: center;
        }
      }
      
      .footer-bottom {
        .legal-links {
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .home-page {
    .header {
      .container {
        padding: 0 12px;
      }
    }
    
    .city-sidebar {
      .sidebar-header {
        h3 {
          font-size: 18px;
        }
      }
      
      .city-list {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }
      
      .city-item {
        .city-name {
          font-size: 13px;
        }
      }
    }
    
    .carousel-section {
      .el-carousel {
        height: 250px;
      }
      
      .carousel-image {
        height: 250px;
      }
      
      .carousel-caption {
        h3 {
          font-size: 18px;
        }
      }
    }
    
    .recommend-section {
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
    }
    
    .footer {
      .footer-content {
        gap: 32px;
      }
    }
  }
}
</style>
EOF