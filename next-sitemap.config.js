/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://genoui.vercel.app',
  generateRobotsTxt: true, 
  sitemapSize: 7000,
  // Exclude authed app pages from sitemap
  exclude: ['/app', '/app/*'],
};
