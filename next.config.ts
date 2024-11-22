const withPWA = require("@ducanh2912/next-pwa").default({
  // Your other options,
  workboxOptions: {
    // Workbox options go here...
  },
});

module.exports = withPWA({
  // Your Next.js config
});