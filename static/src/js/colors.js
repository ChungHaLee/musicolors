import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { pitchDetector, energy, roughness, warmth, richness, sharpness, kurtosis,
         dataArray, analyser, realpitch, realoctave } from './audio.js'

import { Noise } from 'noisejs';


let controls;
let background;
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

const pastelColors = [
  'rgba(238, 233, 233, 1)', // Color for 0
  'rgba(255, 179, 186, 1)', // Color for 1
  'rgba(255, 223, 186, 1)', // Color for 2
  'rgba(255, 255, 186, 1)', // Color for 3
  'rgba(186, 255, 201, 1)', // Color for 4
  'rgba(186, 225, 255, 1)', // Color for 5
  'rgba(255, 179, 255, 1)', // Color for 6
  'rgba(255, 209, 220, 1)', // Color for 7
  'rgba(217, 255, 179, 1)', // Color for 8
  'rgba(179, 217, 255, 1)'  // Color for 9
];



function init() {
  
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, 1100);
    
    camera = new THREE.PerspectiveCamera(30, renderer.domElement.width/renderer.domElement.height, 0.1, 1000);
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
    compoCenter.position.set(0, 0, 0);

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



function getRandomHexColor() {
  // Generate random values for R, G, and B channels
  const r = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert decimal values to hexadecimal and ensure they have two digits
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  // Concatenate the R, G, and B values to form a complete color code
  const hexColor = `#${hexR}${hexG}${hexB}`;

  return hexColor;
}




function getColorByPitch(pitch) {
  
  // Define the rainbow colors for the notes Do to Si
  const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];

  // Define the octave range and corresponding lightness values
  const minLightness = 0; // Minimum lightness
  const maxLightness = 60; // Maximum lightness

  // Map the pitch to the rainbow colors
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  
  let pitchIndex = noteNames.indexOf(pitch);
  
  size = energy;
  if (size < 0.01) {
    size * 40;
  } 
    else {
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

      const finalColor2 = getRandomHexColor()
      
      return finalColor2
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
  compoCenter.position.set(0, 0, 0);
  compoCenter.scale.set(0.5, 0.5, 0.5); // Adjust the scale factor as needed


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

  geometry = new THREE.SphereGeometry(size*1.5, 128, 128);
  material = new THREE.ShaderMaterial({
    uniforms: {
      color1: {
        value: new THREE.Color('#DADEDF')
      },
      color2: {
        value: new THREE.Color('#8C979A')
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
  compoCenter.position.set(0, 0, 0);
  compoCenter.scale.set(0.5, 0.5, 0.5); // Adjust the scale factor as needed



  spotLight.lookAt(compoCenter);
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(200, 200, 200);
  scene.add(pointLight);

  group.add( compoCenter );

}




function applyTimbre() {
  // Use an exponential scaling function based on "energy"
  let scaleFactor;
  if (energy < 0.001) {
    // Exponential scaling for very small energy values
    scaleFactor = 10 * Math.pow(energy, 2);
  } else {
    // Linear scaling for larger energy values, smoothly transitioning from exponential
    const linearComponent = 1000 * energy;
    const exponentialComponent = 100 * Math.pow(energy, 0.5); // Use 0.5 as the exponent for a smoother transition
    scaleFactor = Math.min(linearComponent + exponentialComponent, 2000); // Limit the maximum size change
  }


  // addToColorTransitionQueue(realoctave)
  // startColorTransition();
  size = scaleFactor

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

  geometry = new THREE.SphereGeometry(size*1.5, 128, 128);
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
  compoCenter.position.set(0, 0, 0);
  compoCenter.scale.set(1, 1, 1); // Adjust the scale factor as needed


  spotLight.lookAt(compoCenter);
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(200, 200, 200);
  scene.add(pointLight);

  group.add(compoCenter);


}




function update() {
  var positionAttribute = compoCenter.geometry.getAttribute('position');
  var vertex = new THREE.Vector3();
  var time = performance.now() * 0.003;

  var scalingFactor = 1 + roughness * 3;

  for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
    vertex.fromBufferAttribute(positionAttribute, vertexIndex);

    // Check if the size is greater than 1 before applying Perlin noise
    if (size > 1) {
      var noiseValue = noise.perlin3(vertex.x * scalingFactor, vertex.y * scalingFactor, vertex.z * scalingFactor);

      // Check for valid noise values
      if (!isNaN(noiseValue) && isFinite(noiseValue)) {
        vertex.normalize().multiplyScalar(1 + 0.3 * noiseValue);
      } else {
        // Handle invalid noise values here, for example, set the vertex to the original position
        vertex.set(0, 0, 0);
      }

      // Check again for NaN and Infinity after the manipulation
      if (!isNaN(vertex.x) && isFinite(vertex.x) && !isNaN(vertex.y) && isFinite(vertex.y) && !isNaN(vertex.z) && isFinite(vertex.z)) {
        positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
      } else {
        // If the vertex still contains invalid values, reset it to the original position
        positionAttribute.setXYZ(vertexIndex, 0, 0, 0);
      }
    } else {
      // If size is less than or equal to 1, keep the original position
      positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z);
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





window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement) {
      canvas.requestFullscreen()
  } else {
      document.exitFullscreen()
  }
})


let colorTransitionQueue = [0, 0]; // Array to store pairs of numbers for color transitions

// function addToColorTransitionQueue(newNumber) {
//   // Ensure the new number is within the valid range
//   newNumber = (newNumber >= 0 && newNumber < pastelColors.length) ? newNumber : 0;

//   colorTransitionQueue.push(newNumber);

//   if (colorTransitionQueue.length === 2) {
//     startColorTransition();
//   }
// }



// function startColorTransition() {
//   if (colorTransitionQueue.length < 2) {
//     // Not enough elements for a transition
//     return;
//   }

//   // Access the last two elements in the queue for current and next numbers
//   const currentNumber = colorTransitionQueue[colorTransitionQueue.length - 2];
//   const nextNumber = colorTransitionQueue[colorTransitionQueue.length - 1];

//   const currentColor = pastelColors[currentNumber];
//   const nextColor = pastelColors[nextNumber];

//   // Set the new background with linear gradient
//   document.body.style.background = `linear-gradient(90deg, ${currentColor}, ${nextColor})`;
//   document.body.style.backgroundSize = '200% 100%'; // Double the background size for the sliding effect
//   document.body.style.transition = 'none'; // Remove any existing transition

//   // Add the animation class to start the sliding effect
//   document.body.classList.add('background-animation');

//   // Remove the class after the animation ends and process the next item in the queue
//   setTimeout(() => {
//     document.body.classList.remove('background-animation');
//     document.body.style.background = `linear-gradient(90deg, ${nextColor} 0%, ${nextColor} 100%)`;

//     // Remove the processed pair from the queue and start the next transition
//     colorTransitionQueue.shift();
//     if (colorTransitionQueue.length >= 2) {
//       startColorTransition();
//     }
//   }, 2000); // Match this duration to the animation duration
// }








init();
animateTimbre();



export { init, render, deleteBasics, createVanilla, applyPitch, applyEnergy, applyTimbre, animatePitch, animateEnergy, animateTimbre, update }