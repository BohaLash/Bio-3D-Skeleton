// Biodiversity

var body = document.body
var help = document.getElementById('help')

function HEXToVBColor(hex) {
    return parseInt(
        '0x' + hex.substr(2, 3) + hex.substr(2 + 3 * (v.length > 5), 3),
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
