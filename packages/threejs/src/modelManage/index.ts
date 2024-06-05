import * as THREE from 'three';
import { watchEvent } from '../event';
import { IOTHREE } from '../world/IOTHREE';
import LoadingManager from './loadingManager';

class ModelManage {
    public LoadingManager: LoadingManager;
    public loadModelGroup: THREE.Group;
    public selectionNodes: THREE.mesh[];
    private ioThree: IOTHREE;
    constructor(ioThree: IOTHREE) {
        this.ioThree = ioThree;
        this.loadModelGroup = new THREE.Group();
        this.selectionNodes = [];
        this.LoadingManager = new LoadingManager(ioThree, this.loadModelGroup);

        this.initEvent = this.initEvent.call(this);
    }
    /** 获取根节点 */
    GetRootNode() {
        return this.loadModelGroup;
    }
    /** 获取选中节点 */
    GetSelection() {
        return;
    }
    initEvent() {
        console.log('111111111', this);
        new watchEvent({
            ioThree: this.ioThree,
            loadModelGroup: this.loadModelGroup,
            selectionNodes: this.selectionNodes,
        });
    }
}

export default ModelManage;
