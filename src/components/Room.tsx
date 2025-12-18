'use client'
import React, { Suspense, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import RoomModel from './RoomModel'
import {EffectComposer, Outline, Noise, Pixelation, Vignette } from '@react-three/postprocessing'
import { cameraPresets } from '../types/CameraPreset'
import CameraController from './CameraController'

//global scene behaviour
export default function Room() {
  const [activePreset, setActivePreset] = useState<keyof typeof cameraPresets>("default")
  const [hovered, setHovered] = useState<THREE.Object3D[] | null>(null)

  // Debug: log preset changes
  useEffect(() => {
    console.log('[Room] activePreset:', activePreset)
  }, [activePreset])

  return (
		<div className="w-full h-screen">
			<Canvas
			  dpr={[0.5, 0.5]}
				camera={{
					position: [
						cameraPresets.default.position.x,
						cameraPresets.default.position.y,
						cameraPresets.default.position.z,
					],
					fov: 60,
				}}
				gl={{
					antialias: false,
					toneMapping: THREE.NoToneMapping,
				}}
				onPointerMissed={() => setHovered(null)}
			>
				<CameraController preset={cameraPresets[activePreset]} />

				<Suspense fallback={null}>
					<ambientLight intensity={0.5} color="#f4eedb" />
					<RoomModel
						setHovered={setHovered}
						setCameraPreset={setActivePreset}
					/>
				</Suspense>

				<EffectComposer autoClear={false}>
					<Outline
						selection={activePreset === "default" ? hovered ?? [] : []}
						edgeStrength={10}
					/>
					<Pixelation granularity={0.02} />
					
				</EffectComposer>
			</Canvas>
			{activePreset !== "default" && (
				<button
					onClick={() => setActivePreset("default")}
					style={{
						position: "absolute",
						top: 20,
						right: 20,
						width: 40,
						height: 40,
						background: "transparent",
						border: "none",
						cursor: "pointer",
						zIndex: 10,
					}}>
					<img
						src="/images/xButton.jpg"
						alt="Reset camera"
						style={{ width: "100%", height: "100%" }}
					/>
				</button>
			)}
		</div>
	);
}

