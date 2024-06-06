import * as THREE from 'three';
import { GLTFLoader as GLTFLoaders } from 'three/examples/jsm/loaders/GLTFLoader';
import * as Utils from '../utils/FunctionLibrary';
import { IOTHREE } from '../world/IOTHREE';
import type { modelLoaderParams } from './model-manager.type';

/** gltf加载器 */
export class GLTFLoader {
    private ioThree: IOTHREE;
    private gltfLoader: GLTFLoaders;
    private loadModelGroup: THREE.Group;
    constructor(ioThree: IOTHREE, loadModelGroup) {
        this.ioThree = ioThree;
        this.gltfLoader = new GLTFLoaders();
        this.loadModelGroup = loadModelGroup;
    }

    /**
     * @name 加载GLTF模型
     * @param path // 模型路径
     * @param onProgress // 加载中回调
     */
    public load(
        Properties: modelLoaderParams,
        onProgress: (xhr: ProgressEvent) => void = () => {}
    ): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                Properties.path,
                gltf => {
                    const mesh = gltf.scene;
                    mesh.traverse(child => {
                        if (child.type === 'Mesh') {
                            Utils.setupMeshProperties(child);
                        }
                    });
                    // 设置网格转移形状
                    Utils.setupMeshTransform(mesh, Properties);

                    this.loadModelGroup.add(mesh);
                    this.ioThree.Scene.add(this.loadModelGroup);
                    resolve(mesh);
                },
                (xhr: ProgressEvent) => {
                    if (xhr.lengthComputable) {
                        onProgress(xhr);
                    }
                },
                (error: Error) => {
                    reject(error);
                }
            );
        });
    }
    public update(timeScale: number): void {}
}
