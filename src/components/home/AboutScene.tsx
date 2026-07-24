"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";

function GoldGem({ speed }: { speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.2 * speed;
    meshRef.current.rotation.x += delta * 0.06 * speed;
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

export function AboutScene() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#f3efe4", "#3a2f18", 0.9]} />
        <pointLight position={[3, 3, 4]} intensity={120} color="#f3efe4" />
        <pointLight position={[-3, -2, -2]} intensity={70} color="#c9a24b" />
        <directionalLight position={[0, 3, 2]} intensity={0.8} color="#ddc07c" />
        <GoldGem speed={prefersReducedMotion ? 0.05 : 1} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
