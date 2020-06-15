import { combineReducers } from "redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./reducers/user";
import ui from "./reducers/ui";
import blog from "./reducers/blogs";
import comment from "./reducers/comments";
import notifications from "./reducers/notifications";

const reducer = combineReducers({
  user,
  ui,
  blog,
  comment,
  notifications
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);
export default store;
