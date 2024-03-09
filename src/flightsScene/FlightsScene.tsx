import React, { useEffect, useRef, useState } from 'react'

import { OrbitControls } from '@react-three/drei';
import { Box } from '../Utilities';
import { useFrame } from '@react-three/fiber';

const FlightsScene = () => {
    const [intensity, setIntensity] = useState<number>(0);
    useRef

    useEffect(() => {
        setInterval(() => {
            setIntensity(Math.random() * 5);
        }, 1000);
    }, []);

    useFrame(() => {

    })

    return (
        <>
            <OrbitControls />
            <Box color='hotpink' position={[0, 0, 0]} />
            {/* <ambientLight intensity={1.0} />  */}
            <pointLight intensity={intensity} position={[2, 2, 2]} />
        </>
    )
}

export default FlightsScene
