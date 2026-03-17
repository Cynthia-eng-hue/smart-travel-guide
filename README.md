# 🧳 智能旅游指南 · Smart Travel Guide

> 一站式智慧旅行服务平台，集成 AI 行程规划、智能问答、酒店/景点预览及社交分享。  
> [在线演示](https://smart-travel-guide.vercel.app) · [GitHub 仓库](https://github.com/Cynthia-eng-hue/smart-travel-guide)

---

## ✨ 项目亮点

- 🤖 **AI 智能助手**：对接大模型 API，实现 SSE 流式逐字输出，对话响应更快。
- 📸 **智能导出中心**：一键生成 PDF 行程单/海报，攻克 Canvas 跨域与长截图截断难题。
- ⚡ **性能优化**：路由懒加载 + 按需引入，首屏加载时间降低 30%；虚拟列表渲染长对话。
- 🎨 **玻璃态 UI**：基于 Sass 变量设计的现代风格，完美适配移动端/PC。

---

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 核心框架 | Vue 3 (Composition API) + TypeScript |
| 构建工具 | Vite |
| 状态管理 | Pinia |
| UI 库 | Element Plus (按需引入) |
| 样式 | Sass + Flex/Grid + 响应式 |
| 可视化/导出 | ECharts + html2canvas + jsPDF |
| 网络请求 | Axios (拦截器封装) |
| 代码规范 | ESLint + Prettier + Husky |

---

## 📸 功能截图

<img width="800" alt="image" src="https://github.com/user-attachments/assets/2ed9dd7e-54db-4acb-853f-ebbe643bd302" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/54fa4e3c-fd9d-4a76-9a02-1495e1ee155b" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/5b1d9228-e1b7-4de6-b25a-d5b8c16491fe" />
<img width="800" alt="image" src="https://github.com/user-attachments/assets/bb0fddc9-bdee-47ed-9203-fd4cafbbda4e" />


---

## 🚀 本地运行

```bash
git clone https://github.com/Cynthia-eng-hue/smart-travel-guide.git
cd smart-travel-guide
npm install
npm run dev
访问 http://localhost:5173 即可预览
