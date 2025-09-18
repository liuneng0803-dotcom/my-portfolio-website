/**
 * ========== 现代化个人网站交互脚本 ==========
 *
 * 版本: 2.0
 * 作者: 张三
 * 描述: 全面的网站交互功能实现
 *
 * 功能模块:
 * 1. 导航管理 - 平滑滚动、高亮显示、悬停效果
 * 2. 动画管理 - 页面加载动画、滚动触发动画
 * 3. 表单管理 - 验证、提交处理、用户反馈
 * 4. 返回顶部 - 滚动监听、平滑返回
 * 5. 技能展示 - 卡片动画、进度条效果
 *
 * 特性:
 * - ES6+ 语法
 * - 模块化设计
 * - 性能优化
 * - 可访问性支持
 * - 响应式兼容
 *
 * 兼容性: 现代浏览器 (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
 * 依赖: 无外部依赖
 */

// ========== 1. 导航优化和平滑滚动 ==========

class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.addSmoothScrolling();
        this.highlightActiveNavigation();
        this.addHoverAnimations();
    }

    // 平滑滚动效果
    addSmoothScrolling() {
        // 为所有内部链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 导航高亮显示当前页面
    highlightActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage ||
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 添加导航悬停动画和预加载
    addHoverAnimations() {
        document.querySelectorAll('nav a').forEach(link => {
            // 立即预加载所有页面资源
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && !href.startsWith('#')) {
                this.preloadPage(href);
            }

            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });

            // 添加即时加载效果
            link.addEventListener('click', this.handleInstantNavigation.bind(this));
        });
    }

    // 预加载页面资源
    preloadPage(href) {
        // 避免重复预加载
        if (document.querySelector(`link[href="${href}"]`)) return;

        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
    }

    // 处理即时导航
    handleInstantNavigation(e) {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('http')) return;

        e.preventDefault();

        // 添加页面切换动画
        document.body.style.transition = 'opacity 0.1s ease';
        document.body.style.opacity = '0.95';

        // 极快的页面跳转
        setTimeout(() => {
            window.location.href = href;
        }, 50);
    }
}

// ========== 2. 页面动画效果 ==========

class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.addPageLoadAnimation();
        this.setupIntersectionObserver();
    }

    // 页面加载动画（极速优化版本）
    addPageLoadAnimation() {
        // 检查是否为页面导航（不是刷新或历史记录）
        const isNavigation = performance.navigation.type === 0;
        const isFromSameOrigin = document.referrer && new URL(document.referrer).origin === window.location.origin;

        // 如果是站内导航，直接显示，无动画
        if (isFromSameOrigin || sessionStorage.getItem('visited')) {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
            return;
        }

        // 仅在首次访问网站时显示快速动画
        if (isNavigation) {
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(5px)';

            // 极快的动画时间
            requestAnimationFrame(() => {
                document.body.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            });

            // 标记已访问
            sessionStorage.setItem('visited', 'true');
        } else {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }
    }

    // 元素进入视窗动画
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        const animateElements = document.querySelectorAll(
            '.skill-card, .contact-card, .hero-section, h2, .contact-form'
        );

        animateElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }
}

// ========== 3. 表单验证和增强交互 ==========

class FormManager {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupFormValidation();
        this.addInputAnimations();
        this.createNotificationSystem();
    }

    setupFormValidation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateAndSubmitForm();
        });

        // 实时验证
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        let isValid = true;
        let message = '';

        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    message = '姓名至少需要2个字符';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = '请输入有效的邮箱地址';
                }
                break;
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    message = '消息内容至少需要10个字符';
                }
                break;
        }

        this.showFieldValidation(field, isValid, message);
        return isValid;
    }

    showFieldValidation(field, isValid, message) {
        const errorDiv = field.parentNode.querySelector('.field-error');

        if (!isValid) {
            if (!errorDiv) {
                const error = document.createElement('div');
                error.className = 'field-error';
                error.textContent = message;
                field.parentNode.appendChild(error);
            } else {
                errorDiv.textContent = message;
            }
            field.classList.add('error');
        } else {
            if (errorDiv) {
                errorDiv.remove();
            }
            field.classList.remove('error');
            field.classList.add('success');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error', 'success');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    validateAndSubmitForm() {
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            this.showNotification('请检查并修正表单中的错误', 'error');
        }
    }

    async submitForm() {
        const submitBtn = this.form.querySelector('.btn');
        const originalText = submitBtn.textContent;

        // 显示加载状态
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';

        // 模拟提交过程
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 重置按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // 显示成功消息
        this.showNotification('消息发送成功！我会尽快回复您。', 'success');
        this.form.reset();

        // 清除验证状态
        this.form.querySelectorAll('input, textarea').forEach(field => {
            field.classList.remove('error', 'success');
        });
    }

    addInputAnimations() {
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentNode.classList.remove('focused');
                }
            });
        });
    }

    createNotificationSystem() {
        if (!document.querySelector('#notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        container.appendChild(notification);

        // 添加关闭功能
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // 自动消失
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);

        // 动画进入
        setTimeout(() => notification.classList.add('show'), 100);
    }
}

// ========== 4. 返回顶部按钮 ==========

class BackToTopManager {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'back-to-top';
        this.button.innerHTML = '↑';
        this.button.title = '返回顶部';
        document.body.appendChild(this.button);
    }

    init() {
        // 滚动监听
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        });

        // 点击返回顶部
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== 5. 技能动画展示 ==========

class SkillAnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.animateSkillCards();
        this.addProgressBars();
    }

    animateSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');

        skillCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;

            // 悬停效果增强
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-xl)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-sm)';
            });
        });
    }

    addProgressBars() {
        // 为关于页面添加技能进度条
        if (window.location.pathname.includes('about')) {
            const skills = [
                { name: 'HTML/CSS', level: 90 },
                { name: 'JavaScript', level: 85 },
                { name: 'React/Vue', level: 75 },
                { name: 'Node.js', level: 70 },
                { name: 'UI/UX设计', level: 80 }
            ];

            this.createSkillBars(skills);
        }
    }

    createSkillBars(skills) {
        const skillSection = document.createElement('div');
        skillSection.className = 'skill-bars-section';
        skillSection.innerHTML = '<h2>🎯 技能水平</h2>';

        const skillBars = document.createElement('div');
        skillBars.className = 'skill-bars';

        skills.forEach(skill => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percentage">${skill.level}%</span>
                </div>
                <div class="skill-progress">
                    <div class="skill-fill" data-level="${skill.level}"></div>
                </div>
            `;
            skillBars.appendChild(skillBar);
        });

        skillSection.appendChild(skillBars);

        // 插入到技能展示之后
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid && skillsGrid.parentNode) {
            skillsGrid.parentNode.insertBefore(skillSection, skillsGrid.nextSibling);
        }

        // 动画进度条
        this.animateProgressBars();
    }

    animateProgressBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach((fill, index) => {
                        setTimeout(() => {
                            const level = fill.getAttribute('data-level');
                            fill.style.width = level + '%';
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });

        const skillBars = document.querySelector('.skill-bars');
        if (skillBars) {
            observer.observe(skillBars);
        }
    }
}

// ========== 性能监控和错误处理 ==========

/**
 * 性能监控类
 * 监控页面加载时间和核心Web指标
 */
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.init();
    }

    init() {
        // 监控页面加载完成时间
        window.addEventListener('load', () => {
            this.logLoadTime();
            this.measureWebVitals();
        });

        // 监控可见性变化（用于暂停/恢复动画）
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    /**
     * 记录页面加载时间
     */
    logLoadTime() {
        const loadTime = performance.now() - this.startTime;
        if (loadTime > 3000) {
            console.warn(`⚠️ 页面加载较慢: ${Math.round(loadTime)}ms`);
        } else {
            console.log(`✅ 页面加载完成: ${Math.round(loadTime)}ms`);
        }
    }

    /**
     * 测量核心Web指标
     */
    measureWebVitals() {
        // 监控最大内容绘制时间 (LCP)
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    const lcp = lastEntry.startTime;

                    if (lcp > 2500) {
                        console.warn(`⚠️ LCP较慢: ${Math.round(lcp)}ms`);
                    } else {
                        console.log(`✅ LCP良好: ${Math.round(lcp)}ms`);
                    }
                }).observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (error) {
                // 静默处理不支持的浏览器
            }
        }
    }

    /**
     * 处理页面可见性变化
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // 页面不可见时暂停动画
            document.body.classList.add('animations-paused');
        } else {
            // 页面可见时恢复动画
            document.body.classList.remove('animations-paused');
        }
    }
}

/**
 * 错误处理和日志记录
 */
class ErrorHandler {
    static init() {
        // 全局错误处理
        window.addEventListener('error', (event) => {
            ErrorHandler.logError('JavaScript Error', event.error);
        });

        // Promise 错误处理
        window.addEventListener('unhandledrejection', (event) => {
            ErrorHandler.logError('Promise Rejection', event.reason);
        });
    }

    /**
     * 记录错误信息
     * @param {string} type - 错误类型
     * @param {Error} error - 错误对象
     */
    static logError(type, error) {
        const errorInfo = {
            type,
            message: error?.message || error,
            stack: error?.stack,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        console.error('🚨 错误报告:', errorInfo);

        // 在开发环境中，可以将错误发送到监控服务
        // this.sendToMonitoring(errorInfo);
    }

    /**
     * 发送错误到监控服务（生产环境使用）
     * @param {Object} errorInfo - 错误信息
     */
    static sendToMonitoring(errorInfo) {
        // 这里可以集成错误监控服务，如 Sentry、LogRocket 等
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(errorInfo)
        // }).catch(() => {
        //     // 静默处理发送失败
        // });
    }
}

/**
 * 浏览器兼容性检测
 */
class CompatibilityChecker {
    static check() {
        const requiredFeatures = [
            { name: 'IntersectionObserver', check: () => 'IntersectionObserver' in window },
            { name: 'fetch', check: () => 'fetch' in window },
            { name: 'Promise', check: () => 'Promise' in window },
            { name: 'classList', check: () => 'classList' in document.createElement('div') }
        ];

        const unsupportedFeatures = requiredFeatures.filter(feature => {
            return !feature.check();
        });

        if (unsupportedFeatures.length > 0) {
            console.warn('⚠️ 以下功能在当前浏览器中不受支持:', unsupportedFeatures.map(f => f.name));
            return false;
        }

        // 额外检查：确保是现代浏览器
        const isModernBrowser = (() => {
            try {
                // 检查ES6支持
                eval('const test = () => {}');
                eval('let test2 = 1');
                eval('class TestClass {}');
                return true;
            } catch (e) {
                return false;
            }
        })();

        if (!isModernBrowser) {
            console.warn('⚠️ 检测到旧版浏览器，建议升级');
            return false;
        }

        return true;
    }

    static showFallback() {
        const fallbackMessage = document.createElement('div');
        fallbackMessage.id = 'browser-compatibility-notice';
        fallbackMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #ff6b35, #f7931e);
                color: white;
                padding: 12px 20px;
                text-align: center;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 10000;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.4;
            ">
                <span style="margin-right: 10px;">ℹ️</span>
                为了获得最佳体验，建议使用最新版本的 Chrome、Firefox、Safari 或 Edge 浏览器。
                <button onclick="this.parentNode.parentNode.remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    margin-left: 15px;
                    padding: 4px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                ">知道了</button>
            </div>
        `;

        // 添加到页面顶部
        document.body.insertBefore(fallbackMessage, document.body.firstChild);

        // 5秒后自动消失
        setTimeout(() => {
            const notice = document.getElementById('browser-compatibility-notice');
            if (notice) {
                notice.style.opacity = '0';
                notice.style.transition = 'opacity 0.5s ease';
                setTimeout(() => notice.remove(), 500);
            }
        }, 8000);
    }
}

/**
 * 性能优化工具
 */
class PerformanceOptimizer {
    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间
     * @returns {Function} 防抖后的函数
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 时间间隔
     * @returns {Function} 节流后的函数
     */
    static throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 预加载资源
     * @param {string[]} urls - 要预加载的资源URL
     */
    static preloadResources(urls) {
        urls.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// ========== 主初始化函数 ==========

/**
 * 应用程序主类
 * 负责协调所有功能模块的初始化和生命周期管理
 */
class App {
    constructor() {
        this.isInitialized = false;
        this.managers = new Map();
    }

    /**
     * 初始化应用程序
     */
    async init() {
        try {
            // 获取配置（如果存在）
            const config = window.CONFIG || {};
            const skipCompatCheck = config.get?.('DEV.skipCompatibilityCheck') ||
                                   window.location.search.includes('skip-compat') ||
                                   window.localStorage.getItem('skip-compat-check') === 'true';

            // 检查浏览器兼容性
            if (!skipCompatCheck && !CompatibilityChecker.check()) {
                CompatibilityChecker.showFallback();
                // 仍然尝试初始化，但可能功能受限
                console.warn('⚠️ 在兼容性受限的环境下继续运行');
            }

            // 初始化错误处理
            ErrorHandler.init();

            // 初始化性能监控
            const performanceMonitor = new PerformanceMonitor();

            // 检查用户偏好设置
            this.respectUserPreferences();

            // 初始化功能模块
            await this.initializeManagers();

            // 设置全局事件监听
            this.setupGlobalEvents();

            this.isInitialized = true;
            console.log('🚀 网站交互功能已全部加载完成！');

            // 触发自定义初始化完成事件
            document.dispatchEvent(new CustomEvent('app:initialized'));

        } catch (error) {
            ErrorHandler.logError('App Initialization', error);
            console.error('❌ 应用初始化失败:', error);
        }
    }

    /**
     * 初始化所有功能管理器
     */
    async initializeManagers() {
        const managerConfig = [
            { name: 'navigation', class: NavigationManager },
            { name: 'animation', class: AnimationManager },
            { name: 'form', class: FormManager },
            { name: 'backToTop', class: BackToTopManager },
            { name: 'skillAnimation', class: SkillAnimationManager }
        ];

        for (const config of managerConfig) {
            try {
                const manager = new config.class();
                this.managers.set(config.name, manager);
            } catch (error) {
                ErrorHandler.logError(`${config.name} Manager Init`, error);
            }
        }
    }

    /**
     * 尊重用户偏好设置
     */
    respectUserPreferences() {
        // 检查用户是否偏好减少动画
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            console.log('ℹ️ 已根据用户偏好禁用动画');
        }

        // 检查用户是否偏好暗色主题
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log('ℹ️ 检测到用户偏好暗色主题');
        }
    }

    /**
     * 设置全局事件监听
     */
    setupGlobalEvents() {
        // 窗口大小变化时的优化处理
        const handleResize = PerformanceOptimizer.throttle(() => {
            document.dispatchEvent(new CustomEvent('app:resize'));
        }, 100);

        window.addEventListener('resize', handleResize);

        // 页面离开前的清理
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * 清理资源
     */
    cleanup() {
        // 清理所有管理器
        this.managers.forEach((manager, name) => {
            if (typeof manager.cleanup === 'function') {
                manager.cleanup();
            }
        });

        this.managers.clear();
        console.log('🧹 资源清理完成');
    }

    /**
     * 获取管理器实例
     * @param {string} name - 管理器名称
     * @returns {Object|null} 管理器实例
     */
    getManager(name) {
        return this.managers.get(name) || null;
    }
}

// ========== 应用启动 ==========

// 确保DOM加载完成后启动应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
        window.app.init();
    });
} else {
    // DOM已经加载完成
    window.app = new App();
    window.app.init();
}