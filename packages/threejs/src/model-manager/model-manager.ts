import { includes } from 'lodash';
import * as THREE from 'three';
import { KeyBinding } from '../core/key-binding';
import { IEventReceiver, IUpdatable } from '../interfaces';
import * as Utils from '../utils/FunctionLibrary';
import { validateNull } from '../utils/validate';
import { IOTHREE } from '../world/IOTHREE';
import { GLTFLoader } from './loader/gltf-loader';
import { OBJLoader } from './loader/obj-loader';
/** 模型管理 */
export class ModelManager implements IEventReceiver, IUpdatable {
    private ioThree: IOTHREE;
    loadModelGroup: THREE.Group;
    GLTFLoader: GLTFLoader;
    OBJLoader: OBJLoader;
    updateOrder: number;
    mouse: THREE.Vector2;
    private raycaster: THREE.Raycaster;
    selectionNodes: THREE.Object3D[];
    actions: { [action: string]: KeyBinding };
    highlightColors: number;
    constructor(ioThree: IOTHREE) {
        const scope = this;
        this.ioThree = ioThree;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.loadModelGroup = new THREE.Group();
        this.selectionNodes = [];
        this.actions = {
            ctrlLeft: new KeyBinding('ControlLeft'),
            ctrlRight: new KeyBinding('ControlRight'),
        };
        this.highlightColors = 0xff0000;
        // 初始化
        this.Initialization(scope);
        // 寄存更新
        ioThree.registerUpdatable(this);
    }

    /** 初始化 */
    private Initialization(scope) {
        scope.GLTFLoader = new GLTFLoader(this.ioThree, this.loadModelGroup);
        scope.OBJLoader = new OBJLoader(this.ioThree, this.loadModelGroup);
    }

    /**
     * @name 设置单个节点高亮
     * @param node: THREE.Object3D
     */
    public setNodeHighlight = async (node: THREE.Object3D): Promise<THREE.Object3D> => {
        node.traverse(child => {
            Utils.setMeshPropertiesHighlight(child, this.highlightColors);
        });
        return node;
    };

    /**
     * @name 重置选中节点
     */
    public restoreSelectionNodes = (): Promise<THREE.Object3D[]> => {
        return new Promise(res => {
            this.selectionNodes?.forEach(item => {
                item.traverse(child => {
                    Utils.setMeshPropertiesRestore(child);
                });
            });
            res(this.selectionNodes);
            this.selectionNodes = null;
        });
    };

    /**
     * @name 获取选中节点
     */
    public async getSelectionNodes(): Promise<THREE.Object3D[]> {
        return this.selectionNodes;
    }

    /**
     * @name 设置选中节点
     * @param node: THREE.Object3D
     */
    public async setSelectionNode(node: THREE.Object3D): Promise<THREE.Object3D[]> {
        const currentSelections = await this.getSelectionNodes();
        return new Promise(async res => {
            // 是否按住ctrl
            if (!this.actions.ctrlLeft.isPressed && !this.actions.ctrlRight.isPressed) {
                if (validateNull(currentSelections)) {
                    // 2. 重新赋值选中节点并且高亮
                    this.setNodeHighlight(node);
                    this.selectionNodes = [node];
                } else {
                    currentSelections?.forEach(async (item: THREE.Object3D) => {
                        if (item?.uuid !== node?.uuid) {
                            // 1. 还原选中节点
                            await this.restoreSelectionNodes();
                            // 2. 重新赋值选中节点并且高亮
                            this.setNodeHighlight(node);
                            this.selectionNodes = [node];
                        }
                    });
                }
            } else {
                if (validateNull(currentSelections)) {
                    this.setNodeHighlight(node);
                    this.selectionNodes = [node];
                } else {
                    currentSelections?.forEach(async (item: THREE.Object3D) => {
                        if (node && item?.uuid !== node?.uuid) {
                            this.setNodeHighlight(node);
                            this.selectionNodes = [...this.selectionNodes, node];
                        }
                    });
                }
            }
            res(this.selectionNodes);
        });
    }

    /**
     * @name 删除模型
     * @param keyList: THREE.Object3D[]
     */
    public unLoadModel(keyList: THREE.Object3D[]): void {
        this.loadModelGroup.remove(...keyList);
    }

    /**
     * @name 删除全部模型
     */
    public removeAllModel(): void {
        this.ioThree.Scene.remove(this.loadModelGroup);
    }

    /**
     * @name 获取已加载的全部模型
     */
    public async getAllHistoricalModel(): Promise<THREE.Object3D[]> {
        return this.loadModelGroup;
    }

    /**
     * @name 取得控制权限
     */
    public takeControl(): void {
        if (this.ioThree !== undefined) {
            this.ioThree.eventManager.setEventReceiver(this);
        }
    }
    update(timestep: number, unscaledTimeStep: number): void {
        // throw new Error('Method not implemented.');
    }

    async handleOnDblClick(event: MouseEvent): Promise<void> {
        this.mouse.x = (event.clientX / this.ioThree.sizes.width) * 2 - 1;
        this.mouse.y = -(event.clientY / this.ioThree.sizes.height) * 2 + 1;
        // 执行射线检测
        this.raycaster.setFromCamera(this.mouse, this.ioThree.Camera);
        // 射线涉及到的物体集合
        const intersects = [];
        this.raycaster.intersectObject(this.loadModelGroup, true, intersects);
        // 涉及到的节点是否为空
        if (intersects.length) {
            await this.setSelectionNode(intersects[0].object);
        } else {
            await this.setSelectionNode(null);
        }
    }
    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void {}
    handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void {}
    handleMouseWheel(event: WheelEvent, value: number): void {}
    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void {
        for (const action in this.actions) {
            if (this.actions.hasOwnProperty(action)) {
                const binding = this.actions[action];
                if (includes(binding.eventCodes, code)) {
                    binding.isPressed = pressed;
                }
            }
        }
    }
    eventReceiverInit(): void {}
    eventReceiverUpdate(timeStep: number): void {}
}
