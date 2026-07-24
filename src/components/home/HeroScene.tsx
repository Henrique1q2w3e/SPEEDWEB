"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";

function GoldKnot({
  speed,
  segments,
  scale,
}: {
  speed: number;
  segments: [number, number];
  scale: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08 * speed;
    meshRef.current.rotation.y += delta * 0.14 * speed;
  });

  return (
    <mesh ref={meshRef} rotation={[0.4, 0.2, 0]} scale={scale}>
      <torusKnotGeometry args={[1.15, 0.34, segments[0], segments[1], 2, 3]} />
      <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.22} envMapIntensity={1.2} />
    </mesh>
  );
}

export function HeroScene() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, isMobile ? 8.5 : 5.2], fov: 40 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.42} />
        <pointLight position={[4, 3, 5]} intensity={120} color="#f3efe4" />
        <pointLight position={[-4, -2, -3]} intensity={60} color="#c9a24b" />
        <directionalLight position={[0, 4, 2]} intensity={0.6} color="#ddc07c" />
        <GoldKnot
          speed={prefersReducedMotion ? 0.05 : 1}
          segments={isMobile ? [110, 16] : [220, 32]}
          scale={isMobile ? 0.72 : 1}
        />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
