import "./style.css";

import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import rainy from './rainy.jpg';
import MONARCH02transbg from './MONARCH02transbg.svg';
// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);

scene.fog = new THREE.FogExp2(0x11111f, 0.002);
renderer.render(scene, camera);
/*
// Torus / Donut
const donutTexture = new THREE.TextureLoader().load('./donutTex.jpg');
const donutNormalTexture = new THREE.TextureLoader().load('./cream.jpg');

const geometry = new THREE.TorusBufferGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0xffffff,map:donutTexture, normalMap:donutNormalTexture});
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);
*/

// Lights
const pointLight = new THREE.PointLight(0x4f4f4f);
const pointMoonLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0x4f4f4f);

pointLight.position.set(-20, 0, 5);
pointMoonLight.position.set(-5, 420, 420);

ambientLight.intensity = 0.1;
pointLight.intensity = 0.5;
pointMoonLight.intensity = 2;

scene.add(pointLight, ambientLight, pointMoonLight);
// scene.add(pointLight);

// Helpers
// const moonlightHelper = new THREE.PointLightHelper(pointMoonLight);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(moonlightHelper, lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Extra functions
function monarch() {
  const geometry = new THREE.SphereGeometry(1, 20, 20);
  const material = new THREE.MeshStandardMaterial({ map: myTexture });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  // scene.add(star);
  return star;
}
// Array(100).fill().forEach(addStar);

// Background
// const spaceTexture = new THREE.TextureLoader().load("./space.jpg");
// const rainTexture = new THREE.TextureLoader().load("https://github.com/PrajjwalDatir/threeJS-PoemDrop/blob/main/rainy.jpg");
const rainTexture = new THREE.TextureLoader().load(rainy);
// scene.background = spaceTexture;
scene.background = rainTexture;

// const myTexture = new THREE.TextureLoader().load("https://github.com/PrajjwalDatir/threeJS-PoemDrop/blob/main/MONARCH02transbg.svg");
const myTexture = new THREE.TextureLoader().load(MONARCH02transbg);
const monarch02 = new THREE.Mesh(
  new THREE.BoxGeometry(9, 9, 9),
  new THREE.MeshBasicMaterial({ map: myTexture })
);
scene.add(monarch02);
// Array(100).fill().forEach(monarch);
let monarchCount = 100;
let group = new THREE.Object3D();
for (let i = 0; i < monarchCount; i++) {
  group.add(monarch())
}
scene.add(group);
/*
// Moon
const moonTexture = new THREE.TextureLoader().load('./moonTexture.png')
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial(
    {
      map : moonTexture,
      normalMap: normalTexture,
    }
  )
);
scene.add(moon);

moon.position.setZ(30);
moon.position.setX(10)
*/
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  /*
  moon.rotateX(0.05);
  moon.rotateY(0.05);
  moon.rotateZ(0.05);
*/
  monarch02.rotateX(0.01);
  monarch02.rotateY(0.01);
  group.rotateX(0.01);
  group.rotateY(0.01);
  group.rotateZ(0.01);

  camera.position.setZ(t * -0.01);
  camera.position.setX(t * -0.0002);
  camera.position.setY(t * -0.0002);
};

document.body.onscroll = moveCamera;

const animate = () => {
  requestAnimationFrame(animate);
  /*
  torus.rotateX(0.005);
  torus.rotateY(0.005);
  torus.rotateZ(0.005);
  */
  group.rotateX(0.001);
  group.rotateY(0.001);
  group.rotateZ(0.001);

  monarch02.rotateX(0.01);
  monarch02.rotateY(0.01);
  monarch02.rotateZ(0.01);

  // rainGeo.vertices.forEach((p) => {
  //   p.velocity -= 0.1 + Math.random() * 0.1;
  //   p.y += p.velocity;
  //   if (p.y < -200) {
  //     p.y = 200;
  //     p.velocity = 0;
  //   }
  // });
  // rainGeo.verticesNeedUpdate = true;
  // rain.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
};

animate();
