import {
  SIGNUP_AND_GET_TOKEN,
  LOGIN_AND_GET_TOKEN,
  GET_USER_DATA,
  GET_USER_POSTS,
  GET_ALL_POSTS,
  ADD_POST,
  SET_CURRENT,
  UPDATE_POST,
  DELETE_POST,
  SET_AUTH_LOADING,
  SET_USER_LOADING,
  SET_USER_POSTS_LOADING,
  SET_ALL_POSTS_LOADING,
} from "../actions/types";

const initialState = {
  user: null,
  userPosts: null,
  allPosts: null,
  current: null,
  authLoading: false,
  userLoading: false,
  userPostsLoading: false,
  allPostsLoading: false,
  auth: false,
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_AND_GET_TOKEN:
      return {
        ...state,
        auth: action.payload,
        authLoading: false,
      };
    case LOGIN_AND_GET_TOKEN:
      return {
        ...state,
        auth: action.payload,
        authLoading: false,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
        userLoading: false,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        userPostsLoading: false,
      };
    case GET_ALL_POSTS:
      return {
        ...state,
        allPosts: action.payload,
        allPostsLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        userPosts: [action.payload, ...state.userPosts],
        userPostsLoading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        userPosts: state.filter((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        userPostsLoading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        userPosts: state.filter((post) => post._id !== action.payload._id),
        userPostsLoading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    case SET_USER_POSTS_LOADING:
      return {
        ...state,
        userPostsLoading: action.payload,
      };
    case SET_ALL_POSTS_LOADING:
      return {
        ...state,
        allPostsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default userDataReducer;
