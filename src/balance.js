import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Meshs from "./meshs.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { Airplanes } from "./airplanes.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const meshs = Meshs();
scene.add(meshs);
const airplanes = Airplanes();
scene.add(airplanes);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  200,
);
camera.position.z = 40;

// initialize the renderer
const canvas = document.querySelector(".threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// ---------------------------------------------------------------------

const objects = [airplanes];
const controls = new DragControls(objects, camera, renderer.domElement);

controls.addEventListener("dragstart", function (event) {
  orbitControls.enabled = false;
  //event.object.material.emissive.set(0xaaaaaa); // Подсветка объекта
});

controls.addEventListener("dragend", function (event) {
  orbitControls.enabled = true;
  //event.object.material.emissive.set(0x000000); // Возвращаем исходный вид
});

controls.addEventListener("drag", function (event) {
  event.object.position.z = 0.7;
});

// ---------------------------------------------------------------------

// render the scene
const renderloop = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
