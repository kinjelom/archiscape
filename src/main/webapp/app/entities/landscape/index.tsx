import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Landscape from './landscape';
import LandscapeDetail from './landscape-detail';
import LandscapeUpdate from './landscape-update';
import LandscapeDeleteDialog from './landscape-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LandscapeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LandscapeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LandscapeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Landscape} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LandscapeDeleteDialog} />
  </>
);

export default Routes;
