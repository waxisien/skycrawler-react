import React from "react";
import { LatLngLiteral } from "leaflet";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";

import MapView from "src/MapView";

const MapViewContainer = (): JSX.Element => {
  const defaultCenter: LatLngLiteral = { lat: 40, lng: 30 };
  const defaultZoom = 2;
  const minZoom = 2;
  const maxZoom = 7;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      maxZoom={maxZoom}
      minZoom={minZoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapView maxZoom={maxZoom} minZoom={minZoom} />
    </MapContainer>
  );
};

export default React.memo(MapViewContainer);
