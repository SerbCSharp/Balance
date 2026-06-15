import * as THREE from "three";

export const Cube = function (color, x, y) {
  const cubeGeometry = new THREE.BoxGeometry();
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.receiveShadow = true;
  cube.position.z = 0.7;
  cube.position.x = x;
  cube.position.y = y;

  if (color == "yellow") {
    cube.name = "farmer";
  }

  return cube;
};
