import * as THREE from "three";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import { Text } from "troika-three-text";
import { Cube, ColorBuilding } from "./meshs.js";

export const Drag = function (
  primaryGroup,
  camera,
  domElement,
  orbitControls,
  scene,
) {
  const objects = [primaryGroup];
  const controls = new DragControls(objects, camera, domElement);
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

    let cube = Cube(event.object.name, x, y, z);
    primaryGroup.add(cube);
    primaryGroup.remove(event.object);
    groupOnPlane.add(event.object);

    for (const child of groupOnPlane.children) {
      let percent = logics(child.name);

      child.material.color = ColorBuilding(child.name);
      child.material.color.multiplyScalar(percent);

      let percentText = new Text();
      child.add(percentText);
      percentText.fontSize = 0.4;
      percentText.position.z = 1.01;
      percentText.color = percent < 0.5 ? "white" : "black";
      percentText.anchorX = "center";
      percentText.anchorY = "middle";
      percentText.text = `${percent * 100}%`;
    }
  });

  controls.addEventListener("drag", function (event) {
    event.object.position.z = 1.1;
  });
};

const logics = (sector) => {
  if (sector == "house") return 0.2;
  else return 0.7;
};
