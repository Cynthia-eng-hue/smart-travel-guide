
<template>
  <div class="hotel-list-page">
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <div class="container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 搜索筛选区域 -->
    <div class="search-section">
      <div class="container">
        <div class="search-card">
          <el-form :model="searchForm" label-width="80px">
            <div class="search-row">
              <el-form-item label="城市">
                <el-select
                  v-model="searchForm.city"
                  placeholder="选择城市"
                  style="width: 200px"
                >
                  <el-option label="北京" value="beijing" />
                  <el-option label="上海" value="shanghai" />
                  <el-option label="杭州" value="hangzhou" />
                  <el-option label="成都" value="chengdu" />
                  <el-option label="广州" value="guangzhou" />
                  <el-option label="深圳" value="shenzhen" />
                </el-select>
              </el-form-item>

              <el-form-item label="入住日期">
                <el-date-picker
                  v-model="searchForm.checkIn"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px"
                />
              </el-form-item>

              <el-form-item label="离店日期">
                <el-date-picker
                  v-model="searchForm.checkOut"
                  type="date"
                  placeholder="选择日期"
                  style="width: 200px"
                />
              </el-form-item>

              <el-form-item label="房型">
                <el-select
                  v-model="searchForm.roomType"
                  placeholder="选择房型"
                  style="width: 200px"
                >
                  <el-option label="大床房" value="big-bed" />
                  <el-option label="双床房" value="double-bed" />
                  <el-option label="家庭房" value="family" />
                  <el-option label="套房" value="suite" />
                </el-select>
              </el-form-item>
            </div>

            <div class="search-row">
              <el-form-item label="价格范围">
                <el-slider
                  v-model="searchForm.priceRange"
                  range
                  :min="100"
                  :max="2000"
                  :step="100"
                  style="width: 300px"
                />
                <span class="price-text">
                  {{ searchForm.priceRange[0] }} - {{ searchForm.priceRange[1] }}元
                </span>
              </el-form-item>

              <el-form-item label="星级">
                <el-rate
                  v-model="searchForm.starRating"
                  :max="5"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
              </el-form-item>

              <el-form-item label="设施">
                <el-checkbox-group v-model="searchForm.facilities">
                  <el-checkbox label="免费WiFi">免费WiFi</el-checkbox>
                  <el-checkbox label="免费停车">免费停车</el-checkbox>
                  <el-checkbox label="游泳池">游泳池</el-checkbox>
                  <el-checkbox label="健身房">健身房</el-checkbox>
                  <el-checkbox label="餐厅">餐厅</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>

            <div class="search-actions">
              <el-button type="primary" size="large" @click="handleSearch">
                <el-icon><Search /></el-icon>
                搜索酒店
              </el-button>
              <el-button @click="resetSearch">
                重置
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 热门推荐 -->
    <section class="recommend-section">
      <div class="container">
        <div class="section-header">
          <h2>热门酒店推荐</h2>
          <div class="sort-options">
            <el-radio-group v-model="sortBy" @change="handleSortChange">
              <el-radio-button label="recommend">智能推荐</el-radio-button>
              <el-radio-button label="price-low">价格从低到高</el-radio-button>
              <el-radio-button label="price-high">价格从高到低</el-radio-button>
              <el-radio-button label="rating">评分最高</el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <div class="hotel-grid">
          <div
            v-for="hotel in filteredHotels"
            :key="hotel.id"
            class="hotel-card"
            @click="$router.push(`/hotels/${hotel.id}`)"
          >
            <div class="hotel-image">
              <img :src="hotel.image" :alt="hotel.name" />
              <div class="hotel-tags">
                <span class="tag star">{{ hotel.star }}星级</span>
                <span class="tag discount" v-if="hotel.discount">立减{{ hotel.discount }}元</span>
              </div>
              <div class="hotel-favorite" @click.stop="toggleFavorite(hotel)">
                <el-icon :color="hotel.isFavorite ? '#ff6b6b' : '#999'">
                  <StarFilled v-if="hotel.isFavorite" />
                  <Star v-else />
                </el-icon>
              </div>
            </div>
            <div class="hotel-info">
              <h3>{{ hotel.name }}</h3>
              <div class="hotel-meta">
                <span class="location">
                  <el-icon><Location /></el-icon>
                  {{ hotel.location }}
                </span>
                <span class="rating">
                  <el-rate
                    v-model="hotel.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}"
                  />
                  <span class="review-count">({{ hotel.reviews }}评价)</span>
                </span>
              </div>
              <div class="hotel-facilities">
                <span v-for="facility in hotel.facilities.slice(0, 3)" :key="facility" class="facility">
                  {{ facility }}
                </span>
                <span v-if="hotel.facilities.length > 3" class="more">+{{ hotel.facilities.length - 3 }}</span>
              </div>
              <div class="hotel-price">
                <div class="price-info">
                  <span class="current-price">¥{{ hotel.price }}</span>
                  <span class="unit">起/晚</span>
                  <span class="original-price" v-if="hotel.originalPrice">¥{{ hotel.originalPrice }}</span>
                </div>
                <el-button type="primary" size="small" @click.stop="handleQuickBook(hotel)">
                  立即预订
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 地图模式切换 -->
        <div class="view-toggle">
          <el-button-group>
            <el-button :type="viewMode === 'list' ? 'primary' : ''" @click="viewMode = 'list'">
              <el-icon><Menu /></el-icon> 列表视图
            </el-button>
            <el-button :type="viewMode === 'map' ? 'primary' : ''" @click="viewMode = 'map'">
              <el-icon><MapLocation /></el-icon> 地图视图
            </el-button>
          </el-button-group>
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalHotels"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </section>

    <!-- 特色推荐 -->
    <section class="feature-section">
      <div class="container">
        <h2>特色住宿推荐</h2>
        <div class="feature-grid">
          <div class="feature-item boutique">
            <div class="feature-icon">🏨</div>
            <h3>精品民宿</h3>
            <p>感受当地风情，体验特色住宿</p>
            <el-button type="text" @click="filterByType('boutique')">查看全部</el-button>
          </div>
          <div class="feature-item resort">
            <div class="feature-icon">🌴</div>
            <h3>度假酒店</h3>
            <p>豪华设施，尽享休闲时光</p>
            <el-button type="text" @click="filterByType('resort')">查看全部</el-button>
          </div>
          <div class="feature-item business">
            <div class="feature-icon">💼</div>
            <h3>商务酒店</h3>
            <p>高效便捷，商务出行首选</p>
            <el-button type="text" @click="filterByType('business')">查看全部</el-button>
          </div>
          <div class="feature-item family">
            <div class="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>亲子酒店</h3>
            <p>儿童乐园，全家欢乐出游</p>
            <el-button type="text" @click="filterByType('family')">查看全部</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部提示 -->
    <div class="tips-section">
      <div class="container">
        <el-alert title="预订提示" type="info" :closable="false">
          <template #default>
            <ul class="tips-list">
              <li>预订成功后，酒店会发送确认短信至您的手机</li>
              <li>如需取消预订，请至少在入住前24小时操作</li>
              <li>部分酒店支持"到店支付"，请仔细阅读预订条款</li>
              <li>如有特殊需求，可在预订时备注或联系客服</li>
            </ul>
          </template>
        </el-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Location, Star, StarFilled, Menu, MapLocation } from '@element-plus/icons-vue'

const router = useRouter()

// 搜索表单
const searchForm = reactive({
  city: '',
  checkIn: '',
  checkOut: '',
  roomType: '',
  priceRange: [200, 1000],
  starRating: 0,
  facilities: []
})

// 视图模式
const viewMode = ref('list')
const sortBy = ref('recommend')
const currentPage = ref(1)
const pageSize = ref(10)
const totalHotels = ref(50)

// 模拟酒店数据
const hotels = ref([
  {
    id: 1,
    name: '豪华度假酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc1d12000eea8pq60091_W_1280_853_R5_Q70.jpg',
    location: '西湖区湖滨路1号',
    rating: 4.9,
    reviews: 1284,
    star: 5,
    price: 888,
    originalPrice: 1088,
    discount: 200,
    facilities: ['免费WiFi', '免费停车', '游泳池', '健身房', '餐厅', '会议室'],
    isFavorite: false,
    type: 'resort'
  },
  {
    id: 2,
    name: '精品商务酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc0512000eeaffrw1446_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F',
    location: '上城区解放路99号',
    rating: 4.8,
    reviews: 2456,
    star: 5,
    price: 688,
    facilities: ['免费WiFi', '游泳池', '健身房', 'SPA', '行政酒廊'],
    isFavorite: true,
    type: 'business'
  },
  {
    id: 3,
    name: '舒适快捷酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc5012000f1a4h6m1CBF_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F',
    location: '拱墅区莫干山路88号',
    rating: 4.3,
    reviews: 876,
    star: 4,
    price: 328,
    facilities: ['免费WiFi', '自助早餐', '洗衣服务'],
    isFavorite: false,
    type: 'boutique'
  },
  {
    id: 4,
    name: '亲子主题酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc4s12000r8hezqp130F_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F',
    location: '余杭区文一西路1888号',
    rating: 4.7,
    reviews: 1567,
    star: 4,
    price: 588,
    facilities: ['免费WiFi', '免费停车', '儿童乐园', '游泳池', '餐厅'],
    isFavorite: true,
    type: 'family'
  },
  {
    id: 5,
    name: '高端精品酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc4u12000r6qpdr0BD17_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F',
    location: '西湖区杨公堤18号',
    rating: 4.8,
    reviews: 1890,
    star: 5,
    price: 988,
    originalPrice: 1188,
    discount: 200,
    facilities: ['免费WiFi', '免费停车', '游泳池', '健身房', 'SPA', '餐厅'],
    isFavorite: false,
    type: 'boutique'
  },
  {
    id: 6,
    name: '现代商务酒店',
    image: 'https://dimg04.c-ctrip.com/images/1mc4r12000d56hywu5119_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F',
    location: '江干区钱江路1000号',
    rating: 4.6,
    reviews: 1345,
    star: 4,
    price: 488,
    facilities: ['免费WiFi', '免费停车', '健身房', '餐厅', '会议室'],
    isFavorite: false,
    type: 'business'
  },
  // 更多酒店数据...
  ...Array.from({ length: 6 }, (_, i) => ({
    id: i + 7,
    name: `酒店${i + 7}`,
    image: ['https://dimg04.c-ctrip.com/images/1mc1d12000eea8pq60091_W_1280_853_R5_Q70.jpg', 'https://dimg04.c-ctrip.com/images/1mc0512000eeaffrw1446_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F', 'https://dimg04.c-ctrip.com/images/1mc5012000f1a4h6m1CBF_W_1280_853_R5.webp?proc=watermark/image_trip1,l_ne,x_16,y_16,w_67,h_16;digimark/t_image,logo_tripbinary;ignoredefaultwm,1A8F'][i % 3],
    location: ['西湖区', '上城区', '拱墅区', '余杭区'][i % 4] + '路' + (100 + i),
    rating: 3.8 + Math.random() * 1.2,
    reviews: 500 + Math.floor(Math.random() * 2000),
    star: [3, 4, 5][i % 3],
    price: 300 + Math.floor(Math.random() * 1000),
    facilities: ['免费WiFi', '免费停车', '早餐', '健身房', '游泳池'].slice(0, 2 + i % 4),
    isFavorite: Math.random() > 0.7,
    type: ['boutique', 'resort', 'business', 'family'][i % 4]
  }))
])

// 计算属性：过滤后的酒店
const filteredHotels = computed(() => {
  let result = [...hotels.value]
  
  // 按价格范围过滤
  result = result.filter(hotel => 
    hotel.price >= searchForm.priceRange[0] && 
    hotel.price <= searchForm.priceRange[1]
  )
  
  // 按星级过滤
  if (searchForm.starRating > 0) {
    result = result.filter(hotel => hotel.star >= searchForm.starRating)
  }
  
  // 排序
  switch (sortBy.value) {
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      // 智能推荐：综合评分和价格
      result.sort((a, b) => {
        const scoreA = a.rating * 100 - a.price * 0.1
        const scoreB = b.rating * 100 - b.price * 0.1
        return scoreB - scoreA
      })
  }
  
  return result
})

// 搜索处理
const handleSearch = () => {
  ElMessage.success('搜索酒店中...')
  currentPage.value = 1
}

// 重置搜索
const resetSearch = () => {
  searchForm.city = ''
  searchForm.checkIn = ''
  searchForm.checkOut = ''
  searchForm.roomType = ''
  searchForm.priceRange = [200, 1000]
  searchForm.starRating = 0
  searchForm.facilities = []
}

// 快速预订
const handleQuickBook = (hotel: any) => {
  ElMessage.success(`快速预订 ${hotel.name}`)
  // 这里可以跳转到预订页面
}

// 切换收藏
const toggleFavorite = (hotel: any) => {
  hotel.isFavorite = !hotel.isFavorite
  ElMessage.success(hotel.isFavorite ? '已收藏' : '已取消收藏')
}

// 按类型筛选
const filterByType = (type: string) => {
  ElMessage.info(`筛选${type}类型酒店`)
  // 实际项目中这里应该更新筛选条件
}

// 排序变更
const handleSortChange = () => {
  // 重新排序逻辑
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.hotel-list-page {
  .breadcrumb {
    padding: 20px 0;
    background: white;
    border-bottom: 1px solid $border-base;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  .search-section {
    padding: 30px 0;
    background: $gradient-primary;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .search-card {
      background: white;
      border-radius: $border-radius-lg;
      padding: 30px;
      box-shadow: $box-shadow-hover;
    }
    
    .search-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
      
      .el-form-item {
        margin-bottom: 0;
      }
    }
    
    .price-text {
      margin-left: 20px;
      color: $primary-color;
      font-weight: 500;
    }
    
    .search-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
      
      .el-button {
        border-radius: $border-radius-lg;
        padding: 12px 32px;
        font-weight: 600;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        &.el-button--primary {
          background: $gradient-secondary;
          border: none;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba($primary-color, 0.3);
          }
        }
        
        &.el-button--default {
          background: white;
          border: 1px solid rgba($primary-color, 0.3);
          color: $text-primary;
          
          &:hover {
            border-color: $primary-color;
            background: rgba($primary-color, 0.05);
          }
        }
      }
    }
  }
  
  .recommend-section {
    padding: 40px 0;
    background: $travel-light;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      
      h2 {
        font-size: 28px;
        color: $text-primary;
      }
    }
    
    .hotel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .hotel-card {
        background: white;
        border-radius: $border-radius-xl;
        overflow: hidden;
        box-shadow: $box-shadow-base;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        border: 1px solid rgba($primary-color, 0.1);
        
        &:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 32px rgba($primary-color, 0.15);
          border-color: rgba($primary-color, 0.3);
        }
      
      .hotel-image {
        position: relative;
        height: 200px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hotel-tags {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 8px;
          
          .tag {
            padding: 4px 12px;
            border-radius: $border-radius-full;
            font-size: 12px;
            font-weight: 500;
            color: white;
            
            &.star {
              background: rgba(0, 0, 0, 0.7);
            }
            
            &.discount {
              background: #ff6b35;
            }
          }
        }
        
        .hotel-favorite {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          
          &:hover {
            background: white;
          }
        }
      }
      
      .hotel-info {
        padding: 20px;
        
        h3 {
          font-size: 18px;
          margin-bottom: 12px;
          color: $text-primary;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .hotel-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          
          .location {
            display: flex;
            align-items: center;
            gap: 4px;
            color: $text-regular;
            font-size: 14px;
          }
          
          .rating {
            display: flex;
            align-items: center;
            gap: 8px;
            
            .review-count {
              font-size: 12px;
              color: $text-secondary;
            }
          }
        }
        
        .hotel-facilities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
          
          .facility {
            padding: 4px 12px;
            background: $travel-light;
            border-radius: $border-radius-lg;
            font-size: 12px;
            color: $text-regular;
          }
          
          .more {
            color: $primary-color;
            font-size: 12px;
          }
        }
        
        .hotel-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .price-info {
            .current-price {
              font-size: 24px;
              color: $primary-color;
              font-weight: bold;
              margin-right: 4px;
            }
            
            .unit {
              font-size: 12px;
              color: $text-secondary;
            }
            
            .original-price {
              font-size: 14px;
              color: $text-secondary;
              text-decoration: line-through;
              margin-left: 8px;
            }
          }
        }
      }
    }
    
    .view-toggle {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
    }
  }
  
  .feature-section {
    padding: 60px 0;
    background: white;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h2 {
      text-align: center;
      font-size: 32px;
      margin-bottom: 40px;
      color: $text-primary;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .feature-item {
      text-align: center;
      padding: 40px 20px;
      border-radius: $border-radius-lg;
      transition: all 0.3s;
      cursor: pointer;
      
      &.boutique {
        background: $gradient-secondary;
        color: white;
      }
      
      &.resort {
        background: $gradient-primary;
        color: white;
      }
      
      &.business {
        background: $gradient-deep;
        color: white;
      }
      
      &.family {
        background: $gradient-accent;
        color: white;
      }
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: $box-shadow-hover;
      }
      
      .feature-icon {
        font-size: 56px;
        margin-bottom: 20px;
        position: relative;
        z-index: 2;
      }
      
      h3 {
        font-size: 24px;
        margin-bottom: 12px;
        position: relative;
        z-index: 2;
      }
      
      p {
        font-size: 16px;
        opacity: 0.9;
        margin-bottom: 24px;
        position: relative;
        z-index: 2;
      }
      
      .feature-btn {
        color: white;
        font-weight: 500;
        position: relative;
        z-index: 2;
        transition: all 0.3s ease;
        
        &:hover {
          text-decoration: underline;
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .tips-section {
    padding: 48px 0;
    background: $travel-light;
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .tips-alert {
      border-radius: $border-radius-lg;
      box-shadow: $box-shadow-base;
    }
    
    .tips-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      
      li {
        padding: 8px 0;
        color: $text-regular;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        
        &::before {
          content: '•';
          color: $primary-color;
          font-weight: bold;
          margin-top: 4px;
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
  .hotel-list-page {
    .container {
      padding: 0 20px;
    }
    
    .search-section {
      .search-card {
        padding: 24px;
      }
    }
    
    .recommend-section {
      .map-container {
        flex-direction: column;
        
        .map-hotel-list {
          width: 100%;
          max-height: 300px;
          border-left: none;
          border-top: 1px solid #f0f0f0;
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .hotel-list-page {
    .search-section {
      .search-row {
        flex-direction: column;
        
        .el-form-item {
          width: 100%;
        }
      }
      
      .price-range-container {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }
    }
    
    .recommend-section {
      .section-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      
      .hotel-grid {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
    
    .feature-section {
      .feature-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
  }
}

@media (max-width: 768px) {
  .hotel-list-page {
    .search-section {
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
    
    .recommend-section {
      padding: 30px 0;
      
      .section-header {
        h2 {
          font-size: 24px;
        }
      }
      
      .hotel-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .hotel-card {
        .hotel-image {
          height: 180px;
        }
        
        .hotel-info {
          padding: 20px;
          
          .hotel-name {
            font-size: 18px;
          }
        }
      }
    }
    
    .feature-section {
      padding: 48px 0;
      
      .feature-title {
        font-size: 28px;
        margin-bottom: 36px;
      }
      
      .feature-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
      
      .feature-item {
        padding: 36px 20px;
        
        .feature-icon {
          font-size: 48px;
        }
        
        h3 {
          font-size: 20px;
        }
      }
    }
    
    .tips-section {
      padding: 36px 0;
      
      .tips-list {
        grid-template-columns: 1fr;
      }
    }
  }
}

@media (max-width: 480px) {
  .hotel-list-page {
    .search-section {
      .search-card {
        padding: 20px;
      }
      
      .search-actions {
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
    }
    
    .recommend-section {
      .map-container {
        min-height: 400px;
      }
    }
  }
}
</style>
