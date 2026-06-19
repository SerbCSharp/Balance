import * as THREE from "three";
import { Text } from "troika-three-text";

export const Plane = function () {
  const planeGeometry = new THREE.PlaneGeometry(28.2, 48.6);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateZ(-0.5 * Math.PI);
  plane.position.y = -0.82;
  return plane;
};

export const Cube = function (sector, x, y, z) {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.receiveShadow = true;
  cube.name = sector;
  cube.position.set(x, y, z);
  cube.material.color = ColorBuilding(sector);
  cube.add(CubeText(sector));

  return cube;
};

const ColorBuilding = function (sector) {
  if (sector == "farmer") return new THREE.Color("rgb(255, 215, 0)");
  if (sector == "bakery") return new THREE.Color("rgb(65, 105, 225)");
  if (sector == "shop") return new THREE.Color("rgb(197, 75, 140)");
  if (sector == "house") return new THREE.Color("rgb(80, 200, 120)");
};

const CubeText = function (sector) {
  const cubeText = new Text();
  cubeText.fontSize = 0.4;
  cubeText.position.z = 1.01;
  cubeText.color = "black";
  cubeText.anchorX = "center";
  cubeText.anchorY = "middle";
  cubeText.text = sector;
  return cubeText;
};
