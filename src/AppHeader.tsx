import React from 'react';
import { IconButton } from '@material-ui/core';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import InfoDialog from './InfoDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: 'white',
      flexGrow: 1,
      textDecoration: 'none',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      marginRight: theme.spacing(3),
    },
  }),
);

const AppHeader = (): JSX.Element => {

  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const toggleDialogInfo = (): void => setInfoDialogOpen(!infoDialogOpen);

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar variant="dense">
        <IconButton aria-label="menu" color="default" to="/" component={Link} className={classes.menuButton}>
          <PlaceOutlinedIcon style={{ fill: 'white' }}/>
        </IconButton>
        <Typography variant="h6" className={classes.title} to="/" component={Link}>
          Skycrawler
        </Typography>
        <Link to="/list" className={classes.link}>Full list</Link>
        <IconButton aria-label="menu" color="default" onClick={toggleDialogInfo}>
          <InfoOutlined style={{ fill: 'white' }} />
        </IconButton>
        <InfoDialog open={infoDialogOpen} onClose={toggleDialogInfo}/>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
