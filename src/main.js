import '../style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import SceneManager from './sceneManager/scene';
import gsap from 'gsap';

const gui = new dat.GUI();

//scene
const canvas = document.querySelector('#canvas');
const scene = new SceneManager(canvas);
scene.scene.background = 0x000000;
scene.addOrbitControl();
const axesHelper = new THREE.AxesHelper(5);

//lights
const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1);
directionalLight.position.set(10,10,10);
scene.add(directionalLight);
const directionalHelper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add(directionalHelper);

gui.add(directionalHelper, 'visible').name('DLight Helper')

const ambiantLight = new THREE.AmbientLight(0xFFFFFF,1);
scene.add(ambiantLight);

//geometry
const width = 40;  
const height = 40;   
const geometry = new THREE.PlaneGeometry(width,height,100,100);
const material = new THREE.MeshPhongMaterial( { color: 0x52ff45} );
const plane = new THREE.Mesh(geometry,material);
plane.rotation.x = Math.PI * 1.50;
scene.add(plane);


gui.add(material, 'wireframe').name('Plane WireFrame');


const boxGeometry = new THREE.BoxBufferGeometry(4,4,4);
const boxMaterial = new THREE.MeshStandardMaterial({color:0x442255});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.y = 5;
cube.add(axesHelper);
scene.add(cube);

gui.add(boxMaterial, 'wireframe').name('Box Wireframe');
gui.add(cube.scale, 'x').min(1).max(5).step(0.01).name('BoxScale X');
gui.add(cube.scale, 'y').min(1).max(5).step(0.01).name('BoxScale Y');
gui.add(cube.scale, 'z').min(1).max(5).step(0.01).name('BoxScale Z');

gsap.to(cube.rotation,{ duration:3,delay:3,x: Math.PI * 2 });

const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	cube.rotation.y = elapsedTime;

	
	scene.onUpdate();
	scene.onUpdateStats();
	requestAnimationFrame( animate );
};

animate();