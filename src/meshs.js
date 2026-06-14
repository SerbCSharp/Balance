import * as THREE from "three";

export default function () {
  const planeGeometry = new THREE.PlaneGeometry(28.2, 48.6);
  //const planeTexture = useTexture("./textures/plane.jpg");
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: "slategrey",
    side: THREE.DoubleSide,
    //map: planeTexture,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotateZ(-0.5 * Math.PI);
  plane.position.y = -0.82;
  return plane;
}
