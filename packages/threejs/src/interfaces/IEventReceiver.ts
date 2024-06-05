/** 事件接收器 */
export interface IEventReceiver {
    /** 手柄鼠标按钮  */
    handleMouseButton(event: MouseEvent, code: string, pressed: boolean): void;
    /** 手臂鼠标移动 */
    handleMouseMove(event: MouseEvent, deltaX: number, deltaY: number): void;
    /** 鼠标滚轮滚动 */
    handleMouseWheel(event: WheelEvent, value: number): void;
    /** 键盘按键按下 */
    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void;

    /** 初始化事件监听器 */
    inputReceiverInit(): void;
}
