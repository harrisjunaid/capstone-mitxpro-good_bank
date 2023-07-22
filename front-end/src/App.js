import React, { useContext, useLayoutEffect, useState } from 'react'
// ROUTER
import { Routes, Route, Router } from 'react-router-dom';
// CSS
import './App.css';
// PAGES
import { 
  LandingPage, 
  WelcomePage, 
  CreateAccountPage, 
  DepositPage,
  WithdrawPage,
  AllDataPage,
  NotFoundPage,
  TransferPage
 } from './pages';
// COMPONENTS
import {
  NavBar,
  history
} from './components';
// CONTEXT
import { BankContext } from './assets/context/BankContext';

/**
 * https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
 * https://codesandbox.io/s/agitated-euler-90kf3?fontsize=14&hidenavigation=1&module=/src/App.js&theme=dark&file=/src/store.js
 */
const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

function App() {
  const { activeUserEmail, roleAdmin, activeUser, allRecords ,setActiveUserEmail, getUserDetails, nodeRecords , userLogInSubmit, transactionExecute, userLogOutSubmit, userRegisterSubmit, userDeleteSubmit, dataReloadSubmit, transferExecute, userEditSubmit} = useContext(BankContext);
  // activeUserEmail by default is undefined
  
  return ( 
    <>
      {
        !(activeUserEmail) ? <LandingPage userRegisterSubmit={userRegisterSubmit}/> : 
        <CustomRouter history = {history}>
          <div className="App">
            <NavBar email={activeUserEmail.email} roleAdmin={roleAdmin} />
            <div id="page-body">
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/deposit" element={<DepositPage activeUser = {activeUser} activeUserEmail = {activeUserEmail} getUserDetails = {getUserDetails} userLogOutSubmit = {userLogOutSubmit} transactionExecute = {transactionExecute} />} />
                <Route path="/withdraw" element={<WithdrawPage />} />
                <Route path="/transfer" element={<TransferPage />} />
                <Route path="/create" element={<CreateAccountPage userRegisterSubmit = {userRegisterSubmit} />} />
                <Route path="/all" element={<AllDataPage allRecords={allRecords} nodeRecords = {nodeRecords} userDeleteSubmit={userDeleteSubmit} userEditSubmit={userEditSubmit} />} />
                {/* <Route path="/edit/:id" element={<Edit />} /> */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </div>
        </CustomRouter>
      }    
    </>
  );
}

export default App;
