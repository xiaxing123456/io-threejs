import * as THREE from 'three';
import { IOTHREE } from '../index';

/** 监听触发事件 */
export class watchEvent {
    public mouse: THREE.Vector2;
    public raycaster: THREE.Raycaster;
    public intersects: any;
    private modelManage: {
        ioThree: IOTHREE;
        loadModelGroup: THREE.Group;
        selectionNodes: THREE.mesh[];
    };
    constructor(modelManage) {
        // 鼠标控制对象
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.modelManage = modelManage;
        // 指针松开事件
        document.addEventListener('click', this.onClick.bind(this));
        // 键盘按下事件
    }
    /** 指针松开事件 */
    private onClick(e: MouseEvent) {
        let { ioThree, loadModelGroup } = this.modelManage;
        this.mouse.x = (e.clientX / ioThree.sizes.width) * 2 - 1;
        this.mouse.y = -(e.clientY / ioThree.sizes.height) * 2 + 1;
        // 执行射线检测
        this.raycaster.setFromCamera(this.mouse, ioThree.Camera);

        // 射线涉及到的物体集合
        this.intersects = this.raycaster.intersectObject(loadModelGroup, true);

        if (this.intersects.length) {
            this.modelManage.selectionNodes = this.intersects;
        } else {
            this.modelManage.selectionNodes.forEach(item => {
                item.object.material.color = item.object.material.oldColor;
            });
            this.modelManage.selectionNodes = [];
        }
        this.modelManage.selectionNodes?.forEach(item => {
            item.object.material.color = new THREE.Color(0xff0000);
        });
    }
    /** 销毁事件 */
    onUnMounted() {
        document.removeEventListener('click', this.onClick.bind(this));
    }
}
