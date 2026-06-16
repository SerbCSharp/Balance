import * as THREE from "three";

export const Cube = function (sector, positionX, positionY) {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.receiveShadow = true;
  cube.position.z = 1.1;
  cube.position.x = positionX;
  cube.position.y = positionY;

  if (sector == "farmer") {
    cube.name = "farmer";
    cube.material.color = new THREE.Color("yellow");
  }
  if (sector == "bakery") {
    cube.name = "bakery";
    cube.material.color = new THREE.Color("blue");
  }
  if (sector == "shop") {
    cube.name = "shop";
    cube.material.color = new THREE.Color("red");
  }
  if (sector == "house") {
    cube.name = "house";
    cube.material.color = new THREE.Color("green");
  }

  return cube;
};
