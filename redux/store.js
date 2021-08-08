import { categoryReducer } from "./reducer/categoryReducer";
import { postsReducer } from "./reducer/postsReducer";

const { combineReducers, createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");
const {
  userSignInReducer,
  userRegisterReducer,
  userUpdateReducer,
  userDeleteReducer,
} = require("./reducer/userReducer");

export const reducer = combineReducers({
  userSignInReducer,
  userRegisterReducer,
  userUpdateReducer,
  userDeleteReducer,
  postsReducer,
  categoryReducer,
});




