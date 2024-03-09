import { useRef } from 'react';
import { Group, Quaternion, Vector3 } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';

import Airplane from '../models/Plane';
import { FLOAT_HEIGHT, GLOBE_SCALE, LEFT } from '../constants';
import { GLOBE_BASE_RADIUS } from '../models/Globe';

import { IAirport, IFlight } from '../types';
import { getRotationForDirection, rotationQuaternionForCoordinates } from '../Utilities';

type FlightProperties = {
  from: IAirport;
  to: IAirport;
  flightDescriptor: IFlight;
  onFlightClicked: (flight: IFlight, event: ThreeEvent<MouseEvent>) => void;
  selected: boolean;
};

export function Flight({ from, to }: { from: IAirport, to: IAirport }) {
  const rotationBoxRef = useRef<Group | null>(null);
  const flightContainerRef = useRef<Group | null>(null);

  const fromQuaternion = rotationQuaternionForCoordinates(from.latitude, from.longitude);
  const toQuaternion = rotationQuaternionForCoordinates(to.latitude, to.longitude);

  useFrame((state, delta) => {

    const phase = state.clock.elapsedTime % 5 / 5;

    if (flightContainerRef.current && rotationBoxRef.current) {
      const q = new Quaternion();
      q.slerpQuaternions(fromQuaternion, toQuaternion, phase);

      const worldPositionBefore = new Vector3();
      flightContainerRef.current.getWorldPosition(worldPositionBefore);

      rotationBoxRef.current.setRotationFromQuaternion(q);

      flightContainerRef.current.lookAt(worldPositionBefore);
      flightContainerRef.current.rotation.z = getRotationForDirection(from, to);

    }

    // const startQuaternion = new Quaternion().setFromAxisAngle(LEFT, 0);
    // const midQuaternion = new Quaternion().setFromAxisAngle(LEFT, Math.PI);
    // const endQuaternion = new Quaternion().setFromAxisAngle(LEFT, Math.PI * 2);
    // if (rotationBoxRef.current) {
    //   const phase = (state.clock.elapsedTime % 3) / 3;

    //   const rotationQuaternion = new Quaternion();
    //   if (phase < 0.5) {
    //     rotationQuaternion.slerpQuaternions(startQuaternion, midQuaternion, phase * 2);
    //   } else {
    //     rotationQuaternion.slerpQuaternions(midQuaternion, endQuaternion, (phase - 0.5) * 2);
    //   }

    //   rotationBoxRef.current.setRotationFromQuaternion(rotationQuaternion);
    // }
  });

  return (
    <group ref={rotationBoxRef}>
      <group ref={flightContainerRef} position-y={GLOBE_BASE_RADIUS * GLOBE_SCALE + FLOAT_HEIGHT}>
        {/* ^ This box is a convenience because it's hard to forward ref to inside the airplane */}
        <Airplane />
      </group>
    </group>
  );
}