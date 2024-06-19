/** 事件接收器 */
export interface IEventReceiver {
    /**
     * @name  鼠标双击事件
     */
    handleOnDblClick(event: MouseEvent): void;
    /**
     * @name 手柄鼠标按下抬起
     * @param event 按下事件返回参数
     * @param code mouse0 左键 mouse1 中建 mouse2 右键
     * @param pressed true 按下 false 抬起
     */
    handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void;
    /** 手臂鼠标移动 */
    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void;
    /** 鼠标滚轮滚动 */
    handleMouseWheel(event: WheelEvent, value: number): void;
    /** 键盘按键按下 */
    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void;

    /** 初始化事件监听器 */
    eventReceiverInit(): void;
    /** 事件接收器更新 */
    eventReceiverUpdate(timeStep: number): void;
}
