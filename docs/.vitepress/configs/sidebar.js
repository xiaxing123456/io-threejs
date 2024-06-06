export default {
    '/views/guide/start': getGuideSidebar(),
    '/views/type/components': getTypeSidebar(),
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
function getTypeSidebar() {
    return [
        {
            text: '模型管理',
            link: '/views/type/components/model-manager/gltf-model-manager',
            items: [
                {
                    text: 'gltf加载器',
                    link: '/views/type/components/model-manager/gltf-model/',
                    items: [
                        {
                            text: 'load',
                            link: '/views/type/components/model-manager/gltf-model/load',
                        },
                    ],
                },
                {
                    text: 'unLoadModel',
                    link: '/views/type/components/model-manager/method/un-load-model',
                },
                {
                    text: 'removeAllModel',
                    link: '/views/type/components/model-manager/method/remove-all-model',
                },
                {
                    text: 'getAllHistoricalModel',
                    link: '/views/type/components/model-manager/method/get-all-historical-model',
                },
            ],
        },
    ];
}
