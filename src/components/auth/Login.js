import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/userDataActions";
import Spinner from "../layout/Spinner";

const Login = ({ auth, login, authLoading }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("axiom-auth-token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [auth]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (email.trim() === "" || password.trim() === "") {
      return alert("Some Credentials are Missing");
    }
    await login({
      email,
      password,
    });
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>Login User</h2>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='Enter Email'
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            placeholder='Enter Password'
            value={user.password}
            onChange={onChange}
          />
        </div>
        <input type='submit' value='Login' />
        <p>
          Haven't registered yet ?{" "}
          <NavLink to='/signup'>Register yourself</NavLink>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  authLoading: state.user.authLoading,
});

export default connect(mapStateToProps, { login })(Login);
