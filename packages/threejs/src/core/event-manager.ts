import { IEventReceiver, IUpdatable } from '../interfaces';
import { IOTHREE } from '../world/IOTHREE';

export class EventManager implements IUpdatable {
    public updateOrder: number = 3;

    public ioThree: IOTHREE;
    public pointerLock: any;
    public domElement: any;
    public isLocked: boolean;
    public eventReceiver: IEventReceiver;

    public boundOnDblclick: (evt: any) => void;
    public boundOnMouseDown: (evt: any) => void;
    public boundOnMouseMove: (evt: any) => void;
    public boundOnMouseUp: (evt: any) => void;
    public boundOnMouseWheelMove: (evt: any) => void;
    public boundOnPointerlockChange: (evt: any) => void;
    public boundOnPointerlockError: (evt: any) => void;

    public boundOnKeyDown: (evt: any) => void;
    public boundOnKeyUp: (evt: any) => void;

    constructor(ioThree: IOTHREE, domElement: HTMLElement) {
        this.ioThree = ioThree;
        this.pointerLock = ioThree.params.Pointer_Lock;
        this.domElement = domElement || document.body;
        this.isLocked = false;

        // 鼠标绑定
        this.boundOnDblclick = evt => this.onDblclick(evt);
        this.boundOnMouseDown = evt => this.onMouseDown(evt);
        this.boundOnMouseMove = evt => this.onMouseMove(evt);
        this.boundOnMouseUp = evt => this.onMouseUp(evt);
        this.boundOnMouseWheelMove = evt => this.onMouseWheelMove(evt);

        // 指针锁定
        this.boundOnPointerlockChange = evt => this.onPointerlockChange(evt);
        this.boundOnPointerlockError = evt => this.onPointerlockError(evt);

        // Keys
        this.boundOnKeyDown = evt => this.onKeyDown(evt);
        this.boundOnKeyUp = evt => this.onKeyUp(evt);

        // 事件监听器
        // 鼠标
        this.domElement.addEventListener('mousedown', this.boundOnMouseDown, false);
        this.domElement.addEventListener('dblclick', this.boundOnDblclick, false);
        document.addEventListener('wheel', this.boundOnMouseWheelMove, false);
        document.addEventListener('pointerlockchange', this.boundOnPointerlockChange, false);

        // keys 按键
        document.addEventListener('keydown', this.boundOnKeyDown, false);
        document.addEventListener('keyup', this.boundOnKeyUp, false);

        // 寄存更新
        ioThree.registerUpdatable(this);
    }
    /** 鼠标双击事件 */
    public onDblclick(event: MouseEvent): void {
        // 是否锁定
        if (this.pointerLock) {
            this.domElement.requestPointerLock();
        } else {
            // 打开鼠标移动和鼠标抬起监听
            this.domElement.addEventListener('mousemove', this.boundOnMouseMove, false);
            this.domElement.addEventListener('mouseup', this.boundOnMouseUp, false);
        }
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleOnDblClick(event);
        }
    }
    /** 鼠标按下 */
    public onMouseDown(event: MouseEvent): void {
        // 是否锁定
        if (this.pointerLock) {
            this.domElement.requestPointerLock();
        } else {
            // 打开鼠标移动和鼠标抬起监听
            this.domElement.addEventListener('mousemove', this.boundOnMouseMove, false);
            this.domElement.addEventListener('mouseup', this.boundOnMouseUp, false);
        }
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleMouseButton(event, 'mouse' + event.button, true);
        }
    }
    /** 鼠标移动 */
    public onMouseMove(event: MouseEvent): void {
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleMouseMove(event, event.movementX, event.movementY);
        }
    }
    /** 鼠标抬起 */
    public onMouseUp(event: MouseEvent): void {
        // 是否锁定
        if (!this.pointerLock) {
            // 关闭鼠标监听
            this.domElement.removeEventListener('mousemove', this.boundOnMouseMove, false);
            this.domElement.removeEventListener('mouseup', this.boundOnMouseUp, false);
        }

        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleMouseButton(event, 'mouse' + event.button, false);
        }
    }
    /** 鼠标滚轮移动 */
    public onMouseWheelMove(event: WheelEvent): void {
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleMouseWheel(event, event.deltaY);
        }
    }

    /** 指针锁定变化 */
    public onPointerlockChange(event: MouseEvent): void {
        // z指针锁定是否等于当前domElement
        if (document.pointerLockElement === this.domElement) {
            this.domElement.addEventListener('mousemove', this.boundOnMouseMove, false);
            this.domElement.addEventListener('mouseup', this.boundOnMouseUp, false);
            this.isLocked = true;
        } else {
            this.domElement.removeEventListener('mousemove', this.boundOnMouseMove, false);
            this.domElement.removeEventListener('mouseup', this.boundOnMouseUp, false);
            this.isLocked = false;
        }
    }
    /** 指针锁定错误 */
    public onPointerlockError(event: MouseEvent): void {
        console.error('PointerLockControls: Unable to use Pointer Lock API');
    }

    /** 键盘按下 */
    public onKeyDown(event: KeyboardEvent): void {
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleKeyboardEvent(event, event.code, true);
        }
    }

    /** 键盘抬起 */
    public onKeyUp(event: KeyboardEvent): void {
        if (this.eventReceiver !== undefined) {
            this.eventReceiver.handleKeyboardEvent(event, event.code, false);
        }
    }

    /** 设置事件监听器 */
    public setEventReceiver(receiver: IEventReceiver): void {
        this.eventReceiver = receiver;
        this.eventReceiver.eventReceiverInit();
    }
    /** 设置指针锁定 */
    public setPointerLock(enabled: boolean): void {
        this.pointerLock = enabled;
    }
    /** 更新 */
    update(timestep: number, unscaledTimeStep: number): void {
        if (
            this.eventReceiver === undefined &&
            this.ioThree !== undefined &&
            this.ioThree.getCameraManager !== undefined
        ) {
            this.setEventReceiver(this.ioThree.getCameraManager);
        }

        this.eventReceiver?.eventReceiverUpdate(unscaledTimeStep);
    }
}
