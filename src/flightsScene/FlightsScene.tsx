import React from 'react';

import { OrbitControls } from '@react-three/drei';
import Globe from '../models/Globe';
import { Flight } from './Flight';
import Sun from './Sun';


const FlightsScene = () => {

    return (
        <>
            <OrbitControls />
            <Sun />
            <Globe />
            <Flight />
        </>
    );
};

export default FlightsScene
