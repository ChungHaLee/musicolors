import { TextureLoader } from "three";

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const scene = new THREE.Scene();
const image_radius = 200;
const number_of_images = 8;
const radius = 600;
const radian_interval = (6.0 * Math.PI) / number_of_images;
const center_of_wheel = {
                            x: 0,
                            y: 0
                        }


const groupCards = new THREE.Group();

let scrollSpeed = 0.0;
let loader = null;
let texture = null;
let material = null;
let circle = null;
let mesh = null;

let pickedVinyl;


for (let i = 0; i < number_of_images; i++) {
    // Create a texture loader so we can load our image file
    loader = new THREE.TextureLoader();
    let textureArray = ['./static/src/images/taylorswift.jpeg', './static/src/images/fearless.jpeg', './static/src/images/speaknow.jpeg', './static/src/images/1989.jpeg', './static/src/images/reputation.jpeg', './static/src/images/lover.jpeg', './static/src/images/evermore.jpeg', './static/src/images/midnights.jpeg']
    texture = loader.load(textureArray[i]);
    texture.minFilter = THREE.LinearFilter;


    // Load an image file into a custom material
    material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1
    });

    circle = new THREE.CircleGeometry(image_radius, 100);
    mesh = new THREE.Mesh(circle, material);

    mesh.material.side = THREE.DoubleSide;

    mesh.position.set(
        center_of_wheel.x + (Math.cos(radian_interval * i) * radius),
        center_of_wheel.y + (Math.sin(radian_interval * i) * radius),
        0);

    // set the ID for each meshes
    mesh.name = i
    // add the image to the group
    groupCards.add(mesh);
    // add group to scene
    scene.add(groupCards);
    // console.log(groupCards)
}




// Specify the portion of the scene visible at any time (in degrees)
let fieldOfView = 75;

let aspectRatio = window.innerWidth / window.innerHeight;
let nearPlane = 0.1;
let farPlane = 1000;
let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, 
                                          nearPlane, farPlane);

camera.position.z = 1000;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: TextureLoader });
renderer.setSize(window.innerWidth, window.innerHeight);



// Add the canvas to the DOM
document.querySelector('body').appendChild(renderer.domElement);

window.addEventListener('wheel', event => {
    scrollSpeed = event.deltaY * (Math.PI / 180) * 0.4;
    groupCards.rotation.z += -1.0 * scrollSpeed;
    for (let i = 0; i < groupCards.children.length; i++) {
        groupCards.children[i].rotation.z += scrollSpeed;
    }
});



function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function onPointerReset( event ){
    pointer.x = 0
	pointer.y = 0
}


function render() {
	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	let intersects = raycaster.intersectObjects( groupCards.children );
    // for 문이 아니라 내가 클릭한 것으로 수정
    if (intersects.length == 1){
        intersects[0].object.scale.set(1.5, 1.5, 1.5);
        onPointerReset();
    } 

	renderer.render( scene, camera );
    
}



function animate() {
    requestAnimationFrame(animate);
    window.addEventListener( 'click', onPointerMove );
    window.requestAnimationFrame(render);
    renderer.render(scene, camera);
    render();

}




animate();



// window.addEventListener( 'mouseup', onPointerMove );
// window.requestAnimationFrame(render);


export { pickedVinyl }

