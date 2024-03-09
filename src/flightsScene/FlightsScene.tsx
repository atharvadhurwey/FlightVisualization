import React from 'react';

import { OrbitControls } from '@react-three/drei';
import Globe from '../models/Globe';
import { Flight } from './Flight';
import Sun from './Sun';
import { Dictionary, IAirport, IFlight } from '../types';
import Airport from './Airport';

type FlightsSceneProps = {
    airportsList: IAirport[],
    airportsMap: Dictionary<IAirport>,
    flightsList: IFlight[];
}

const FlightsScene = ({ flightsList, airportsList, airportsMap }: FlightsSceneProps) => {
    return (
        <>
            <OrbitControls />
            <Sun />
            <Globe />
            {
                flightsList.map((flight) => {
                    if (airportsList.length > 0) {
                        const from = airportsMap[flight.departureAirportId]
                        const to = airportsMap[flight.arrivalAirportId]
                        return <Flight key={flight.id} from={from} to={to} />
                    } else {
                        return null;
                    }
                })
            }
            {
                airportsList.map(airport => {
                    return <Airport key={airport.id} airport={airport} />
                })
            }
        </>
    );
};

export default FlightsScene
