import React from 'react';
import { IconButton } from '@material-ui/core';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { Link } from "react-router-dom";

import InfoDialog from './InfoDialog';

const AppHeader = (): JSX.Element => {

  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const toggleDialogInfo = (): void => setInfoDialogOpen(!infoDialogOpen);

  return (
    <header className="header">
      <IconButton aria-label="menu" color="default" to="/" component={Link}>
        <PlaceOutlinedIcon style={{ fill: 'white' }}/>
      </IconButton>
      <Link to="/" className="home-menu">Skycrawler</Link>
      <Link to="/list" className="menu-list-link">Full list</Link>
      <IconButton className='info-dialog-icon' aria-label="menu" color="default" onClick={toggleDialogInfo}>
        <InfoOutlined style={{ fill: 'white' }} />
      </IconButton>
      <InfoDialog open={infoDialogOpen} onClose={toggleDialogInfo}/>
    </header>
  );
};

export default AppHeader;
