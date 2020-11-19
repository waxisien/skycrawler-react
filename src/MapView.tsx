import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import GoogleMapReact, { Bounds, ChangeEventValue, Coords } from 'google-map-react';
import supercluster from 'points-cluster';
import CircularProgress from '@material-ui/core/CircularProgress';

import { BUILDINGS } from './lib/queries';
import { Building, MapBuilding } from './types';
import MapMarker from './MapMarker';
import MapClusterMarker from './MapClusterMarker';

const adaptBuildingList = (buildings: Building[]) =>
  buildings.map((building: Building): MapBuilding => ({
    id: building.id,
    lat: building.city.latitude,
    lng: building.city.longitude,
    text: building.name,
  }));

interface MapViewProps {
  onBoundsChange: (bounds: Bounds) => void;
}

interface RawCluster {
  wy: number;
  wx: number;
  numPoints: number;
  points: MapBuilding[];
}

interface Cluster {
  lat: number;
  lng: number;
  key: string;
  numPoints: number;
  points: MapBuilding[];
}

const MapView = (props: MapViewProps): JSX.Element => {
  const defaultCenter = {lat: 40, lng: 30};
  const defaultZoom = 2;
  const minZoom = 2;
  const maxZoom = 7;

  const { onBoundsChange } = props;

  const { loading, error, data } = useQuery(BUILDINGS);
  const [clusters, setClusters] = useState([]);

  const buildings = adaptBuildingList(data ? data.buildings: []);

  const getClusters = React.useCallback(
    (center: Coords, zoom: number, bounds: Bounds) => {
      const mapOptions = {
        minZoom,
        maxZoom,
        radius: 50,
      }
      return supercluster(buildings, mapOptions)({ center, zoom, bounds });
    },
    [buildings],
  );

  const createClusters = React.useCallback(
    (center: Coords, zoom: number, bounds: Bounds) => {
      if (!bounds) return [];

      return getClusters(center, zoom, bounds).map(
        (cluster: RawCluster) => ({
          lat: cluster.wy,
          lng: cluster.wx,
          numPoints: cluster.numPoints,
          key: `${cluster.numPoints}_${cluster.points[0].id}`,
          points: cluster.points,
        }));
    },
    [getClusters],
  );

  const onMapChange = React.useCallback(
    (value: ChangeEventValue): void => {
      setClusters(createClusters(value.center, value.zoom, value.bounds));
      onBoundsChange(value.bounds);
    },
    [createClusters, onBoundsChange, setClusters],
  );

  if (loading) {
    return (
      <div className="progress">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <p>Error :(</p>;

  return (
    <div className={'map'}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onChange={onMapChange}
        options={{ minZoom, maxZoom }}
      >
        {clusters.map((item: Cluster) => {
          if (item.numPoints === 1) {
            return (
              <MapMarker
                key={item.key}
                lat={item.points[0].lat}
                lng={item.points[0].lng}
                text={item.points[0].text}
              />
            );
          } else {
            return (
              <MapClusterMarker
                key={item.key}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            )
          }
        })}
      </GoogleMapReact>
    </div>
  );
};

export default React.memo(MapView);
