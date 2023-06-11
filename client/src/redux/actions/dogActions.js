import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  CREATE_DOG,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  ORDER,
  NO_DATA,
} from "../actions-types/dogActionsTypes";
import axios from "axios";
const endpoint = "http://localhost:3001/dogs";
const endpointTemp = "http://localhost:3001/temperaments";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      let getDogs = await axios.get(endpoint);
      let data = getDogs.data;

      return dispatch({ type: GET_ALL_DOGS, payload: data });
    } catch (err) {
      return dispatch({ type: NO_DATA, payload: "dogs" });
    }
  };
};
export const getAllTemperaments = () => {
  return async (dispatch) => {
    try {
      let getTemp = await axios.get(endpointTemp);
      let data = getTemp.data;
      return dispatch({ type: GET_ALL_TEMPERAMENTS, payload: data });
    } catch (err) {
      return dispatch({ type: NO_DATA, payload: "temperaments" });
    }
  };
};
export const createDog = (data) => ({ type: CREATE_DOG, payload: data });

export const filterDogsByTemperament = (temperament) => ({
  type: FILTER_BY_TEMPERAMENT,
  payload: temperament,
});
export const filterDogsByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});
export const orderDogs = (order) => ({ type: ORDER, payload: order });
export const noAction = () => ({ type: NO_DATA });
