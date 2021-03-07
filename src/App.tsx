import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { client } from "src/lib/graphql";
import BuildingListView from "src/BuildingListView";
import MapViewLayout from "src/MapViewLayout";
import AppHeader from "src/AppHeader";

import "./App.css";

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <Router>
      <AppHeader />
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

export default App;
