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
            position={[-node.x / 2, -node.y / 2, -node.z / 2]}
            lookAt={() => new THREE.Vector3(0, 0, 0)}
            rotation={[0, 0, 0]} // Note: accurate lookAt in loop requires vector math, simplifying by just placing spheres for now
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

// 6. FORGE: Realistic Anvil + Hammer + Monitor (Software Forge)
// Animated spark particle
const ForgeSpark = ({ color, index }: { color: string; index: number }) => {
  const sparkRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => ({
    speed: 1.5 + Math.random() * 2,
    phaseX: Math.random() * Math.PI * 2,
    phaseZ: Math.random() * Math.PI * 2,
    radiusX: 0.3 + Math.random() * 0.6,
    radiusZ: 0.2 + Math.random() * 0.5,
    size: 0.02 + Math.random() * 0.04,
  }), []);

  useFrame((state) => {
    if (!sparkRef.current) return;
    const t = state.clock.getElapsedTime() * offset.speed + index * 1.7;
    // Sparks fly upward from anvil in an arc, then reset
    const cycle = (t % 3) / 3; // 0 to 1 repeating
    sparkRef.current.position.set(
      -0.8 + Math.sin(t + offset.phaseX) * offset.radiusX * cycle,
      -0.3 + cycle * 2.5,  // fly upward
      Math.sin(t + offset.phaseZ) * offset.radiusZ * cycle,
    );
    // Fade out as they rise
    const mat = sparkRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = Math.max(0, 1 - cycle * 1.2);
    sparkRef.current.scale.setScalar(offset.size * (1 - cycle * 0.8));
  });

  return (
    <mesh ref={sparkRef}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#ffaa33" emissive="#ff6600" emissiveIntensity={8} transparent opacity={1} />
    </mesh>
  );
};

const ForgeModel = ({ color }: { color: string }) => {
  const hammerRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Hammer: realistic striking motion — fast down, slow lift
    if (hammerRef.current) {
      const swing = Math.sin(t * 2.5);
      // Asymmetric swing: snaps down quickly, lifts slowly
      hammerRef.current.rotation.z = swing > 0
        ? swing * 0.6      // slow lift
        : swing * 0.8 - 0.1; // fast strike down
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* === Warm point light from forge === */}
      <pointLight position={[-0.8, 0.2, 0.5]} color="#ff6b35" intensity={3} distance={4} decay={2} />

      {/* === ANVIL (London-pattern style) === */}
      <group position={[-0.8, -0.6, 0]}>
        {/* Wooden stump base */}
        <Cylinder args={[0.65, 0.75, 0.8, 12]} position={[0, -0.7, 0]}>
          <meshStandardMaterial color="#5c3a1e" roughness={0.95} metalness={0.0} />
        </Cylinder>
        {/* Stump top ring (iron band) */}
        <Torus args={[0.66, 0.03, 8, 24]} position={[0, -0.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#3a3a3a" metalness={0.85} roughness={0.35} />
        </Torus>
        {/* Stump bottom ring */}
        <Torus args={[0.72, 0.03, 8, 24]} position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#3a3a3a" metalness={0.85} roughness={0.35} />
        </Torus>

        {/* Anvil body: waist (narrow middle) */}
        <Box args={[1.2, 0.35, 0.7]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#555555" metalness={0.92} roughness={0.25} />
        </Box>
        {/* Anvil body: shoulder (wider upper) */}
        <Box args={[1.5, 0.2, 0.85]} position={[0, 0.2, 0]}>
          <meshStandardMaterial color="#666666" metalness={0.93} roughness={0.18} />
        </Box>
        {/* Anvil face (top working surface — polished) */}
        <Box args={[1.6, 0.12, 0.9]} position={[0, 0.36, 0]}>
          <meshStandardMaterial color="#8a8a8a" metalness={0.98} roughness={0.08} />
        </Box>
        {/* Anvil heel (flat back extension) */}
        <Box args={[0.35, 0.12, 0.9]} position={[-0.95, 0.36, 0]}>
          <meshStandardMaterial color="#7a7a7a" metalness={0.95} roughness={0.12} />
        </Box>
        {/* Anvil horn (tapered, conical front) */}
        <Cone args={[0.35, 1.0, 12]} position={[1.2, 0.32, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <meshStandardMaterial color="#6e6e6e" metalness={0.93} roughness={0.15} />
        </Cone>
        {/* Hardy hole (small square on top) */}
        <Box args={[0.12, 0.14, 0.12]} position={[-0.4, 0.44, 0]}>
          <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.5} />
        </Box>
        {/* Pritchel hole */}
        <Cylinder args={[0.04, 0.04, 0.14, 8]} position={[-0.2, 0.44, 0]}>
          <meshStandardMaterial color="#222222" metalness={0.5} roughness={0.6} />
        </Cylinder>
      </group>

      {/* === HAMMER (Animated, cross-peen style) === */}
      <group position={[-0.8, 1.0, 0]} ref={hammerRef}>
        {/* Handle — slightly tapered */}
        <Cylinder args={[0.04, 0.06, 1.8, 10]} position={[0, 0.4, 0]}>
          <meshStandardMaterial color="#6B3410" roughness={0.75} metalness={0.05} />
        </Cylinder>
        {/* Handle grip rings */}
        <Torus args={[0.065, 0.012, 6, 16]} position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#4a2508" roughness={0.6} />
        </Torus>
        <Torus args={[0.065, 0.012, 6, 16]} position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#4a2508" roughness={0.6} />
        </Torus>
        <Torus args={[0.065, 0.012, 6, 16]} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#4a2508" roughness={0.6} />
        </Torus>

        {/* Hammer head — main face */}
        <Box args={[0.55, 0.28, 0.28]} position={[0, 1.3, 0]}>
          <meshStandardMaterial color="#5a5a5a" metalness={0.97} roughness={0.12} />
        </Box>
        {/* Hammer face (polished striking surface) */}
        <Box args={[0.08, 0.26, 0.26]} position={[0.28, 1.3, 0]}>
          <meshStandardMaterial color="#9a9a9a" metalness={0.99} roughness={0.05} />
        </Box>
        {/* Cross peen (wedge on other side) */}
        <Box args={[0.08, 0.1, 0.35]} position={[-0.28, 1.3, 0]}>
          <meshStandardMaterial color="#5a5a5a" metalness={0.95} roughness={0.15} />
        </Box>
        {/* Eye (where handle meets head) */}
        <Cylinder args={[0.07, 0.07, 0.3, 8]} position={[0, 1.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.3} />
        </Cylinder>
      </group>

      {/* === MONITOR (Realistic, slightly tilted) === */}
      <group position={[1.6, 0.15, 0]} rotation={[0, -0.2, 0]}>
        {/* Monitor bezel (outer frame) */}
        <Box args={[1.5, 1.1, 0.08]} position={[0, 0.55, 0]}>
          <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.4} />
        </Box>
        {/* Screen (dark background with subtle glow) */}
        <Box args={[1.32, 0.92, 0.02]} position={[0, 0.55, 0.045]}>
          <meshStandardMaterial color="#0a1628" emissive="#0a1628" emissiveIntensity={0.4} />
        </Box>
        {/* Screen ambient glow */}
        <Box args={[1.36, 0.96, 0.005]} position={[0, 0.55, 0.04]}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} transparent opacity={0.3} />
        </Box>

        {/* Code lines — varied colors like a real IDE */}
        {/* Line numbers gutter */}
        <Box args={[0.08, 0.72, 0.005]} position={[-0.58, 0.55, 0.06]}>
          <meshStandardMaterial color="#3a4a5a" emissive="#3a4a5a" emissiveIntensity={1} />
        </Box>
        {/* Code line 1 — keyword (blue) */}
        <Box args={[0.35, 0.04, 0.005]} position={[-0.35, 0.82, 0.06]}>
          <meshStandardMaterial color="#569cd6" emissive="#569cd6" emissiveIntensity={2.5} />
        </Box>
        <Box args={[0.5, 0.04, 0.005]} position={[0.1, 0.82, 0.06]}>
          <meshStandardMaterial color="#dcdcaa" emissive="#dcdcaa" emissiveIntensity={2} />
        </Box>
        {/* Code line 2 — string (orange) */}
        <Box args={[0.2, 0.04, 0.005]} position={[-0.4, 0.72, 0.06]}>
          <meshStandardMaterial color="#c586c0" emissive="#c586c0" emissiveIntensity={2.5} />
        </Box>
        <Box args={[0.6, 0.04, 0.005]} position={[0.1, 0.72, 0.06]}>
          <meshStandardMaterial color="#ce9178" emissive="#ce9178" emissiveIntensity={2} />
        </Box>
        {/* Code line 3 — function (green) */}
        <Box args={[0.25, 0.04, 0.005]} position={[-0.38, 0.62, 0.06]}>
          <meshStandardMaterial color="#569cd6" emissive="#569cd6" emissiveIntensity={2.5} />
        </Box>
        <Box args={[0.45, 0.04, 0.005]} position={[0.08, 0.62, 0.06]}>
          <meshStandardMaterial color="#4ec9b0" emissive="#4ec9b0" emissiveIntensity={2} />
        </Box>
        {/* Code line 4 — variable (white) */}
        <Box args={[0.7, 0.04, 0.005]} position={[-0.15, 0.52, 0.06]}>
          <meshStandardMaterial color="#d4d4d4" emissive="#d4d4d4" emissiveIntensity={1.5} />
        </Box>
        {/* Code line 5 — comment (green) */}
        <Box args={[0.85, 0.04, 0.005]} position={[-0.08, 0.42, 0.06]}>
          <meshStandardMaterial color="#6a9955" emissive="#6a9955" emissiveIntensity={2} />
        </Box>
        {/* Code line 6 */}
        <Box args={[0.3, 0.04, 0.005]} position={[-0.35, 0.32, 0.06]}>
          <meshStandardMaterial color="#569cd6" emissive="#569cd6" emissiveIntensity={2.5} />
        </Box>
        <Box args={[0.4, 0.04, 0.005]} position={[0.15, 0.32, 0.06]}>
          <meshStandardMaterial color="#9cdcfe" emissive="#9cdcfe" emissiveIntensity={2} />
        </Box>

        {/* Monitor chin (thicker bottom bezel with logo dot) */}
        <Sphere args={[0.02, 8, 8]} position={[0, 0.03, 0.045]}>
          <meshStandardMaterial color="#333" emissive="#555" emissiveIntensity={1} />
        </Sphere>

        {/* Monitor neck */}
        <Box args={[0.12, 0.5, 0.12]} position={[0, -0.22, -0.04]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
        </Box>
        {/* Monitor base (flat rectangle) */}
        <Box args={[0.7, 0.04, 0.35]} position={[0, -0.48, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.25} />
        </Box>
      </group>

      {/* === ANIMATED SPARKS === */}
      {Array.from({ length: 8 }).map((_, i) => (
        <ForgeSpark key={i} color={color} index={i} />
      ))}

      {/* === Hot metal glow on anvil surface === */}
      <Sphere args={[0.15, 12, 12]} position={[-0.8, -0.1, 0]}>
        <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={4} transparent opacity={0.5} />
      </Sphere>

      {/* === Ground shadow plane === */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, -1.4, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial color="#111111" transparent opacity={0.3} />
      </mesh>
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
    switch (projectTitle) {
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
      case 'FORGE':
        return <ForgeModel color={color} />;
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