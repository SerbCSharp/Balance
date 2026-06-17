import * as THREE from "three";

export const Cube = function (sector, positionX, positionY) {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    name: sector,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.receiveShadow = true;
  cube.position.z = 1.1;
  cube.position.x = positionX;
  cube.position.y = positionY;
  Building(sector);

  return cube;
};

const Building = function (sector) {
  if (sector == "farmer") cube.material.color = new THREE.Color("yellow");
  if (sector == "bakery") cube.material.color = new THREE.Color("blue");
  if (sector == "shop") cube.material.color = new THREE.Color("red");
  if (sector == "house") cube.material.color = new THREE.Color("green");
};
