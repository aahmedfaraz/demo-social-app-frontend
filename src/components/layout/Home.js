import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getUserPosts,
  getAllPosts,
} from "../../actions/userDataActions";
import Profile from "../pages/Profile";
import Timeline from "../pages/Timeline";
import NewsFeed from "../pages/NewsFeed";
import Spinner from "./Spinner";

const Home = ({
  auth,
  selected,
  getUser,
  getUserPosts,
  getAllPosts,
  user,
  userPosts,
  allPosts,
  authLoading,
  userLoading,
  userPostsLoading,
  allPostsLoading,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("axiom-auth-token")) {
      navigate("/login");
    } else {
      if (!user) {
        getUser();
      }
      if (user && !userPosts) {
        getUserPosts(user._id);
      }
      if (user && !allPosts) {
        getAllPosts();
      }
    }
    // eslint-disable-next-line
  }, [auth, user, userPosts, allPosts]);

  if (!user || userLoading || userPostsLoading || allPostsLoading) {
    return <Spinner />;
  }

  return (
    <main>
      {selected === "profile" ? (
        <Profile />
      ) : selected === "timeline" ? (
        <Timeline />
      ) : (
        <NewsFeed />
      )}
    </main>
  );
};

const mapStateToProps = (state) => ({
  selected: state.menu.selected,
  auth: state.user.auth,
  user: state.user.user,
  userPosts: state.user.userPosts,
  allPosts: state.user.allPosts,
  authLoading: state.user.authLoading,
  userLoading: state.user.userLoading,
  userPostsLoading: state.user.userPostsLoading,
  allPostsLoading: state.user.allPostsLoading,
});

export default connect(mapStateToProps, { getUser, getUserPosts, getAllPosts })(
  Home
);
