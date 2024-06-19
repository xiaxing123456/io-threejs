<template>
    <div class="plt-container">
        <canvas ref="canvasDom" class="io-cloud" />
    </div>
</template>
<script lang="ts" setup>
// import { IOTHREE, TextureLoader } from '@threejs-platform/threejs';
import { onMounted, ref } from 'vue';
import { IOTHREE, TextureLoader } from '../../../threejs/src/index';

const canvasDom = ref();
const cloudInstance = ref<IOTHREE>();

onMounted(async () => {
    cloudInstance.value = new IOTHREE(canvasDom.value);

    const textureLoader = new TextureLoader();

    const map = textureLoader.load('/models/LeePerrySmith/Map-COL.jpg');
    const specularMap = textureLoader.load('/models/LeePerrySmith/Map-SPEC.jpg');
    const normalMap = textureLoader.load(
        '/models/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'
    );
    const material = {
        specular: 0x111111,
        map,
        specularMap,
        normalMap,
        shininess: 25,
    };
    await cloudInstance.value.modelManager.OBJLoader.load({
        path: '/models/city/city.obj',
    });
});
</script>

<style lang="scss" scoped>
.plt-container {
    width: 100%;
    height: 100%;
}
.io-cloud {
    width: 100% !important;
    height: 100% !important;
}
</style>
