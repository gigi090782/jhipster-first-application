import { IClient } from 'app/shared/model/client.model';
import { AddressType } from 'app/shared/model/enumerations/address-type.model';

export interface IAddress {
  id?: number;
  addressType?: AddressType;
  value?: string;
  client?: IClient;
}

export const defaultValue: Readonly<IAddress> = {};
