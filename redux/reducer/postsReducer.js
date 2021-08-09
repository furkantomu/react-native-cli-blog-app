import {
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POST_ADD_FAIL,
  POST_ADD_REQUEST,
  POST_ADD_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_SUCCESS,
  POST_DELETE_REQUEST,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "../constants/postConstants";
import initialState from "../initialState";


export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_LIST_REQUEST:
      return { ...state, loading: true };
    case POSTS_LIST_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case POSTS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_UPDATE_REQUEST:
      return { ...state, loading: true };
    case POST_UPDATE_SUCCESS:
      let updatePost = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      return { ...state, posts: updatePost, loading: false };
    case POST_UPDATE_FAIL:
      return { ...state, error: action.payload, loading: false };
    case POST_ADD_REQUEST:
      return { ...state, loading: true };
    case POST_ADD_SUCCESS:
      return {
        ...state,
        posts: [ action.payload,...state.posts],
        loading: false,
      };
    case POST_ADD_FAIL:
      return { ...state, error: action.payload, loading: false };
    case POST_DELETE_REQUEST:
      return { ...state, loading: true };
    case POST_DELETE_SUCCESS:
      return {...state,loading:false,posts:state.posts.filter((post) => post._id !== action.payload.id)}
    case POST_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
