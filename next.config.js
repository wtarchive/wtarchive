/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the asset prefix to ensure proper routing on GitHub Pages
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/<repository-name>/' : '',
  
  // Export as a static site
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      // Add other pages you want to export statically
    };
  },
};

module.exports = nextConfig
