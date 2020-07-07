import { createStore, applyMiddleware } from "redux";
import reduceReducers from "reduce-reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import position from "./position";
import places from "./places";
import initState from "./initState";

const reducer = reduceReducers(initState, position, places);

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
