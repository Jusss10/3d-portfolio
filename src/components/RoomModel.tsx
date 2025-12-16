import { useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'
import { cameraPresets } from '../types/CameraPreset'


type Props = {
  setHovered: (obj: THREE.Object3D | null) => void
  setCameraPreset: (preset: keyof typeof cameraPresets) => void
}

export default function RoomModel({ setHovered, setCameraPreset }: Props) {
  const { scene } = useGLTF("/models/Room.glb")
  const bureauGLTF = useGLTF("/models/Bureau.glb")
  const bureauScene = bureauGLTF.scene

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    console.log('Pointer over:', e.object)
    setHovered(e.object)
  }
  const handlePointerOut = () => {
    console.log('Pointer out')
    setHovered(null)
  }
  const handleClick = () => {
    console.log('Bureau clicked, setting camera to bureauFocus')
    setCameraPreset('bureauFocus')
  }

  return (
    <>
      <primitive object={scene} />
      <primitive 
        object={bureauScene} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      />
    </>
  )
}