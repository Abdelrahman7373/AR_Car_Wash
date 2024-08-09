/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: "/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
            },
            {
              key: "Pragma",
              value: "no-cache",
            },
            {
              key: "Expires",
              value: "0",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
