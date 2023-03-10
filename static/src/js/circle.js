import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { energy, dataArray, analyser, pitchDetector } from './audio.js'

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
  
    createCircle_Vanilla();

  };



function createCircle_Vanilla(){
    geometry = new THREE.CircleGeometry( 10, 60 );
    material = new THREE.MeshBasicMaterial();


    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);

    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    group.add( compoCenter );
}


function createCircle(){
    let custom_energy = energy * 5;
  
    if(custom_energy > 15){
      custom_energy = 15;
    } else if(custom_energy < 10){
      custom_energy = custom_energy / 2 + 5
    }

    let size = custom_energy;
    // console.log('energy', energy)
    // console.log('size', size)

    geometry = new THREE.CircleGeometry( size, 60 );
    material = new THREE.MeshBasicMaterial();


    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);
  
    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);
  
    group.add( compoCenter );
}




function animate() {
  requestAnimationFrame(animate);
  
  // 여기를 기점으로 색깔 등 요소 변경을 추가하면됨
  FrameRate = FrameRate + 1
  if (FrameRate % 4 == 0){

    // music rendering
    if (dataArray){
      analyser.getByteFrequencyData(dataArray);
      pitchDetector();
      // geometry rendering (firstly, delete the basic geometry in the base.)
      deleteBasics();
      createCircle();
      render();
      }
    }
  }




// render function
function render() {
    controls.update();
    renderer.render(scene, camera);
  }




function deleteBasics(){
    group.parent.remove(group);
    group = new THREE.Group();
    scene.add(group);
    
    compoCenter.geometry.dispose();
    compoCenter.material.dispose();
};