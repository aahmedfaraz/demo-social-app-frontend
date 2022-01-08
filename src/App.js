import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./components/layout/Layout";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Home from "./components/layout/Home";
import MenuTab from "./components/layout/MenuTab";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <>
                  <MenuTab />
                  <Home />
                </>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
