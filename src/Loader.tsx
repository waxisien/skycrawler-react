import React from 'react'; 
import CircularProgress from '@material-ui/core/CircularProgress';

import './Loader.css';

const Loader = (): JSX.Element => (
  <span className="progress">
    <CircularProgress />
  </span>
);

export default Loader;
