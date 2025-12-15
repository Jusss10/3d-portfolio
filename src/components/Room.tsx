'use client'
import React, { Suspense, useState } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import RoomModel from './RoomModel'
import {EffectComposer, Outline } from '@react-three/postprocessing'


export default function Room() {
  const [hovered, setHovered] = useState<THREE.Object3D | null>(null)
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{position: [5,2,7.5], fov:60}}
        gl={{ 
          antialias: false,
          toneMapping: THREE.NoToneMapping
        }}>

        <Suspense fallback={null}>
          <ambientLight intensity={0.5} color="#f4eedb"/>
          <RoomModel setHovered={setHovered} />
        </Suspense>

        <EffectComposer autoClear={false}>
        <Outline
          selection={hovered ? [hovered] : []}
          edgeStrength={3}/>
        </EffectComposer>
      </Canvas>
    </div>
  )
}

