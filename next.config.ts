import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

// PWA 설정 추가
const nextConfig: NextConfig = withPWA({
  dest: 'public', // PWA 파일이 생성될 디렉토리
  disable: process.env.NODE_ENV === 'development', // 개발 환경에서는 비활성화
  // Optional: 추가적인 PWA 설정
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
  ],
});

export default nextConfig;
