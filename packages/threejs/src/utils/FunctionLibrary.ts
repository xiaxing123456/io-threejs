import * as THREE from 'three';
import { Space } from '../enums/global.enum';
import type { modelLoaderParams } from '../model-manager/model-manager.type';
import { validateNull } from './validate';
// 函数库

/** 设置网络属性 */
export function setupMeshProperties(child: any): void {
    child.castShadow = true;
    child.receiveShadow = true;
    if (child.material instanceof Array) {
        for (let i in child.material) {
            const mat = new THREE.MeshPhongMaterial();
            mat.shininess = 0;
            mat.name = child.material.name;
            mat.transparent = child.material.transparent;
            mat.skinning = child.material.skinning;
            if (!validateNull(child.material.map)) {
                mat.map = child.material.map;
                mat.map.anisotropy = 4;
                mat.aoMap = child.material.aoMap;
            }
            child.material[i] = mat;
        }
    } else {
        let mat = new THREE.MeshPhongMaterial();
        mat.shininess = 0; // 光泽
        mat.name = child.material.name; // 名称
        mat.transparent = child.material.transparent; // 透明度
        mat.skinning = child.material.skinning; // 
        if (!validateNull(child.material.map)) {
            mat.map = child.material.map;
            mat.map.anisotropy = 4;
            mat.aoMap = child.material.aoMap;
        }
        child.material = mat;
        child.material.oldColor = child.material.color;
    }
}

/** 设置模型位置大小设置 */
export function setupMeshTransform(mesh: any, Properties: modelLoaderParams): void {
    if (Properties.hasOwnProperty('scale')) {
        mesh.scale.set(Properties.scale.x, Properties.scale.y, Properties.scale.z);
    }
    if (Properties.hasOwnProperty('position')) {
        mesh.scale.set(Properties.position.x, Properties.position.y, Properties.position.z);
    }
    if (Properties.hasOwnProperty('rotation')) {
        mesh.scale.set(Properties.rotation.x, Properties.rotation.y, Properties.rotation.z);
    }
}

/** 获取矩阵 */
export function getMatrix(obj: THREE.Object3D, space: Space): THREE.Matrix4 {
    switch (space) {
        case Space.Local:
            return obj.matrix;
        case Space.Global:
            return obj.matrixWorld;
    }
}
/** 获取y轴 */
export function getUp(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3 {
    const matrix = getMatrix(obj, space);
    return new THREE.Vector3(matrix.elements[4], matrix.elements[5], matrix.elements[6]);
}
/** 获取x轴 */
export function getRight(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3 {
    const matrix = getMatrix(obj, space);
    return new THREE.Vector3(matrix.elements[0], matrix.elements[1], matrix.elements[2]);
}
/** 获取z轴 */
export function getBack(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3 {
    const matrix = getMatrix(obj, space);
    return new THREE.Vector3(-matrix.elements[8], -matrix.elements[9], -matrix.elements[10]);
}

/** 设置网格属性颜色高亮 */
export function setMeshPropertiesHighlight(child: any, color: number): void {
    if (!validateNull(child?.material)) {
        if (child.material instanceof Array) {
            for (let i in child.material) {
                child.material[i].color = new THREE.Color(color);
            }
        } else {
            child.material.color = new THREE.Color(color);
        }
    }
}
/** 设置网格属性颜色还原高亮 */
export function setMeshPropertiesRestore(child: any): void {
    if (!validateNull(child?.material)) {
        if (child.material instanceof Array) {
            for (let i in child.material) {
                child.material[i].color = child.material[i].oldColor;
            }
        } else {
            child.material.color = child.material.oldColor;
        }
    }
}
