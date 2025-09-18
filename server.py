#!/usr/bin/env python3
"""
本地开发服务器
用于测试个人网站的本地服务器脚本

使用方法:
python3 server.py [端口号]

默认端口: 8000
默认地址: http://localhost:8000
"""

import http.server
import socketserver
import sys
import os
import mimetypes

# 添加现代Web文件类型支持
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('font/woff', '.woff')
mimetypes.add_type('font/woff2', '.woff2')


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义HTTP请求处理器，添加安全头部和缓存控制"""

    def end_headers(self):
        # 添加安全头部
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')

        # 添加缓存控制
        if self.path.endswith(('.css', '.js')):
            self.send_header('Cache-Control', 'public, max-age=3600')  # 1小时
        elif self.path.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico')):
            self.send_header('Cache-Control', 'public, max-age=86400')  # 1天
        else:
            self.send_header('Cache-Control', 'no-cache, must-revalidate')

        super().end_headers()

    def log_message(self, format, *args):
        """自定义日志格式"""
        print(f"[{self.log_date_time_string()}] {format % args}")


def main():
    # 获取端口号，默认8000
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000

    # 切换到脚本所在目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # 创建服务器
    with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
        print("=" * 50)
        print("🚀 个人网站本地开发服务器")
        print("=" * 50)
        print(f"📍 服务地址: http://localhost:{port}")
        print(f"📁 服务目录: {os.getcwd()}")
        print("📝 访问页面:")
        print(f"   - 首页: http://localhost:{port}/")
        print(f"   - 关于: http://localhost:{port}/about.html")
        print(f"   - 联系: http://localhost:{port}/contact.html")
        print("\n💡 提示:")
        print("   - 按 Ctrl+C 停止服务器")
        print("   - 修改代码后刷新浏览器即可看到变化")
        print("   - 开发者工具可以查看性能和控制台信息")
        print("=" * 50)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 服务器已停止")
            print("感谢使用！")


if __name__ == "__main__":
    main()