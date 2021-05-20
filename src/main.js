import '../style.css'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import SceneManager from './sceneManager/scene';
import gsap from 'gsap';

const gui = new dat.GUI();

//scene
const canvas = document.querySelector('#canvas');
const scene = new SceneManager(canvas);
let conf = { color : '#a48c5d' }; 
scene.scene.background.set(conf.color);
scene.addOrbitControl();
scene.addFog(1,100,conf.color);

//fog GUI
const fogFolder = gui.addFolder('FOG');
fogFolder.add(scene.scene.fog, 'near').min(1).max(100).step(0.01).listen();
fogFolder.add(scene.scene.fog, 'far').min(1).max(100).step(0.01).listen();
fogFolder.addColor(conf, 'color').onChange((color)=>{
	scene.scene.fog.color.set(color);
	scene.scene.background.set(color);
	scene.scene.children
		.filter(obj => obj.name === 'floor')[0]
		.material.color.set(color)
});
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
const width = 240;  
const height = 240;   
const geometry = new THREE.PlaneGeometry(width,height,100,100);
const material = new THREE.MeshPhongMaterial( { color: conf.color} );
const plane = new THREE.Mesh(geometry,material);
plane.name = 'floor';
plane.rotation.x = Math.PI * 1.50;
scene.add(plane);


gui.add(material, 'wireframe').name('Plane WireFrame');


const boxGeometry = new THREE.BoxBufferGeometry(4,4,4);
const boxMaterial = new THREE.MeshStandardMaterial({color:0x442255});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.y = 5;
cube.add(axesHelper);
scene.add(cube);

const cubeGUI = gui.addFolder('Cube');
cubeGUI.add(boxMaterial, 'wireframe').name('Box Wireframe');
cubeGUI.add(cube.scale, 'x').min(1).max(5).step(0.01).name('BoxScale X');
cubeGUI.add(cube.scale, 'y').min(1).max(5).step(0.01).name('BoxScale Y');
cubeGUI.add(cube.scale, 'z').min(1).max(5).step(0.01).name('BoxScale Z');

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