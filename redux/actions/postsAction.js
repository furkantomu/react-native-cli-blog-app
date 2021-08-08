import {
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "../constants/postConstants";
import Axios from "axios";
import { URL } from "../../constants/URL";
import { POST_DELETE_SUCCESS } from './../constants/postConstants';

export const getPosts = (search) => async (dispatch) => {
  
  dispatch({
    type: POSTS_LIST_REQUEST,
  });
  try {
    
    const { data } = await Axios.get(`${search ?  URL + "/api/posts/?category=" + search :  URL + "/api/posts"}`);
      //`${URL}/api/posts`
      //`${search ? URL + "/api/posts/?category=" + search : + URL + "/api/posts"}`
      //`${search ? + URL+"/api/posts/?category=" + search : + URL + "/api/posts"}`
    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POSTS_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const updatePost = (id, update) => async (dispatch) => {
  dispatch({
    type: POST_UPDATE_REQUEST,
  });
  try {
    const { data } = await Axios.put(`${URL}/api/posts/${id}`, update);
    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const addPost = (newPost) => async (dispatch) => {
  dispatch({
    type: POST_ADD_REQUEST,
  });
  try {
    const { data } = await Axios.post(`${URL}/api/posts`, newPost);
    dispatch({
      type: POST_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_ADD_FAIL,
      payload: error.message,
    });
  }
};


export const deletePost = (id, deletedPost) => async (dispatch) => {
  dispatch({
    type: POST_DELETE_REQUEST,
  });
  try {
    
    const { data } = await Axios.delete(`${URL}/api/posts/${id}`, deletedPost);
    dispatch({
      type: POST_DELETE_SUCCESS,
      payload:{data,id},
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload: error.message,
    });
  }
};