import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { energy, roughness, warmth, richness, sharpness, 
         dataArray, analyser, pitchDetector } from './audio.js'

import { Noise } from 'noisejs';



let controls;
let camera, scene, renderer;
let container;
let FrameRate = 0;

let group, geometry, material, compoCenter;
let pointLight;
let ambientLight, spotLight;

let size;

let hue, saturation, luminance;

var noise = new Noise(Math.random());




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
    renderer.setSize(1400, 900);
    
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
    geometry = new THREE.CircleGeometry( 5, 30 );
    material = new THREE.MeshBasicMaterial();


    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);

    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    group.add( compoCenter );
}



// HSL color 를 Hex Code 로 변환해주는 함수
function HSLToHex(h,s,l) {
  
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  return '#' + r + g + b;
}





function createCircle(){

    size = energy * 1.1;
    if (size < 0.5){
      size = 0.5
    }

    hue = warmth
    saturation = richness * 100
    luminance = sharpness * 100
    console.log(saturation)


    let hex1 = HSLToHex(hue, saturation, luminance);
    let hex2 = HSLToHex(360-hue, 100, 50)
    

    // geometry = new THREE.IcosahedronGeometry(size, Math.ceil(roughness*10));
    geometry = new THREE.SphereGeometry(size*2, 128, 128);

    material = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color(hex1)
        },
        color2: {
          value: new THREE.Color(hex2)
        },
        edgeOffset: {
          value: 10.0
        }
      },
      vertexShader: `
      
        varying vec2 vUv;
    
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        #define PI 3.1415926
        #define TWO_PI PI*2.
          
        uniform vec3 color1;
        uniform vec3 color2;
      
        varying vec2 vUv;
        
        void main() {
          
          vec2 uv = vUv * 2. - 1.;
          
          float a = atan(uv.x,uv.y)+PI;
          float r = TWO_PI/4.;
          float d = cos(floor(.5+a/r)*r-a)*length(uv);
          
          gl_FragColor = vec4(mix(color1, color2, d), 1.0);
        }
      `,
    });


    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);

  
    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);
  
    group.add( compoCenter );
}


function update() {
  var positionAttribute = compoCenter.geometry.getAttribute('position');
  var vertex = new THREE.Vector3();
  var time = performance.now() * 0.003;

  var scalingFactor = 1 + roughness * 3;

  for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
    vertex.fromBufferAttribute(positionAttribute, vertexIndex);
    
    // Check if the size is greater than 0.5 before applying Perlin noise
    if (size > 0.5) {
      var noiseValue = noise.perlin3(vertex.x * scalingFactor + time, vertex.y * scalingFactor, vertex.z * scalingFactor);
      vertex.normalize().multiplyScalar(1 + 0.3 * noiseValue);

      if (!isNaN(noiseValue) && isFinite(vertex.x) && isFinite(vertex.y) && isFinite(vertex.z)) {
        positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
      } else {
        positionAttribute.setXYZ(vertexIndex, 0, 0, 0);
      }

    } else {
      // If size is less than or equal to 0.5, keep the original position
      positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
      hex1 = HSLToHex(265, 0, 100);
      hex2 = HSLToHex(265, 0, 30);
    }
  }

  compoCenter.geometry.computeVertexNormals();
  compoCenter.geometry.normalsNeedUpdate = true;
  compoCenter.geometry.verticesNeedUpdate = true;
}




function animate() {
  requestAnimationFrame(animate);

  FrameRate = FrameRate + 1;
  if (FrameRate % 4 == 0) {
    // music rendering
    if (dataArray) {
      analyser.getByteFrequencyData(dataArray);
      pitchDetector();
      // geometry rendering (firstly, delete the basic geometry in the base.)
      deleteBasics();
      createCircle();
    }
  }

  update(); // Call the update function after creating the mesh
  render();
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