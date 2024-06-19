import * as THREE from 'three';
import { OBJLoader as OBJLoaders } from 'three/examples/jsm/loaders/OBJLoader';
import * as Utils from '../../utils/FunctionLibrary';
import { IOTHREE } from '../../world/IOTHREE';
import type { modelLoaderParams } from '../model-manager.type';

/** gltf加载器 */
export class OBJLoader {
    private ioThree: IOTHREE;
    private objLoader: OBJLoaders;
    private loadModelGroup: THREE.Group;
    constructor(ioThree: IOTHREE, loadModelGroup) {
        this.ioThree = ioThree;
        this.objLoader = new OBJLoaders();
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
            this.objLoader.load(
                Properties.path,
                gltf => {
                    const mesh = gltf;
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
