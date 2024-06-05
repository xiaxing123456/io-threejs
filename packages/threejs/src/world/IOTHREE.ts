import * as THREE from 'three';
import { OrbitControls as OrbitControl } from 'three/examples/jsm/controls/OrbitControls.js';
import { EventManager } from '../core/EventManager';
import ModelManage from '../modelManage';
import { Sky } from './sky';
/**
 * threejs场景搭建
 */
export class IOTHREE {
    /** 画布 */
    public canvas: HTMLElement;
    public sizes: { width: number; height: number };
    public THREE: THREE;
    /** 场景 */
    public Scene: THREE.Scene;
    /** 摄像机 */
    public Camera: THREE.PerspectiveCamera;
    /** 渲染 */
    public WebGLRenderer: THREE.WebGLRenderer;
    /** 天空 */
    public sky: Sky;
    /** 时钟 */
    public Clock: THREE.Clock;
    /** 控制 */
    public OrbitControls: OrbitControl;
    /** 模型管理 */
    public modelManage: ModelManage;
    public params: any;
    public eventManager: EventManager;
    constructor(canvas) {
        const scope = this;
        this.canvas = canvas;
        this.loadScene.call(scope);
        // 时钟
        this.Clock = new THREE.Clock();

        this.createParamsGUI(scope);
        // 初始化
        this.Initialization.call(scope);

        // 动画Receiver
        this.render.call(scope);
        // 自适应
        this.resize.call(scope);
        window.addEventListener('resize', this.resize);
    }
    /** 加载场景 */
    private loadScene() {
        this.sizes = {
            width: this.canvas.offsetWidth,
            height: this.canvas.offsetHeight,
        };

        // 场景
        this.Scene = new THREE.Scene();
        const prefix = '/diversespace-back/';
        const suffix = '.jpg';
        const urls = [
            prefix + 'px' + suffix,
            prefix + 'nx' + suffix,
            prefix + 'py' + suffix,
            prefix + 'ny' + suffix,
            prefix + 'pz' + suffix,
            prefix + 'nz' + suffix,
        ];
        const reflectionCube = new THREE.CubeTextureLoader().load(urls);
        this.Scene.background = reflectionCube;
        // 创建渐变材质
        this.Scene.add(new THREE.AmbientLight(0x666666));
        const dirLight1 = new THREE.DirectionalLight(0xffddcc, 3);
        dirLight1.position.set(1, 0.75, 0.5);
        this.Scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xccccff, 3);
        dirLight2.position.set(-1, 0.75, -0.5);
        this.Scene.add(dirLight2);

        // 摄像机
        this.Camera = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            1,
            10000
        );
        this.Camera.position.copy(new THREE.Vector3(30, 30, 120));
        // 渲染
        this.WebGLRenderer = new THREE.WebGLRenderer({
            //开启抗锯齿
            antialias: true,
            physicallyCorrectLights: true,
            canvas: this.canvas,
        });
        this.WebGLRenderer.setSize(this.sizes.width, this.sizes.height);
        this.WebGLRenderer.setPixelRatio(window.devicePixelRatio * 2);
        this.WebGLRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.WebGLRenderer.toneMappingExposure = 0.5;

        // 控制
        this.OrbitControls = new OrbitControl(this.Camera, this.canvas);
        this.OrbitControls.enableDamping = true;
    }
    /** 初始化 */
    public Initialization() {
        // 事件管理
        this.eventManager = new EventManager(this, this.WebGLRenderer.domElement);
        // 模型管理
        this.modelManage = new ModelManage(this);
    }
    /** 动画帧 */
    private render(): void {
        this.OrbitControls.update();
        this.WebGLRenderer.render(this.Scene, this.Camera);
        window.requestAnimationFrame(this.render);
    }
    /** 自适应 */
    private resize(): void {
        // Update sizes
        this.sizes.width = this.sizes.width;
        this.sizes.height = this.sizes.height;
        // Update camera
        this.Camera.aspect = this.sizes.width / this.sizes.height;
        this.Camera.updateProjectionMatrix();

        // Update WebGLRenderer
        this.WebGLRenderer.setSize(this.sizes.width, this.sizes.height);
        this.WebGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    public Color(color: number): THREE.Color {
        return new THREE.Color(color);
    }
    private createParamsGUI(scope: IOTHREE): void {
        this.params = {
            Pointer_Lock: true,
        };
    }
}
