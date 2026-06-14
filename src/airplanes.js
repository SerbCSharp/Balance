import * as THREE from "three";

export const Airplanes = function () {
  const planeGeometry = new THREE.BoxGeometry();
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "red",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.z = 0.7;
  return plane;
};
