import React from 'react';
import Filters from './Filters';

import MapViewContainer from "./MapViewContainer";
import MapViewList from './MapViewList';

const MapViewLayout = (): JSX.Element => (
  <div className="map-view-layout">
    <div className="map-view-column">
      <MapViewContainer />
    </div>
    <div className='map-view-list-column'>
      <MapViewList />
    </div>
            <Filters />

  </div>
);

export default MapViewLayout;
