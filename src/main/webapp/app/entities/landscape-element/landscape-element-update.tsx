import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILandscape } from 'app/shared/model/landscape.model';
import { getEntities as getLandscapes } from 'app/entities/landscape/landscape.reducer';
import { ILandscapeElement } from 'app/shared/model/landscape-element.model';
import { ElementType } from 'app/shared/model/enumerations/element-type.model';
import { getEntity, updateEntity, createEntity, reset } from './landscape-element.reducer';

export const LandscapeElementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const landscapes = useAppSelector(state => state.landscape.entities);
  const landscapeElementEntity = useAppSelector(state => state.landscapeElement.entity);
  const loading = useAppSelector(state => state.landscapeElement.loading);
  const updating = useAppSelector(state => state.landscapeElement.updating);
  const updateSuccess = useAppSelector(state => state.landscapeElement.updateSuccess);
  const elementTypeValues = Object.keys(ElementType);
  const handleClose = () => {
    props.history.push('/landscape-element' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getLandscapes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...landscapeElementEntity,
      ...values,
      landscape: landscapes.find(it => it.id.toString() === values.landscape.toString()),
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
          type: 'C4_PERSON',
          ...landscapeElementEntity,
          landscape: landscapeElementEntity?.landscape?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="archiscapeApp.landscapeElement.home.createOrEditLabel" data-cy="LandscapeElementCreateUpdateHeading">
            <Translate contentKey="archiscapeApp.landscapeElement.home.createOrEditLabel">Create or edit a LandscapeElement</Translate>
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
                  id="landscape-element-id"
                  label={translate('archiscapeApp.landscapeElement.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('archiscapeApp.landscapeElement.type')}
                id="landscape-element-type"
                name="type"
                data-cy="type"
                type="select"
              >
                {elementTypeValues.map(elementType => (
                  <option value={elementType} key={elementType}>
                    {translate('archiscapeApp.ElementType.' + elementType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('archiscapeApp.landscapeElement.documentation')}
                id="landscape-element-documentation"
                name="documentation"
                data-cy="documentation"
                type="text"
              />
              <ValidatedField
                id="landscape-element-landscape"
                name="landscape"
                data-cy="landscape"
                label={translate('archiscapeApp.landscapeElement.landscape')}
                type="select"
                required
              >
                <option value="" key="0" />
                {landscapes
                  ? landscapes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/landscape-element" replace color="info">
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

export default LandscapeElementUpdate;
