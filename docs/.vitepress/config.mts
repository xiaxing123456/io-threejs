import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { defineConfig } from 'vitepress';
import nav from './configs/nav';
import sidebar from './configs/sidebar';

// https://vitepress.dev/reference/site-config

// 配置当前环境变量
// 根据文件名获取对应的环境变量
const envFiles = [`.env`, `.env.${process.env.NODE_ENV}`];
envFiles.forEach(file => {
    console.log(__dirname);

    const envConfig = dotenv.parse(readFileSync(`${__dirname}/${file}`.replace('.vitepress', '')));
    Object.keys(envConfig).forEach(k => {
        process.env[k] = envConfig[k];
    });
});

export default defineConfig({
    title: 'io-threejs',
    description: '这是一个非常非常牛逼的3D组件库网站',
    cleanUrls: true,
    base: process.env.VITE_BASE || '/',
    themeConfig: {
        outlineTitle: '导览',
        outline: [2, 3],
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
