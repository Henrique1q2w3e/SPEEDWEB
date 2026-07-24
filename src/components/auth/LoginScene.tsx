"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";

function GoldRings({ speed }: { speed: number }) {
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ringA.current) {
      ringA.current.rotation.x += delta * 0.16 * speed;
      ringA.current.rotation.y += delta * 0.1 * speed;
    }
    if (ringB.current) {
      ringB.current.rotation.y += delta * 0.14 * speed;
      ringB.current.rotation.z += delta * 0.09 * speed;
    }
  });

  return (
    <group rotation={[0.3, 0.5, 0]}>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.15, 0.07, 24, 120]} />
        <meshStandardMaterial color="#c9a24b" metalness={0.85} roughness={0.25} envMapIntensity={1.2} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 2.4, Math.PI / 5]}>
        <torusGeometry args={[0.85, 0.055, 24, 120]} />
        <meshStandardMaterial color="#ddc07c" metalness={0.85} roughness={0.3} envMapIntensity={1.2} />
      </mesh>
    </group>
  );
}

export function LoginScene() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <CanvasErrorBoundary>
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, isMobile ? 6.6 : 4.4], fov: 40 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.7} />
        <hemisphereLight args={["#f3efe4", "#3a2f18", 0.9]} />
        <pointLight position={[3, 3, 4]} intensity={120} color="#f3efe4" />
        <pointLight position={[-3, -2, -2]} intensity={70} color="#c9a24b" />
        <directionalLight position={[0, 3, 2]} intensity={0.8} color="#ddc07c" />
        <GoldRings speed={prefersReducedMotion ? 0.05 : 1} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
