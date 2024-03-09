import './App.css';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import FlightsScene from './flightsScene/FlightsScene';
import { FlightFilterControls } from './components/FilterControls';
import { IAirport, IFlight } from './types';
import { indexBy } from 'ramda';

const now = Date.now();

function FlightVisualizationApp() {

  const [airportsList, setAirportsList] = useState<IAirport[]>([])
  const [flightsList, setFlightsList] = useState<IFlight[]>([])
  const [flightsMap, setFlightsMap] = useState<{ [key: string]: IAirport }>({})
  const [flightsFiltered, setFlightsFiltered] = useState<IFlight[]>([])

  useEffect(() => {
    fetch('/data/airports.json').then((e) => e.json()).then((airportsData: IAirport[]) => {
      setAirportsList(airportsData);

      const airportsMap = indexBy(e => e.id, airportsData);
      setFlightsMap(airportsMap);
    })
  }, [])

  useEffect(() => {
    fetch('/data/flights.json').then((e) => e.json()).then((flightsData: IFlight[]) => {

      // const flights = flightsData.map(f => parseFlightDates(f));

      setFlightsList(flightsData);
    })
  }, [])


  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading data...ð</div>}>
        <div>
          <FlightFilterControls
            flights={flightsList}
            airports={airportsList}
            airportMap={flightsMap}
            simulationTime={now}
            maxFlightCount={10}
            selectedFlight={null}
            setSelectedFlight={() => { }}
            onFilteringChanged={setFlightsFiltered}
          />
        </div>
        <Canvas id="canvas">
          <FlightsScene
            flightsList={flightsFiltered}
            airportsList={airportsList}
            airportsMap={flightsMap}
          />
        </Canvas>
      </React.Suspense>
    </div>
  );
}

export default FlightVisualizationApp;
