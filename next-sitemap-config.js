module.exports = {
  siteUrl: process.env.SITE_URL || 'https://localhost:3000', // Replace with your domain
  generateRobotsTxt: true, // Optional: create robots.txt file
  // exclude: ['/admin'], // Optional: exclude paths from sitemap
  // Optional: additional configurations
  // Example:
  // changefreq: 'daily',
  // priority: 0.7,
  // sitemapSize: 5000,
};