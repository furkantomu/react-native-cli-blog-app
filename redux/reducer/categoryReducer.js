import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from '../constants/categoryConstants';

export const categoryReducer = (
  state = {loading: false, category: []},
  action,
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {...state, loading: true};
    case CATEGORY_LIST_SUCCESS:
      return {...state, loading: false, category: action.payload};

    case CATEGORY_LIST_FAIL:
      return {...state, loading: false, error: action.payload};

    default:
      return state;
  }
};
