<template>
  <div class="travel-planner-container">
    <div class="planner-header">
      <h1 class="planner-title">🧭 智能旅游规划</h1>
      <p class="planner-subtitle">为您量身定制个性化旅行方案</p>
    </div>
    
    <div class="planner-content">
      <div class="planner-sidebar">
        <el-card shadow="hover" class="planner-form">
          <template #header>
            <div class="card-header">
              <span>行程规划</span>
            </div>
          </template>
          
          <el-form :model="planForm" label-width="100px">
            <el-form-item label="出发地">
              <el-input v-model="planForm.departure" placeholder="请输入出发城市" />
            </el-form-item>
            
            <el-form-item label="目的地">
              <el-input v-model="planForm.destination" placeholder="请输入目的地城市" />
            </el-form-item>
            
            <el-form-item label="出行日期">
              <el-date-picker
                v-model="planForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 100%"
              />
            </el-form-item>
            
            <el-form-item label="出行人数">
              <el-input-number v-model="planForm.people" :min="1" :max="20" />
            </el-form-item>
            
            <el-form-item label="预算范围">
              <el-slider
                v-model="planForm.budget"
                :min="1000"
                :max="50000"
                :step="1000"
                show-input
              />
            </el-form-item>
            
            <el-form-item label="旅行偏好">
              <el-checkbox-group v-model="planForm.preferences">
                <el-checkbox label="nature">自然风光</el-checkbox>
                <el-checkbox label="history">历史文化</el-checkbox>
                <el-checkbox label="food">美食体验</el-checkbox>
                <el-checkbox label="shopping">购物娱乐</el-checkbox>
                <el-checkbox label="relax">休闲度假</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="generatePlan" style="width: 100%">
                生成行程方案
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      
      <div class="planner-main">
        <el-card shadow="hover" class="plan-result" v-if="planGenerated">
          <template #header>
            <div class="card-header">
              <span>推荐行程</span>
              <el-button type="text" @click="exportPlan">导出行程</el-button>
            </div>
          </template>
          
          <div class="plan-timeline">
            <el-timeline>
              <el-timeline-item
                v-for="(day, index) in itinerary"
                :key="index"
                :timestamp="`第${index + 1}天`"
                placement="top"
              >
                <div class="day-plan">
                  <h3>{{ day.title }}</h3>
                  <div class="day-activities">
                    <div
                      v-for="(activity, actIndex) in day.activities"
                      :key="actIndex"
                      class="activity-item"
                    >
                      <div class="activity-time">{{ activity.time }}</div>
                      <div class="activity-content">
                        <h4>{{ activity.title }}</h4>
                        <p>{{ activity.description }}</p>
                        <div class="activity-tags">
                          <el-tag
                            v-for="tag in activity.tags"
                            :key="tag"
                            size="small"
                          >
                            {{ tag }}
                          </el-tag>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
        
        <el-empty
          v-else
          description="请填写左侧表单，生成您的专属旅行方案"
          :image-size="300"
        />
      </div>
    </div>

    <!-- 行程导出组件 -->
    <TripExporter 
      v-model="showExporter" 
      :trip-data="{
        ...planForm,
        itinerary: itinerary
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import TripExporter from '@/components/TripExporter.vue'

const showExporter = ref(false)

const planForm = ref<{
  departure: string
  destination: string
  dateRange: any[]
  people: number
  budget: number
  preferences: string[]
}>({
  departure: '',
  destination: '',
  dateRange: [],
  people: 2,
  budget: 5000,
  preferences: []
})

const planGenerated = ref(false)
const itinerary = ref<any[]>([])

const generatePlan = () => {
  if (!planForm.value.departure || !planForm.value.destination) {
    ElMessage.warning('请填写出发地和目的地')
    return
  }
  
  if (!planForm.value.dateRange || planForm.value.dateRange.length === 0) {
    ElMessage.warning('请选择出行日期')
    return
  }
  
  ElMessage.success('正在生成行程方案...')
  
  setTimeout(() => {
    itinerary.value = generateSampleItinerary()
    planGenerated.value = true
    ElMessage.success('行程方案生成成功！')
  }, 1500)
}

const generateSampleItinerary = () => {
  const range = planForm.value.dateRange as any[]
  if (!range || range.length < 2) return []
  
  const start = new Date(range[0]).getTime()
  const end = new Date(range[1]).getTime()
  const diffTime = Math.abs(end - start)
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
  const sampleItinerary = []
  
  for (let i = 1; i <= days; i++) {
    sampleItinerary.push({
      title: `${planForm.value.destination}深度游 - 第${i}天`,
      activities: [
        {
          time: '09:00',
          title: '参观著名景点',
          description: `探索${planForm.value.destination}的标志性景点，感受当地文化魅力`,
          tags: ['景点', '文化']
        },
        {
          time: '12:00',
          title: '品尝当地美食',
          description: '享用正宗当地特色菜肴，体验舌尖上的旅行',
          tags: ['美食', '餐饮']
        },
        {
          time: '14:00',
          title: '自由活动时间',
          description: '漫步街头巷尾，感受当地生活气息',
          tags: ['自由', '休闲']
        },
        {
          time: '18:00',
          title: '夜景游览',
          description: '欣赏城市夜景，体验不一样的风情',
          tags: ['夜景', '摄影']
        }
      ]
    })
  }
  
  return sampleItinerary
}

const exportPlan = () => {
  showExporter.value = true
}
</script>

<style scoped lang="scss">
// 定义绿色主题变量
$primary-green: #4CAF50;
$light-green: #E8F5E8;
$medium-green: #A5D6A7;
$dark-green: #2E7D32;
$transparent-green: rgba(76, 175, 80, 0.1);

.travel-planner-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%);
  padding: 20px;
}

.planner-header {
  text-align: center;
  margin-bottom: 30px;
  
  .planner-title {
    font-size: 36px;
    font-weight: 700;
    color: $dark-green;
    margin-bottom: 10px;
    text-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
  }
  
  .planner-subtitle {
    font-size: 18px;
    color: $dark-green;
    opacity: 0.8;
  }
}

.planner-content {
  display: flex;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
}

.planner-sidebar {
  width: 400px;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
}

.planner-main {
  flex: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 自定义卡片样式
.planner-form, .plan-result {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 30px rgba(76, 175, 80, 0.25);
    transform: translateY(-2px);
  }
  
  .el-card__header {
    background: linear-gradient(90deg, $light-green 0%, rgba(165, 214, 167, 0.5) 100%);
    border-bottom: 1px solid rgba(76, 175, 80, 0.2);
    padding: 16px 20px;
    
    .card-header {
      span {
        font-size: 16px;
        font-weight: 600;
        color: $dark-green;
      }
    }
  }
}

// 自定义按钮样式
.el-button--primary {
  background: linear-gradient(90deg, $primary-green 0%, $medium-green 100%);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  
  &:hover {
    background: linear-gradient(90deg, $dark-green 0%, $primary-green 100%);
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 自定义表单元素样式
.el-input {
  border-radius: 6px;
  border: 1px solid rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  
  &:focus-within {
    border-color: $primary-green;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  }
}

.el-slider {
  .el-slider__bar {
    background: linear-gradient(90deg, $primary-green 0%, $medium-green 100%);
  }
  
  .el-slider__button {
    border-color: $primary-green;
    
    &:hover {
      border-color: $dark-green;
    }
  }
}

.plan-result {
  .plan-timeline {
    padding: 20px;
  }
  
  .day-plan {
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: $dark-green;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid $light-green;
    }
  }
  
  .day-activities {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .activity-item {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: rgba(232, 245, 232, 0.7);
    border-radius: 10px;
    transition: all 0.3s ease;
    border: 1px solid rgba(76, 175, 80, 0.1);
    
    &:hover {
      background: rgba(165, 214, 167, 0.3);
      transform: translateX(5px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
    }
    
    .activity-time {
      min-width: 60px;
      font-weight: 600;
      color: $primary-green;
      font-size: 14px;
      background: rgba(76, 175, 80, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      text-align: center;
    }
    
    .activity-content {
      flex: 1;
      
      h4 {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 500;
        color: $dark-green;
      }
      
      p {
        margin: 0 0 12px 0;
        font-size: 14px;
        color: $dark-green;
        opacity: 0.8;
        line-height: 1.5;
      }
      
      .activity-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
    }
  }
}

// 自定义标签样式
.el-tag {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: $primary-green;
  border-radius: 4px;
  
  &:hover {
    background: rgba(76, 175, 80, 0.2);
  }
}

// 自定义时间线样式
.el-timeline {
  .el-timeline-item {
    .el-timeline-item__node {
      background-color: $primary-green;
      border-color: $primary-green;
    }
    
    .el-timeline-item__timestamp {
      color: $dark-green;
      font-weight: 500;
    }
  }
}

// 自定义空状态样式
.el-empty {
  .el-empty__description {
    color: $dark-green;
    opacity: 0.7;
  }
}
</style>