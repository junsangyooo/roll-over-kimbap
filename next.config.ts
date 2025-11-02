// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',        // ✅ 이게 핵심: next export
  images: {
    unoptimized: true,     // GH Pages에서는 next/image 최적화 안 됨
  },
  // basePath는 지금 repo가 user-page라서 굳이 안 써도 됨
}

export default nextConfig