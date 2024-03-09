import React, { useRef, useState } from 'react'
import { Box, rotationQuaternionForCoordinates } from '../Utilities'
import { IAirport } from '../types'
import { Group } from 'three'
import { EARTH_SURFACE_HEIGHT } from '../constants'
import { Html } from '@react-three/drei'

const Airport = ({ airport }: { airport: IAirport }) => {
    const rotationBoxRef = useRef<Group | null>(null)
    const [isHovered, setIsHovered] = useState(false)

    if (rotationBoxRef.current) {
        const q = rotationQuaternionForCoordinates(airport.latitude, airport.longitude)
        rotationBoxRef.current?.setRotationFromQuaternion(q);
    }

    return (
        <group ref={rotationBoxRef}>
            <group position={[0, EARTH_SURFACE_HEIGHT, 0]}>
                <Box
                    onPointerOver={() => setIsHovered(true)}
                    onPointerOut={() => setIsHovered(false)}
                    size={[0.1, 0.1, 0.1]}
                    color={isHovered ? "blue" : "hotpink"}
                />
                {
                    isHovered && <pointLight position-y={0.1} intensity={2} color={"blue"} />
                }
                {
                    isHovered && <Html>
                        <div className={'info-bubble'}>{airport.city}</div>
                    </Html>
                }
            </group>
        </group>
    )
}

export default Airport
