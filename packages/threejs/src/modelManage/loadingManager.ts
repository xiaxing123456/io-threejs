import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as Utils from '../utils/FunctionLibrary';
import { IOTHREE } from '../world/IOTHREE';

class LoadingManager {
    private ioThree: IOTHREE;
    private gltfLoader: GLTFLoader;
    private fbxLoader: FBXLoader;
    private loadModelGroup: THREE.Group;
    constructor(ioThree: IOTHREE, loadModelGroup) {
        this.ioThree = ioThree;
        this.gltfLoader = new GLTFLoader();
        this.fbxLoader = new FBXLoader();
        this.loadModelGroup = loadModelGroup;
    }

    /**
     * @name 加载GLTF模型
     * @param path // 模型路径
     * @param onLoadingFinished // 加载完成回调
     * @param LoadingCallbackFunction // 加载中回调
     */
    public loadGLTF(
        path: string,
        onLoadingFinished: (gltf: any) => void = () => {},
        LoadingCallbackFunction: (xhr: ProgressEvent) => void = () => {}
    ): void {
        this.gltfLoader.load(
            path,
            gltf => {
                gltf.scene.traverse(child => {
                    if (child.type === 'Mesh') {
                        Utils.setupMeshProperties(child);
                    }
                });
                console.log(gltf.scene);
                this.loadModelGroup.add(gltf.scene);
                this.ioThree.Scene.add(this.loadModelGroup);
                onLoadingFinished(gltf);
            },
            (xhr: ProgressEvent) => {
                if (xhr.lengthComputable) {
                    LoadingCallbackFunction(xhr);
                }
            }
        );
    }
    public loadMaterialGLTF(
        path,
        material,
        onLoadingFinished: (gltf: any) => void = () => {},
        LoadingCallbackFunction: (xhr: ProgressEvent) => void = () => {}
    ) {
        this.gltfLoader.load(
            path,
            gltf => {
                const mesh = gltf.scene.children[0];
                mesh.material = new THREE.MeshPhongMaterial(material);
                mesh.scale.set(10, 10, 10);
                mesh.traverse(child => {
                    if (child.type === 'Mesh') {
                        Utils.setupMeshProperties(child);
                    }
                });
                this.loadModelGroup.add(mesh);
                this.ioThree.Scene.add(this.loadModelGroup);
                onLoadingFinished(mesh);
            },
            (xhr: ProgressEvent) => {
                if (xhr.lengthComputable) {
                    LoadingCallbackFunction(xhr);
                }
            }
        );
    }
    /**
     * @name 加载FBX模型
     * @param path // 模型路径
     * @param onLoadingFinished // 加载完成回调
     * @param LoadingCallbackFunction // 加载中回调
     */
    public loadFBX(
        path: string,
        onLoadingFinished: (gltf: any) => void = () => {},
        LoadingCallbackFunction: (xhr: ProgressEvent) => void = () => {}
    ) {
        this.fbxLoader.load(
            path,
            gltf => {
                gltf.traverse(child => {
                    if (child.type === 'Mesh') {
                        Utils.setupMeshProperties(child);
                    }
                });
                this.loadModelGroup.add(gltf);
                this.ioThree.Scene.add(this.loadModelGroup);
                onLoadingFinished(gltf);
            },
            (xhr: ProgressEvent) => {
                if (xhr.lengthComputable) {
                    LoadingCallbackFunction(xhr);
                }
            }
        );
    }

    public update(timeScale: number): void {}
}
export default LoadingManager;
