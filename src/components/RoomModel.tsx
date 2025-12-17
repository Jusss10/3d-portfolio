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
  const musicGLTF = useGLTF("/models/Music.glb")
  const booksGLTF = useGLTF("/models/Books.glb")

  const bureauScene = bureauGLTF.scene
  const MusicScene = musicGLTF.scene
  const BooksScene = booksGLTF.scene

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {setHovered(event.object)}
  const handlePointerOut = () => {setHovered(null)}
  
  const handleClickBureau = () => {setCameraPreset('bureauFocus')}
  const handleClickMusic = () => {setCameraPreset('musicFocus')}
  const handleClickBooks = () => {setCameraPreset('booksFocus')}

  return (
    <>
      <primitive object={scene} />
      <primitive 
        object={bureauScene} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClickBureau}
      />
      <primitive 
        object={MusicScene} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClickMusic}
      />
      <primitive 
        object={BooksScene} 
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClickBooks}
      />
    </>
  )
}