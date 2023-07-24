import React, { useState } from 'react';
// Components
import {
  LogIn,
  Register
 } from '../components'

export const LandingPage = ({ userLogInSubmit, userRegisterSubmit }) => {
  // const { userLogInSubmit, userRegisterSubmit } = useContext(BankContext);
  // to toggle between login and register
  const [display, setDisplay] = useState('login');
  const toggleDisplay = (to) => {
    setDisplay(to);
  }

  return (
    <div className="App">
      {
        display === "login" ? <LogIn changeOption = { toggleDisplay } userLogInSubmit = {userLogInSubmit} /> : <Register changeOption = { toggleDisplay } userRegisterSubmit = {userRegisterSubmit} />
      }
    </div>
  );
}

