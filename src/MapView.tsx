import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GoogleMapReact, { ChangeEventValue, Coords } from 'google-map-react';
import supercluster from 'points-cluster';
import { useReactiveVar } from '@apollo/client'

import { BUILDINGS } from './lib/queries';
import { Building, MapBuilding } from './types';
import MapMarker from './MapMarker';
import MapClusterMarker from './MapClusterMarker';
import Loader from './Loader';
import { mapBounds, minHeightFilter, statusFilter } from './lib/graphql';
import { filterByHeight, filterByStatus } from './lib/utils';

const adaptBuildingList = (buildings: Building[]) =>
  buildings.map((building: Building): MapBuilding => ({
    id: building.id,
    lat: building.city.latitude,
    lng: building.city.longitude,
    text: building.name,
  }));

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

const MapView = (): JSX.Element => {
  const defaultCenter: Coords = {lat: 40, lng: 30};
  const defaultZoom = 2;
  const minZoom = 2;
  const maxZoom = 7;

  const minHeight = useReactiveVar(minHeightFilter);
  const onlyUnderConstruction = useReactiveVar(statusFilter);

  const bounds = useReactiveVar(mapBounds);
  const [center, setCenter] = React.useState(defaultCenter);
  const [zoom, setZoom] = React.useState(defaultZoom);

  const { loading, error, data } = useQuery(BUILDINGS);

  const buildings = adaptBuildingList(
    data ? data.buildings.filter(filterByHeight(minHeight)).filter(filterByStatus(onlyUnderConstruction)) : []);

  const getClusters = React.useCallback(
    (): RawCluster[] => {
      if (!bounds) return [];

      const mapOptions = {
        minZoom,
        maxZoom,
        radius: 50,
      }
      return supercluster(buildings, mapOptions)({ center, zoom, bounds });
    },
    [buildings, center, zoom, bounds],
  );

  const createClusters = React.useCallback(
    (): Cluster[] => (
      getClusters().map(
        (cluster: RawCluster) => ({
          lat: cluster.wy,
          lng: cluster.wx,
          numPoints: cluster.numPoints,
          key: `${cluster.numPoints}_${cluster.points[0].id}`,
          points: cluster.points,
        }))
    ),
    [getClusters],
  );

  const clusters = createClusters();

  const onMapChange = React.useCallback(
    (value: ChangeEventValue): void => {
      setCenter(value.center);
      setZoom(value.zoom);
      mapBounds(value.bounds);
    },
    [],
  );

  if (loading) return <Loader />;
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
