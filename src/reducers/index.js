import { combineReducers } from "redux";

const fetchDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

const setSelectedCountryReducer = (initialState = "Sweden", action) => {
  switch (action.type) {
    case "SELECTED_COUNTRY":
      return action.payload;
    default:
      return initialState;
  }
};

export default combineReducers({
  data: fetchDataReducer,
  selectedCountry: setSelectedCountryReducer,
});
