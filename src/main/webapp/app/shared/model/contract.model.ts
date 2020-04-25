import { IContractMarketPlace } from 'app/shared/model/contract-market-place.model';
import { IClient } from 'app/shared/model/client.model';
import { ChannelType } from 'app/shared/model/enumerations/channel-type.model';

export interface IContract {
  id?: number;
  clientId?: number;
  channelType?: ChannelType;
  dateAdd?: string;
  contractMarketPlaces?: IContractMarketPlace[];
  clientId?: IClient;
}

export const defaultValue: Readonly<IContract> = {};
