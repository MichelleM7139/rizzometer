import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Box, Spinner } from '@chakra-ui/react'

export const DogSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const DogContainer = ({ children, ...props }) => (
  <Box
    className="interactive-model"
    m="auto"
    mt={['-20px', '-60px', '-120px']}
    mb={['-40px', '-140px', '-200px']}
    w={[280, 480, 640]}
    h={[280, 480, 640]}
    position="relative"
    {...props}
  >
    {children}
  </Box>
)

const Model = ({ url }) => {
  const { scene } = useGLTF(url)
  const group = useRef()
  const target = useRef(new THREE.Vector2())

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (target.current.x * 0.1 - group.current.rotation.y) * 0.1
      group.current.rotation.x += (target.current.y * 0.05 - group.current.rotation.x) * 0.1
    }
  })

  useEffect(() => {
    scene.traverse(child => {
      if (child.material) {
        child.material.metalness = 0
        child.material.roughness = 1
      }
    })

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    scene.position.sub(center)
    scene.scale.set(1.5, 1.5, 1.5)

    return () => {
      scene.traverse(child => {
        if (child.material) child.material.dispose()
        if (child.geometry) child.geometry.dispose()
      })
    }
  }, [scene])

  return <primitive ref={group} object={scene} />
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Model url="/cartoon.glb" />
    </>
  )
}

const InteractiveModel = () => {
  return (
    <DogContainer>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: false,
          powerPreference: "low-power",
          alpha: true
        }}
      >
        <Scene />
      </Canvas>
    </DogContainer>
  )
}

export default InteractiveModel