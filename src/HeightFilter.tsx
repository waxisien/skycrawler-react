import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { minHeightFilter } from './lib/graphql';

interface HeightFilterProps {
  maxHeight: number;
}

const HeightFilter = (props: HeightFilterProps): JSX.Element => {

  const handleChange = (
    event: React.ChangeEvent<unknown>, newValue: number | number[]) => minHeightFilter(newValue as number);

  return (
    <div className="height-filter">
      <Typography id="height-filter" gutterBottom>
        Filter by height
      </Typography>
      <Slider
        min={0}
        max={props.maxHeight}
        defaultValue={minHeightFilter()}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="height-filter"
        track="inverted"
      />
    </div>
  );
};

export default React.memo(HeightFilter);
