import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { energy, roughness, warmth, richness, sharpness, 
         dataArray, analyser, pitchDetector, realpitch, realoctave } from './audio.js'

import { Noise } from 'noisejs';


let controls;
let camera, scene, renderer;
let container;
let FrameRate = 0;

let group, geometry, material, compoCenter;
let pointLight;
let ambientLight, spotLight;

let size;
let hex1, hex2;
let hue, saturation, luminance;

var noise = new Noise(Math.random());





function init() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(1200, 900);
    
    camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 2, 3000);
    camera.position.set(1, 10, 15);
  
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
  
    createVanilla();

  };


function createVanilla(){
    geometry = new THREE.SphereGeometry(0, 128, 128);

    material = new THREE.MeshBasicMaterial();


    compoCenter = new THREE.Mesh(geometry, material);
    compoCenter.position.set(1, 0, 0);

    spotLight.lookAt(compoCenter);
    pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    group.add( compoCenter );
}




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


function getColorByPitch(pitch) {
  // Define the rainbow colors for the notes Do to Si
  const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

  // Define the octave range and corresponding lightness values
  const minLightness = 0; // Minimum lightness
  const maxLightness = 50; // Maximum lightness

  // Map the pitch to the rainbow colors
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const pitchIndex = noteNames.indexOf(pitch);

  size = energy;
  if (size < 0.01) {
    size * 100;
  } else {
    // Check if the pitch is in the rainbow colors range (Do to Si)
    if (pitchIndex >= 0 && pitchIndex < rainbowColors.length) {
      const color = rainbowColors[pitchIndex];

      // Map the pitch octave to the lightness range (3 to 5 octaves)
      const octave = 3 + realoctave; // Adjusted the minimum octave
      const lightness = minLightness + (maxLightness - minLightness) * (octave / 5); // Assuming 5 octaves

      // Create a new THREE.Color instance and set it using HSL
      const hsvColor = new THREE.Color();
      hsvColor.setHSL(pitchIndex * 360 / rainbowColors.length, 1, lightness / 100);

      // Convert the THREE.Color to hexadecimal
      const finalColor = hsvColor.getHexString();

      return '#' + finalColor;
    } else {
      return '#CCCCCC'; // Default color for non-rainbow notes
    }
  }
}




function applyPitch() {
  hue = warmth;
  saturation = richness * 100;
  luminance = sharpness * 100;

  // Check and clamp the values
  if (hue > 360) {
    hue = 360;
  }
  if (saturation > 100) {
    saturation = 100;
  }
  if (luminance > 100) {
    luminance = 100;
  }

  hex1 = HSLToHex(hue, saturation, luminance);
  hex2 = getColorByPitch(realpitch);

  geometry = new THREE.SphereGeometry(1.4, 128, 128);
  material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color(hex1)
      },
      color2: {
        value: new THREE.Color(hex2)
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

  group.add(compoCenter);
}





function applyEnergy(){

  size = energy
  if(size < 0.01){
    size * 100
  } else {

  }

  

  geometry = new THREE.SphereGeometry(size*1.6, 128, 128);
  material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color('#555555')
      },
      color2: {
        value: new THREE.Color('#d5d5d5')
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




function applyTimbre() {
  hue = warmth;
  saturation = richness * 100;
  luminance = sharpness * 100;

  // Check and clamp the values
  if (hue > 360) {
    hue = 360;
  }
  if (saturation > 100) {
    saturation = 100;
  }
  if (luminance > 100) {
    luminance = 100;
  }

  hex1 = HSLToHex(hue, saturation, luminance);
  hex2 = '#FFFFFF'

  geometry = new THREE.SphereGeometry(1.4, 128, 128);
  material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color(hex1)
      },
      color2: {
        value: new THREE.Color(hex2)
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

  // Define thresholds for when the roughness and energy effects should be applied
  var roughnessThreshold = 0.1; // Adjust this threshold as needed
  var energyThreshold = 0.01; // Adjust this threshold as needed

  for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
    vertex.fromBufferAttribute(positionAttribute, vertexIndex);

    // Calculate a scaling factor based on energy
    var energyScalingFactor = Math.max(0.01, energy / energyThreshold); // Adjust the minimum scaling factor as needed

    // Check if the roughness is above the threshold and energy is above the threshold before applying displacement
    if (roughness > roughnessThreshold) {
      // Calculate a displacement based on the roughness value and scaled by energy
      var scalingFactor = 5 + roughness * 10; // Adjust these values as needed

      var displacement = new THREE.Vector3(
        roughness * scalingFactor * energyScalingFactor * (Math.random() - 0.5),
        roughness * scalingFactor * energyScalingFactor * (Math.random() - 0.5),
        roughness * scalingFactor * energyScalingFactor * (Math.random() - 0.5)
      );

      vertex.add(displacement);
    }

    if (!isNaN(vertex.x) && isFinite(vertex.x) && !isNaN(vertex.y) && isFinite(vertex.y) && !isNaN(vertex.z) && isFinite(vertex.z)) {
      positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
    } else {
      positionAttribute.setXYZ(vertexIndex, 0, 0, 0);
    }
  }

  compoCenter.geometry.computeVertexNormals();
  compoCenter.geometry.normalsNeedUpdate = true;
  compoCenter.geometry.verticesNeedUpdate = true;
}





function animatePitch() {
  requestAnimationFrame(animatePitch);

  FrameRate = FrameRate + 1;
  if (FrameRate % 4 == 0) {
    // music rendering
    if (dataArray) {

      analyser.getByteFrequencyData(dataArray);
      pitchDetector();
      // geometry rendering (firstly, delete the basic geometry in the base.)
      deleteBasics();
      applyPitch();

    }
  }

  render();
}



function animateEnergy() {
  requestAnimationFrame(animateEnergy);

  FrameRate = FrameRate + 1;
  if (FrameRate % 4 == 0) {
    // music rendering
    if (dataArray) {

      analyser.getByteFrequencyData(dataArray);
      deleteBasics();
      applyEnergy();

    }
  }

  render();
}



function animateTimbre() {
  requestAnimationFrame(animateTimbre);

  FrameRate = FrameRate + 1;
  if (FrameRate % 4 == 0) {
    // music rendering
    if (dataArray) {

      analyser.getByteFrequencyData(dataArray);
      deleteBasics();
      applyTimbre();

    }
  }

  update();


  render();
}



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





export { init, render, deleteBasics, createVanilla, applyPitch, applyEnergy, applyTimbre, animatePitch, animateEnergy, animateTimbre, update }