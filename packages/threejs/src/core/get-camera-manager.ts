import { includes } from 'lodash';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { KeyBinding } from '../core/key-binding';
import { ActiveViewMode } from '../enums/global.enum';
import { IEventReceiver, IUpdatable } from '../interfaces';
import * as Utils from '../utils/FunctionLibrary';
import { IOTHREE } from '../world/IOTHREE';
/** 相机管理 */
export class GetCameraManager implements IEventReceiver, IUpdatable {
    public updateOrder: number = 4;

    public ioThree: IOTHREE;
    public camera: THREE.Camera;
    /** 目标 */
    public target: THREE.Vector3;
    /** 相机灵敏度 */
    public sensitivity: THREE.Vector2;
    public targetRadius: number = 1;
    /** 移动速度 */
    public movementSpeed: number;
    /** 旋转角度 */
    public radius: number = 1;
    public theta: number;
    public phi: number;

    /** 上下旋速度 */
    public upVelocity: number = 0;
    /** 前进速度 */
    public forwardVelocity: number = 0;
    /** 左右速度 */
    public rightVelocity: number = 0;

    public controls: OrbitControls;
    /** 控件 */
    public actions: { [action: string]: KeyBinding };
    constructor(
        ioThree: IOTHREE,
        camera: THREE.Camera,
        sensitivityX: number = 1,
        sensitivityY: number = sensitivityX * 0.8
    ) {
        this.ioThree = ioThree;
        this.camera = camera;
        this.target = new THREE.Vector3();
        this.sensitivity = new THREE.Vector2(sensitivityX, sensitivityY);

        this.movementSpeed = 0.06;
        this.radius = 3;
        this.theta = 0;
        this.phi = 0;

        this.actions = {
            forward: new KeyBinding('KeyW'),
            back: new KeyBinding('KeyS'),
            left: new KeyBinding('KeyA'),
            right: new KeyBinding('KeyD'),
            up: new KeyBinding('KeyE'),
            down: new KeyBinding('KeyQ'),
            fast: new KeyBinding('ShiftLeft'),
        };

        // 寄存更新
        ioThree.registerUpdatable(this);

        this.controls = new OrbitControls(camera, this.ioThree.canvas as HTMLElement);
        this.controls.enableDamping = true;
    }
    /** 设置敏感度 */
    public setSensitivity(sensitivityX: number, sensitivityY: number = sensitivityX): void {
        this.sensitivity = new THREE.Vector2(sensitivityX, sensitivityY);
    }
    /** 设置角度 */
    public setRadius(value: number, instantly: boolean = false): void {
        this.targetRadius = Math.max(0.001, value);
        if (instantly === true) {
            this.radius = value;
        }
    }
    public move(deltaX: number, deltaY: number): void {
        this.theta -= deltaX * (this.sensitivity.x / 2);
        this.theta %= 360;
        this.phi += deltaY * (this.sensitivity.y / 2);
        this.phi = Math.min(85, Math.max(-85, this.phi));
    }

    handleOnDblClick(event: MouseEvent): void {
        console.log('getCameraManager 双击');
    }
    public handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void {
        for (const action in this.actions) {
            if (this.actions.hasOwnProperty(action)) {
                const binding = this.actions[action];

                if (includes(binding.eventCodes, code)) {
                    binding.isPressed = pressed;
                }
            }
        }
    }
    public handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void {
        this.move(deltaX, deltaY);
    }
    public handleMouseWheel(event: WheelEvent, value: number): void {
        this.ioThree.scrollTheTimeScale(value);
    }
    public handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void {
        /** 跟随模式 */
        if (this.ioThree.params.activeViewMode === ActiveViewMode.followMode) {
            for (const action in this.actions) {
                if (this.actions.hasOwnProperty(action)) {
                    const binding = this.actions[action];
                    if (includes(binding.eventCodes, code)) {
                        binding.isPressed = pressed;
                    }
                }
            }
        }
    }
    public eventReceiverInit(): void {
        this.target.copy(this.camera.position);
    }
    public eventReceiverUpdate(timeStep: number): void {
        // 设置飞行速度
        let speed =
            this.movementSpeed * (this.actions.fast.isPressed ? timeStep * 600 : timeStep * 60);
        const up = Utils.getUp(this.camera);
        const right = Utils.getRight(this.camera);
        const forward = Utils.getBack(this.camera);
        this.upVelocity = THREE.MathUtils.lerp(
            this.upVelocity,
            +this.actions.up.isPressed - +this.actions.down.isPressed,
            0.32
        );

        this.rightVelocity = THREE.MathUtils.lerp(
            this.rightVelocity,
            +this.actions.right.isPressed - +this.actions.left.isPressed,
            0.32
        );

        this.forwardVelocity = THREE.MathUtils.lerp(
            this.forwardVelocity,
            +this.actions.forward.isPressed - +this.actions.back.isPressed,
            0.32
        );
        this.target.add(up.multiplyScalar(speed * this.upVelocity));
        this.target.add(right.multiplyScalar(speed * this.rightVelocity));
        this.target.add(forward.multiplyScalar(speed * this.forwardVelocity));
    }
    /** 逻辑更新 */
    public update(timestep: number, unscaledTimeStep: number): void {
        if (this.ioThree.params.activeViewMode === ActiveViewMode.followMode) {
            this.camera.position.y = THREE.MathUtils.clamp(
                this.camera.position.y,
                this.target.y,
                Number.POSITIVE_INFINITY
            );
            this.camera.lookAt(this.target);
            let newPos = this.target
                .clone()
                .add(
                    new THREE.Vector3()
                        .subVectors(this.camera.position, this.target)
                        .normalize()
                        .multiplyScalar(this.targetRadius)
                );
            this.camera.position.x = newPos.x;
            this.camera.position.y = newPos.y;
            this.camera.position.z = newPos.z;
            this.controls.enabled = false;
        } else if (this.ioThree.params.activeViewMode === ActiveViewMode.freeCamera) {
            this.controls.enabled = true;
            // this.radius = THREE.MathUtils.lerp(this.radius, this.targetRadius, 0.1);
            // this.camera.position.x =
            //     this.target.x +
            //     this.radius *
            //         Math.sin((this.theta * Math.PI) / 180) *
            //         Math.cos((this.phi * Math.PI) / 180);
            // this.camera.position.y =
            //     this.target.y + this.radius * Math.sin((this.phi * Math.PI) / 180);
            // this.camera.position.z =
            //     this.target.z +
            //     this.radius *
            //         Math.cos((this.theta * Math.PI) / 180) *
            //         Math.cos((this.phi * Math.PI) / 180) +
            //     1;
            // this.camera.updateMatrix();
            // this.camera.lookAt(this.target);
        }
    }
}
