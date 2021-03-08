import * as React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";

import { MapBuilding } from "src/types";

import "./MapClusterMarker.css";

interface MapClusterMarkerProps {
  lng: number;
  lat: number;
  points: MapBuilding[];
}
const MapClusterMarker = (props: MapClusterMarkerProps): JSX.Element => {
  const iconMarkup = `
    <div class="cluster-marker">
      <span>${props.points.length}</span>
    </div>
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

export default React.memo(MapClusterMarker);
