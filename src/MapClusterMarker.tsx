import * as React from "react";
import { Marker } from "react-leaflet";

import { MapBuilding } from "src/types";

import "./MapClusterMarker.css";

interface MapClusterMarkerProps {
  lng: number;
  lat: number;
  points: MapBuilding[];
}
const MapClusterMarker = (props: MapClusterMarkerProps): JSX.Element => {
  return (
    /*<div className="cluster-marker"
      style={{ backgroundColor: '#B53F51', cursor: 'pointer'}}
    >
      <span>{props.points.length}</span>
    </div>*/
    <Marker position={{ lat: props.lat, lng: props.lng }}></Marker>
  );
};

export default React.memo(MapClusterMarker);
