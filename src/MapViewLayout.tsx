import React from "react";

import Filters from "src/Filters";
import MapViewContainer from "src/MapViewContainer";
import MapViewList from "src/MapViewList";

const MapViewLayout = (): JSX.Element => (
  <div className="map-view-layout">
    <div className="map-view-column">
      <MapViewContainer />
    </div>
    <div className="map-view-list-column">
      <MapViewList />
    </div>
    <Filters />
  </div>
);

export default MapViewLayout;
