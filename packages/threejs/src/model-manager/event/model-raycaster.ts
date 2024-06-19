import { IOTHREE } from '../../world/IOTHREE';

export class ModelRaycaster {
    private ioThree: IOTHREE;
    constructor(ioThree: IOTHREE) {
        this.ioThree = ioThree;
    }
    // 键盘按下事件
    handleKeyboardEvent(event: KeyboardEvent, code: string, pressed: boolean): void {
        console.log('1111111');
    }
}
