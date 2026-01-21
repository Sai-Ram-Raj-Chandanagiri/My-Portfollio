import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float, Stars, TorusKnot, PerspectiveCamera, Cylinder, Box, Sphere, Cone, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX Intrinsic Elements in TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      mesh: any;
      group: any;
      icosahedronGeometry: any;
      torusGeometry: any;
      sphereGeometry: any;
      torusKnotGeometry: any;
      meshStandardMaterial: any;
      // Catch-all for other elements
      [elemName: string]: any;
    }
  }
}

// --- Hero Section Model ---
const HeroGeometric = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#8b5cf6" // Purple-500
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Orbiting Ring */}
      <mesh rotation={[1.5, 0, 0]} scale={3.5}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
    </Float>
  );
};

export const HeroScene: React.FC = () => {
  return (
    <Canvas className="canvas-container" gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
      
      <HeroGeometric />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

// --- Project Specific Models ---

// 1. Echo: Network/Nodes
const EchoModel = ({ color }: { color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  // Create some orbiting nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 1.8;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 2) * 0.5,
        z: Math.sin(angle) * radius,
        scale: Math.random() * 0.2 + 0.1
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Central Hub */}
      <Sphere args={[0.8, 32, 32]}>
        <MeshDistortMaterial color={color} speed={5} distort={0.3} emissive={color} emissiveIntensity={0.8} />
      </Sphere>
      
      {/* Orbiting Nodes */}
      {nodes.map((node, i) => (
         <group key={i} position={[node.x, node.y, node.z]}>
            <Sphere args={[node.scale, 16, 16]}>
               <meshStandardMaterial color="white" emissive={color} emissiveIntensity={1} />
            </Sphere>
            {/* Connection line visual (using thin cylinder stretched to center) */}
            <mesh 
                position={[-node.x/2, -node.y/2, -node.z/2]} 
                lookAt={() => new THREE.Vector3(0,0,0)}
                rotation={[0,0,0]} // Note: accurate lookAt in loop requires vector math, simplifying by just placing spheres for now
            >
               {/* Simplified: No physical lines to avoid math complexity in this snippet, just floating data points */}
            </mesh>
         </group>
      ))}

      {/* Orbiting Rings to imply connection */}
      <Torus args={[1.8, 0.02, 16, 100]} rotation={[1.6, 0, 0]}>
         <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Torus>
      <Torus args={[1.8, 0.02, 16, 100]} rotation={[0, 0, 0]}>
         <meshStandardMaterial color={color} transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

// 2. QueryVerse: AI Core
const QueryVerseModel = ({ color }: { color: string }) => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) { ring1.current.rotation.x = t * 0.5; ring1.current.rotation.y = t * 0.3; }
    if (ring2.current) { ring2.current.rotation.x = t * 0.4 + 2; ring2.current.rotation.y = t * 0.6; }
    if (ring3.current) { ring3.current.rotation.x = t * 0.6 + 4; ring3.current.rotation.y = t * 0.2; }
  });

  return (
    <group>
      {/* Core */}
      <Sphere args={[0.7, 32, 32]}>
         <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </Sphere>

      {/* Gyroscope Rings */}
      <Torus ref={ring1} args={[1.2, 0.05, 16, 100]}>
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
      </Torus>
      <Torus ref={ring2} args={[1.5, 0.05, 16, 100]}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.1} />
      </Torus>
      <Torus ref={ring3} args={[1.8, 0.05, 16, 100]}>
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
      </Torus>
    </group>
  );
};

// 3. LegalMind: Scales
const LegalMindModel = ({ color }: { color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
        // Gentle swaying
        groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
        {/* Base */}
        <Cylinder args={[0.8, 1, 0.2, 32]} position={[0, -1.5, 0]}>
             <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
        </Cylinder>
        {/* Pillar */}
        <Cylinder args={[0.1, 0.1, 3.5, 16]} position={[0, 0.25, 0]}>
             <meshStandardMaterial color={"#daa520"} metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Crossbeam (Sways) */}
        <group position={[0, 2, 0]} ref={groupRef}>
            <Cylinder args={[0.08, 0.08, 3, 16]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={"#daa520"} metalness={0.8} roughness={0.2} />
            </Cylinder>
            
            {/* Left Pan */}
            <group position={[-1.4, -0.2, 0]}>
                <Cylinder args={[0.02, 0.02, 1, 8]} position={[0, -0.5, 0]}>
                    <meshStandardMaterial color="silver" />
                </Cylinder>
                <Cone args={[0.6, 0.4, 32, 1, true]} position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshStandardMaterial color={color} transparent opacity={0.8} metalness={0.5} />
                </Cone>
            </group>

             {/* Right Pan */}
             <group position={[1.4, -0.2, 0]}>
                <Cylinder args={[0.02, 0.02, 1, 8]} position={[0, -0.5, 0]}>
                    <meshStandardMaterial color="silver" />
                </Cylinder>
                <Cone args={[0.6, 0.4, 32, 1, true]} position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
                     <meshStandardMaterial color={color} transparent opacity={0.8} metalness={0.5} />
                </Cone>
            </group>
        </group>
    </group>
  );
};

// 4. DearDiary: Book
const DearDiaryModel = ({ color }: { color: string }) => {
    const quillRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (quillRef.current) {
            const t = state.clock.getElapsedTime();
            quillRef.current.position.y = 0.5 + Math.sin(t * 2) * 0.1;
            quillRef.current.rotation.z = Math.sin(t * 2) * 0.1 - 0.2;
            quillRef.current.rotation.x = Math.sin(t) * 0.1;
        }
    });

  return (
    <group rotation={[0.5, -0.5, 0]}>
        {/* Book Cover */}
        <Box args={[3.2, 0.2, 2.2]} position={[0, -0.15, 0]}>
             <meshStandardMaterial color="#4a3b32" />
        </Box>
        
        {/* Pages (Open V Shape) */}
        <group>
             {/* Left Page */}
             <Box args={[1.5, 0.1, 2]} position={[-0.75, 0, 0]} rotation={[0, 0, 0.1]}>
                 <meshStandardMaterial color="#fffaf0" />
             </Box>
             {/* Right Page */}
             <Box args={[1.5, 0.1, 2]} position={[0.75, 0, 0]} rotation={[0, 0, -0.1]}>
                 <meshStandardMaterial color="#fffaf0" />
             </Box>
        </group>

        {/* Text Lines (Decoration) */}
        <Box args={[1, 0.01, 0.1]} position={[-0.75, 0.06, 0]} rotation={[0, 0, 0.1]}>
            <meshStandardMaterial color={color} />
        </Box>
        <Box args={[1, 0.01, 0.1]} position={[0.75, 0.06, 0]} rotation={[0, 0, -0.1]}>
            <meshStandardMaterial color={color} />
        </Box>

        {/* Quill */}
        <group position={[0.5, 0.5, 0.5]} ref={quillRef}>
             <Cylinder args={[0.02, 0.02, 1.5]} rotation={[0, 0, -0.5]}>
                 <meshStandardMaterial color="white" />
             </Cylinder>
             <Cone args={[0.1, 0.3, 8]} position={[0.35, -0.65, 0]} rotation={[0, 0, -0.5]}>
                 <meshStandardMaterial color={color} />
             </Cone>
        </group>
    </group>
  );
};

// 5. Herbiverse: Tree
const HerbiverseModel = ({ color }: { color: string }) => {
    return (
      <group position={[0, -1, 0]}>
          {/* Trunk */}
          <Cylinder args={[0.3, 0.5, 1.5, 7]} position={[0, 0.75, 0]}>
              <meshStandardMaterial color="#5d4037" />
          </Cylinder>
  
          {/* Foliage Levels */}
          <Cone args={[1.5, 1.5, 7]} position={[0, 2, 0]}>
              <meshStandardMaterial color={color} roughness={0.8} />
          </Cone>
          <Cone args={[1.2, 1.5, 7]} position={[0, 2.8, 0]}>
              <meshStandardMaterial color={color} roughness={0.8} />
          </Cone>
          <Cone args={[0.8, 1.2, 7]} position={[0, 3.5, 0]}>
              <meshStandardMaterial color={color} roughness={0.8} />
          </Cone>
      </group>
    );
  };

// --- Generic / Fallback ---
const GenericProjectModel = ({ color = "#8b5cf6" }: { color?: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
    });
  
    return (
      <group>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial 
              color={color} 
              roughness={0.1} 
              metalness={0.6}
              wireframe={true} 
          />
        </mesh>
        <mesh scale={0.5}>
           <sphereGeometry args={[1, 32, 32]} />
           <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    );
  };

export const ProjectScene: React.FC<{ color?: string; projectTitle?: string }> = ({ color = "#8b5cf6", projectTitle }) => {
  
  const renderModel = () => {
    switch(projectTitle) {
        case 'Echo':
            return <EchoModel color={color} />;
        case 'QueryVerse':
            return <QueryVerseModel color={color} />;
        case 'LegalMind':
            return <LegalMindModel color={color} />;
        case 'DearDiary':
            return <DearDiaryModel color={color} />;
        case 'Herbiverse':
            return <HerbiverseModel color={color} />;
        default:
            return <GenericProjectModel color={color} />;
    }
  }

  return (
    <Canvas className="canvas-container" gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, 5, -5]} color="#fff" intensity={1} />

      <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
        {renderModel()}
      </Float>

      <Stars radius={50} count={2000} factor={3} fade speed={1} />
      <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
};