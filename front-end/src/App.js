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
  TransferPage,
  Swagger
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
  const { activeUserEmail, roleAdmin, activeUser, allRecords, dataReloadSubmit, getUserDetails, userLogInSubmit, transactionExecute, userLogOutSubmit, userRegisterSubmit, userDeleteSubmit, transferExecute, userEditSubmit, setGoogleOAuthLogin} = useContext(BankContext);
  // const { setActiveUserEmail, nodeRecords} = useContext(BankContext);

  return ( 
    <>
      {
        !(activeUserEmail) ? <LandingPage userLogInSubmit={userLogInSubmit} userRegisterSubmit={userRegisterSubmit} setGoogleOAuthLogin={setGoogleOAuthLogin} /> : 
          <CustomRouter history={history}>
            <div className="App">
              <NavBar activeUserEmail={activeUserEmail.email} roleAdmin={roleAdmin} dataReloadSubmit={dataReloadSubmit} />
              <div id="page-body">
                <Routes>
                  <Route path="/"         element={<WelcomePage />} />
                  <Route path="/deposit"  element={<DepositPage       activeUserEmail={activeUserEmail} activeUser={activeUser} getUserDetails={getUserDetails} userLogOutSubmit={userLogOutSubmit} transactionExecute={transactionExecute} />} />
                  <Route path="/withdraw" element={<WithdrawPage      activeUserEmail={activeUserEmail} activeUser={activeUser} getUserDetails={getUserDetails} userLogOutSubmit={userLogOutSubmit} transactionExecute={transactionExecute}  />} />
                  <Route path="/transfer" element={<TransferPage      activeUserEmail={activeUserEmail} activeUser={activeUser} getUserDetails={getUserDetails} userLogOutSubmit={userLogOutSubmit} transferExecute={transferExecute}  />} />
                  <Route path="/swaggerUI"element={<Swagger />} />
                  <Route path="/create"   element={<CreateAccountPage userRegisterSubmit={userRegisterSubmit} />} />
                  <Route path="/all"      element={<AllDataPage       allRecords={allRecords} dataReloadSubmit={dataReloadSubmit} userDeleteSubmit={userDeleteSubmit} userEditSubmit={userEditSubmit} />} />
                  {/* <Route path="/edit/:id" element={<Edit />} /> */}
                  <Route path="*"         element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </CustomRouter>
      }    
    </>
  );
}

export default App;
