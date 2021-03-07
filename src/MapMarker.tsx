import * as React from 'react';
import { Marker } from 'react-leaflet';

import './MapMarker.css';

interface MapMarkerProps {
  text: string;
  lng: number;
  lat: number;
}
const MapMarker = (props: MapMarkerProps): JSX.Element => (
  /*<div className="marker"
    style={{ backgroundColor: '#3f51b5', cursor: 'pointer'}}
    title={props.text}
  />*/
  <Marker position={{lat: props.lat, lng: props.lng}}></Marker>
);

export default React.memo(MapMarker);
