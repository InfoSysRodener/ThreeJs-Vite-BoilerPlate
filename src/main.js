import '../style.css'
import * as THREE from 'three';
import SceneManager from './sceneManager/scene';
import * as dat from 'dat.gui';
 
const gui = new dat.GUI();

const canvas = document.querySelector('#canvas');
const scene = new SceneManager(canvas);
scene.scene.background = 0x000000;
scene.addOrbitControl();
const axesHelper = new THREE.AxesHelper(5);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.y = 20
directionalLight.position.x = 10
directionalLight.position.z = 10
scene.add(directionalLight);
const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
scene.add( helper );

const width = 40;  
const height = 40;   
const geometry = new THREE.PlaneGeometry(width,height,100,100);
const material = new THREE.MeshPhongMaterial( { color: 0x52ff45,wireframe:true} );
const plane = new THREE.Mesh(geometry,material);
plane.rotation.x = Math.PI * 1.50;
scene.add(plane);

const boxGeometry = new THREE.BoxBufferGeometry(4,4,4);
const boxMaterial = new THREE.MeshStandardMaterial({
	color:0x442255
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.y = 5;
cube.add(axesHelper);
scene.add(cube);


const clock = new THREE.Clock();
const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	cube.rotation.y = elapsedTime;

	scene.onUpdate();
	scene.onUpdateStats();
	requestAnimationFrame( animate );
};
animate();