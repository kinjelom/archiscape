import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project.reducer';

export const ProjectDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectEntity = useAppSelector(state => state.project.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectDetailsHeading">
          <Translate contentKey="archiscapeApp.project.detail.title">Project</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="archiscapeApp.project.name">Name</Translate>
            </span>
          </dt>
          <dd>{projectEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="archiscapeApp.project.description">Description</Translate>
            </span>
          </dt>
          <dd>{projectEntity.description}</dd>
          <dt>
            <span id="configuration">
              <Translate contentKey="archiscapeApp.project.configuration">Configuration</Translate>
            </span>
          </dt>
          <dd>{projectEntity.configuration}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="archiscapeApp.project.active">Active</Translate>
            </span>
          </dt>
          <dd>{projectEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="archiscapeApp.project.landscape">Landscape</Translate>
          </dt>
          <dd>{projectEntity.landscape ? projectEntity.landscape.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project/${projectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectDetail;
