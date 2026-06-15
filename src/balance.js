import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { Text } from "troika-three-text";
import Plane from "./plane.js";
import { Cube } from "./meshs.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const plane = Plane();
scene.add(plane);

const group = new THREE.Group();
const yellowCube = Cube("yellow", -25.5, 7);
group.add(yellowCube);
const blueCube = Cube("blue", -25.5, 5);
group.add(blueCube);
const redCube = Cube("red", -25.5, 3);
group.add(redCube);
const greenCube = Cube("green", -25.5, 1);
group.add(greenCube);
scene.add(group);

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
const objects = [group];
const controls = new DragControls(objects, camera, renderer.domElement);
let x, y;

controls.addEventListener("dragstart", function (event) {
  orbitControls.enabled = false;
  x = event.object.position.x;
  y = event.object.position.y;
});

controls.addEventListener("dragend", function (event) {
  orbitControls.enabled = true;
  console.log(event.object);

  const cube = Cube(event.object.material.color, x, y);
  group.add(cube);

  event.object.material.color.multiplyScalar(0.1);
  const myText = new Text();
  event.object.add(myText);
  myText.text = "20%";
  myText.fontSize = 0.2;
  myText.position.z = 0.6;
  myText.color = "white";
  myText.anchorX = "center";
  myText.anchorY = "middle";

  //console.log(event.object);
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
