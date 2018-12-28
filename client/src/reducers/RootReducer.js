import { combineReducers } from "redux"
import posts from "./Posts"
import isLoading from './Loading'

const RootReducer = combineReducers({
  posts,
  isLoading
});

export default RootReducer;