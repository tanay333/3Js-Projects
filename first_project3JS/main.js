import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene(); // creating a new scene

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xfabaff);
pointLight.position.set(100, 100, 100);

const ambientLight = new THREE.AmbientLight(0xffffff); // like a room light

const lightHelper = new THREE.PointLightHelper(pointLight); // used to point out the position of pointLight
const gridHelper = new THREE.GridHelper(200, 50); // will set the grid over the page

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const starMesh = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  starMesh.position.set(x, y, z);
  scene.add(starMesh);
}

Array(200)
  .fill()
  .forEach(() => addStar());

// const spaceTexture = new THREE.TextureLoader().load("pixel.jpg");
// scene.background(spaceTexture);

scene.add(pointLight, ambientLight);
scene.add(lightHelper);
scene.add(gridHelper);

function animate() {
  // a sort of loop to animate again and again instead of calling render function
  requestAnimationFrame(animate); //tells browser to perform the animation

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();
