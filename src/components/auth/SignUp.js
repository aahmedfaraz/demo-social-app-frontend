import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../actions/userDataActions";

const SignUp = ({ auth, signup }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (localStorage.getItem("axiom-auth-token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [auth]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = user;
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === ""
    ) {
      return alert("Some Credentials are Missing");
    }
    if (password !== password2) {
      return alert("Passwords are not Matching");
    }
    await signup(user);
    setUser({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  return (
    <div className='auth-container'>
      <form onSubmit={onSubmit}>
        <h2>Register User</h2>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            value={user.name}
            placeholder='Enter Name'
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={user.email}
            placeholder='Enter Email'
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={user.password}
            placeholder='Enter Password'
            onChange={onChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            id='password2'
            type='password'
            name='password2'
            value={user.password2}
            placeholder='Enter Password Again'
            onChange={onChange}
          />
        </div>
        <input type='submit' value='SignUp' />
        <p>
          Already have an account ? <NavLink to='/login'>Goto Login</NavLink>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user.auth,
});

export default connect(mapStateToProps, { signup })(SignUp);
