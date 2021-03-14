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
    scene.children.forEach(obj =>
        obj.material.color.setHex(
            HEXToVBColor(getComputedStyle(body).getPropertyValue('--el')))
    )
}

document.getElementById('theme_button').onclick = () => {
    body.className = (body.className == 'th1') ? 'th2' : 'th1'
    ambt.color.setHex(HEXToVBColor(getComputedStyle(body).getPropertyValue('--el')));
    scene.children.forEach(obj =>
        obj.material.color.setHex(
            HEXToVBColor(getComputedStyle(body).getPropertyValue('--el')))
    )
}

document.getElementById('help_button').onclick = () =>
    help.style.display = (help.style.display == 'block') ? 'none' : 'block'



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

// const material = new THREE.MeshBasicMaterial({ color: 0xffffff });


renderer.render(scene, camera);

var spotLight = new THREE.SpotLight(0xaaaaaa);
scene.add(spotLight);

// var angle = 0;

const animate = function () {
    requestAnimationFrame(animate);
    controls.update();

    // angle -= 0.05;

    spotLight.position.copy(camera.position);

    // spotLight.position.x = 500 * Math.cos(angle);
    // spotLight.position.y = spotLight.position.x;
    // spotLight.position.z = 500 * Math.sin(angle);

    renderer.render(scene, camera);
};

animate();

const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('./obj/Skeleton.glb', function (gltf) {
    // console.log(gltf.scene)
    gltf.scene.traverse(child => {
        if (child.material) child.material.metalness = 0
    })

    scene.add(gltf.scene)

    //scene.scale.set(10, 10, 10)

}, undefined, function (error) {

    console.error(error)

})

const light = new THREE.PointLight(0xffffff, 0.3, 1000);
light.position.set(300, 500, 100);

scene.add(light);


const ambt = new THREE.AmbientLight(0xffffff, 0.1); // soft white light
scene.add(ambt);

console.log('scene0', scene.children)