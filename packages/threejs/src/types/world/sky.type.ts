export interface effectControllerType {
    /** 浑浊度 */
    turbidity: number;
    /** 阳光散射，黄昏效果的程度 */
    rayleigh: number;
    /**  太阳对比度，清晰度 */
    mieCoefficient: number;
    mieDirectionalG: number;
    /** 太阳高度 */
    elevation: number;
    /** 太阳水平方向位置 */
    azimuth: number;
    /** 光线昏暗程度 */
    exposure?: number;
}
