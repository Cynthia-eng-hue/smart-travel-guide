<template>
  <div class="attraction-detail-page">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/attractions' }">景点列表</el-breadcrumb-item>
          <el-breadcrumb-item>景点详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="attraction-content">
        <!-- 景点基本信息 -->
        <div class="attraction-header">
          <h1>北京故宫</h1>
          <div class="attraction-rating">
            <span class="stars">★★★★★</span>
            <span class="score">4.9</span>
            <span class="reviews">(25680条评价)</span>
          </div>
          <div class="attraction-location">
            <el-icon><Location /></el-icon>
            <span>北京市东城区景山前街4号</span>
          </div>
        </div>

        <!-- 景点图片 -->
        <div class="attraction-gallery">
          <div class="main-image">
            <img src="https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg" alt="故宫主图" />
          </div>
          <div class="thumbnails">
            <img src="https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg" alt="故宫图1" />
            <img src="https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg" alt="故宫图2" />
            <img src="https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg" alt="故宫图3" />
            <img src="https://dimg04.c-ctrip.com/images/010671200087d4o7zEA88_W_640_10000.jpg" alt="故宫图4" />
          </div>
        </div>

        <!-- 景点信息 -->
        <div class="attraction-info">
          <div class="info-card">
            <h3>开放时间</h3>
            <p>4月1日-10月31日 8:30-17:00</p>
            <p>11月1日-3月31日 8:30-16:30</p>
            <p>周一闭馆（法定节假日除外）</p>
          </div>
          <div class="info-card">
            <h3>门票价格</h3>
            <p>旺季（4月1日-10月31日）</p>
            <p class="price">成人票：¥60</p>
            <p>淡季（11月1日-3月31日）</p>
            <p class="price">成人票：¥40</p>
          </div>
          <div class="info-card">
            <h3>景点特色</h3>
            <p>世界文化遗产</p>
            <p>中国古代宫廷建筑之精华</p>
            <p>明清两代皇家宫殿</p>
          </div>
        </div>

        <!-- 景点介绍 -->
        <div class="attraction-description">
          <h3>景点介绍</h3>
          <p>北京故宫，又称紫禁城，是中国明清两代的皇家宫殿，位于北京中轴线的中心。故宫以三大殿为中心，占地面积约72万平方米，建筑面积约15万平方米，有大小宫殿七十多座，房屋九千余间。</p>
          <p>故宫是世界上现存规模最大、保存最为完整的木质结构古建筑之一，被誉为"世界五大宫之首"。1987年被列为世界文化遗产。</p>
          <p>故宫不仅是建筑艺术的瑰宝，更是中华文明的象征。这里收藏着大量珍贵文物，是了解中国古代历史文化的绝佳场所。</p>
        </div>

        <!-- 游览路线 -->
        <div class="tour-routes">
          <h3>推荐游览路线</h3>
          <div class="route-list">
            <div class="route-item">
              <div class="route-header">
                <h4>经典路线（约3小时）</h4>
                <el-button type="primary" size="small" @click="handleSelectRoute">选择</el-button>
              </div>
              <p>午门 → 太和殿 → 中和殿 → 保和殿 → 乾清宫 → 御花园 → 神武门</p>
            </div>
            <div class="route-item">
              <div class="route-header">
                <h4>深度路线（约5小时）</h4>
                <el-button type="primary" size="small" @click="handleSelectRoute">选择</el-button>
              </div>
              <p>午门 → 太和殿 → 中和殿 → 保和殿 → 乾清宫 → 交泰殿 → 坤宁宫 → 御花园 → 神武门</p>
            </div>
          </div>
        </div>

        <!-- 用户评价 -->
        <div class="attraction-reviews">
          <h3>用户评价</h3>
          <div class="review-item">
            <div class="review-header">
              <div class="user-info">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <div>
                  <h4>李女士</h4>
                  <span class="review-date">2024-03-20</span>
                </div>
              </div>
              <div class="review-rating">★★★★★</div>
            </div>
            <p class="review-content">故宫太壮观了！建筑精美，历史悠久，每一处都让人震撼。建议早点去，人少一些，可以慢慢欣赏。一定要租讲解器，能学到很多历史知识。</p>
          </div>
          <div class="review-item">
            <div class="review-header">
              <div class="user-info">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                <div>
                  <h4>王先生</h4>
                  <span class="review-date">2024-03-18</span>
                </div>
              </div>
              <div class="review-rating">★★★★★</div>
            </div>
            <p class="review-content">带孩子来故宫，孩子特别喜欢。建筑宏伟，文物丰富，是了解中国历史的好地方。建议穿舒适的鞋子，因为要走很多路。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Location } from '@element-plus/icons-vue'

const router = useRouter()

const handleSelectRoute = () => {
  ElMessage.success('已选择游览路线')
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.attraction-detail-page {
  padding: 40px 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .breadcrumb {
    margin-bottom: 30px;
  }
  
  .attraction-header {
    margin-bottom: 30px;
    
    h1 {
      font-size: 32px;
      margin-bottom: 16px;
      color: $text-primary;
    }
    
    .attraction-rating {
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
    
    .attraction-location {
      display: flex;
      align-items: center;
      gap: 8px;
      color: $text-secondary;
      font-size: 16px;
    }
  }
  
  .attraction-gallery {
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
  
  .attraction-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
    
    .info-card {
      padding: 24px;
      background: $green-lightest;
      border-radius: $border-radius-xl;
      border: 1px solid $border-light;
      transition: all $transition-normal;
      
      &:hover {
        background: $green-light;
        transform: translateY(-2px);
        box-shadow: $box-shadow-hover;
      }
      
      h3 {
        font-size: 20px;
        margin-bottom: 16px;
        color: $text-primary;
      }
      
      p {
        color: $text-secondary;
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 1.6;
        
        &.price {
          color: $primary-color;
          font-weight: 600;
          font-size: 16px;
        }
      }
    }
  }
  
  .attraction-description {
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
  
  .tour-routes {
    margin-bottom: 40px;
    
    h3 {
      font-size: 24px;
      margin-bottom: 20px;
      color: $text-primary;
    }
    
    .route-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .route-item {
      padding: 24px;
      background: $green-lightest;
      border-radius: $border-radius-xl;
      border: 1px solid $border-light;
      transition: all $transition-normal;
      
      &:hover {
        background: $green-light;
        box-shadow: $box-shadow-hover;
        transform: translateY(-2px);
      }
      
      .route-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        
        h4 {
          font-size: 18px;
          color: $text-primary;
          margin: 0;
        }
      }
      
      p {
        color: $text-secondary;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }
  
  .attraction-reviews {
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
  .attraction-detail-page {
    .attraction-gallery {
      grid-template-columns: 1fr;
    }
    
    .attraction-info {
      grid-template-columns: 1fr;
    }
  }
}
</style>
