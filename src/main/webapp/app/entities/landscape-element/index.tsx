import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LandscapeElement from './landscape-element';
import LandscapeElementDetail from './landscape-element-detail';
import LandscapeElementUpdate from './landscape-element-update';
import LandscapeElementDeleteDialog from './landscape-element-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LandscapeElementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LandscapeElementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LandscapeElementDetail} />
      <ErrorBoundaryRoute path={match.url} component={LandscapeElement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LandscapeElementDeleteDialog} />
  </>
);

export default Routes;
