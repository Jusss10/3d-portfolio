"use client"
import { useGLTF } from "@react-three/drei"
import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'
import { cameraPresets } from '../types/CameraPreset'


type Props = {
  setHovered: (obj: THREE.Object3D[] | null) => void
  setCameraPreset: (preset: keyof typeof cameraPresets) => void
}

export default function RoomModel({ setHovered, setCameraPreset }: Props) {
  const { scene } = useGLTF("/models/Room.glb")
  const bureauGLTF = useGLTF("/models/Bureau.glb")
  const musicGLTF = useGLTF("/models/Music.glb")
  const booksGLTF = useGLTF("/models/Books.glb")

  const BureauScene = bureauGLTF.scene
  const MusicScene = musicGLTF.scene
  const BooksScene = booksGLTF.scene
  
  const handlePointerOut = () => {setHovered(null)}

  const collectMeshes = (root: THREE.Object3D) => {
    const meshes: THREE.Object3D[] = []
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh || (child as THREE.SkinnedMesh)?.isSkinnedMesh) {
        meshes.push(child)
      }
    })
    return meshes
  }
  
  const handleClickBureau = () => {setCameraPreset('bureauFocus')}
  const handleClickMusic = () => {setCameraPreset('musicFocus')}
  const handleClickBooks = () => {setCameraPreset('booksFocus')}

  return (
    <>
      <primitive object={scene} />
      <primitive 
        object={BureauScene} 
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setHovered(collectMeshes(BureauScene))
        }}
        onPointerOut={handlePointerOut}
        onClick={handleClickBureau}
      />
      <primitive 
        object={MusicScene} 
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setHovered(collectMeshes(MusicScene))
        }}
        onPointerOut={handlePointerOut}
        onClick={handleClickMusic}
      />
      <primitive 
        object={BooksScene} 
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setHovered(collectMeshes(BooksScene))
        }}
        onPointerOut={handlePointerOut}
        onClick={handleClickBooks}
      />
    </>
  )
}