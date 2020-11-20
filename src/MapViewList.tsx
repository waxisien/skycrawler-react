import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useReactiveVar } from '@apollo/client'

import { BUILDINGS } from './lib/queries';
import { Building, City } from './types';
import Loader from './Loader';
import { mapBounds as mapBoundsStore, minHeightFilter, statusFilter } from './lib/graphql';
import { filterByHeight, filterByStatus } from './lib/utils';

const MapViewList = (): JSX.Element => {
  const { loading, error, data } = useQuery(BUILDINGS);
  const minHeight = useReactiveVar(minHeightFilter);
  const mapBounds = useReactiveVar(mapBoundsStore);
  const onlyUnderConstruction = useReactiveVar(statusFilter);
 
  if (loading) return <Loader/>;
  if (error) return <p>Error :(</p>;
  
  const filterByBoundaries = (building: Building) => {
    if (!mapBounds) return false;

    const city: City = building.city;
    const lat = city.latitude;
    const lng = city.longitude;

    return mapBounds.ne.lat > lat && mapBounds.ne.lng > lng &&
      mapBounds.nw.lat > lat && mapBounds.nw.lng < lng &&
      mapBounds.se.lat < lat && mapBounds.se.lng > lng &&
      mapBounds.sw.lat < lat && mapBounds.sw.lng < lng
  };

  const compareByHeight = (a: Building, b: Building) => b.height - a.height;

  const filteredBuildings = data.buildings
    .filter(filterByBoundaries).filter(filterByHeight(minHeight)).filter(filterByStatus(onlyUnderConstruction))
    .sort(compareByHeight);

  const handleClick = (link: string) => (): void => {
    window.open(link, '_blank')
  };

  const renderRow = (props: ListChildComponentProps): JSX.Element => {
    // eslint-disable-next-line
    const { index, style } = props;

    const building: Building = filteredBuildings[index];
  
    const primaryLabel = `${building.name} - ${building.city.name}`;
    const secondaryLabel = building.height ? `${building.height}m`: 'N/A';

    return (
      <ListItem button style={style} key={index} onClick={handleClick(building.link)} divider>
        <ListItemText primary={primaryLabel} secondary={secondaryLabel}/>
      </ListItem>
    );
  };

  return (
    <div className="list-container">
      <AutoSizer>
        {({ height, width}): JSX.Element => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={65}
            itemCount={filteredBuildings.length}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

export default React.memo(MapViewList);
