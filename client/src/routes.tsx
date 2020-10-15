import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import OrphanagesMap from './pages/OrphanagesMap/OrphanagesMap';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/map" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
