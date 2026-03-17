<template>
  <div class="trip-share-container">
    <div class="share-header">
      <h1 class="share-title">✨ 行程分享</h1>
      <p class="share-subtitle">将您的精彩行程分享给身边的朋友</p>
    </div>

    <div class="share-content">
      <el-card class="share-card">
        <template #header>
          <div class="card-header">
            <span>我的行程列表</span>
          </div>
        </template>
        
        <el-table :data="recentTrips" style="width: 100%">
          <el-table-column prop="destination" label="目的地" />
          <el-table-column prop="date" label="时间" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button type="primary" size="small" @click="handleShare(scope.row)">
                分享/导出
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div v-if="recentTrips.length === 0" class="empty-trips">
          <el-empty description="暂无生成的行程，快去规划一个吧！" />
          <el-button type="primary" @click="$router.push('/travel-planner')">立即规划</el-button>
        </div>
      </el-card>
    </div>

    <TripExporter 
      v-model="showExporter" 
      :trip-data="selectedTrip"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TripExporter from '@/components/TripExporter.vue'

// 模拟最近的行程数据
const recentTrips = ref([
  {
    destination: '北京',
    departure: '上海',
    date: '2026-05-01',
    dateRange: [new Date('2026-05-01'), new Date('2026-05-03')],
    people: 2,
    budget: 3000,
    itinerary: [
      {
        title: '北京文化之旅 - 第1天',
        activities: [
          { time: '10:00', title: '参观故宫', description: '感受皇家建筑的宏伟与历史底蕴', tags: ['文化', '历史'] },
          { time: '14:00', title: '景山公园', description: '俯瞰紫禁城全景', tags: ['风景'] }
        ]
      },
      {
        title: '北京文化之旅 - 第2天',
        activities: [
          { time: '09:00', title: '八达岭长城', description: '登高望远，领略长城壮观', tags: ['地标'] },
          { time: '18:00', title: '王府井大街', description: '品尝特色小吃，购物体验', tags: ['美食', '购物'] }
        ]
      }
    ]
  }
])

const showExporter = ref(false)
const selectedTrip = ref<any>(null)

const handleShare = (trip: any) => {
  selectedTrip.value = trip
  showExporter.value = true
}
</script>

<style scoped lang="scss">
$primary-green: #4CAF50;
$dark-green: #2E7D32;

.trip-share-container {
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%);
  padding: 40px 20px;
}

.share-header {
  text-align: center;
  margin-bottom: 40px;
  
  .share-title {
    font-size: 32px;
    color: $dark-green;
    margin-bottom: 12px;
  }
  
  .share-subtitle {
    color: #666;
    font-size: 16px;
  }
}

.share-content {
  max-width: 1000px;
  margin: 0 auto;
}

.share-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.1);
}

.empty-trips {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}
</style>
