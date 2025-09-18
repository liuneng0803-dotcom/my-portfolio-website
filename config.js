/**
 * ========== 网站配置文件 ==========
 *
 * 环境配置和应用程序设置
 * 版本: 2.0.1
 * 作者: 张三
 *
 * 使用方法:
 * - 在HTML中引入此文件在script.js之前
 * - 配置会自动添加到 window.CONFIG 中
 */

(function() {
    'use strict';

    /**
     * 网站基础配置
     */
    const CONFIG = {
        // 环境配置
        ENVIRONMENT: detectEnvironment(),

        // 网站信息
        SITE: {
            name: '张三的个人网站',
            title: '张三 - 全栈开发者',
            description: '专业全栈开发者，提供现代化Web开发、UI/UX设计和响应式开发服务',
            author: '张三',
            version: '2.0.1',
            language: 'zh-CN'
        },

        // URL配置（根据环境自动切换）
        URLS: {
            base: getBaseURL(),
            api: getApiURL(),
            cdn: getCdnURL()
        },

        // 性能配置
        PERFORMANCE: {
            // 动画配置
            enableAnimations: true,
            animationDuration: 300,

            // 懒加载配置
            lazyLoadOffset: 100,

            // 缓存配置
            cacheExpiry: 3600000, // 1小时 (毫秒)

            // 性能监控
            enablePerformanceMonitoring: true,
            performanceThreshold: 3000, // 3秒
        },

        // 功能开关
        FEATURES: {
            enableErrorReporting: false, // 生产环境开启
            enableAnalytics: false,      // 生产环境开启
            enableServiceWorker: false,  // PWA功能
            enableOfflineMode: false,    // 离线模式
            debugMode: isDebugMode()
        },

        // 交互配置
        UI: {
            // 表单配置
            form: {
                validateOnBlur: true,
                validateOnInput: false,
                showSuccessMessages: true,
                autoResetDelay: 5000
            },

            // 通知配置
            notifications: {
                position: 'top-right',
                autoHideDelay: 5000,
                maxVisible: 3
            },

            // 主题配置
            theme: {
                respectSystemPreference: true,
                defaultTheme: 'light',
                storageKey: 'preferred-theme'
            }
        },

        // 开发配置
        DEV: {
            enableLogging: isDebugMode(),
            logLevel: 'info', // 'error', 'warn', 'info', 'debug'
            enableHotReload: false,
            showPerformanceMetrics: isDebugMode()
        }
    };

    /**
     * 检测运行环境
     * @returns {string} 'development' | 'production'
     */
    function detectEnvironment() {
        if (typeof window === 'undefined') return 'server';

        const hostname = window.location.hostname;

        if (hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname.startsWith('192.168.') ||
            hostname.includes('local')) {
            return 'development';
        }

        return 'production';
    }

    /**
     * 获取基础URL
     * @returns {string} 基础URL
     */
    function getBaseURL() {
        if (CONFIG.ENVIRONMENT === 'development') {
            return `${window.location.protocol}//${window.location.host}`;
        }
        return 'https://your-domain.com'; // 生产环境URL
    }

    /**
     * 获取API URL
     * @returns {string} API URL
     */
    function getApiURL() {
        if (CONFIG.ENVIRONMENT === 'development') {
            return `${getBaseURL()}/api`;
        }
        return 'https://api.your-domain.com'; // 生产环境API
    }

    /**
     * 获取CDN URL
     * @returns {string} CDN URL
     */
    function getCdnURL() {
        if (CONFIG.ENVIRONMENT === 'development') {
            return getBaseURL();
        }
        return 'https://cdn.your-domain.com'; // 生产环境CDN
    }

    /**
     * 检测是否为调试模式
     * @returns {boolean} 是否为调试模式
     */
    function isDebugMode() {
        return CONFIG.ENVIRONMENT === 'development' ||
               window.location.search.includes('debug=true') ||
               window.localStorage.getItem('debug-mode') === 'true';
    }

    /**
     * 更新配置项
     * @param {string} key 配置键
     * @param {*} value 配置值
     */
    CONFIG.set = function(key, value) {
        const keys = key.split('.');
        let current = CONFIG;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
    };

    /**
     * 获取配置项
     * @param {string} key 配置键
     * @param {*} defaultValue 默认值
     * @returns {*} 配置值
     */
    CONFIG.get = function(key, defaultValue = null) {
        const keys = key.split('.');
        let current = CONFIG;

        for (const k of keys) {
            if (current[k] === undefined) return defaultValue;
            current = current[k];
        }

        return current;
    };

    /**
     * 打印配置信息
     */
    CONFIG.printInfo = function() {
        console.group('🔧 网站配置信息');
        console.log('环境:', CONFIG.ENVIRONMENT);
        console.log('调试模式:', CONFIG.FEATURES.debugMode);
        console.log('基础URL:', CONFIG.URLS.base);
        console.log('版本:', CONFIG.SITE.version);
        console.groupEnd();
    };

    // 将配置添加到全局对象
    window.CONFIG = CONFIG;

    // 开发环境下自动打印配置信息
    if (CONFIG.FEATURES.debugMode) {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => CONFIG.printInfo(), 100);
        });
    }

    // 导出配置（如果支持模块化）
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CONFIG;
    }

})();