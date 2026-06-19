import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { Plane, Cube } from "./meshs.js";
import { CountBuilding, Logics } from "./logics.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const plane = Plane();
scene.add(plane);

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

// OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// --------------------------------------------------
// DragControls

const yellowCube = Cube("farmer", -26, 9, 1.1);
scene.add(yellowCube);
const blueCube = Cube("bakery", -26, 6, 1.1);
scene.add(blueCube);
const redCube = Cube("shop", -26, 3, 1.1);
scene.add(redCube);
const greenCube = Cube("house", -26, 0, 1.1);
scene.add(greenCube);

const objects = [yellowCube, blueCube, redCube, greenCube];
const controls = new DragControls(objects, camera, renderer.domElement);
controls.recursive = false;

let x, y, z;
const groupOnPlane = new THREE.Group();
scene.add(groupOnPlane);

controls.addEventListener("dragstart", function (event) {
  orbitControls.enabled = false;
  x = event.object.position.x;
  y = event.object.position.y;
  z = event.object.position.z;
});

controls.addEventListener("dragend", function (event) {
  orbitControls.enabled = true;

  if (
    event.object.position.x > -24.3 &&
    event.object.position.x < 24.3 &&
    event.object.position.y > -14.1 &&
    event.object.position.y < 14.1
  ) {
    let cube = Cube(event.object.name, x, y, z);
    scene.add(cube);
    groupOnPlane.add(event.object);

    objects.splice(
      objects.findIndex((x) => x.uuid == event.object.uuid),
      1,
    );
    objects.push(cube);

    CountBuilding(groupOnPlane);

    for (const child of groupOnPlane.children) {
      let percent = Logics(child.name);
      child.children[0].text = `${Math.round(percent * 100)}%`;
    }
  } else {
    event.object.position.x = x;
    event.object.position.y = y;
    event.object.position.z = z;
  }
});

controls.addEventListener("drag", function (event) {
  event.object.position.z = 1.1;
});
// --------------------------------------------------

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
