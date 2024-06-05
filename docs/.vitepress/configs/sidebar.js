export default {
    '/views/guide/start': getGuideSidebar(),
};

/** 指南 */
function getGuideSidebar() {
    return [
        {
            text: '开始',
            items: [{ text: '简介', link: '/views/guide/start/introduction' }],
        },
        {
            text: '模型加载1',
            items: [{ text: 'icon', link: '/component/icon' }],
        },
    ];
}

/** API和类型定义 */
