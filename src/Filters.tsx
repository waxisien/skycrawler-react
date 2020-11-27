import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, FormControlLabel, Switch } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

import { minHeightFilter, statusFilter } from './lib/graphql';
import { BUILDINGS } from './lib/queries';
import { findMaxHeight } from './lib/utils';

const Filters = (): JSX.Element | null => {
  const { loading, error, data } = useQuery(BUILDINGS);
 
  if (loading || error) return null;
  
  const maxHeight = findMaxHeight(data.buildings);

  const handleHeightChange = (
    event: React.ChangeEvent<unknown>, newValue: number | number[]) => minHeightFilter(newValue as number);

  const handleStatusChange = (
    event: React.ChangeEvent<unknown>, checked: boolean) => statusFilter(checked);

  return (
    <div className="height-filter">
      <Card>
        <CardContent>
          <Typography id="height-filter" gutterBottom>
            Height
          </Typography>
          <Slider
            min={0}
            max={maxHeight}
            defaultValue={minHeightFilter()}
            onChange={handleHeightChange}
            valueLabelDisplay="auto"
            aria-labelledby="height-filter"
            track="inverted"
            marks={true}
            step={100}
          />
          <FormControlLabel
            className="status-filter"
            control={<Switch color="primary" size="small" onChange={handleStatusChange}/>}
            label="Under construction"
            labelPlacement="start"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(Filters);
