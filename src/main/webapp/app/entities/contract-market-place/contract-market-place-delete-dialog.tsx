import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IContractMarketPlace } from 'app/shared/model/contract-market-place.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './contract-market-place.reducer';

export interface IContractMarketPlaceDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContractMarketPlaceDeleteDialog = (props: IContractMarketPlaceDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/contract-market-place');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.contractMarketPlaceEntity.id);
  };

  const { contractMarketPlaceEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="jhipsterFirstApplicationApp.contractMarketPlace.delete.question">
        <Translate
          contentKey="jhipsterFirstApplicationApp.contractMarketPlace.delete.question"
          interpolate={{ id: contractMarketPlaceEntity.id }}
        >
          Are you sure you want to delete this ContractMarketPlace?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-contractMarketPlace" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ contractMarketPlace }: IRootState) => ({
  contractMarketPlaceEntity: contractMarketPlace.entity,
  updateSuccess: contractMarketPlace.updateSuccess
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContractMarketPlaceDeleteDialog);
