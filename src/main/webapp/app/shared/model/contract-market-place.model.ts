import { IContract } from 'app/shared/model/contract.model';
import { MarketPlaceType } from 'app/shared/model/enumerations/market-place-type.model';

export interface IContractMarketPlace {
  id?: number;
  marketPlaceType?: MarketPlaceType;
  dateAdd?: string;
  contract?: IContract;
}

export const defaultValue: Readonly<IContractMarketPlace> = {};
