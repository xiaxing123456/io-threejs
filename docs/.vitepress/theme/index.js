// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';

import ioGrid from './components/io-grid.vue';
import './custom.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 注册自定义全局组件
        app.component('IoGrid', ioGrid);
    },
};
