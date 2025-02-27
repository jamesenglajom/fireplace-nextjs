
module.exports = {
  images: {
    domains: ['cdn11.bigcommerce.com', 'onsite-cdn.sfo3.cdn.digitaloceanspaces.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Match all routes
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache static assets
          },
        ],
      },
    ];
  },
};