import { useGLTF } from "@react-three/drei"
import * as THREE from 'three'


type Props = {
  setHovered: (obj: THREE.Object3D | null) => void
}

export default function RoomModel({ setHovered }: Props) {
  const { scene } = useGLTF("/models/Room.glb")
  const bureauGLTF = useGLTF("/models/Bureau.glb")
  const bureauScene = bureauGLTF.scene

  const handlePointerOver = (e: any) => setHovered(e.object)
  const handlePointerOut = () => setHovered(null)
  const handleClick = () => console.log("Bureau clicked")

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