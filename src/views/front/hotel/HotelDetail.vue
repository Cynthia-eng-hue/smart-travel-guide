
<template>
  <div class="hotel-detail-page">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/hotels' }">酒店列表</el-breadcrumb-item>
          <el-breadcrumb-item>酒店详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="hotel-content">
        <!-- 酒店基本信息 -->
        <div class="hotel-header">
          <h1>杭州西湖大酒店</h1>
          <div class="hotel-rating">
            <span class="stars">★★★★☆</span>
            <span class="score">4.5</span>
            <span class="reviews">(1284条评价)</span>
          </div>
          <div class="hotel-location">
            <el-icon><Location /></el-icon>
            <span>杭州市西湖区湖滨路1号</span>
          </div>
        </div>

        <!-- 酒店图片 -->
        <div class="hotel-gallery">
          <div class="main-image">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" alt="酒店主图" />
          </div>
          <div class="thumbnails">
            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w-200" alt="酒店图1" />
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w-200" alt="酒店图2" />
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w-200" alt="酒店图3" />
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w-200" alt="酒店图4" />
          </div>
        </div>

        <!-- 酒店设施 -->
        <div class="hotel-facilities">
          <h3>酒店设施</h3>
          <div class="facilities-list">
            <div class="facility-item">
              <el-icon><CoffeeCup /></el-icon>
              <span>免费早餐</span>
            </div>
            <div class="facility-item">
              <el-icon><Wifi /></el-icon>
              <span>免费WiFi</span>
            </div>
            <div class="facility-item">
              <el-icon><Place /></el-icon>
              <span>免费停车</span>
            </div>
            <div class="facility-item">
              <el-icon><Service /></el-icon>
              <span>24小时前台</span>
            </div>
            <div class="facility-item">
              <el-icon><Sunny /></el-icon>
              <span>游泳池</span>
            </div>
            <div class="facility-item">
              <el-icon><Food /></el-icon>
              <span>餐厅</span>
            </div>
          </div>
        </div>

        <!-- 房型选择 -->
        <div class="room-types">
          <h3>选择房型</h3>
          <div class="room-list">
            <div class="room-item">
              <div class="room-info">
                <h4>豪华大床房</h4>
                <p>35㎡ | 大床1.8米 | 2人</p>
                <p class="room-facilities">免费WiFi · 免费停车 · 免费早餐</p>
              </div>
              <div class="room-price">
                <div class="price">¥588<span>/晚</span></div>
                <el-button type="primary" @click="handleBook">立即预订</el-button>
              </div>
            </div>
            <div class="room-item">
              <div class="room-info">
                <h4>行政双床房</h4>
                <p>45㎡ | 双床1.2米 | 2人</p>
                <p class="room-facilities">免费WiFi · 免费停车 · 行政酒廊</p>
              </div>
              <div class="room-price">
                <div class="price">¥788<span>/晚</span></div>
                <el-button type="primary" @click="handleBook">立即预订</el-button>
              </div>
            </div>
            <div class="room-item">
              <div class="room-info">
                <h4>湖景套房</h4>
                <p>68㎡ | 大床2.0米 | 2人</p>
                <p class="room-facilities">湖景 · 免费WiFi · 免费停车 · 行政酒廊</p>
              </div>
              <div class="room-price">
                <div class="price">¥1288<span>/晚</span></div>
                <el-button type="primary" @click="handleBook">立即预订</el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 酒店描述 -->
        <div class="hotel-description">
          <h3>酒店介绍</h3>
          <p>杭州西湖大酒店位于西湖景区内，拥有绝佳的湖景位置。酒店设计融合了现代与古典元素，为您提供舒适的住宿体验。</p>
          <p>酒店距离西湖仅100米，步行即可到达雷峰塔、苏堤等著名景点。周边交通便利，地铁站步行5分钟可达。</p>
          <p>酒店提供高品质的服务，包括24小时客房服务、商务中心、会议室等设施，满足您的各种需求。</p>
        </div>

        <!-- 用户评价 -->
        <div class="hotel-reviews">
          <h3>用户评价</h3>
          <div class="review-item">
            <div class="review-header">
              <div class="user-info">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <div>
                  <h4>张先生</h4>
                  <span class="review-date">2024-03-15</span>
                </div>
              </div>
              <div class="review-rating">★★★★☆</div>
            </div>
            <p class="review-content">酒店位置绝佳，就在西湖边，早上起来就能看到湖景。服务人员态度很好，房间干净整洁。早餐也很丰盛。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Location, CoffeeCup, Wifi, Place, Service, Sunny, Food } from '@element-plus/icons-vue'

const router = useRouter()

const handleBook = () => {
  ElMessage.success('预订功能开发中')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.hotel-detail-page {
  padding: 40px 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .breadcrumb {
    margin-bottom: 30px;
  }
  
  .hotel-header {
    margin-bottom: 30px;
    
    h1 {
      font-size: 32px;
      margin-bottom: 16px;
      color: $text-primary;
    }
    
    .hotel-rating {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      
      .stars {
        color: $warning-color;
        font-size: 20px;
      }
      
      .score {
        font-size: 24px;
        font-weight: bold;
        color: $text-primary;
      }
      
      .reviews {
        color: $text-secondary;
      }
    }
    
    .hotel-location {
      display: flex;
      align-items: center;
      gap: 8px;
      color: $text-secondary;
      font-size: 16px;
    }
  }
  
  .hotel-gallery {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    margin-bottom: 40px;
    
    .main-image {
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: $border-radius-xl;
      }
    }
    
    .thumbnails {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      
      img {
        width: 100%;
        height: 92px;
        object-fit: cover;
        border-radius: $border-radius-md;
        cursor: pointer;
        transition: all $transition-normal;
        
        &:hover {
          opacity: 0.8;
          transform: scale(1.02);
        }
      }
    }
  }
  
  .hotel-facilities {
    margin-bottom: 40px;
    
    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-primary;
    }
    
    .facilities-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    
    .facility-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: $green-lightest;
      border-radius: $border-radius-lg;
      border: 1px solid $border-light;
      transition: all $transition-normal;
      
      &:hover {
        background: $green-light;
        transform: translateY(-2px);
        box-shadow: $box-shadow-hover;
      }
      
      .el-icon {
        font-size: 24px;
        color: $primary-color;
      }
      
      span {
        font-size: 16px;
        color: $text-primary;
      }
    }
  }
  
  .room-types {
    margin-bottom: 40px;
    
    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-primary;
    }
    
    .room-list {
      border: 1px solid $border-base;
      border-radius: $border-radius-xl;
      overflow: hidden;
      background: $white-pure;
    }
    
    .room-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px;
      border-bottom: 1px solid $border-base;
      transition: all $transition-normal;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        background: $green-lightest;
      }
      
      .room-info {
        h4 {
          font-size: 20px;
          margin-bottom: 8px;
          color: $text-primary;
        }
        
        p {
          color: $text-secondary;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .room-facilities {
          color: $text-placeholder;
          font-size: 12px;
        }
      }
      
      .room-price {
        text-align: right;
        
        .price {
          font-size: 28px;
          color: $primary-color;
          font-weight: bold;
          margin-bottom: 12px;
          
          span {
            font-size: 14px;
            color: $text-secondary;
            font-weight: normal;
          }
        }
      }
    }
  }
  
  .hotel-description {
    margin-bottom: 40px;
    
    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-primary;
    }
    
    p {
      line-height: 1.8;
      color: $text-secondary;
      margin-bottom: 16px;
    }
  }
  
  .hotel-reviews {
    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-primary;
    }
    
    .review-item {
      padding: 24px;
      background: $green-lightest;
      border-radius: $border-radius-xl;
      border: 1px solid $border-light;
      margin-bottom: 20px;
      transition: all $transition-normal;
      
      &:hover {
        box-shadow: $box-shadow-hover;
        transform: translateY(-2px);
      }
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      
      h4 {
        font-size: 16px;
        color: $text-primary;
        margin-bottom: 4px;
      }
      
      .review-date {
        font-size: 12px;
        color: $text-placeholder;
      }
    }
    
    .review-rating {
      color: $warning-color;
      font-size: 20px;
    }
    
    .review-content {
      line-height: 1.6;
      color: $text-secondary;
    }
  }
}

@media (max-width: 768px) {
  .hotel-detail-page {
    .hotel-gallery {
      grid-template-columns: 1fr;
    }
    
    .room-item {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 20px;
    }
    
    .room-price {
      text-align: left !important;
      width: 100%;
    }
  }
}
</style>
