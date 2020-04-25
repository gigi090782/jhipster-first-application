import { IAddress } from 'app/shared/model/address.model';
import { IContact } from 'app/shared/model/contact.model';
import { IContract } from 'app/shared/model/contract.model';

export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  dateAdd?: string;
  addresses?: IAddress[];
  contacts?: IContact[];
  contracts?: IContract[];
}

export const defaultValue: Readonly<IClient> = {};
