# 4. 创建AI助手页面

<template>
  <div class="ai-assistant-page">
    <div class="container">
      <div class="ai-header animate-fade-in">
        <h1>🤖 AI智能助手 - 小智导游</h1>
        <p>为您提供个性化行程规划、景点推荐、旅游问答等服务</p>
      </div>
      
      <div class="ai-chat-container animate-fade-in" style="--index: 0.1;">
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.type">
            <div class="avatar">
              <img v-if="msg.type === 'ai'" src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" />
              <img v-else src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            </div>
            <div class="content">
              <div class="text" v-if="!msg.loading">{{ msg.content }}</div>
              <div class="loading" v-else>
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
                <span class="loading-dot"></span>
              </div>
              <div class="time">{{ msg.time }}</div>
            </div>
          </div>
        </div>
        
        <div class="chat-input">
          <el-input
            v-model="userInput"
            type="textarea"
            :rows="3"
            placeholder="请输入您的问题，例如：推荐一个3天的杭州行程..."
            @keyup.enter.except="handleSend"
          />
          <div class="input-actions">
            <el-button type="primary" @click="handleSend" :disabled="!userInput.trim() || isLoading">
              <el-icon v-if="isLoading"><Loading /></el-icon>
              {{ isLoading ? '发送中...' : '发送' }}
            </el-button>
            <el-button @click="clearChat">清空对话</el-button>
          </div>
        </div>
      </div>
      
      <div class="quick-questions animate-fade-in" style="--index: 0.2;">
        <h3>快速提问</h3>
        <div class="question-tags">
          <el-tag v-for="(q, i) in quickQuestions" :key="i" @click="userInput = q" class="question-tag">
            {{ q }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'

const userInput = ref('')
const messages = ref([
  {
    type: 'ai',
    content: '您好！我是小智导游，您的专属旅游助手。请问有什么可以帮您的吗？',
    time: '刚刚',
    loading: false
  }
])

const quickQuestions = ref([
  '推荐一个3天的杭州行程',
  '现在去云南旅游需要注意什么？',
  '帮我规划一个亲子游路线',
  '哪些景点适合拍照？',
  '推荐一些特色美食'
])

const messagesContainer = ref<HTMLElement>()
const isLoading = ref(false)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleSend = () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  const userMsg = userInput.value.trim()
  messages.value.push({
    type: 'user',
    content: userMsg,
    time: '刚刚',
    loading: false
  })
  
  scrollToBottom()
  
  // 模拟AI回复
  isLoading.value = true
  
  // 根据问题类型生成不同的回复
  let aiResponse = ''
  if (userMsg.includes('杭州') && userMsg.includes('行程')) {
    aiResponse = `根据您的需求，为您推荐3天的杭州行程：\n\n**第一天：西湖经典路线**\n• 上午：断桥残雪 → 白堤 → 孤山 → 中山公园\n• 中午：楼外楼（品尝西湖醋鱼）\n• 下午：苏堤春晓 → 花港观鱼 → 雷峰塔\n• 晚上：印象西湖表演\n\n**第二天：文化之旅**\n• 上午：灵隐寺 → 飞来峰\n• 中午：天外天（品尝素斋）\n• 下午：宋城景区（观看宋城千古情表演）\n• 晚上：河坊街（品尝小吃）\n\n**第三天：自然与科技**\n• 上午：西溪湿地\n• 中午：湿地特色餐厅\n• 下午：杭州未来科技城（梦想小镇）\n• 晚上：返程\n\n**住宿建议**：西湖附近的酒店，如杭州西子湖四季酒店或杭州凯悦酒店\n\n**交通建议**：使用公共交通或打车，西湖周边较拥堵\n\n需要调整行程或了解更多详情吗？`
  } else if (userMsg.includes('云南') && userMsg.includes('注意')) {
    aiResponse = `现在去云南旅游需要注意以下事项：\n\n**气候与着装**\n• 云南气候多变，昼夜温差大，建议携带外套\n• 高原地区紫外线强，记得带防晒霜、墨镜和帽子\n• 雨季（6-9月）需携带雨具\n\n**高原反应**\n• 丽江、香格里拉等地区海拔较高，可能出现高原反应\n• 建议提前服用红景天，初到高原避免剧烈运动\n• 多喝水，保持充足睡眠\n\n**交通**\n• 云南景点分散，建议提前规划路线\n• 可以考虑包车或参加当地团\n• 部分地区路况复杂，注意安全\n\n**文化与习俗**\n• 尊重当地少数民族的风俗习惯\n• 进入寺庙等宗教场所注意着装得体\n• 拍照前征得当地人同意\n\n**其他**\n• 携带常用药品，如感冒药、肠胃药等\n• 备足现金，部分偏远地区可能不支持移动支付\n• 提前预订住宿，尤其是旅游旺季\n\n祝您在云南旅途愉快！`
  } else if (userMsg.includes('亲子') && userMsg.includes('路线')) {
    aiResponse = `为您推荐适合亲子游的路线：\n\n**推荐目的地：珠海长隆海洋王国**\n• **行程安排**：\n  - 第一天：抵达珠海，入住长隆旗下酒店\n  - 第二天：全天游玩长隆海洋王国\n  - 第三天：珠海市区游览，返程\n\n**推荐目的地：上海迪士尼乐园**\n• **行程安排**：\n  - 第一天：抵达上海，入住迪士尼周边酒店\n  - 第二天：全天游玩迪士尼乐园\n  - 第三天：上海科技馆或自然博物馆\n  - 第四天：返程\n\n**推荐目的地：广州长隆野生动物世界**\n• **行程安排**：\n  - 第一天：抵达广州，入住长隆旗下酒店\n  - 第二天：全天游玩野生动物世界\n  - 第三天：长隆欢乐世界或飞鸟乐园\n  - 第四天：返程\n\n**亲子游小贴士**：\n• 选择适合孩子年龄的景点\n• 行程安排要宽松，预留休息时间\n• 携带孩子的常用物品和零食\n• 注意防晒和防蚊\n• 提前了解景点的儿童优惠政策\n\n需要了解更多亲子游目的地吗？`
  } else if (userMsg.includes('拍照') && userMsg.includes('景点')) {
    aiResponse = `为您推荐适合拍照的景点：\n\n**国内热门拍照地**\n• **杭州西湖**：断桥残雪、苏堤春晓、雷峰夕照\n• **丽江古城**：四方街、束河古镇、玉龙雪山\n• **厦门鼓浪屿**：欧式建筑、海边日落、文艺小店\n• **成都锦里**：古色古香的街道、传统小吃\n• **北京故宫**：红墙黄瓦、御花园、角楼\n\n**拍照技巧**：\n• 黄金时间：日出后1小时和日落前1小时\n• 构图：使用三分法、对称构图\n• 光线：侧光和逆光能创造层次感\n• 角度：尝试不同角度，如低角度拍摄建筑\n• 前景：利用前景增加画面深度\n\n**装备建议**：\n• 相机：单反或微单相机\n• 镜头：广角镜头适合风景，定焦镜头适合人像\n• 配件：三脚架、滤镜、反光板\n\n需要了解更多拍照地点或技巧吗？`
  } else if (userMsg.includes('美食') && userMsg.includes('推荐')) {
    aiResponse = `为您推荐各地特色美食：\n\n**杭州美食**\n• 西湖醋鱼：楼外楼、知味观\n• 龙井虾仁：天外天、山外山\n• 叫花鸡：楼外楼\n• 东坡肉：知味观\n\n**四川美食**\n• 火锅：海底捞、大龙燚\n• 川菜：陈麻婆豆腐、龙抄手\n• 串串香：钢管厂五区小郡肝\n\n**广东美食**\n• 早茶：陶陶居、广州酒家\n• 粤菜：炳胜品味、唐阁\n• 烧腊：皇上皇、烧鹅仔\n\n**云南美食**\n• 过桥米线：桥香园、建新园\n• 汽锅鸡：福照楼\n• 野生菌：菌王府\n\n**其他推荐**\n• 北京烤鸭：全聚德、大董\n• 上海小笼包：南翔馒头店、鼎泰丰\n• 西安肉夹馍：老潼关肉夹馍\n• 长沙臭豆腐：黑色经典、文和友\n\n需要了解更多地方的特色美食吗？`
  } else {
    aiResponse = `根据您的问题，我为您提供以下建议：\n\n1. **行程规划**：根据您的时间和兴趣，为您定制个性化行程\n2. **景点推荐**：根据季节和偏好，推荐适合的景点\n3. **美食指南**：推荐当地特色美食和人气餐厅\n4. **住宿建议**：根据预算和需求，推荐合适的住宿\n5. **交通安排**：提供便捷的交通方案\n\n如果您有更具体的问题，比如"推荐一个5天的云南行程"或"上海有哪些适合拍照的地方"，我可以给您更详细的回答。`
  }
  
  setTimeout(() => {
    messages.value.push({
      type: 'ai',
      content: aiResponse,
      time: '刚刚',
      loading: false
    })
    isLoading.value = false
    userInput.value = ''
    scrollToBottom()
  }, 1500)
}

const clearChat = () => {
  messages.value = [{
    type: 'ai',
    content: '您好！我是小智导游，您的专属旅游助手。请问有什么可以帮您的吗？',
    time: '刚刚',
    loading: false
  }]
  ElMessage.info('对话已清空')
  scrollToBottom()
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
.ai-assistant-page {
  padding: 40px 0;
  min-height: 100vh;
  background: $gradient-primary;
  
  /* 动画效果 */
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
  
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: calc(var(--index, 0) * 100ms);
    opacity: 0;
  }
  
  /* 加载动画 */
  @keyframes loadingDot {
    0%, 20% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
    80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
  
  .loading {
    display: flex;
    gap: 4px;
    padding: 12px 16px;
    
    .loading-dot {
      width: 8px;
      height: 8px;
      background: $primary-color;
      border-radius: 50%;
      animation: loadingDot 1.4s infinite ease-in-out;
      
      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .ai-header {
    text-align: center;
    margin-bottom: 40px;
    color: white;
    
    h1 {
      font-size: 32px;
      margin-bottom: 16px;
      font-weight: 700;
    }
    
    p {
      font-size: 18px;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .ai-chat-container {
    background: white;
    border-radius: $border-radius-xl;
    overflow: hidden;
    box-shadow: $box-shadow-hover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    .chat-messages {
      height: 500px;
      overflow-y: auto;
      padding: 24px;
      scroll-behavior: smooth;
      
      /* 自定义滚动条 */
      &::-webkit-scrollbar {
        width: 6px;
      }
      
      &::-webkit-scrollbar-track {
        background: $travel-light;
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }
      
      &::-webkit-scrollbar-thumb:hover {
        background: #a1a1a1;
      }
      
      .message {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
        animation: fadeIn 0.3s ease-out;
        
        &.user {
          flex-direction: row-reverse;
          
          .content {
            align-items: flex-end;
          }
          
          .text {
            background: $primary-color;
            color: white;
            border-radius: 18px 18px 4px 18px;
          }
        }
        
        &.ai {
          .text {
            background: $travel-light;
            border-radius: 18px 18px 18px 4px;
          }
        }
        
        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            box-shadow: $box-shadow-light;
          }
        }
        
        .content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          
          .text {
            padding: 12px 16px;
            max-width: 400px;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
            box-shadow: $box-shadow-light;
          }
          
          .time {
            font-size: 12px;
            color: $text-placeholder;
            margin-top: -4px;
          }
        }
      }
    }
    
    .chat-input {
      border-top: 1px solid $border-base;
      padding: 24px;
      
      .input-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 16px;
        
        .el-button--primary {
          background: $gradient-secondary;
          border: none;
          border-radius: $border-radius-lg;
          padding: 12px 24px;
          font-weight: 600;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba($primary-color, 0.3);
          }
        }
        
        .el-button--default {
          background: white;
          border: 1px solid rgba($primary-color, 0.3);
          color: $text-primary;
          border-radius: $border-radius-lg;
          padding: 12px 24px;
          transition: all 0.3s ease;
          
          &:hover {
            border-color: $primary-color;
            background: rgba($primary-color, 0.05);
          }
        }
      }
    }
  }
  
  .quick-questions {
    margin-top: 40px;
    background: rgba(255, 255, 255, 0.1);
    padding: 24px;
    border-radius: $border-radius-lg;
    backdrop-filter: blur(10px);
    
    h3 {
      color: white;
      margin-bottom: 16px;
      text-align: center;
      font-weight: 600;
    }
    
    .question-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      
      .question-tag {
        cursor: pointer;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
          transform: translateY(-2px);
          background: white;
          color: $primary-color;
          box-shadow: 0 4px 12px rgba($primary-color, 0.3);
        }
      }
    }
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    padding: 20px 0;
    
    .container {
      padding: 0 15px;
    }
    
    .ai-header {
      margin-bottom: 30px;
      
      h1 {
        font-size: 24px;
      }
      
      p {
        font-size: 16px;
      }
    }
    
    .ai-chat-container {
      .chat-messages {
        height: 400px;
        padding: 16px;
        
        .message {
          gap: 12px;
          margin-bottom: 16px;
          
          .avatar {
            img {
              width: 36px;
              height: 36px;
            }
          }
          
          .content {
            .text {
              max-width: 280px;
              padding: 10px 14px;
            }
          }
        }
      }
      
      .chat-input {
        padding: 16px;
        
        .input-actions {
          gap: 8px;
        }
      }
    }
    
    .quick-questions {
      margin-top: 30px;
      padding: 20px;
      
      .question-tags {
        gap: 8px;
        
        .question-tag {
          font-size: 12px;
          padding: 4px 10px;
        }
      }
    }
  }
  
  @media (max-width: 480px) {
    .ai-chat-container {
      .chat-messages {
        height: 350px;
        
        .message {
          .content {
            .text {
              max-width: 220px;
            }
          }
        }
      }
    }
  }
}
</style>
EOF

