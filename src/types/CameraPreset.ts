import * as THREE from 'three'

export interface CameraPreset {
  position: THREE.Vector3 //move to
  target: THREE.Vector3 // look at
  transitionSpeed?: number
}

export const cameraPresets: Record<string, CameraPreset> = {
  default: {
    position: new THREE.Vector3(5, 2, 7.5),
    target: new THREE.Vector3(0, 1, 0),
    transitionSpeed: 0.1,
  },

  bureauFocus: {
    position: new THREE.Vector3(2, 1, 1),
    target: new THREE.Vector3(1.5, 1, 0),
    transitionSpeed: 0.08,
  },
}
