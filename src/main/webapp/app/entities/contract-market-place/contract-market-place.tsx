import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contract-market-place.reducer';
import { IContractMarketPlace } from 'app/shared/model/contract-market-place.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContractMarketPlaceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ContractMarketPlace = (props: IContractMarketPlaceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { contractMarketPlaceList, match, loading } = props;
  return (
    <div>
      <h2 id="contract-market-place-heading">
        <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.home.title">Contract Market Places</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.home.createLabel">
            Create new Contract Market Place
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {contractMarketPlaceList && contractMarketPlaceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.marketPlaceType">Market Place Type</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.dateAdd">Date Add</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.contractId">Contract Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contractMarketPlaceList.map((contractMarketPlace, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contractMarketPlace.id}`} color="link" size="sm">
                      {contractMarketPlace.id}
                    </Button>
                  </td>
                  <td>{contractMarketPlace.contractId}</td>
                  <td>
                    <Translate contentKey={`jhipsterFirstApplicationApp.MarketPlaceType.${contractMarketPlace.marketPlaceType}`} />
                  </td>
                  <td>{contractMarketPlace.dateAdd}</td>
                  <td>
                    {contractMarketPlace.contractId ? (
                      <Link to={`contract/${contractMarketPlace.contractId.id}`}>{contractMarketPlace.contractId.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contractMarketPlace.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contractMarketPlace.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contractMarketPlace.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipsterFirstApplicationApp.contractMarketPlace.home.notFound">
                No Contract Market Places found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ contractMarketPlace }: IRootState) => ({
  contractMarketPlaceList: contractMarketPlace.entities,
  loading: contractMarketPlace.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractMarketPlace);
