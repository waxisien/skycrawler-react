import React from "react";
import { useQuery } from "@apollo/react-hooks";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useReactiveVar } from "@apollo/client";
import { Chip } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";

import { BUILDINGS } from "src/lib/queries";
import { Building, City } from "src/types";
import Loader from "src/Loader";
import {
  mapBounds as mapBoundsStore,
  minHeightFilter,
  statusFilter,
} from "./lib/graphql";
import {
  filterByHeight,
  filterByStatus,
  underConstructionStatus,
} from "./lib/utils";

const MapViewList = (): JSX.Element => {
  const { loading, error, data } = useQuery(BUILDINGS);
  const minHeight = useReactiveVar(minHeightFilter);
  const mapBounds = useReactiveVar(mapBoundsStore);
  const onlyUnderConstruction = useReactiveVar(statusFilter);

  if (loading) return <Loader />;
  if (error) return <p>Error :(</p>;

  const filterByBoundaries = (building: Building) => {
    if (!mapBounds) return false;

    const city: City = building.city;
    return mapBounds.contains([city.latitude, city.longitude]);
  };

  const compareByHeight = (a: Building, b: Building) => b.height - a.height;

  const filteredBuildings = data.buildings
    .filter(filterByBoundaries)
    .filter(filterByHeight(minHeight))
    .filter(filterByStatus(onlyUnderConstruction))
    .sort(compareByHeight);

  const handleClick = (link: string) => (): void => {
    window.open(link, "_blank");
  };

  const renderRow = (props: ListChildComponentProps): JSX.Element => {
    // eslint-disable-next-line
    const { index, style } = props;

    const building: Building = filteredBuildings[index];

    const primaryLabel = `${building.name} - ${building.city.name}`;
    const secondaryLabel = building.height ? `${building.height}m` : "N/A";

    return (
      <ListItem
        button
        style={style}
        key={index}
        onClick={handleClick(building.link)}
        divider
      >
        <ListItemText primary={primaryLabel} secondary={secondaryLabel} />
        {building.status === underConstructionStatus && (
          <Chip label="Under construction" icon={<BuildIcon />} />
        )}
      </ListItem>
    );
  };

  return (
    <div className="list-container">
      <AutoSizer>
        {({ height, width }): JSX.Element => (
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
};

export default React.memo(MapViewList);
