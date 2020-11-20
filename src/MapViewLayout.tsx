import React from 'react';

import MapView from "./MapView";
import MapViewList from './MapViewList';

const MapViewLayout = (): JSX.Element => (
  <div className="map-view-layout">
    <div className="map-view-column">
      <MapView />
    </div>
    <div className='map-view-list-column'>
      <MapViewList />
    </div>
  </div>
);

export default MapViewLayout;
