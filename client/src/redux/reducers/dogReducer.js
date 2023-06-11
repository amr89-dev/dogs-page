import {
  GET_ALL_DOGS,
  GET_ALL_TEMPERAMENTS,
  CREATE_DOG,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_ORIGIN,
  ORDER,
  NO_DATA,
} from "../actions-types/dogActionsTypes";

const initialState = {
  allDogs: [],
  temperament: [],
  dogsFiltered: [],
  dogsFilteredBD: [],
  dogsFilteredTemperament: [],
  fetchError: { dogs: null, temperaments: null },
};

export default function dogReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS: {
      return {
        ...state,
        allDogs: action.payload,
      };
    }
    case GET_ALL_TEMPERAMENTS: {
      return {
        ...state,
        temperament: action.payload,
      };
    }
    case CREATE_DOG: {
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
      };
    }
    case FILTER_BY_ORIGIN: {
      const dogsFiltered = !state.dogsFilteredTemperament.length
        ? [...state.allDogs]
        : [...state.dogsFilteredTemperament];

      const dogsFilteredBD = !state.dogsFilteredTemperament.length
        ? [...state.allDogs].filter((el) => {
            return el.created;
          })
        : [...state.dogsFilteredTemperament].filter((el) => {
            return el.created;
          });

      if (action.payload === "BD") {
        if (dogsFilteredBD.length > 0) {
          return {
            ...state,
            dogsFiltered: dogsFilteredBD,
          };
        } else {
          return {
            ...state,
            dogsFiltered: dogsFilteredBD,
            bdIsEmpty: true,
          };
        }
      }
      if (action.payload === "API") {
        return {
          ...state,
          dogsFiltered: dogsFiltered.filter((el) => {
            return !el.created;
          }),
        };
      }
      if (action.payload === "allDogs") {
        return {
          ...state,
          dogsFiltered: dogsFiltered,
        };
      }
      return {
        ...state,
        dogsFiltered: [],
      };
    }
    case FILTER_BY_TEMPERAMENT: {
      const dogsFiltered = [...state.allDogs];
      const tempTrick = dogsFiltered.filter((el) => {
        if (el.temperaments) {
          return el.temperaments?.map((el) => el.name).includes(action.payload);
        }
        return el.temperament?.includes(action.payload);
      });

      if (action.payload !== "all") {
        return {
          ...state,
          dogsFiltered: tempTrick,
          dogsFilteredTemperament: tempTrick,
        };
      }
      return {
        ...state,
        dogsFiltered: [],
        dogsFilteredTemperament: [],
      };
    }
    case ORDER: {
      let sortedDogs = [];

      if (state.dogsFilteredTemperament.length) {
        sortedDogs = [...state.dogsFilteredTemperament];
      } else if (state.dogsFiltered.length) {
        sortedDogs = [...state.dogsFiltered];
      } else {
        sortedDogs = [...state.allDogs];
      }
      //console.log(state.allDogs);

      if (action.payload === "up") {
        sortedDogs.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "down") {
        sortedDogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "min") {
        sortedDogs.sort((a, b) => {
          const aMin = Number(a.weight.split(" ")[0]);
          const bMin = Number(b.weight.split(" ")[0]);
          const aMax = Number(a.weight.split(" ")[2]);
          const bMax = Number(b.weight.split(" ")[2]);

          if (aMin < bMin) {
            return -1;
          }
          if (aMin > bMin) {
            return 1;
          }

          if (aMax < bMax) {
            return -1;
          }
          if (aMax > bMax) {
            return 1;
          }

          return 0;
        });
      }
      if (action.payload === "max") {
        sortedDogs.sort((a, b) => {
          const aMin = Number(a.weight.split(" ")[0]);
          const bMin = Number(b.weight.split(" ")[0]);
          const aMax = Number(a.weight.split(" ")[2]);
          const bMax = Number(b.weight.split(" ")[2]);

          if (aMin > bMin) {
            return -1;
          }
          if (aMin < bMin) {
            return 1;
          }

          if (aMax > bMax) {
            return -1;
          }
          if (aMax < bMax) {
            return 1;
          }

          return 0;
        });
      }

      return {
        ...state,
        dogsFiltered: sortedDogs,
      };
    }
    case NO_DATA: {
      console.log(action.payload);
      if (action.payload === "dogs") {
        return {
          ...state,
          fetchError: { ...state.fetchError, [action.payload]: true },
        };
      }

      if (action.payload === "temperaments") {
        return {
          ...state,
          fetchError: { ...state.fetchError, [action.payload]: true },
        };
      }
    }
    /* eslint-disable */
    default:
      return state;
  }
}
