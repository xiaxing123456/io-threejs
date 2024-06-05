import * as THREE from 'three';
import type { modelLoaderParams } from '../model-manager/model-manager.type';
// 函数库

/** 设置网络属性 */
export function setupMeshProperties(child: any): void {
    child.castShadow = true;
    child.receiveShadow = true;

    if (child.material.map !== null) {
        let mat = new THREE.MeshPhongMaterial();
        mat.shininess = 0;
        mat.name = child.material.name;
        mat.map = child.material.map;
        mat.map.anisotropy = 4;
        mat.aoMap = child.material.aoMap;
        mat.transparent = child.material.transparent;
        mat.skinning = child.material.skinning;
        child.material = mat;
    }
    // 储存旧值
    child.material.oldColor = child.material.color;
}

/** 设置模型位置 */
export function setupMeshTransform(mesh: any, params: modelLoaderParams): void {
    if (params.hasOwnProperty('scale')) {
        mesh.scale.set(params.scale.x, params.scale.y, params.scale.z);
    }
    if (params.hasOwnProperty('position')) {
        mesh.scale.set(params.position.x, params.position.y, params.position.z);
    }
    if (params.hasOwnProperty('rotation')) {
        mesh.scale.set(params.rotation.x, params.rotation.y, params.rotation.z);
    }
}
