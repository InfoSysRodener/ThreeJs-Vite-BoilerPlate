import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';

export default class SceneManager {

    constructor(canvas){
         this.canvas = canvas;
         this._init();
    }

    _init(){
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xFF4444);

        const renderer = new THREE.WebGLRenderer({ canvas:this.canvas, antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

        window.addEventListener('resize', () => this.onWindowsResize(), false);

        const camera = new THREE.PerspectiveCamera(75 ,window.innerWidth / window.innerHeight,0.1,1000);
        camera.position.z = 20;
        camera.position.y = 5;
        camera.lookAt(0,0,0);

        //init stats
        let stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0';
        stats.domElement.style.top = '0';
        document.body.appendChild( stats.domElement);

        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.stats = stats;
    }

    add(obj){
        this.scene.add(obj);
    }

    addFog(near = 1,far = 2,color = '#FFFFFF'){
        this.scene.fog = new THREE.Fog(color, near, far);
    }

    onUpdate(){
        this.renderer.render(this.scene,this.camera);
    }

    onWindowsResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight, false); 
    }

    addOrbitControl(){
        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.enableDamping = true;
        controls.update();
        return controls;
    }

    onUpdateStats() {
        return this.stats.update();
    }

}