import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContractMarketPlace from './contract-market-place';
import ContractMarketPlaceDetail from './contract-market-place-detail';
import ContractMarketPlaceUpdate from './contract-market-place-update';
import ContractMarketPlaceDeleteDialog from './contract-market-place-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ContractMarketPlaceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContractMarketPlaceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContractMarketPlaceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContractMarketPlaceDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContractMarketPlace} />
    </Switch>
  </>
);

export default Routes;
