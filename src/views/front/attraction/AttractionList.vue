
<template>
  <div class="attraction-list-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>景点推荐</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="filter-section animate-fade-in">
      <div class="container">
        <div class="section-title">
          <h2>发现精彩景点</h2>
          <p>探索全国各地的热门景点，规划您的完美旅程</p>
        </div>
        
        <div class="search-filter">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索景点名称"
            class="search-input"
            @keyup.enter="handleSearch"
            prefix-icon="Search"
          />
          
          <div class="filter-options">
            <el-select v-model="selectedCity" placeholder="选择城市" class="filter-select">
              <el-option label="全部城市" value="" />
              <el-option label="北京" value="beijing" />
              <el-option label="上海" value="shanghai" />
              <el-option label="杭州" value="hangzhou" />
              <el-option label="成都" value="chengdu" />
            </el-select>
            
            <el-select v-model="selectedType" placeholder="景点类型" class="filter-select">
              <el-option label="全部类型" value="" />
              <el-option label="自然风光" value="nature" />
              <el-option label="历史古迹" value="historical" />
              <el-option label="主题公园" value="theme-park" />
              <el-option label="博物馆" value="museum" />
            </el-select>
            
            <el-select v-model="sortBy" placeholder="排序方式" class="filter-select">
              <el-option label="智能排序" value="smart" />
              <el-option label="评分最高" value="rating" />
              <el-option label="价格最低" value="price-low" />
              <el-option label="价格最高" value="price-high" />
            </el-select>
            
            <el-button type="primary" @click="handleSearch" class="search-btn">
              <el-icon><Search /></el-icon> 搜索
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 热门推荐标签 -->
    <div class="tags-section">
      <div class="container">
        <div class="popular-tags">
          <span class="tags-title">热门标签：</span>
          <el-tag 
            v-for="tag in popularTags" 
            :key="tag"
            class="popular-tag"
            @click="handleTagClick(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 景点列表 -->
    <div class="attraction-list-section">
      <div class="container">
        <!-- 视图切换 -->
        <div class="view-toggle">
          <el-button-group>
            <el-button 
              :type="viewMode === 'grid' ? 'primary' : 'default'"
              @click="viewMode = 'grid'"
            >
              <el-icon><Grid /></el-icon> 网格视图
            </el-button>
            <el-button 
              :type="viewMode === 'list' ? 'primary' : 'default'"
              @click="viewMode = 'list'"
            >
              <el-icon><List /></el-icon> 列表视图
            </el-button>
          </el-button-group>
        </div>

        <!-- 网格视图 -->
        <div v-if="viewMode === 'grid'" class="attraction-grid">
          <div 
            v-for="attraction in filteredAttractions" 
            :key="attraction.id"
            class="attraction-item animate-fade-in"
            @click="$router.push(`/attractions/${attraction.id}`)"
          >
            <div class="attraction-image">
              <img :src="attraction.image" :alt="attraction.name" />
              <div class="attraction-tag" :class="attraction.type">
                {{ attraction.typeText }}
              </div>
              <div class="attraction-price">¥{{ attraction.price }}</div>
              <div class="attraction-rating-badge">
                <el-icon><Star /></el-icon>
                {{ attraction.rating.toFixed(1) }}
              </div>
            </div>
            <div class="attraction-info">
              <h3>{{ attraction.name }}</h3>
              <div class="attraction-meta">
                <span class="location">
                  <el-icon><Location /></el-icon>
                  {{ attraction.location }}
                </span>
                <span class="reviews">{{ attraction.reviews }}条评价</span>
              </div>
              <p class="description">{{ attraction.description }}</p>
              <div class="attraction-actions">
                <el-button type="primary" size="small" @click.stop="handleBook(attraction)" class="book-btn">
                  立即预订
                </el-button>
                <el-button size="small" @click.stop="handleLike(attraction)" class="like-btn">
                  <el-icon><Star /></el-icon> 收藏
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 列表视图 -->
        <div v-else class="attraction-list">
          <div 
            v-for="attraction in filteredAttractions" 
            :key="attraction.id"
            class="attraction-list-item animate-fade-in"
            @click="$router.push(`/attractions/${attraction.id}`)"
          >
            <div class="attraction-list-image">
              <img :src="attraction.image" :alt="attraction.name" />
              <div class="attraction-tag" :class="attraction.type">
                {{ attraction.typeText }}
              </div>
            </div>
            <div class="attraction-list-info">
              <div class="attraction-list-header">
                <h3>{{ attraction.name }}</h3>
                <div class="attraction-list-price">¥{{ attraction.price }}</div>
              </div>
              <div class="attraction-list-meta">
                <span class="location">
                  <el-icon><Location /></el-icon>
                  {{ attraction.location }}
                </span>
                <span class="rating">
                  <el-icon><Star /></el-icon>
                  {{ attraction.rating.toFixed(1) }} ({{ attraction.reviews }}条评价)
                </span>
              </div>
              <p class="attraction-list-description">{{ attraction.description }}</p>
              <div class="attraction-list-actions">
                <el-button type="primary" size="small" @click.stop="handleBook(attraction)" class="book-btn">
                  立即预订
                </el-button>
                <el-button size="small" @click.stop="handleLike(attraction)" class="like-btn">
                  <el-icon><Star /></el-icon> 收藏
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[12, 24, 36, 48]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            class="custom-pagination"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Location, Star, Grid, List } from '@element-plus/icons-vue'

const router = useRouter()

const searchKeyword = ref('')
const selectedCity = ref('')
const selectedType = ref('')
const sortBy = ref('smart')
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(120)
const viewMode = ref('grid')
const popularTags = ref(['热门景点', '亲子游', '周末好去处', '拍照打卡', '自然风光', '历史古迹'])

// 模拟景点数据
const attractions = ref([
  {
    id: 1,
    name: '北京故宫',
    type: 'historical',
    typeText: '历史古迹',
    image: 'https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg',
    location: '北京',
    rating: 4.9,
    reviews: 3567,
    price: 60,
    description: '明清两代的皇家宫殿，中国现存最大、最完整的古代宫殿建筑群'
  },
  {
    id: 2,
    name: '杭州西湖',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://youimg1.c-ctrip.com/target/100d14000000vu15e552D_D_10000_1200.jpg?proc=autoorient',
    location: '浙江杭州',
    rating: 4.8,
    reviews: 2456,
    price: 0,
    description: '杭州西湖风景名胜区，以秀丽的湖光山色和众多的名胜古迹闻名中外'
  },
  {
    id: 3,
    name: '张家界',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/100p0y000000m0n4d5A06_C_1180_462.jpg',
    location: '湖南张家界',
    rating: 4.7,
    reviews: 1890,
    price: 248,
    description: '以奇峰三千、秀水八百而闻名，世界自然遗产'
  },
  {
    id: 4,
    name: '广西北海',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/10080y000000m1f3e22AD_W_2048_1536.jpg_.webp?_fr=wc',
    location: '广西北海',
    rating: 4.6,
    reviews: 1234,
    price: 120,
    description: '美丽的海滨城市，拥有银滩等著名景点'
  },
  {
    id: 5,
    name: '漓江风景名胜区',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/01059120005qzc6xp3CF2_W_2048_1536.jpg_.webp?_fr=wc',
    location: '广西桂林',
    rating: 4.8,
    reviews: 2109,
    price: 210,
    description: '桂林山水甲天下，漓江风光最为著名'
  },
  {
    id: 6,
    name: '九寨沟',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/0102h1200087cp3l4406C_C_1180_462.jpg',
    location: '四川阿坝',
    rating: 4.9,
    reviews: 2890,
    price: 220,
    description: '以翠海、叠瀑、彩林、雪峰、藏情、蓝冰"六绝"著称'
  },
  {
    id: 7,
    name: '赛里木湖',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/100i13000000tdhdx7D26_W_2048_1536.jpg_.webp?_fr=wc',
    location: '新疆博尔塔拉',
    rating: 4.8,
    reviews: 1567,
    price: 145,
    description: '新疆海拔最高、面积最大的高山湖泊'
  },
  {
    id: 8,
    name: '长白山',
    type: 'nature',
    typeText: '自然风光',
    image: 'https://dimg04.c-ctrip.com/images/100j1f000001gpqpoCFE1_C_1180_462.jpg',
    location: '吉林延边',
    rating: 4.7,
    reviews: 1789,
    price: 190,
    description: '东北第一高峰，以天池、温泉、瀑布等景观著称'
  },
  {
    id: 9,
    name: '布达拉宫',
    type: 'historical',
    typeText: '历史古迹',
    image: 'https://dimg04.c-ctrip.com/images/100t14000000w9glyAC31_W_2048_1536.jpg_.webp?_fr=wc',
    location: '西藏拉萨',
    rating: 4.9,
    reviews: 3210,
    price: 200,
    description: '世界上海拔最高的古代宫殿，藏传佛教圣地'
  },
  // 更多景点数据...
  ...Array.from({ length: 3 }, (_, i) => ({
    id: i + 10,
    name: `景点 ${i + 10}`,
    type: ['nature', 'historical', 'theme-park'][i % 3],
    typeText: ['自然风光', '历史古迹', '主题公园'][i % 3],
    image: 'https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg',
    location: ['北京', '上海', '杭州', '成都'][i % 4],
    rating: 4.5 + Math.random() * 0.4,
    reviews: 1000 + Math.floor(Math.random() * 2000),
    price: 100 + Math.floor(Math.random() * 200),
    description: '这是一个非常美丽的景点，适合全家出游和拍照打卡'
  }))
])

// 筛选后的景点列表
const filteredAttractions = computed(() => {
  let result = [...attractions.value]
  
  // 按搜索关键词筛选
  if (searchKeyword.value) {
    result = result.filter(item => 
      item.name.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  
  // 按城市筛选
  if (selectedCity.value) {
    result = result.filter(item => 
      item.location.includes(selectedCity.value)
    )
  }
  
  // 按类型筛选
  if (selectedType.value) {
    result = result.filter(item => 
      item.type === selectedType.value
    )
  }
  
  // 排序
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    default:
      // 智能排序
      result.sort((a, b) => (b.rating * 0.7 + b.reviews * 0.3) - (a.rating * 0.7 + a.reviews * 0.3))
  }
  
  return result
})

const handleSearch = () => {
  console.log('搜索:', searchKeyword.value)
  // 重置页码
  currentPage.value = 1
}

const handleTagClick = (tag: string) => {
  console.log('标签点击:', tag)
  // 这里可以根据标签进行筛选
  searchKeyword.value = tag
  handleSearch()
}

const handleBook = (attraction: any) => {
  ElMessage.success(`预订 ${attraction.name}`)
}

const handleLike = (attraction: any) => {
  ElMessage.success(`收藏 ${attraction.name}`)
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  // 重新加载数据
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 重新加载数据
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.attraction-list-page {
  .breadcrumb {
    padding: 20px 0;
    background: white;
    border-bottom: 1px solid $border-base;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  }
  
  .filter-section {
    padding: 40px 0;
    background: $gradient-primary;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
      opacity: 0.5;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    
    .section-title {
        text-align: center;
        margin-bottom: 30px;
        
        h2 {
          font-size: 32px;
          font-weight: bold;
          color: white;
          margin-bottom: 10px;
        }
        
        p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    
    .search-filter {
      display: flex;
      flex-direction: column;
      gap: 24px;
      
      .search-input {
        max-width: 600px;
        margin: 0 auto;
        transition: all 0.3s ease;
        background: white;
        border-radius: $border-radius-lg;
        
        &:hover {
          box-shadow: 0 4px 12px rgba($primary-color, 0.2);
        }
      }
      
      .filter-options {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        
        .filter-select {
          width: 200px;
          transition: all 0.3s ease;
          background: white;
          border-radius: $border-radius-lg;
          
          &:hover {
            box-shadow: 0 4px 12px rgba($primary-color, 0.2);
          }
        }
        
        .search-btn {
          transition: all 0.3s ease;
          background: $gradient-secondary;
          border: none;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($primary-color, 0.3);
          }
        }
      }
    }
  }
  
  .tags-section {
    padding: 20px 0;
    background: white;
    border-bottom: 1px solid rgba($primary-color, 0.1);
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .popular-tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      
      .tags-title {
        font-size: 14px;
        color: $text-secondary;
        font-weight: 500;
      }
      
      .popular-tag {
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba($primary-color, 0.1);
        color: $text-secondary;
        border: 1px solid rgba($primary-color, 0.2);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba($primary-color, 0.2);
          background: rgba($primary-color, 0.2);
        }
      }
    }
  }
  
  .attraction-list-section {
    padding: 50px 0;
    background: $travel-light;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .view-toggle {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 30px;
    }
    
    .attraction-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 28px;
      margin-bottom: 40px;
    }
    
    .attraction-item {
      background: white;
      border-radius: $border-radius-xl;
      overflow: hidden;
      box-shadow: $box-shadow-base;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      border: 1px solid rgba($primary-color, 0.1);
      
      &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba($primary-color, 0.15);
        border-color: rgba($primary-color, 0.3);
      }
      
      .attraction-image {
        position: relative;
        height: 220px;
        overflow: hidden;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        &:hover img {
          transform: scale(1.1);
        }
        
        .attraction-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 6px 16px;
          border-radius: $border-radius-full;
          font-size: 12px;
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
          
          &.nature {
            background: $gradient-primary;
          }
          
          &.historical {
            background: $gradient-secondary;
          }
          
          &.theme-park {
            background: $gradient-accent;
          }
          
          &.museum {
            background: $gradient-deep;
          }
        }
        
        .attraction-price {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: $gradient-secondary;
          color: white;
          padding: 8px 16px;
          border-radius: $border-radius-full;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        
        .attraction-rating-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          color: $primary-color;
          padding: 6px 12px;
          border-radius: $border-radius-full;
          font-weight: bold;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
        }
      }
      
      .attraction-info {
        padding: 20px;
        
        h3 {
          font-size: 20px;
          margin-bottom: 12px;
          color: $text-primary;
          transition: all 0.3s ease;
          
          &:hover {
            color: $primary-color;
          }
        }
        
        .attraction-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 13px;
          color: $text-placeholder;
          
          .location, .reviews {
            display: flex;
            align-items: center;
            gap: 6px;
          }
        }
        
        .description {
          font-size: 14px;
          color: $text-secondary;
          line-height: 1.5;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .attraction-actions {
          display: flex;
          gap: 10px;
          
          .book-btn {
            background: $gradient-secondary;
            border: none;
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba($primary-color, 0.3);
            }
          }
          
          .like-btn {
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              color: $primary-color;
              border-color: $primary-color;
            }
          }
        }
      }
    }
    
    .attraction-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .attraction-list-item {
      background: white;
      border-radius: $border-radius-xl;
      overflow: hidden;
      box-shadow: $box-shadow-base;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      gap: 20px;
      padding: 20px;
      border: 1px solid rgba($primary-color, 0.1);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba($primary-color, 0.15);
        border-color: rgba($primary-color, 0.3);
      }
      
      .attraction-list-image {
        width: 200px;
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: $border-radius-lg;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        &:hover img {
          transform: scale(1.05);
        }
        
        .attraction-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 4px 12px;
          border-radius: $border-radius-full;
          font-size: 12px;
          color: white;
          font-weight: 500;
          
          &.nature {
            background: $gradient-primary;
          }
          
          &.historical {
            background: $gradient-secondary;
          }
          
          &.theme-park {
            background: $gradient-accent;
          }
          
          &.museum {
            background: $gradient-deep;
          }
        }
      }
      
      .attraction-list-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .attraction-list-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          
          h3 {
            font-size: 20px;
            color: $text-primary;
            margin: 0;
            transition: all 0.3s ease;
            
            &:hover {
              color: $primary-color;
            }
          }
          
          .attraction-list-price {
            font-size: 20px;
            font-weight: bold;
            color: $primary-color;
          }
        }
        
        .attraction-list-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 12px;
          font-size: 13px;
          color: $text-placeholder;
          
          .location, .rating {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          
          .rating {
            color: $primary-color;
          }
        }
        
        .attraction-list-description {
          font-size: 14px;
          color: $text-placeholder;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        
        .attraction-list-actions {
          display: flex;
          gap: 10px;
          
          .book-btn {
            background: $gradient-secondary;
            border: none;
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba($primary-color, 0.3);
            }
          }
          
          .like-btn {
            transition: all 0.3s ease;
            
            &:hover {
              transform: translateY(-2px);
              color: $primary-color;
              border-color: $primary-color;
            }
          }
        }
      }
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      padding-top: 40px;
      border-top: 1px solid rgba($primary-color, 0.1);
      
      .custom-pagination {
        .el-pagination__item {
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-2px);
            color: $primary-color;
          }
        }
        
        .el-pagination__item.active {
          transform: translateY(-2px);
          background: $primary-color;
          border-color: $primary-color;
        }
      }
    }
  }
}

// 动画效果
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
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

// 响应式设计
@media (max-width: 1200px) {
  .attraction-list-page {
    .container {
      padding: 0 20px;
    }
  }
}

@media (max-width: 992px) {
  .attraction-list-page {
    .filter-section {
      .filter-options {
        flex-direction: column;
        align-items: stretch;
        
        .filter-select {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .search-btn {
          max-width: 400px;
          margin: 0 auto;
        }
      }
    }
    
    .attraction-list-section {
      .attraction-grid {
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
    }
  }
}

@media (max-width: 768px) {
  .attraction-list-page {
    .filter-section {
      padding: 30px 0;
      
      .section-title {
        h2 {
          font-size: 24px;
        }
        
        p {
          font-size: 14px;
        }
      }
    }
    
    .attraction-list-section {
      padding: 30px 0;
      
      .attraction-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .attraction-item {
        .attraction-image {
          height: 180px;
        }
        
        .attraction-info {
          padding: 16px;
          
          h3 {
            font-size: 18px;
          }
        }
      }
      
      .attraction-list-item {
        flex-direction: column;
        padding: 16px;
        
        .attraction-list-image {
          width: 100%;
          height: 200px;
        }
        
        .attraction-list-info {
          .attraction-list-header {
            h3 {
              font-size: 18px;
            }
            
            .attraction-list-price {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .attraction-list-page {
    .filter-section {
      .search-filter {
        .search-input {
          width: 100%;
        }
      }
    }
    
    .tags-section {
      .popular-tags {
        flex-direction: column;
        align-items: flex-start;
        
        .tags-title {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
EOF