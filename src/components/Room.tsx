'use client'
import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function RoomModel() {
  const { scene } = useGLTF('/models/Room.glb')

  return <primitive object={scene} />
}

export default function Room() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{position: [3,1,10], fov:60}}>
        <Suspense fallback={null}>
          <RoomModel/>
            <pointLight decay={0} intensity={Math.PI} />
        </Suspense>
      </Canvas>
    </div>
  )
}
