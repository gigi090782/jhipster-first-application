import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContractMarketPlace, defaultValue } from 'app/shared/model/contract-market-place.model';

export const ACTION_TYPES = {
  FETCH_CONTRACTMARKETPLACE_LIST: 'contractMarketPlace/FETCH_CONTRACTMARKETPLACE_LIST',
  FETCH_CONTRACTMARKETPLACE: 'contractMarketPlace/FETCH_CONTRACTMARKETPLACE',
  CREATE_CONTRACTMARKETPLACE: 'contractMarketPlace/CREATE_CONTRACTMARKETPLACE',
  UPDATE_CONTRACTMARKETPLACE: 'contractMarketPlace/UPDATE_CONTRACTMARKETPLACE',
  DELETE_CONTRACTMARKETPLACE: 'contractMarketPlace/DELETE_CONTRACTMARKETPLACE',
  RESET: 'contractMarketPlace/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContractMarketPlace>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContractMarketPlaceState = Readonly<typeof initialState>;

// Reducer

export default (state: ContractMarketPlaceState = initialState, action): ContractMarketPlaceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTRACTMARKETPLACE):
    case REQUEST(ACTION_TYPES.UPDATE_CONTRACTMARKETPLACE):
    case REQUEST(ACTION_TYPES.DELETE_CONTRACTMARKETPLACE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE):
    case FAILURE(ACTION_TYPES.CREATE_CONTRACTMARKETPLACE):
    case FAILURE(ACTION_TYPES.UPDATE_CONTRACTMARKETPLACE):
    case FAILURE(ACTION_TYPES.DELETE_CONTRACTMARKETPLACE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRACTMARKETPLACE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTRACTMARKETPLACE):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTRACTMARKETPLACE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTRACTMARKETPLACE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/contract-market-places';

// Actions

export const getEntities: ICrudGetAllAction<IContractMarketPlace> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTRACTMARKETPLACE_LIST,
  payload: axios.get<IContractMarketPlace>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContractMarketPlace> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTRACTMARKETPLACE,
    payload: axios.get<IContractMarketPlace>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContractMarketPlace> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTRACTMARKETPLACE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContractMarketPlace> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTRACTMARKETPLACE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContractMarketPlace> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTRACTMARKETPLACE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
