module.exports = {
    title: 'NicerWang',
    description: 'Notes of NicerWang',
    base: "/",
    head: [
      ['link', { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196.png' }],
      ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
      ['meta', { name: 'theme-color', content: '#fff' }],
      ['meta', { name: 'baidu-site-verification', content: 'code-4JBlNTh6em' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
      ['link', { rel: 'mask-icon', href: '/favicon-196.png'}],
      ['link', { rel: 'apple-touch-icon', href: '/apple-icon-180.png' }]
    ],
    themeConfig: {
      logo: '/icon.jpeg',
      repo: "NicerWang/NicerWang.github.io",
      sidebar: 'auto',
      lastUpdated: "文章采用CC-BY-4.0协议，上次更新时间",
      nav: [
        { text: 'Contact', link: '/contact', target: '_blank'},
      ],
      smoothScroll: true
    },
    plugins: {
        '@vuepress/plugin-search': true,
        '@vuepress/back-to-top': true,
        '@vuepress/pwa': {
          updatePopup: {
            message: "New Content is Available.",
            buttonText: "Refresh"
          }
        }
    },
  }
