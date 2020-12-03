import { combineReducers } from "redux";

const fetchDataReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_DATA":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  data: fetchDataReducer,
});
