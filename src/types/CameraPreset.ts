import * as THREE from 'three'

export interface CameraPreset {
  position: THREE.Vector3 //move to
  target: THREE.Vector3 // look at
  transitionSpeed?: number
}

export const cameraPresets: Record<string, CameraPreset> = {
  default: {
    position: new THREE.Vector3(5, 1, 7),
    target: new THREE.Vector3(-1, 0.5, -1),
    transitionSpeed: 0.09,
  },

  bureauFocus: {
    position: new THREE.Vector3(-1.5, 2, 4),
    target: new THREE.Vector3(-6, 1, 2),
    transitionSpeed: 0.08,
  },

  musicFocus: {
    position: new THREE.Vector3(0.2, 2, 0.1),
    target: new THREE.Vector3(0.2, 2, 0),
    transitionSpeed: 0.08,
  },

  booksFocus: {
    position: new THREE.Vector3(3.5, 3, 1),
    target: new THREE.Vector3(4, 3, 0),
    transitionSpeed: 0.08,
  },
}
