import React from "react";
import { useQuery } from "@apollo/react-hooks";
import supercluster from "points-cluster";
import { useReactiveVar } from "@apollo/client";
import { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

import { BUILDINGS } from "src/lib/queries";
import { Building, MapBuilding } from "src/types";
import MapMarker from "src/MapMarker";
import MapClusterMarker from "src/MapClusterMarker";
import Loader from "src/Loader";
import { mapBounds, minHeightFilter, statusFilter } from "src/lib/graphql";
import { filterByHeight, filterByStatus } from "src/lib/utils";

const adaptBuildingList = (buildings: Building[]) =>
  buildings.map(
    (building: Building): MapBuilding => ({
      id: building.id,
      lat: building.city.latitude,
      lng: building.city.longitude,
      text: building.name,
    })
  );

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

interface MapViewProps {
  minZoom: number;
  maxZoom: number;
}

const MapView = (props: MapViewProps): JSX.Element => {
  const { minZoom, maxZoom } = props;
  const minHeight = useReactiveVar(minHeightFilter);
  const onlyUnderConstruction = useReactiveVar(statusFilter);

  const bounds = useReactiveVar(mapBounds);
  const [center, setCenter] = React.useState<LatLng>();
  const [zoom, setZoom] = React.useState<number>();

  const map = useMapEvents({
    moveend() {
      onMapChange();
    },
  });

  const onMapChange = () => {
    mapBounds(map.getBounds());
    setCenter(map.getCenter());
    setZoom(map.getZoom());
  };

  React.useEffect(onMapChange, []);

  const { loading, error, data } = useQuery(BUILDINGS);

  const buildings = adaptBuildingList(
    data
      ? data.buildings
          .filter(filterByHeight(minHeight))
          .filter(filterByStatus(onlyUnderConstruction))
      : []
  );

  const getClusters = React.useCallback((): RawCluster[] => {
    if (!bounds) return [];

    const mapOptions = {
      minZoom,
      maxZoom,
      radius: 45,
    };
    const boundsLatLng = {
      nw: { lat: bounds.getNorthWest().lat, lng: bounds.getNorthWest().lng },
      se: { lat: bounds.getSouthEast().lat, lng: bounds.getSouthEast().lng },
    };
    return supercluster(
      buildings,
      mapOptions
    )({ center, zoom, bounds: boundsLatLng });
  }, [buildings, center, zoom, bounds]);

  const createClusters = React.useCallback(
    (): Cluster[] =>
      getClusters().map((cluster: RawCluster) => ({
        lat: cluster.wy,
        lng: cluster.wx,
        numPoints: cluster.numPoints,
        key: `${cluster.numPoints}_${cluster.points[0].id}`,
        points: cluster.points,
      })),
    [getClusters]
  );

  const clusters = createClusters();

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  return (
    <>
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
          );
        }
      })}
    </>
  );
};

export default React.memo(MapView);
