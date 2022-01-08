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

const Home = ({ auth, selected, getUser, user, userPosts, allPosts }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("axiom-auth-token")) {
      navigate("/login");
      localStorage.removeItem("axiom-auth-token");
    }
    getUser();
    // eslint-disable-next-line
  }, [auth, user]);

  if (!user) {
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
});

export default connect(mapStateToProps, { getUser })(Home);
