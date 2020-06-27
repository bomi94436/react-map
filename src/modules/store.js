import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import position from "./position";

const rootReducer = combineReducers({
  position,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
