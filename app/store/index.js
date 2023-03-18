import { createStore, combineReducers, applyMiddleware } from "redux";
import AuthReducers from "./reducers";
import thunk from "redux-thunk";
const RootReducers = combineReducers({
  AuthReducers,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));
