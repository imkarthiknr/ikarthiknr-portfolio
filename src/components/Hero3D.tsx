import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
const FloatingShape = ({ position, shape = 'box' }: { position: [number, number, number], shape?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime) * 0.3;
    }
  });

  const geometry = shape === 'sphere' ? (
    <sphereGeometry args={[0.5, 32, 32]} />
  ) : shape === 'torus' ? (
    <torusGeometry args={[0.3, 0.1, 16, 100]} />
  ) : (
    <boxGeometry args={[0.8, 0.8, 0.8]} />
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={shape === 'sphere' ? '#06b6d4' : shape === 'torus' ? '#a855f7' : '#8b5cf6'}
          emissive={shape === 'sphere' ? '#06b6d4' : '#a855f7'}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      
      {/* Central floating shapes */}
      <FloatingShape position={[0, 0, 0]} shape="sphere" />
      <FloatingShape position={[2, 1, -1]} shape="box" />
      <FloatingShape position={[-2, -1, 1]} shape="torus" />
      <FloatingShape position={[1, -2, 2]} shape="sphere" />
      <FloatingShape position={[-1, 2, -2]} shape="box" />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;