import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project-content.reducer';

export const ProjectContentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const projectContentEntity = useAppSelector(state => state.projectContent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectContentDetailsHeading">
          <Translate contentKey="archiscapeApp.projectContent.detail.title">ProjectContent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectContentEntity.id}</dd>
          <dt>
            <span id="version">
              <Translate contentKey="archiscapeApp.projectContent.version">Version</Translate>
            </span>
          </dt>
          <dd>{projectContentEntity.version}</dd>
          <dt>
            <span id="importDate">
              <Translate contentKey="archiscapeApp.projectContent.importDate">Import Date</Translate>
            </span>
          </dt>
          <dd>
            {projectContentEntity.importDate ? (
              <TextFormat value={projectContentEntity.importDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fileName">
              <Translate contentKey="archiscapeApp.projectContent.fileName">File Name</Translate>
            </span>
          </dt>
          <dd>{projectContentEntity.fileName}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="archiscapeApp.projectContent.content">Content</Translate>
            </span>
          </dt>
          <dd>{projectContentEntity.content}</dd>
          <dt>
            <Translate contentKey="archiscapeApp.projectContent.project">Project</Translate>
          </dt>
          <dd>{projectContentEntity.project ? projectContentEntity.project.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/project-content" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project-content/${projectContentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectContentDetail;
