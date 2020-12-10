import * as React from 'react';

import './MapMarker.css';

interface MapMarkerProps {
  text: string;
  lng: number;
  lat: number;
}
const MapMarker = (props: MapMarkerProps): JSX.Element => (
  <div className="marker"
    style={{ backgroundColor: '#3f51b5', cursor: 'pointer'}}
    title={props.text}
  />
);

export default React.memo(MapMarker);
