import * as THREE from 'three';
import { OrbitControls as OrbitControl } from 'three/examples/jsm/controls/OrbitControls.js';
import { EventManager } from '../core/event-manager';
import { GetCameraManager } from '../core/get-camera-manager';
import { ActiveViewMode } from '../enums/global.enum';
import { IUpdatable } from '../interfaces/IUpdatable';
import { ModelManager } from '../model-manager/model-manager';
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
    public modelManager: ModelManager;
    /** 相机操作管理 */
    public getCameraManager: GetCameraManager;
    public params: any;
    public eventManager: EventManager;
    /** 可更新数据 */
    public updatables: IUpdatable[] = [];
    /** 请求时间差 */
    public requestDelta: number;
    /** 渲染时间差 */
    public renderDelta: number;
    /** 逻辑时间差 */
    public logicDelta: number;
    public timeScaleTarget: number = 1;
    constructor(canvas) {
        const scope = this;
        this.canvas = canvas;
        this.loadScene.call(scope);
        // 时钟
        this.Clock = new THREE.Clock();
        this.renderDelta = 0; // 渲染时间戳
        this.logicDelta = 0;

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
        // this.Scene.background = reflectionCube;
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
            80,
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
    }
    /** 初始化 */
    private Initialization() {
        // 事件管理
        this.eventManager = new EventManager(this, this.WebGLRenderer.domElement);
        // 相机操作管理
        this.getCameraManager = new GetCameraManager(
            this,
            this.Camera,
            this.params.Mouse_Sensitivity
        );
        // 模型管理
        this.modelManager = new ModelManager(this);
        this.modelManager.takeControl();
    }

    /**
     * 处理所有逻辑更新
     * @parmas timeStep 时间
     * @params unscaledTimeStep
     */
    public update(timeStep: number, unscaledTimeStep: number) {
        /** 可以更新的数据 */
        this.updatables.forEach(entity => {
            entity.update(timeStep, unscaledTimeStep);
        });

        // Lerp time scale
        this.params.Time_Scale = THREE.MathUtils.lerp(
            this.params.Time_Scale,
            this.timeScaleTarget,
            0.3
        );
    }
    /** 寄存器可更新 */
    public registerUpdatable(registree: IUpdatable): void {
        this.updatables.push(registree);
        this.updatables.sort((a, b) => (a.updateOrder > b.updateOrder ? 1 : -1));
    }
    /**
     * 渲染循环
     *  实现fps限制器和帧跳过
     *  在渲染之前调用世界的“更新”函数。
     */
    private render(): void {
        this.requestDelta = this.Clock.getDelta();
        window.requestAnimationFrame(this.render.bind(this));

        // 获取时间步数
        let unscaledTimeStep = this.requestDelta + this.renderDelta + this.logicDelta;
        let timeStep = unscaledTimeStep * this.params.Time_Scale;
        timeStep = Math.min(timeStep, 1 / 30); // min 30 fps
        // 逻辑
        this.update(timeStep, unscaledTimeStep);
        // 测量逻辑时间
        this.logicDelta = this.Clock.getDelta();

        this.WebGLRenderer.render(this.Scene, this.Camera);
        // 渲染结束
        this.renderDelta = this.Clock.getDelta();
    }
    /** 自适应 */
    private resize(): void {
        // 更新大小
        this.sizes.width = this.sizes.width;
        this.sizes.height = this.sizes.height;
        // 更新摄像机
        this.Camera.aspect = this.sizes.width / this.sizes.height;
        this.Camera.updateProjectionMatrix();

        // 更新渲染
        this.WebGLRenderer.setSize(this.sizes.width, this.sizes.height);
        this.WebGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    /** 设置时间刻度目标 */
    public setTimeScale(value: number): void {
        this.params.Time_Scale = value;
        this.timeScaleTarget = value;
    }
    /** 滚动时间刻度 */
    public scrollTheTimeScale(scrollAmount: number): void {
        // 使用滚轮更改时间刻度
        const timeScaleBottomLimit = 0.003;
        const timeScaleChangeSpeed = 1.3;

        if (scrollAmount > 0) {
            this.timeScaleTarget /= timeScaleChangeSpeed;
            if (this.timeScaleTarget < timeScaleBottomLimit) this.timeScaleTarget = 0;
        } else {
            this.timeScaleTarget *= timeScaleChangeSpeed;
            if (this.timeScaleTarget < timeScaleBottomLimit)
                this.timeScaleTarget = timeScaleBottomLimit;
            this.timeScaleTarget = Math.min(this.timeScaleTarget, 1);
        }
    }
    public Color(color: number): THREE.Color {
        return new THREE.Color(color);
    }
    private createParamsGUI(scope: IOTHREE): void {
        scope.params = {
            Pointer_Lock: false, // 是否锁屏
            Time_Scale: 1, // 时间刻度
            Mouse_Sensitivity: 0.3, // 鼠标灵敏度
            activeViewMode: ActiveViewMode.freeCamera, // 当前视图模式
        };
    }
}
