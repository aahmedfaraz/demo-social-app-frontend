import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Profile = ({ user, userLoading }) => {
  if (userLoading) {
    return <Spinner />;
  }

  const { name, email, date } = user;

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <ul>
        <li>
          <span>Name</span>
          <span>{name}</span>
        </li>
        <li>
          <span>Email</span>
          <span>{email}</span>
        </li>
        <li>
          <span>Acc Creation Date</span>
          <span>{`${new Date(date)}`}</span>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  userLoading: state.user.userLoading,
});

export default connect(mapStateToProps, null)(Profile);
