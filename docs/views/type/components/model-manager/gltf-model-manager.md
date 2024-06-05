## Class: ModelManager

gltf 加载管理类

#### Details

加载卸载 gltf 模型

#### Examples

```ts
const cloudInstance = new IOTHREE(canvasDom.value);
cloudInstance.ModelManager;
```

## Methods

### loadingManager.loadGLTF

```ts
cloudInstance.ModelManager.loadingManager.loadGLTF(): void;
```

#### Details

传入 url 或本地文件绝对路径, 加载模型

#### Examples

调用示例：

```ts
const cloudInstance = new IOTHREE(canvasDom.value);
const scale = new Vector3(1,1,1);
const position = new Vector3(320,0,0);
const rotation = new Vector3(0,0,0);
const modelParams = {
    path: '/models/LeePerrySmith/LeePerrySmith.glb',
    scale,
    position,
    rotation,
};
cloudInstance.ModelManager.loadingManager.loadGLTF(
    modelParams: modelLoaderParams {
        path: string;
        scale?: Vector3;
        position?: Vector3;
        rotation?: Vector3;
    },
    onLoadingFinished: (gltf: any) => void = () => {}, // 加载完成回调
    LoadingCallbackFunction: (xhr: ProgressEvent) => void = () => {} // 加载中回调
)
```
