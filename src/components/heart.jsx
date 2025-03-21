import { Canvas,useFrame  } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three';
import { useRef, useState } from 'react'

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('path/to/texture.jpg');

function Heart(props) {
    const { scene } = useGLTF('/logos/1x/cartoon.glb')
    const heartRef = useRef()
    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    // Track mouse movement
    const handleMouseMove = (event) => {
        const { clientX, clientY } = event
        const x = (clientX / window.innerWidth) * 2 - 1
        const y = -(clientY / window.innerHeight) * 2 + 1
        setMouse({ x, y })
    }

    useFrame(() => {
        if (heartRef.current) {
            // Smoothly interpolate rotation
            heartRef.current.rotation.y = THREE.MathUtils.lerp(heartRef.current.rotation.y, mouse.x * Math.PI * 0.2, 0.1)
            heartRef.current.rotation.x = THREE.MathUtils.lerp(heartRef.current.rotation.x, mouse.y * Math.PI * 0.2, 0.1)
        }
    })

    return <primitive ref={heartRef} object={scene} scale={[2, 2, 2]} />
}
function CameraController() {
  return <OrbitControls 
    enableZoom={true} 
    enablePan={false} 
    enableRotate={true}
    rotateSpeed={0.5}
    minDistance={3}
    maxDistance={5}
    autoRotate={false}
  />
}

export default function HeartModel() {
  return (
    <Canvas 
      camera={{ position: [2, 2, 2], fov: 50 }}
      style={{ height: '500px', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Environment preset="sunset" />
      
      <Heart />
      <CameraController />
    </Canvas>
  )
}

useGLTF.preload('/logos/1x/cartoon.glb')