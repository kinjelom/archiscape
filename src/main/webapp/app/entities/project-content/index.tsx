import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProjectContent from './project-content';
import ProjectContentDetail from './project-content-detail';
import ProjectContentUpdate from './project-content-update';
import ProjectContentDeleteDialog from './project-content-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProjectContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProjectContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProjectContentDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProjectContent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProjectContentDeleteDialog} />
  </>
);

export default Routes;
