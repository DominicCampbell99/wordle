/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        outputFileTracingIncludes: {
          '/api/getword': ["5-letter-words.json"],
          '/api/check': ["5-letter-words.json"],
        },
      },
};

export default nextConfig;