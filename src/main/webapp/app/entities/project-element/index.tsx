import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProjectElement from './project-element';
import ProjectElementDetail from './project-element-detail';
import ProjectElementUpdate from './project-element-update';
import ProjectElementDeleteDialog from './project-element-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProjectElementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProjectElementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProjectElementDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProjectElement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProjectElementDeleteDialog} />
  </>
);

export default Routes;
