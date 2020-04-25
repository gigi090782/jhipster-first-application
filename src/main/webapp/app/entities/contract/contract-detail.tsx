import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contract.reducer';
import { IContract } from 'app/shared/model/contract.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractDetail = (props: IContractDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { contractEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterFirstApplicationApp.contract.detail.title">Contract</Translate> [<b>{contractEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="clientId">
              <Translate contentKey="jhipsterFirstApplicationApp.contract.clientId">Client Id</Translate>
            </span>
          </dt>
          <dd>{contractEntity.clientId}</dd>
          <dt>
            <span id="channelType">
              <Translate contentKey="jhipsterFirstApplicationApp.contract.channelType">Channel Type</Translate>
            </span>
          </dt>
          <dd>{contractEntity.channelType}</dd>
          <dt>
            <span id="dateAdd">
              <Translate contentKey="jhipsterFirstApplicationApp.contract.dateAdd">Date Add</Translate>
            </span>
          </dt>
          <dd>{contractEntity.dateAdd}</dd>
          <dt>
            <Translate contentKey="jhipsterFirstApplicationApp.contract.clientId">Client Id</Translate>
          </dt>
          <dd>{contractEntity.clientId ? contractEntity.clientId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/contract" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contract/${contractEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ contract }: IRootState) => ({
  contractEntity: contract.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetail);
