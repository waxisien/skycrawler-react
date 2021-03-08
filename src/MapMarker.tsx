import * as React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";

import "./MapMarker.css";

interface MapMarkerProps {
  text: string;
  lng: number;
  lat: number;
}
const MapMarker = (props: MapMarkerProps): JSX.Element => {
  const iconMarkup = `
    <div class="marker" title=${props.text}/>
  `;
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return (
    <Marker
      position={{ lat: props.lat, lng: props.lng }}
      icon={customMarkerIcon}
    />
  );
};

export default React.memo(MapMarker);
