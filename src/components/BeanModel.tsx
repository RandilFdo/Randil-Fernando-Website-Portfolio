"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
    const { scene } = useGLTF("/Bean_stl.glb");
    const modelRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    useEffect(() => {
        if (!modelRef.current) return;

        // Rotate upright (Fusion 360 exports lying on its side)
        modelRef.current.rotation.x = -Math.PI / 2;

        // Compute bounding box AFTER rotating
        const box = new THREE.Box3().setFromObject(modelRef.current);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
        const cameraDistance = Math.abs(maxDim / Math.sin(fov / 2)) * 0.9;

        camera.position.set(center.x, center.y + size.y * 0.05, center.z + cameraDistance);
        camera.lookAt(center);
        camera.updateProjectionMatrix();

        // Shift model to center origin
        modelRef.current.position.set(-center.x, -center.y, -center.z);
    }, [camera]);

    return (
        <group ref={modelRef}>
            <primitive object={scene} />
        </group>
    );
}

export default function BeanModel() {
    return (
        <div className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [0, 0, 50], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                shadows
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow color="#ffffff" />
                    <pointLight position={[-5, 5, -5]} intensity={0.5} color="#8888ff" />
                    <pointLight position={[5, -5, 5]} intensity={0.3} color="#ffaaaa" />

                    <Environment preset="city" />

                    <Model />

                    <ContactShadows
                        position={[0, -3, 0]}
                        opacity={0.3}
                        scale={10}
                        blur={2.5}
                        far={5}
                        color="#000000"
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI / 1.5}
                        autoRotate
                        autoRotateSpeed={1.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

useGLTF.preload("/Bean_stl.glb");
