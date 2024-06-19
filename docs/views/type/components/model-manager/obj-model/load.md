# load

传入 url 或本地文件绝对路径, 加载模型

## 参数

1. `Properties` 对象，其中包含以下属性:

    - `path` (必需): 一个字符串，表示要加载的模型的路径。
    - `scale` (可选): 一个 Vector3 对象，表示加载的模型的缩放比例。
    - `position` (可选): 一个 Vector3 对象，表示加载的模型的位置。
    - `rotation` (可选): 一个 Vector3 对象，表示加载的模型的旋转。

2. `onProgress`(可选): 回调函数，该函数有一个参数 `xhr`，类型为 `ProgressEvent`，用于在加载过程中提供进度信息。如果没有提供该回调函数，则默认为一个空函数。

## 返回

`Promise<Object3D>`

## 列子

```ts
const cloudInstance = new IOTHREE(canvasDom.value);
const scale = new Vector3(1,1,1);
const position = new Vector3(320,0,0);
const rotation = new Vector3(0,0,0);
const Properties = {
    path: '/models/LeePerrySmith/LeePerrySmith.glb',
    scale,
    position,
    rotation,
};
cloudInstance.ModelManager.OBJLoader.load(
    Properties:  {
        path: string;
        scale?: Vector3;
        position?: Vector3;
        rotation?: Vector3;
    },
    onProgress: (xhr: ProgressEvent) => void = () => {}, // 加载中回调
)
```
