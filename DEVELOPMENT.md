# 🛠️ 开发指南

这是一个详细的开发和部署指南，帮助你在本地环境中高效开发和测试网站。

## 📋 目录

- [快速开始](#快速开始)
- [本地开发环境](#本地开发环境)
- [代码结构说明](#代码结构说明)
- [性能优化](#性能优化)
- [调试技巧](#调试技巧)
- [部署指南](#部署指南)

## 🚀 快速开始

### 1. 启动本地服务器

**方法1: 使用Python (推荐)**
```bash
# 使用自定义服务器脚本
python3 server.py

# 或指定端口
python3 server.py 3000
```

**方法2: 使用npm**
```bash
# 安装依赖 (可选)
npm install

# 启动服务
npm start
# 或
npm run serve
```

**方法3: 使用其他工具**
```bash
# 使用 http-server
npx http-server -p 8000 -c-1

# 使用 live-server
npx live-server --port=8000

# 使用 PHP
php -S localhost:8000
```

### 2. 访问网站

打开浏览器访问：
- 首页: http://localhost:8000
- 关于: http://localhost:8000/about.html
- 联系: http://localhost:8000/contact.html

## 🔧 本地开发环境

### 环境要求

- **浏览器**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Python**: 3.6+ (如果使用Python服务器)
- **Node.js**: 14+ (如果使用npm工具)

### 开发工具推荐

1. **代码编辑器**: VS Code, WebStorm
2. **浏览器扩展**:
   - Web Vitals
   - Lighthouse
   - axe DevTools (可访问性测试)
   - ColorZilla (颜色工具)

### VS Code 扩展推荐

```json
{
  "recommendations": [
    "ms-vscode.live-server",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 📁 代码结构说明

```
my-portfolio-website/
├── 📄 index.html          # 首页 - 主要入口页面
├── 📄 about.html          # 关于页面 - 个人信息展示
├── 📄 contact.html        # 联系页面 - 联系表单和信息
├── 🎨 styles.css          # 主样式文件 - 所有CSS样式
├── ⚙️ script.js           # 主脚本文件 - 所有JavaScript功能
├── 🔧 config.js           # 配置文件 - 环境和功能配置
├── 🐍 server.py           # 本地服务器脚本
├── 📦 package.json        # npm配置文件
├── 🔒 .htaccess           # Apache服务器配置
├── 🤖 robots.txt          # 爬虫配置文件
├── 🗺️ sitemap.xml         # 网站地图
├── 🖼️ favicon.ico         # 网站图标
├── 📚 README.md           # 项目文档
├── 🛠️ DEVELOPMENT.md      # 开发指南
└── 📁 assets/             # 资源文件目录
    ├── 🖼️ images/         # 图片资源
    ├── 🎵 sounds/         # 音频资源 (可选)
    └── 📹 videos/         # 视频资源 (可选)
```

### 核心文件说明

#### HTML文件
- **语义化结构**: 使用 `<header>`, `<main>`, `<section>`, `<footer>` 等语义化标签
- **SEO优化**: 完整的meta标签、Open Graph、结构化数据
- **可访问性**: ARIA标签、键盘导航支持

#### CSS文件 (styles.css)
- **模块化组织**: 按功能分区，便于维护
- **CSS变量**: 统一的设计token系统
- **响应式设计**: 移动优先的响应式布局
- **性能优化**: 硬件加速、字体优化

#### JavaScript文件 (script.js)
- **模块化架构**: 类结构，功能独立
- **性能监控**: Web Vitals监控
- **错误处理**: 完整的错误捕获机制
- **兼容性**: 现代浏览器支持

#### 配置文件 (config.js)
- **环境检测**: 自动识别开发/生产环境
- **功能开关**: 灵活的功能控制
- **URL管理**: 环境相关的URL配置

## ⚡ 性能优化

### 已实现的优化

1. **资源优化**
   - 字体预加载和display: swap
   - 图片懒加载支持
   - CSS和JS压缩配置

2. **缓存策略**
   - 合理的HTTP缓存头
   - 静态资源长期缓存
   - HTML短期缓存

3. **渲染优化**
   - 关键CSS内联（可选）
   - 硬件加速优化
   - 防止布局抖动

### 性能监控

网站内置了性能监控功能：

```javascript
// 开启性能监控（开发环境自动开启）
window.CONFIG.set('PERFORMANCE.enablePerformanceMonitoring', true);

// 查看性能报告
window.app.getManager('performance').getReport();
```

### Web Vitals 目标

- **LCP** (最大内容绘制): < 2.5s
- **FID** (首次输入延迟): < 100ms
- **CLS** (累积布局偏移): < 0.1

## 🐛 调试技巧

### 开发者工具

1. **启用调试模式**
   ```javascript
   // 方法1: URL参数
   http://localhost:8000?debug=true

   // 方法2: 本地存储
   localStorage.setItem('debug-mode', 'true')

   // 方法3: 控制台
   window.CONFIG.set('FEATURES.debugMode', true);
   ```

2. **查看配置信息**
   ```javascript
   // 打印完整配置
   window.CONFIG.printInfo();

   // 查看特定配置
   window.CONFIG.get('PERFORMANCE.animationDuration');
   ```

3. **性能分析**
   ```javascript
   // 查看加载时间
   performance.now() - window.startTime;

   // 查看内存使用 (Chrome)
   console.log(performance.memory);
   ```

### 常见问题排查

1. **样式不生效**
   - 检查CSS语法错误
   - 确认选择器优先级
   - 查看控制台错误信息

2. **JavaScript功能异常**
   - 打开浏览器开发者工具
   - 查看控制台错误信息
   - 检查网络请求状态

3. **性能问题**
   - 使用Lighthouse分析
   - 检查Web Vitals指标
   - 优化图片和资源大小

## 📱 响应式测试

### 测试设备尺寸

```css
/* 移动端 */
@media (max-width: 768px) { /* 手机 */ }

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) { /* 平板 */ }

/* 桌面端 */
@media (min-width: 1025px) { /* 桌面 */ }
```

### Chrome DevTools 测试

1. 打开开发者工具 (F12)
2. 点击设备切换按钮 (Ctrl+Shift+M)
3. 选择不同设备进行测试

## 🚀 部署指南

### 生产环境准备

1. **更新配置**
   ```javascript
   // 在 config.js 中更新生产环境URL
   const PRODUCTION_CONFIG = {
       URLS: {
           base: 'https://your-domain.com',
           api: 'https://api.your-domain.com',
           cdn: 'https://cdn.your-domain.com'
       }
   };
   ```

2. **SEO设置**
   - 更新 `sitemap.xml` 中的URL
   - 更新 `robots.txt` 中的域名
   - 在HTML中更新canonical URL

### 部署平台

#### Netlify
1. 连接Git仓库
2. 构建设置: 无（静态网站）
3. 发布目录: `/`

#### Vercel
1. 导入Git仓库
2. 框架: Other
3. 输出目录: `./`

#### GitHub Pages
1. 仓库设置 → Pages
2. 源: `main` 分支
3. 自定义域名配置

### 性能检查清单

部署前请确保：

- [ ] 所有图片已优化
- [ ] CSS和JS已压缩（生产环境）
- [ ] 设置了正确的缓存头
- [ ] sitemap.xml 已更新
- [ ] robots.txt 已配置
- [ ] meta标签信息正确
- [ ] HTTPS已启用

## 🔧 自定义开发

### 添加新页面

1. 创建HTML文件
2. 复制现有页面结构
3. 更新导航链接
4. 添加到sitemap.xml

### 修改样式

1. 使用CSS变量保持一致性
2. 遵循现有的命名规范
3. 测试响应式布局
4. 验证可访问性

### 添加新功能

1. 在config.js中添加功能开关
2. 创建新的管理器类
3. 在App类中注册管理器
4. 添加必要的CSS样式

## 📞 获取帮助

如果遇到问题，请：

1. 检查浏览器控制台错误
2. 参考README.md文档
3. 查看issue列表
4. 提交新的issue

---

**Happy Coding! 🚀**