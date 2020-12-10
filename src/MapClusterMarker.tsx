import * as React from 'react';

import { MapBuilding } from './types';

import './MapClusterMarker.css';

interface MapClusterMarkerProps {
  lng: number;
  lat: number;
  points: MapBuilding[];
}
const MapClusterMarker = (props: MapClusterMarkerProps): JSX.Element => {
  return (
    <div className="cluster-marker"
      style={{ backgroundColor: '#B53F51', cursor: 'pointer'}}
    >
      <span>{props.points.length}</span>
    </div>
  );
};

export default React.memo(MapClusterMarker);
