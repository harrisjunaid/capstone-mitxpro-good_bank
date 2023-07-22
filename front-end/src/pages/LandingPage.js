import React, { useState } from 'react';

//START_CODE
// components
import {
  LogIn,
  Register
 } from '../components'

export const LandingPage = ({userRegisterSubmit}) => {
  const [display, setDisplay] = useState('login');

  const toggleDisplay = (to) => {
    setDisplay(to);
  }

  return (
    <div className="App">
      {
        display === "login" ? <LogIn changeOption = { toggleDisplay } /> : <Register changeOption = { toggleDisplay } userRegisterSubmit = {userRegisterSubmit} />
      }
    </div>
  );
}

