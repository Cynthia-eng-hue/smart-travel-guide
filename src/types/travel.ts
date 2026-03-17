// src/types/travel.ts

// 目的地类型
export interface Destination {
  id: number
  name: string
  description: string
  location: string
  tags: string[]
  popularity: number
  rating: number
  imageUrl: string
  weather: {
    temperature: number
    condition: string
  }
  // 扩展字段
  address?: string
  openingHours?: string
  ticketPrice?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// 活动类型
export interface Activity {
  id: number
  name: string
  time: string
  description: string
  location: string
  // 扩展字段
  duration?: number // 活动时长（分钟）
  price?: number // 活动价格
  imageUrl?: string // 活动图片
}

// 行程天类型
export interface ItineraryDay {
  day: number
  activities: Activity[]
  // 扩展字段
  notes?: string // 当日备注
}

// 行程计划类型
export interface TripPlan {
  id: number
  title: string
  destinations: Destination[]
  duration: number // 行程天数
  budget: number // 预算
  itinerary: ItineraryDay[]
  createdAt: string
  updatedAt: string
  // 扩展字段
  notes?: string // 行程备注
  tags?: string[] // 行程标签
  imageUrl?: string // 行程封面图
}

// 用户偏好类型
export interface UserPreference {
  budget: number
  duration: number
  interests: string[]
  travelStyle: string
  language: string
  // 扩展字段
  travelPartySize?: number // 旅行人数
  accommodationType?: string // 住宿类型
  transportationPreference?: string // 交通偏好
}

// 旅游社区帖子类型
export interface TravelCommunityPost {
  id: number
  userId: number
  userName: string
  userAvatar: string
  title: string
  content: string
  images: string[]
  likes: number
  comments: number
  createdAt: string
  tags: string[]
  // 扩展字段
  isLiked?: boolean // 当前用户是否点赞
  commentsList?: Comment[] // 评论列表
}

// 评论类型
export interface Comment {
  id: number
  postId: number
  userId: number
  userName: string
  userAvatar: string
  content: string
  createdAt: string
  likes: number
  // 扩展字段
  isLiked?: boolean // 当前用户是否点赞
  replies?: Comment[] // 回复列表
}

// AI推荐类型
export interface AIRecommendation {
  id: number
  type: 'destination' | 'activity' | 'food' | 'accommodation'
  title: string
  content: string
  destinations?: Destination[]
  activities?: string[]
  foods?: string[]
  accommodations?: string[]
  // 扩展字段
  score?: number // 推荐分数
  reason?: string // 推荐理由
}

// 天气信息类型
export interface WeatherInfo {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  forecast: WeatherForecast[]
}

// 天气预报类型
export interface WeatherForecast {
  date: string
  temperature: {
    min: number
    max: number
  }
  condition: string
  precipitation: number
}

// 交通信息类型
export interface TrafficInfo {
  origin: string
  destination: string
  distance: number
  duration: number
  route: string[]
  trafficCondition: 'light' | 'moderate' | 'heavy'
}

// 旅游达人类型
export interface TravelInfluencer {
  id: number
  name: string
  avatar: string
  bio: string
  followers: number
  posts: number
  specialties: string[]
  // 扩展字段
  isFollowing?: boolean // 当前用户是否关注
}
