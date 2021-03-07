import React from "react";
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import MapView from "src/MapView";

const MapViewContainer = (): JSX.Element => {
  const defaultCenter: LatLngLiteral = { lat: 40, lng: 30 };
  const defaultZoom = 2;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapView />
    </MapContainer>
  );
};

export default React.memo(MapViewContainer);
