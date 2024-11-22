// types/next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAOptions {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: string[];
    publicExcludes?: string[];
    fallbacks?: {
      document?: string;
      image?: string;
      audio?: string;
      video?: string;
      font?: string;
    };
    dynamicStartUrlRedirect?: boolean;
  }

  const withPWA: (options: PWAOptions) => (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}
