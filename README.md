# 唐诗鉴赏

一个使用 Next.js 和 Sanity CMS 构建的唐诗鉴赏网站。

## 功能特点

- 展示唐诗内容
- 拼音注音功能
- 译文和赏析
- 响应式设计

## 技术栈

- Next.js 15
- Sanity CMS
- TailwindCSS
- TypeScript

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/你的用户名/仓库名.git
cd 仓库名
```

2. 安装依赖
```bash
# 安装 Next.js 应用依赖
cd web
npm install

# 安装 Sanity Studio 依赖
cd ../studio
npm install
```

3. 启动开发服务器
```bash
# 启动 Next.js 开发服务器
cd web
npm run dev

# 启动 Sanity Studio
cd ../studio
npm run dev
```

## 环境变量

创建 `web/.env.local` 文件并添加以下内容：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=你的项目ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 部署

项目使用 Cloudflare Pages 进行部署。

## License

MIT 