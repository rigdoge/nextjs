/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 确保应用可以在子路径下运行
  basePath: '',
  // 禁用 x-powered-by header
  poweredByHeader: false,
}

module.exports = nextConfig 