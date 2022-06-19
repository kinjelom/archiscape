import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProjectElement } from 'app/shared/model/project-element.model';
import { ElementType } from 'app/shared/model/enumerations/element-type.model';
import { getEntity, updateEntity, createEntity, reset } from './project-element.reducer';

export const ProjectElementUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const projectElementEntity = useAppSelector(state => state.projectElement.entity);
  const loading = useAppSelector(state => state.projectElement.loading);
  const updating = useAppSelector(state => state.projectElement.updating);
  const updateSuccess = useAppSelector(state => state.projectElement.updateSuccess);
  const elementTypeValues = Object.keys(ElementType);
  const handleClose = () => {
    props.history.push('/project-element' + props.location.search);
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
      ...projectElementEntity,
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
          type: 'C4_PERSON',
          ...projectElementEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="archiscapeApp.projectElement.home.createOrEditLabel" data-cy="ProjectElementCreateUpdateHeading">
            <Translate contentKey="archiscapeApp.projectElement.home.createOrEditLabel">Create or edit a ProjectElement</Translate>
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
                  id="project-element-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('archiscapeApp.projectElement.name')}
                id="project-element-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('archiscapeApp.projectElement.type')}
                id="project-element-type"
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
                label={translate('archiscapeApp.projectElement.documentation')}
                id="project-element-documentation"
                name="documentation"
                data-cy="documentation"
                type="text"
              />
              <ValidatedField
                label={translate('archiscapeApp.projectElement.landscapeElementId')}
                id="project-element-landscapeElementId"
                name="landscapeElementId"
                data-cy="landscapeElementId"
                type="text"
                validate={{
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/project-element" replace color="info">
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

export default ProjectElementUpdate;
