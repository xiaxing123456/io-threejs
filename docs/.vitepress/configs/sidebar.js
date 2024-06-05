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
            text: 'gltf模型加载',
            items:[
                {text: 'gltf模型加载管理类', link:'/views/type/components/model-manager/gltf-model-manager'}
            ],
        }
    ]
}