import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './landscape-element.reducer';

export const LandscapeElementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const landscapeElementEntity = useAppSelector(state => state.landscapeElement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="landscapeElementDetailsHeading">
          <Translate contentKey="archiscapeApp.landscapeElement.detail.title">LandscapeElement</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="archiscapeApp.landscapeElement.id">Id</Translate>
            </span>
          </dt>
          <dd>{landscapeElementEntity.id}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="archiscapeApp.landscapeElement.type">Type</Translate>
            </span>
          </dt>
          <dd>{landscapeElementEntity.type}</dd>
          <dt>
            <span id="documentation">
              <Translate contentKey="archiscapeApp.landscapeElement.documentation">Documentation</Translate>
            </span>
          </dt>
          <dd>{landscapeElementEntity.documentation}</dd>
          <dt>
            <Translate contentKey="archiscapeApp.landscapeElement.landscape">Landscape</Translate>
          </dt>
          <dd>{landscapeElementEntity.landscape ? landscapeElementEntity.landscape.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/landscape-element" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/landscape-element/${landscapeElementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LandscapeElementDetail;
