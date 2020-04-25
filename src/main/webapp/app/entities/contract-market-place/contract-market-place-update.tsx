import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContract } from 'app/shared/model/contract.model';
import { getEntities as getContracts } from 'app/entities/contract/contract.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contract-market-place.reducer';
import { IContractMarketPlace } from 'app/shared/model/contract-market-place.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContractMarketPlaceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractMarketPlaceUpdate = (props: IContractMarketPlaceUpdateProps) => {
  const [contractIdId, setContractIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { contractMarketPlaceEntity, contracts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/contract-market-place');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getContracts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...contractMarketPlaceEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterFirstApplicationApp.contractMarketPlace.home.createOrEditLabel">
            <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.home.createOrEditLabel">
              Create or edit a ContractMarketPlace
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : contractMarketPlaceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="contract-market-place-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="contract-market-place-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contractIdLabel" for="contract-market-place-contractId">
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
                </Label>
                <AvField id="contract-market-place-contractId" type="string" className="form-control" name="contractId" />
              </AvGroup>
              <AvGroup>
                <Label id="marketPlaceTypeLabel" for="contract-market-place-marketPlaceType">
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.marketPlaceType">Market Place Type</Translate>
                </Label>
                <AvInput
                  id="contract-market-place-marketPlaceType"
                  type="select"
                  className="form-control"
                  name="marketPlaceType"
                  value={(!isNew && contractMarketPlaceEntity.marketPlaceType) || 'FOND'}
                >
                  <option value="FOND">{translate('jhipsterFirstApplicationApp.MarketPlaceType.FOND')}</option>
                  <option value="OTC">{translate('jhipsterFirstApplicationApp.MarketPlaceType.OTC')}</option>
                  <option value="Currency">{translate('jhipsterFirstApplicationApp.MarketPlaceType.Currency')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="dateAddLabel" for="contract-market-place-dateAdd">
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.dateAdd">Date Add</Translate>
                </Label>
                <AvField id="contract-market-place-dateAdd" type="text" name="dateAdd" />
              </AvGroup>
              <AvGroup>
                <Label for="contract-market-place-contractId">
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
                </Label>
                <AvInput id="contract-market-place-contractId" type="select" className="form-control" name="contractId.id">
                  <option value="" key="0" />
                  {contracts
                    ? contracts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/contract-market-place" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  contracts: storeState.contract.entities,
  contractMarketPlaceEntity: storeState.contractMarketPlace.entity,
  loading: storeState.contractMarketPlace.loading,
  updating: storeState.contractMarketPlace.updating,
  updateSuccess: storeState.contractMarketPlace.updateSuccess
});

const mapDispatchToProps = {
  getContracts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractMarketPlaceUpdate);
