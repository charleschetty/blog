const path = require('path');
//const feed_options = {
  //  canonical_base: 'http://charleschettyblog.xyz/',
//};
module.exports = {
  //plugins: [
    //[ 'feed', feed_options ]
  //],
  title: 'Charles Chetty Blog',
  description: 'Charles Chetty 个人博客',
  base: '/blog',
  shouldPrefetch: (name) => {
    return name.includes('vendors~') || name.includes('layout-')
  },
  theme: path.join(__dirname, '..', '..'),
  themeConfig: {
    hostname: 'http://charleschettyblog.xyz/',
//     ga: 'UA-102731925-1',
    smoothScroll: false,
    lastUpdated: 'Last Updated',
    siteName: 'Charles Chetty Blog',
    author: 'Charles Chetty',
    navbar: true,
    nav: [
      { text: 'home', link: '/' },
      { text: 'archive', link: '/archive/' },
      { text: 'about', link: '/about/' }
      // { text: 'rss', link: 'https://charleschetty.github.io/blog/rss.xml'}
    ],
//     comment: {
//       serverURL: 'http://charleschettyblog.xyz/',
//       avatar: 'retro',
//       visitor: true,
//       lang: 'en'
//     }
  },
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-include'))
    }
  }
}
