"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";

function GoldSeal({ speed }: { speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25 * speed;
    meshRef.current.rotation.x += delta * 0.08 * speed;
  });

  return (
    <mesh ref={meshRef} rotation={[0.3, 0.5, 0]}>
      <icosahedronGeometry args={[1.3, 0]} />
      <meshStandardMaterial
        color="#c9a24b"
        metalness={0.85}
        roughness={0.25}
        envMapIntensity={1.2}
        flatShading
      />
    </mesh>
  );
}

export function LoginBadge() {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <div className="mx-auto mb-6 h-24 w-24">
      <CanvasErrorBoundary>
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 3.6], fov: 40 }}
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight args={["#f3efe4", "#3a2f18", 0.9]} />
          <pointLight position={[3, 3, 4]} intensity={110} color="#f3efe4" />
          <pointLight position={[-3, -2, -2]} intensity={60} color="#c9a24b" />
          <directionalLight position={[0, 3, 2]} intensity={0.7} color="#ddc07c" />
          <GoldSeal speed={prefersReducedMotion ? 0.05 : 1} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
