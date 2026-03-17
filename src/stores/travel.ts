// src/stores/travel.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TripPlan, Destination, UserPreference, TravelCommunityPost, AIRecommendation } from '@/types/travel'

export const useTravelStore = defineStore('travel', () => {
  // 状态
  const tripPlans = ref<TripPlan[]>([])
  const currentPlan = ref<TripPlan | null>(null)
  const destinations = ref<Destination[]>([])
  const userPreferences = ref<UserPreference>({
    budget: 0,
    duration: 0,
    interests: [],
    travelStyle: '',
    language: 'zh-CN'
  })
  const communityPosts = ref<TravelCommunityPost[]>([])
  const aiRecommendations = ref<AIRecommendation[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const filteredDestinations = computed(() => {
    if (userPreferences.value.interests.length === 0) {
      return destinations.value
    }
    return destinations.value.filter(destination => 
      destination.tags.some(tag => userPreferences.value.interests.includes(tag))
    )
  })

  const popularDestinations = computed(() => {
    return destinations.value
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10)
  })

  // 动作
  async function generateTripPlan() {
    loading.value = true
    error.value = null
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newPlan: TripPlan = {
        id: Date.now(),
        title: `智能行程计划 ${new Date().toLocaleDateString()}`,
        destinations: destinations.value.slice(0, 3),
        duration: userPreferences.value.duration || 3,
        budget: userPreferences.value.budget || 5000,
        itinerary: [
          {
            day: 1,
            activities: [
              {
                id: 1,
                name: '抵达目的地',
                time: '上午',
                description: '抵达目的地，办理入住手续',
                location: destinations.value[0]?.name || '目的地'
              },
              {
                id: 2,
                name: '城市观光',
                time: '下午',
                description: '游览城市主要景点',
                location: destinations.value[0]?.name || '目的地'
              }
            ]
          },
          {
            day: 2,
            activities: [
              {
                id: 3,
                name: '景点游览',
                time: '全天',
                description: '游览主要景点',
                location: destinations.value[0]?.name || '目的地'
              }
            ]
          },
          {
            day: 3,
            activities: [
              {
                id: 4,
                name: '自由活动',
                time: '上午',
                description: '自由活动，购物',
                location: destinations.value[0]?.name || '目的地'
              },
              {
                id: 5,
                name: '返程',
                time: '下午',
                description: '办理退房手续，返程',
                location: destinations.value[0]?.name || '目的地'
              }
            ]
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      tripPlans.value.unshift(newPlan)
      currentPlan.value = newPlan
      return newPlan
    } catch (err) {
      error.value = '生成行程计划失败'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchDestinations() {
    loading.value = true
    error.value = null
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800))
      
      destinations.value = [
        {
          id: 1,
          name: '杭州西湖',
          description: '人间天堂，中国著名的风景名胜区',
          location: '浙江省杭州市',
          tags: ['自然风光', '文化遗产', '湖泊'],
          popularity: 95,
          rating: 4.8,
          imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
          weather: {
            temperature: 25,
            condition: '晴天'
          }
        },
        {
          id: 2,
          name: '北京故宫',
          description: '中国明清两代的皇家宫殿',
          location: '北京市',
          tags: ['历史古迹', '文化遗产', '建筑'],
          popularity: 98,
          rating: 4.9,
          imageUrl: 'https://images.unsplash.com/photo-1523413363575-0e5636f8c2c5?w=400',
          weather: {
            temperature: 20,
            condition: '多云'
          }
        },
        {
          id: 3,
          name: '上海外滩',
          description: '上海的标志性景观',
          location: '上海市',
          tags: ['城市风光', '建筑', '夜景'],
          popularity: 92,
          rating: 4.7,
          imageUrl: 'https://images.unsplash.com/photo-1548919973-3134836c4c75?w=400',
          weather: {
            temperature: 28,
            condition: '晴天'
          }
        }
      ]
      return destinations.value
    } catch (err) {
      error.value = '获取目的地失败'
      return []
    } finally {
      loading.value = false
    }
  }

  async function getAIRecommendations() {
    loading.value = true
    error.value = null
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      aiRecommendations.value = [
        {
          id: 1,
          type: 'destination',
          title: '推荐目的地',
          content: '根据您的偏好，推荐您前往杭州西湖，那里有美丽的自然风光和丰富的文化遗产。',
          destinations: [destinations.value[0]]
        },
        {
          id: 2,
          type: 'activity',
          title: '推荐活动',
          content: '在杭州西湖，您可以乘坐游船游览湖面，参观灵隐寺，品尝当地美食。',
          activities: ['游船', '寺庙参观', '美食之旅']
        }
      ]
      return aiRecommendations.value
    } catch (err) {
      error.value = '获取AI推荐失败'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchCommunityPosts() {
    loading.value = true
    error.value = null
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      communityPosts.value = [
        {
          id: 1,
          userId: 1,
          userName: '旅行达人',
          userAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          title: '杭州三天两夜深度游',
          content: '分享我的杭州三日游行程，包括西湖、灵隐寺、宋城等景点的详细攻略。',
          images: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400'],
          likes: 123,
          comments: 23,
          createdAt: new Date().toISOString(),
          tags: ['杭州', '西湖', '三日游']
        },
        {
          id: 2,
          userId: 2,
          userName: '摄影爱好者',
          userAvatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          title: '故宫摄影攻略',
          content: '分享在故宫拍摄的技巧和最佳拍摄位置，让你的照片脱颖而出。',
          images: ['https://images.unsplash.com/photo-1523413363575-0e5636f8c2c5?w=400'],
          likes: 98,
          comments: 15,
          createdAt: new Date().toISOString(),
          tags: ['北京', '故宫', '摄影']
        }
      ]
      return communityPosts.value
    } catch (err) {
      error.value = '获取社区帖子失败'
      return []
    } finally {
      loading.value = false
    }
  }

  function updateUserPreferences(preferences: Partial<UserPreference>) {
    userPreferences.value = { ...userPreferences.value, ...preferences }
  }

  function addTripPlan(plan: TripPlan) {
    tripPlans.value.unshift(plan)
    currentPlan.value = plan
  }

  function updateTripPlan(planId: number, updates: Partial<TripPlan>) {
    const index = tripPlans.value.findIndex(p => p.id === planId)
    if (index !== -1) {
      tripPlans.value[index] = { ...tripPlans.value[index], ...updates }
      if (currentPlan.value?.id === planId) {
        currentPlan.value = tripPlans.value[index]
      }
    }
  }

  function deleteTripPlan(planId: number) {
    tripPlans.value = tripPlans.value.filter(p => p.id !== planId)
    if (currentPlan.value?.id === planId) {
      currentPlan.value = null
    }
  }

  function addCommunityPost(post: TravelCommunityPost) {
    communityPosts.value.unshift(post)
  }

  function likeCommunityPost(postId: number) {
    const post = communityPosts.value.find(p => p.id === postId)
    if (post) {
      post.likes++
    }
  }

  return {
    // 状态
    tripPlans,
    currentPlan,
    destinations,
    userPreferences,
    communityPosts,
    aiRecommendations,
    loading,
    error,
    // 计算属性
    filteredDestinations,
    popularDestinations,
    // 动作
    generateTripPlan,
    fetchDestinations,
    getAIRecommendations,
    fetchCommunityPosts,
    updateUserPreferences,
    addTripPlan,
    updateTripPlan,
    deleteTripPlan,
    addCommunityPost,
    likeCommunityPost
  }
})
