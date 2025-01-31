// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // /* config options here */async redirects() {
//   //   return [
//   //     {
//   //       source: '/',
//   //       destination: '/category/fireplaces', // Replace with your target path
//   //       permanent: true, // Set to true for 301 redirects, false for 302 redirects
//   //     },
//   //   ];
//   // },
// };

// export default nextConfig;


module.exports = {
  serverRuntimeConfig: {
      PROJECT_ROOT: 'fireplace-nextjs'
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)', // Match all routes
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable', // Cache static assets
  //         },
  //       ],
  //     },
  //   ];
  // },
};