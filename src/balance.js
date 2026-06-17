import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Plane, PrimaryGroup } from "./meshs.js";
import { Drag } from "./events.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const plane = Plane();
scene.add(plane);
const primaryGroup = PrimaryGroup();
scene.add(primaryGroup);

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

// DragControls
Drag(primaryGroup, camera, renderer.domElement, orbitControls, scene);

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
