// 3D Skeleton
var body = document.body
var help = document.getElementById('help')

import { OrbitControls } from 'https://cdn.rawgit.com/mrdoob/three.js/master/examples/jsm/controls/OrbitControls.js'


function HEXToVBColor(hex) {
    return parseInt(
        '0x' + hex.substr(2, 3) + hex.substr(2 + 3 * (hex.length > 5), 3),
        16)
}

function toggleTheme() {
    body.className = (body.className == 'th1') ? 'th2' : 'th1'
    cube.material.color.setHex(
        HEXToVBColor(getComputedStyle(body).getPropertyValue('--el'))
    )
}

function helpMenu() {
    help.style.display = (help.style.display == 'block') ? 'none' : 'block'
}

// THREE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
const controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(window); // optional

//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 20;
controls.maxDistance = 5000;

controls.maxPolarAngle = Math.PI / 2;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);


renderer.render(scene, camera);

const animate = function() {
    requestAnimationFrame(animate);
    controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('./obj/Skeleton.glb', function(gltf) {
    console.log(gltf.scene)

    scene.add(gltf.scene);

    //scene.scale.set(10, 10, 10)

}, undefined, function(error) {

    console.error(error);

});