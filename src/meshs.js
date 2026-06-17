import * as THREE from "three";

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
  return cube;
};

export const PrimaryGroup = function () {
  const primaryGroup = new THREE.Group();
  const yellowCube = Cube("farmer", -26, 9, 1.1);
  primaryGroup.add(yellowCube);
  const blueCube = Cube("bakery", -26, 6, 1.1);
  primaryGroup.add(blueCube);
  const redCube = Cube("shop", -26, 3, 1.1);
  primaryGroup.add(redCube);
  const greenCube = Cube("house", -26, 0, 1.1);
  primaryGroup.add(greenCube);
  return primaryGroup;
};

export const ColorBuilding = function (sector) {
  if (sector == "farmer") return new THREE.Color("yellow");
  if (sector == "bakery") return new THREE.Color("blue");
  if (sector == "shop") return new THREE.Color("red");
  if (sector == "house") return new THREE.Color("green");
};
