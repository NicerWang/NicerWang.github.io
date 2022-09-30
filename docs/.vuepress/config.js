import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { fullTextSearchPlugin } from "vuepress-plugin-full-text-search2";
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { seoPlugin } from "vuepress-plugin-seo2";

export default defineUserConfig({
  base: "/",
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Zone of NicerWang',
      description: 'Zone of NicerWang'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'NicerWang的空间',
      description: 'NicerWang的空间'
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', sizes: '196x196', href: '/favicon-196.png' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
    ['meta', { name: 'theme-color', content: '#03588C' }],
    ['meta', { name: 'baidu-site-verification', content: 'code-4JBlNTh6em' }],
    ['meta', { name: 'google-site-verification', content: 'UW47Ln26i4Rlx95yy-5r3G8g_xCkrFTGhVkYo3xKDNQ' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#03588C' }],
    ['link', { rel: 'mask-icon', href: '/favicon-196.png'}],
    ['link', { rel: 'apple-touch-icon', href: '/apple-icon-180.png' }]
  ],
  plugins: [
    fullTextSearchPlugin({
      locales: {
        '/': {
          placeholder: 'Full-Text Search',
        },
        '/zh/': {
          placeholder: '全文搜索',
        },
      },
    }),
    pwaPlugin(),
    pwaPopupPlugin({
      locales: {
        '/': {
          message: "New content is available",
          buttonText: "Refresh"
        },
        '/zh/': {
          message: "发现新内容可用",
          buttonText: "刷新"
        },
      }
    }),
    seoPlugin({
      hostname: 'NicerWang.github.io',
      author: 'NicerWang'
    }),
  ],
  theme: defaultTheme({
    logo: '/icon.jpeg',
    repo: "NicerWang/NicerWang.github.io",
    sidebar: 'auto',
    contributors: false,
    docsDir: 'docs',
    smoothScroll: true,
    locales: {
      '/': {
        selectLanguageText: 'Languages',
        selectLanguageName: 'English',
        selectLanguageAriaLabel: 'Languages',
        lastUpdatedText: 'This article is under CC-BY-4.0, Last Modified',
        toggleColorMode: 'Toggle Color Mode',
        editLinkText: 'Edit This Page',
        navbar: [
          { text: 'HomePage', link: '/' },
          { text: 'Contact', link: '/Contact.html' }
        ]
      },
      '/zh/': {
        selectLanguageText: '选择语言',
        selectLanguageName: '简体中文',
        selectLanguageAriaLabel: 'Languages',
        lastUpdatedText: '文章采用CC-BY-4.0协议，上次更新时间',
        toggleColorMode: '切换夜间模式',
        editLinkText: '编辑此页',
        navbar: [
          { text: '首页', link: '/zh/' },
          { text: '联系作者', link: '/zh/Contact.html' }
        ]
      }
    }
  }),
})