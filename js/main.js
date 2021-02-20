// Biodiversity

var body = document.body
var help = document.getElementById('help')

function toggleTheme() {
    cube.material.color.setHex((body.className == 'th1') ? 0x000000 : 0xffffff)
    body.className = (body.className == 'th1') ? 'th2' : 'th1'

}

function helpMenu() {
    help.style.display = (help.style.display == 'block') ? 'none' : 'block'
}

// THREE

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

renderer.render(scene, camera);

console.log(cube)

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();
