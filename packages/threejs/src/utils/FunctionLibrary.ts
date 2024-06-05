import * as THREE from 'three';

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
