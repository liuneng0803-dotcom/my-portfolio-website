# 🌟 个人作品集网站

一个现代化、响应式的个人网站，展示专业技能和项目经验。

## ✨ 特性

- 🎨 **现代化设计** - 简洁美观的响应式界面
- ⚡ **高性能** - 快速加载，优化的资源管理
- ♿ **无障碍访问** - 符合WCAG标准的可访问性
- 📱 **完全响应式** - 完美适配所有设备尺寸
- 🔍 **SEO友好** - 完整的元数据和社交分享优化

## 🛠️ 技术栈

- **HTML5** - 语义化标签和结构化数据
- **CSS3** - 现代布局、动画效果和响应式设计
- **JavaScript ES6+** - 模块化架构和性能优化
- **Web API** - IntersectionObserver、Performance API

## 🚀 快速开始

### 方法1：本地服务器（推荐）
```bash
# 使用Python
python3 -m http.server 8000

# 使用Node.js
npx http-server -p 8000

# 访问网站
open http://localhost:8000
```

### 方法2：直接打开
双击 `index.html` 文件在浏览器中查看

## 📁 项目结构

```
my-portfolio-website/
├── 📄 index.html       # 首页 - 个人介绍和技能展示
├── 📄 about.html       # 关于页 - 详细个人信息和经验
├── 📄 contact.html     # 联系页 - 联系表单和联系方式
├── 🎨 styles.css       # 主样式文件 - 所有CSS样式
├── ⚙️ script.js        # 主脚本文件 - 交互功能和动画
├── 🔧 config.js        # 配置文件 - 环境设置和功能开关
├── 🖼️ favicon.svg      # 网站图标
├── 📋 site.webmanifest # PWA配置文件
├── 🤖 robots.txt       # 搜索引擎爬虫配置
├── 🗺️ sitemap.xml      # 网站地图
└── 📖 README.md        # 项目文档
```

## 🎯 自定义指南

### 1. 更新个人信息
- 修改HTML文件中的姓名、职业描述、技能信息
- 更新联系方式和社交媒体链接
- 替换网站标题和meta描述

### 2. 修改样式
```css
/* 在styles.css中自定义CSS变量 */
:root {
    --primary-color: #2563eb;    /* 主色调 */
    --primary-hover: #1d4ed8;    /* 悬停色 */
    --text-dark: #0f172a;        /* 深色文字 */
    --text-light: #64748b;       /* 浅色文字 */
}
```

### 3. 更新URL配置
部署前请更新以下文件中的URL：
- HTML文件中的canonical链接和Open Graph URL
- `robots.txt` 中的sitemap地址
- `sitemap.xml` 中的页面地址
- `config.js` 中的生产环境URL

## 📊 性能目标

- **首屏加载时间** < 2.5秒
- **可交互时间** < 3秒
- **Lighthouse性能评分** > 90
- **可访问性评分** > 95

## 🌐 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🚀 部署选项

### Netlify (推荐)
1. 连接GitHub仓库
2. 构建设置：无需构建
3. 发布目录：`/`

### Vercel
1. 导入Git仓库
2. 框架：Other
3. 输出目录：`./`

### GitHub Pages
1. 仓库设置 → Pages
2. 源分支：`main`
3. 根目录部署

### 传统服务器
将所有文件上传到服务器根目录即可

## 📋 部署前检查清单

- [ ] 更新HTML文件中的个人信息
- [ ] 修改所有URL为生产环境地址
- [ ] 替换favicon为自己的图标
- [ ] 测试所有页面链接和功能
- [ ] 检查响应式布局
- [ ] 验证表单功能
- [ ] 运行Lighthouse性能测试

## 🔧 开发工具

### VS Code插件推荐
- Live Server - 本地开发服务器
- Prettier - 代码格式化
- Auto Rename Tag - HTML标签同步修改
- Path Intellisense - 路径智能提示

### 性能测试
- Google Lighthouse - 综合性能评估
- WebPageTest - 详细性能分析
- GTmetrix - 加载速度测试

## 📞 获取帮助

如果遇到问题：
1. 检查浏览器控制台是否有错误信息
2. 确认所有文件路径正确
3. 验证服务器配置（如使用服务器部署）
4. 参考浏览器兼容性要求

## 📄 许可证

MIT License - 可自由使用和修改

---

⭐ 如果这个项目对您有帮助，请给个Star！