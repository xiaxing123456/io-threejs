import { defineConfig } from 'vitepress';
import nav from './configs/nav';
import sidebar from './configs/sidebar';
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'io-threejs',
    description: '这是一个非常非常牛逼的3D组件库网站',
    cleanUrls: true,
    themeConfig: {
        outlineTitle: '导览',
        lastUpdatedText: '上次更新',
        logo: '/public/logo.png',
        siteTitle: 'io-threejs',
        search: {
            provider: 'local',
        },
        nav,
        sidebar,
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You',
        },
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
    },
});
