import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import type { CameraPreset } from '../types/CameraPreset'

type Props = {
  preset: CameraPreset
}

export default function CameraController({ preset }: Props) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const currentLookAt = useRef(new THREE.Vector3())

  useEffect(() => {

    // On preset change, update targets
    targetPosition.current.copy(preset.position)
    targetLookAt.current.copy(preset.target)

    // Snap current lookAt toward new target to avoid big jumps
    if (currentLookAt.current.lengthSq() === 0) {
      currentLookAt.current.copy(preset.target)
    }

  }, [preset])

  useEffect(() => {
    // Ensure initial camera pose matches the current preset on mount
    camera.position.copy(targetPosition.current)
    camera.lookAt(targetLookAt.current)
  }, [])

  useFrame((state, delta) => {
    // Frame-rate independent smoothing: convert damping to alpha using delta
    const speed = preset.transitionSpeed ?? 0.1
    const alpha = 1 - Math.pow(1 - speed, delta * 60)

    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition.current, alpha)

    // Smoothly interpolate lookAt target without allocations
    currentLookAt.current.lerp(targetLookAt.current, alpha)
    camera.lookAt(currentLookAt.current)
  })

  return null
}
