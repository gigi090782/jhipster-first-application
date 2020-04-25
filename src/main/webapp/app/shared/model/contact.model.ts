import { IClient } from 'app/shared/model/client.model';
import { ContactType } from 'app/shared/model/enumerations/contact-type.model';

export interface IContact {
  id?: number;
  clientId?: number;
  contactType?: ContactType;
  value?: string;
  clientId?: IClient;
}

export const defaultValue: Readonly<IContact> = {};
