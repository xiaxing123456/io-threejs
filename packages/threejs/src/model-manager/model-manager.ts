import * as THREE from 'three';
import { IOTHREE } from '../world/IOTHREE';
import { GLTFLoader } from './loadingManager';

/** 模型管理 */
export class ModelManager {
    public ioThree: IOTHREE;
    public loadModelGroup: THREE.Group;
    public GLTFLoader: GLTFLoader;
    constructor(ioThree: IOTHREE) {
        this.ioThree = ioThree;
        this.loadModelGroup = new THREE.Group();
        this.GLTFLoader = new GLTFLoader(this.ioThree, this.loadModelGroup);
    }
    /** 删除模型 */
    public unLoadModel(keyList: THREE.Object3D[]) {
        this.loadModelGroup.remove(...keyList);
    }
    /** 删除全部模型 */
    public removeAllModel() {
        this.ioThree.Scene.remove(this.loadModelGroup);
    }
    /** 获取已加载的全部模型 */
    public async getAllHistoricalModel() {
        return this.loadModelGroup;
    }
}
