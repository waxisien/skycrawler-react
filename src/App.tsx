import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { IconButton } from '@material-ui/core';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { client } from './lib/graphql';
import BuildingListView from './BuildingListView';
import InfoDialog from './InfoDialog';
import MapViewLayout from './MapViewLayout';

import './App.css';

const App = (): JSX.Element => {

  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);

  const toggleDialogInfo = (): void => setInfoDialogOpen(!infoDialogOpen);

  return (
    <ApolloProvider client={client}>
      <Router>
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
        <Switch>
          <Route path="/list">
            <BuildingListView />
          </Route>
          <Route path="/">
            <MapViewLayout />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
