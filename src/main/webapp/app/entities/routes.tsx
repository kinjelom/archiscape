import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Landscape from './landscape';
import LandscapeElement from './landscape-element';
import Project from './project';
import ProjectContent from './project-content';
import ProjectElement from './project-element';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}landscape`} component={Landscape} />
        <ErrorBoundaryRoute path={`${match.url}landscape-element`} component={LandscapeElement} />
        <ErrorBoundaryRoute path={`${match.url}project`} component={Project} />
        <ErrorBoundaryRoute path={`${match.url}project-content`} component={ProjectContent} />
        <ErrorBoundaryRoute path={`${match.url}project-element`} component={ProjectElement} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
