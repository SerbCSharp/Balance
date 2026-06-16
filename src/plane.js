import * as THREE from "three";

export default function (width, height) {
  const planeGeometry = new THREE.PlaneGeometry(width, height);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateZ(-0.5 * Math.PI);
  plane.position.y = -0.82;
  return plane;
}
