import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { Text } from "troika-three-text";
import Plane from "./plane.js";
import { Cube } from "./meshs.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const widthPlane = 28.2;
const heightPlane = 48.6;
const plane = Plane(widthPlane, heightPlane);
scene.add(plane);

const group = new THREE.Group();
const yellowCube = Cube("farmer", -26, 9);
group.add(yellowCube);
const blueCube = Cube("bakery", -26, 6);
group.add(blueCube);
const redCube = Cube("shop", -26, 3);
group.add(redCube);
const greenCube = Cube("house", -26, 0);
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

// DragControls
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

  let cube = Cube(event.object.name, x, y);
  group.add(cube);

  for (const child of group.children) {
    if (
      child.position.x > -heightPlane / 2 &&
      child.position.x < heightPlane / 2 &&
      child.position.y > -widthPlane / 2 &&
      child.position.y < widthPlane / 2
    ) {
      let percent = percentCalculation(child.name);
      let percentText = new Text();
      child.add(percentText);
      percentText.fontSize = 0.4;
      percentText.position.z = 1.01;
      percentText.color = "black";
      percentText.anchorX = "center";
      percentText.anchorY = "middle";
      percentText.text = `${percent * 100}%`;
    }
  }
});

controls.addEventListener("drag", function (event) {
  event.object.position.z = 1.1;
});

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

const percentCalculation = (sector) => {
  if (sector == "house") return 0.2;
  else return 0.7;
};
