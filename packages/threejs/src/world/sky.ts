import * as THREE from 'three';
import { Sky as THREE_Sky } from 'three/examples/jsm/objects/Sky';
import { IOTHREE } from '../index';
import { effectControllerType } from '../types/world/sky.type';

/** 天空 */
export class Sky {
    ioThree: IOTHREE;
    sky: THREE_Sky;
    effectController: effectControllerType;
    sun: THREE.Vector3;
    constructor(ioThree: IOTHREE) {
        this.ioThree = ioThree;

        // 创建天空
        this.sky = new THREE_Sky();
        this.sky.scale.setScalar(10000); // 太阳盒子的大小
        this.ioThree.Scene.add(this.sky);
        this.sun = new THREE.Vector3();
        this.effectController = {
            turbidity: 10, // 浑浊度
            rayleigh: 3, // 阳光散射，黄昏效果的程度
            mieCoefficient: 0.005, // 太阳对比度，清晰度
            mieDirectionalG: 0.7,
            elevation: 2, // 太阳高度
            azimuth: 180, // 太阳水平方向位置
            exposure: ioThree.WebGLRenderer.toneMappingExposure, // 光线昏暗程度
        };
        this.guiChanged();
    }

    public guiChanged(): void {
        const uniforms = this.sky.material.uniforms;
        uniforms['turbidity'].value = this.effectController.turbidity;
        uniforms['rayleigh'].value = this.effectController.rayleigh;
        uniforms['mieCoefficient'].value = this.effectController.mieCoefficient;
        uniforms['mieDirectionalG'].value = this.effectController.mieDirectionalG;

        const phi = THREE.MathUtils.degToRad(90 - this.effectController.elevation);
        const theta = THREE.MathUtils.degToRad(this.effectController.azimuth);
        this.sun.setFromSphericalCoords(1, phi, theta);
        uniforms['sunPosition'].value.copy(this.sun);
        this.ioThree.WebGLRenderer.toneMappingExposure = this.effectController.exposure;
    }
    public update(timeScale: number): void {}
}
