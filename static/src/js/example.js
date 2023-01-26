import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls;
let camera, scene, renderer;
let container;
let FrameRate = 0;

let group, geometry, material, compoCenter;
let pointLight;
let ambientLight, spotLight;



// BASIC EVENTS
init();
animate();



// init function
function init() {
    scene = new THREE.Scene();
    // canvas
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(900, 700);
    
    camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 2, 2000);
    camera.position.set(1, 10, 30);
  
    container = document.getElementById( "canvas" );
    
    container.appendChild( renderer.domElement )
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputEncoding = THREE.sRGBEncoding;
  
    ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);
  
    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
  
    spotLight.castShadow = true;
    scene.add(spotLight);
    group = new THREE.Group();
    scene.add(group);
  
  
    controls = new OrbitControls( camera, container );
    // controls.update(); 요소가 움직이지 않게 함...
  
    createVinyl();
    // createVinylCenter();
    console.log('created vinyl.')
  };


function createVinyl(){
    const vinylCover = new THREE.TextureLoader().load('./static/src/images/img.jpeg')
    const vinylBack = new THREE.TextureLoader().load('./static/src/images/backside.png')
    geometry = new THREE.CircleGeometry( 8, 128 );
    material = new THREE.MeshBasicMaterial( { map: vinylCover
     } );
    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);
  
    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);
  
    group.add( compoCenter );
}



// animate function
function animate() {
    requestAnimationFrame(animate);
    render();
  }


// render function
function render() {
    controls.update();
    renderer.render(scene, camera);
  }

