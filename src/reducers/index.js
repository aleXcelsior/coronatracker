import { combineReducers } from "redux";

const dummyReducer = (state, action) => {
  return 21123123;
};

export default combineReducers({
  dummy: dummyReducer,
});
