import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import * as serviceWorker from "./serviceWorker";

// redux dependencies
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "./reducers/RootReducer";

// initial state
const initialState = {
  posts: [],
  isLoading: true
};

// global store
export const store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
