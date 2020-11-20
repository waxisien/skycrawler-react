import React from 'react';
import Filters from './Filters';

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
            <Filters />

  </div>
);

export default MapViewLayout;
