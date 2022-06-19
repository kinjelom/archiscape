import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './landscape.reducer';

export const LandscapeDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const landscapeEntity = useAppSelector(state => state.landscape.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="landscapeDetailsHeading">
          <Translate contentKey="archiscapeApp.landscape.detail.title">Landscape</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="archiscapeApp.landscape.id">Id</Translate>
            </span>
          </dt>
          <dd>{landscapeEntity.id}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="archiscapeApp.landscape.description">Description</Translate>
            </span>
          </dt>
          <dd>{landscapeEntity.description}</dd>
          <dt>
            <span id="configuration">
              <Translate contentKey="archiscapeApp.landscape.configuration">Configuration</Translate>
            </span>
          </dt>
          <dd>{landscapeEntity.configuration}</dd>
        </dl>
        <Button tag={Link} to="/landscape" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/landscape/${landscapeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LandscapeDetail;
