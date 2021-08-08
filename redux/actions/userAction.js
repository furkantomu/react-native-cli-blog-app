import Axios from "axios";
import { URL } from "../../constants/URL";
import {
  PROFILE_DELETE_FAIL,
  PROFILE_DELETE_REQUEST,
  PROFILE_DELETE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstant";

export const signIn = (userData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: userData });

  try {
    const { data } = await Axios.post(`${URL}/api/auth/login`, userData);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: userData });
  try {
    const { data } = await Axios.post(`${URL}/api/auth/register`, userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const accountUpdate = (id, userData) => async (dispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });

  try {
    const { data } = await Axios.put(`${URL}/api/users/${id}`, userData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProfile = (id, username) => async (dispatch) => {
  
  dispatch({
    type: PROFILE_DELETE_REQUEST,
  });
  
  try {
    const { data } = await Axios.delete(`${URL}/api/users/${id}`, {id:id});
    
    dispatch({
      type: PROFILE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_DELETE_FAIL,
      payload: error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  dispatch({ type: USER_SIGNOUT });
};
