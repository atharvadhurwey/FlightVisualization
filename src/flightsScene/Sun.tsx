import React, { useRef } from 'react';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '../Utilities';

export default function Sun() {
    const ref = useRef<Group | null>(null);

    useFrame((state, delta) => {
        const phase = (state.clock.elapsedTime % 3) / 3;
        const phaseRadians = Math.PI * 2 * phase;

        if (ref.current) {
            const x = Math.sin(phaseRadians) * 10;
            const z = Math.cos(phaseRadians) * 10;
            ref.current.position.set(x, 0, z);
        }
    });

    return (
        <group ref={ref}>
            <Sphere color={'yellow'} isEmissive={true} />
            <pointLight intensity={500.0} />
        </group>
    );
}