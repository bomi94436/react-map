import { combineReducers, createStore } from "redux";
import position from "./position";

const rootReducer = combineReducers({
  position,
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
