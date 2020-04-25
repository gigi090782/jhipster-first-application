import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContactDetail = (props: IContactDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { contactEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterFirstApplicationApp.contact.detail.title">Contact</Translate> [<b>{contactEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="clientId">
              <Translate contentKey="jhipsterFirstApplicationApp.contact.clientId">Client Id</Translate>
            </span>
          </dt>
          <dd>{contactEntity.clientId}</dd>
          <dt>
            <span id="contactType">
              <Translate contentKey="jhipsterFirstApplicationApp.contact.contactType">Contact Type</Translate>
            </span>
          </dt>
          <dd>{contactEntity.contactType}</dd>
          <dt>
            <span id="value">
              <Translate contentKey="jhipsterFirstApplicationApp.contact.value">Value</Translate>
            </span>
          </dt>
          <dd>{contactEntity.value}</dd>
          <dt>
            <Translate contentKey="jhipsterFirstApplicationApp.contact.clientId">Client Id</Translate>
          </dt>
          <dd>{contactEntity.clientId ? contactEntity.clientId.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/contact" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/contact/${contactEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ contact }: IRootState) => ({
  contactEntity: contact.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);
