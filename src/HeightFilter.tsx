import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { minHeightFilter } from './lib/graphql';
import { Card, CardContent } from '@material-ui/core';

interface HeightFilterProps {
  maxHeight: number;
}

const HeightFilter = (props: HeightFilterProps): JSX.Element => {

  const handleChange = (
    event: React.ChangeEvent<unknown>, newValue: number | number[]) => minHeightFilter(newValue as number);

  return (
    <div className="height-filter">
      <Card>
        <CardContent>
          <Typography id="height-filter" gutterBottom>
            Height
          </Typography>
          <Slider
            min={0}
            max={props.maxHeight}
            defaultValue={minHeightFilter()}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="height-filter"
            track="inverted"
            marks={true}
            step={100}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(HeightFilter);
