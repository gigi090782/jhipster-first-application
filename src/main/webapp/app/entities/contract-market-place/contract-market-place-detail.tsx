import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contract-market-place.reducer';
import { IContractMarketPlace } from 'app/shared/model/contract-market-place.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractMarketPlaceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractMarketPlaceDetail = (props: IContractMarketPlaceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { contractMarketPlaceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.detail.title">ContractMarketPlace</Translate> [
          <b>{contractMarketPlaceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="contractId">
              <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
            </span>
          </dt>
          <dd>{contractMarketPlaceEntity.contractId}</dd>
          <dt>
            <span id="marketPlaceType">
              <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.marketPlaceType">Market Place Type</Translate>
            </span>
          </dt>
          <dd>{contractMarketPlaceEntity.marketPlaceType}</dd>
          <dt>
            <span id="dateAdd">
              <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.dateAdd">Date Add</Translate>
            </span>
          </dt>
          <dd>{contractMarketPlaceEntity.dateAdd}</dd>
          <dt>
            <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
          </dt>
          <dd>{contractMarketPlaceEntity.contractId ? contractMarketPlaceEntity.contractId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/contract-market-place" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contract-market-place/${contractMarketPlaceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ contractMarketPlace }: IRootState) => ({
  contractMarketPlaceEntity: contractMarketPlace.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractMarketPlaceDetail);
