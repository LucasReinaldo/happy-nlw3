import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import OrphanagesMap from './pages/OrphanagesMap/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage/CreateOrphanage';
import Orphanage from './pages/Orphanage/Orphanage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/map" component={OrphanagesMap} />
        
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
