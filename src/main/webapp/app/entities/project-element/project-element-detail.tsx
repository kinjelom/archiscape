import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project-element.reducer';

export const ProjectElementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectElementEntity = useAppSelector(state => state.projectElement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectElementDetailsHeading">
          <Translate contentKey="archiscapeApp.projectElement.detail.title">ProjectElement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectElementEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="archiscapeApp.projectElement.name">Name</Translate>
            </span>
          </dt>
          <dd>{projectElementEntity.name}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="archiscapeApp.projectElement.type">Type</Translate>
            </span>
          </dt>
          <dd>{projectElementEntity.type}</dd>
          <dt>
            <span id="documentation">
              <Translate contentKey="archiscapeApp.projectElement.documentation">Documentation</Translate>
            </span>
          </dt>
          <dd>{projectElementEntity.documentation}</dd>
          <dt>
            <span id="landscapeElementId">
              <Translate contentKey="archiscapeApp.projectElement.landscapeElementId">Landscape Element Id</Translate>
            </span>
          </dt>
          <dd>{projectElementEntity.landscapeElementId}</dd>
        </dl>
        <Button tag={Link} to="/project-element" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project-element/${projectElementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectElementDetail;
