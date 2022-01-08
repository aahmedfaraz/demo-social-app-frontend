import axios from "axios";
import {
  SIGNUP_AND_GET_TOKEN,
  LOGIN_AND_GET_TOKEN,
  GET_USER_DATA,
  GET_USER_POSTS,
  GET_ALL_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  SET_CURRENT,
  SET_AUTH_LOADING,
  SET_USER_LOADING,
  SET_USER_POSTS_LOADING,
  SET_ALL_POSTS_LOADING,
} from "./types";

const backendURL = "http://axiom-social-app-backend.herokuapp.com";

// Action to SignUp and Get Token
export const signup = (userData) => async (dispatch) => {
  setAuthLoading();
  try {
    const res = await axios({
      method: "POST",
      url: `${backendURL}/api/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userData,
    });
    const data = await res.data;
    // Storing Token in Local Storage
    localStorage.setItem("axiom-auth-token", data.token);
    dispatch({
      type: SIGNUP_AND_GET_TOKEN,
      payload: !!data.token,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setAuthLoading(false);
};

// Action to Login and Get Token
export const login = (loginData) => async (dispatch) => {
  setAuthLoading();
  try {
    const res = await axios({
      method: "POST",
      url: `${backendURL}/api/auth`,
      data: loginData,
    });
    const token = await res.data;
    // Storing Token in Local Storage
    localStorage.setItem("axiom-auth-token", token.token);
    dispatch({
      type: LOGIN_AND_GET_TOKEN,
      payload: token.token ? true : false,
    });
    await getUser();
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setAuthLoading(false);
};

// Action to Get User Data using Token
export const getUser = () => async (dispatch) => {
  setUserLoading();
  try {
    const res = await axios({
      method: "GET",
      url: `${backendURL}/api/auth`,
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    const user = await res.data;

    dispatch({
      type: GET_USER_DATA,
      payload: user.user,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setUserLoading(false);
};

// Action to Get User Posts
export const getUserPosts = (userID) => async (dispatch) => {
  setUserPostsLoading();
  try {
    const res = await axios({
      method: "GET",
      url: `${backendURL}/api/posts/${userID}`,
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    const userPosts = await res.data;

    dispatch({
      type: GET_USER_POSTS,
      payload: userPosts.posts,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setUserPostsLoading(false);
};

// Action to Get All Posts
export const getAllPosts = () => async (dispatch) => {
  setAllPostsLoading();
  try {
    const res = await axios({
      method: "GET",
      url: `${backendURL}/api/posts`,
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    const allPosts = await res.data;

    dispatch({
      type: GET_ALL_POSTS,
      payload: allPosts.posts,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setAllPostsLoading(false);
};

// Action to add post
export const addPost = (postData) => async (dispatch) => {
  setUserPostsLoading();
  try {
    const res = await axios({
      method: "POST",
      url: `${backendURL}/api/posts`,
      data: postData,
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    const post = await res.data;

    dispatch({
      type: ADD_POST,
      payload: post.post,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setUserPostsLoading(false);
};

// Action to update post
export const updatePost = (updatedPost) => async (dispatch) => {
  setUserPostsLoading();
  try {
    const res = await axios({
      method: "PUT",
      url: `${backendURL}/api/posts/${updatedPost.id}`,
      data: {
        body: updatedPost.body,
      },
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    const returnedUpdatedPost = await res.data;

    dispatch({
      type: UPDATE_POST,
      payload: returnedUpdatedPost.post,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setUserPostsLoading(false);
};

// Action to delete post
export const deletePost = (id) => async (dispatch) => {
  setUserPostsLoading();
  try {
    await axios({
      method: "DELETE",
      url: `${backendURL}/api/posts/${id}`,
      headers: {
        "Content-Type": "application/json",
        "axiom-auth-token": `${localStorage.getItem("axiom-auth-token")}`,
      },
    });

    console.log("The Post has been Deleted");

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    console.log("Error ", err.response.data);
  }
  setUserPostsLoading(false);
};

// Action to Set Current to Update Post
export const setCurrent = (post) => ({
  type: SET_CURRENT,
  payload: post,
});

// Action to Set Loading
export const setAuthLoading = (loading = true) => ({
  type: SET_AUTH_LOADING,
  payload: loading,
});
export const setUserLoading = (loading = true) => ({
  type: SET_USER_LOADING,
  payload: loading,
});
export const setUserPostsLoading = (loading = true) => ({
  type: SET_USER_POSTS_LOADING,
  payload: loading,
});
export const setAllPostsLoading = (loading = true) => ({
  type: SET_ALL_POSTS_LOADING,
  payload: loading,
});
