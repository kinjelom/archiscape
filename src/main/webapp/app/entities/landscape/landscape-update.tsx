import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILandscape } from 'app/shared/model/landscape.model';
import { getEntity, updateEntity, createEntity, reset } from './landscape.reducer';

export const LandscapeUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const landscapeEntity = useAppSelector(state => state.landscape.entity);
  const loading = useAppSelector(state => state.landscape.loading);
  const updating = useAppSelector(state => state.landscape.updating);
  const updateSuccess = useAppSelector(state => state.landscape.updateSuccess);
  const handleClose = () => {
    props.history.push('/landscape' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...landscapeEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...landscapeEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="archiscapeApp.landscape.home.createOrEditLabel" data-cy="LandscapeCreateUpdateHeading">
            <Translate contentKey="archiscapeApp.landscape.home.createOrEditLabel">Create or edit a Landscape</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="landscape-id"
                  label={translate('archiscapeApp.landscape.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('archiscapeApp.landscape.description')}
                id="landscape-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('archiscapeApp.landscape.configuration')}
                id="landscape-configuration"
                name="configuration"
                data-cy="configuration"
                type="text"
                validate={{
                  maxLength: { value: 4096, message: translate('entity.validation.maxlength', { max: 4096 }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/landscape" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LandscapeUpdate;
