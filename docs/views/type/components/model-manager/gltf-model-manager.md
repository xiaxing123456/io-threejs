# Class: ModelManager（加载模型管理）

加载模型管理

## 参数

-   [GLTFLoader](/views/type/components/model-manager/gltf-model/index) 用于载入 gltf 2.0 资源的加载器。
-   [OBJLoader](/views/type/components/model-manager/obj-model/index) 用于载入 obj 2.0 资源的加载器。
-   [mouse](/views/type/components/model-manager/gltf-model/index) 鼠标位置双击位置。
-   [actions](/views/type/components/model-manager/gltf-model/index) 控制键盘积极状态。
-   [highlightColors](/views/type/components/model-manager/gltf-model/index) 模型初始化选中高亮颜色。

## 方法

-   [takeControl](/views/type/components/model-manager/method/take-control) 获取自由视角的权限控制。
-   [unLoadModel](/views/type/components/model-manager/method/un-load-model) 删除一个或多个已经加载的模型。
-   [removeAllModel](/views/type/components/model-manager/method/remove-all-model) 删除已经加载的全部模型。
-   [getAllHistoricalModel](/views/type/components/model-manager/method/get-all-historical-model) 获取已经加载完成的模型。
-   [setSelectionNodes](/views/type/components/model-manager/method/set-selection-nodes) 设置选中节点。
-   [getSelectionNodes](/views/type/components/model-manager/method/get-selection-nodes) 获取选中节点。
-   [restoreSelectionNodes](/views/type/components/model-manager/method/restore-selection-nodes) 重置选中节点。
-   [setNodeHighlight](/views/type/components/model-manager/method/set-node-highlight) 设置单个节点高亮。
