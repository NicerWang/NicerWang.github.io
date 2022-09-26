module.exports = {
    title: 'NicerWang',
    description: 'Notes of NicerWang',
    base: "/",
    head: [
      ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
      ['meta', { name: 'theme-color', content: '#fff' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196.png' }],
      ['link', { rel: 'apple-touch-icon', href: '/apple-icon-180.png' }]
    ],
    themeConfig: {
      logo: '/icon.jpeg',
      repo: "https://github.com/NicerWang",
      lastUpdated: '上次更新',
      nav: [
        { text: 'Contact', link: '/contact' },
      ]
    },
    plugins: [
        '@vuepress/medium-zoom',
        '@vuepress/back-to-top',
        '@vuepress/plugin-search',
        ["vuepress-plugin-auto-sidebar", {
          title: {
            mode: "titlecase",
          },
          sidebarDepth: 2,
        }],
        ["@vuepress/last-updated", {
          transformer: (timestamp, lang) => {
            const moment = require('moment');
            moment.locale(lang)
            return moment(timestamp).utcOffset(480).format('LLLL') + " GMT+8"
          }
        }]
      ],
  }
