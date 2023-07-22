import {  useState, useEffect } from 'react';
// context to create provider
import { BankContext } from './BankContext';
// firebase
import {
  signUp, 
  signIn, 
  signOut,
  updateEmail,
  updatePassword,
  deleteUser
} from '../../components/auth/firebaseAuth';

import {
	nodeReadUserEmail,
  nodeReadAll,
  nodeUpdate,
  nodeCreate,
  nodeDelete
} from '../../components/node_api'

import { history } from '../../components';

// context provider
export const BankProvider = ({children}) => {
	const [activeUserEmail, setActiveUserEmail] = useState(undefined);
  const [roleAdmin, setRoleAdmin] = useState(false); 
  const [activeUser, setActiveUser] = useState(undefined);
  const [allRecords, setAllRecords] = useState(undefined);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
// get details of activeUser  and allRecords from mongo using activeUserEmail
// ########################################
// ## TO UPDATE "setActiveUserEmail useState" AS APP CONTEXT ##
  /**
   * EXECUTES signIn() in firebaseAuth.js
   * THEN getUser() in firebaseAuth.js to get userEmailOBJ
   * THEN setActiveUserEmail(resultEmail)
   * @param {*} values: OBJ containing email and password
   * @returns if error
   */
  const userLogInSubmit = async (values) => {// FIRST ATTEMPT
    console.log('EXECUTED: userLogInSubmit() in BankProvider')
    try {
      /**
       * EXECUTES signIn() in firebaseAuth.js
       */
      const emailString = await signIn(values?.email, values?.password); // returns a promise
      console.log('userLogInSubmit() in BankProvider emailString', emailString)
      if(emailString === null || emailString === undefined) return
      setActiveUserEmail(JSON.parse(`{"email": "${emailString}"}`)) // parse the string to JSON
      if(emailString === adminEmail) setRoleAdmin(true)
    } catch(error) {
      console.log(error)
    }
  }

// ########################################
/**
 * HANDLES DEPOSIT AND WITHDRAWAL TRANSACTIONS
 * async function to update mongoDB
 * using nodeUpdate() in ./api_mongo
 * @param {*} newUserOBJ 
 * @returns (not in use) resStatusOBJ
 */
  const transactionExecute = async (newUserOBJ, typeString) => { // WITH UPDATED BALANCE
    console.log('EXECUTED: transactionExecute() in BankProvider')
    // MONGO - check if user email and password are same as activeUser for _id
    const mongoUserForActiveUserEmail = await nodeReadUserEmail(activeUserEmail);
    console.log('nodeReadUserEmail() output in transactionExecute() 👤 mongoUserForActiveUserEmail', mongoUserForActiveUserEmail)
    switch(typeString) {
    // case for deposit and withdraw
      case 'deposit':
      case 'withdraw':      
      case 'transfer-from':
      if((mongoUserForActiveUserEmail?.email !== activeUserEmail?.email) || (mongoUserForActiveUserEmail?.password !==newUserOBJ?.password)){
        console.log("✉️ or 🔑 have changed during current session")
        userLogOutSubmit();
        return
      } else {
          try {
            // update mongo
            const resStatus = await nodeUpdate(newUserOBJ);
            const resStatusOBJ = await resStatus
            return resStatusOBJ;
          } catch(error) {
            console.log(error)
          }
        }
        break;
      // case for transfer
      case 'transfer-to':
        // if((mongoUserForActiveUserEmail?.email !== activeUserEmail?.email) || (mongoUserForActiveUserEmail?.password !==newUserOBJ?.password)){
        //   console.log("👤.email != 🤠 activeUserEmail")
        //   console.log(mongoUserForActiveUserEmail?.email, activeUserEmail?.email)
        //   userLogOutSubmit();
        //   return
        // } else {
          try {
            if (mongoUserForActiveUserEmail?.email !== activeUserEmail?.email) return
            if (mongoUserForActiveUserEmail?.password !==newUserOBJ?.password) return
            // update mongo
            const resStatus = await nodeUpdate(newUserOBJ);
            const resStatusOBJ = await resStatus
            return resStatusOBJ;
          } catch(error) {
            console.log(error)
          }
          // }
          break;
      default:
        console.log('transactionExecute() in BankProvider: typeString not found')
        break;

    }
}
// ########################################
  const userEditSubmit = async (editEmailId, newRecordOBJ) => {
    console.log('EXECUTED: userEditSubmit() in BankProvider with input', editEmailId, newRecordOBJ)
    const recentDetails = await nodeReadUserEmail(editEmailId); // get recent details from mongo
    console.log('userEditSubmit() in BankProvider recentDetails', recentDetails)
    const updatedDetails = {...recentDetails, ...newRecordOBJ}; // merge recent details with new details
    console.log('userEditSubmit() in BankProvider updatedDetails', updatedDetails)
    const valuesOBJ = { // create values OBJ for updateEmail()
      "email": recentDetails?.email,
      "password": recentDetails?.password,
      "newEmail": updatedDetails?.email,
      "newPassword": updatedDetails?.password
    }
    try{
       // * * UPDATE EMAIL * *
      if(recentDetails?.email !== updatedDetails?.email) {  
        // FIREBASE
        await updateEmail(valuesOBJ); // update firebase
        // MONGO
        await nodeUpdate(updatedDetails); // update mongo
        return
        } 
      // * * UPDATE PASSWORD * *
      if(recentDetails?.password !== updatedDetails?.password) {
      // FIREBASE
      await updatePassword(valuesOBJ); // update firebase
      // MONGO
      await nodeUpdate(updatedDetails); // update mongo
      return
      }
    } catch(error) {
      console.log(error)
    }
  }
// ########################################
  const transferExecute = async (values) => {
    console.log('EXECUTED: transferExecute() in BankProvider with input', values)
    try {
      // get recent user details from mongo
      const userFrom = await nodeReadUserEmail({"email":values?.emailFrom});
      const userTo = await nodeReadUserEmail({"email": values?.emailTo});
      console.log((userFrom?.email===values?.emailFrom), (userTo?.email===values?.emailTo))
      if(userTo?.email === values?.emailTo) {
        // create updated user objects
        const newUserFrom = {...userFrom, balance: Number(userFrom?.balance) - Number(values?.amount)};
        const newUserTo = {...userTo, balance: Number(userTo?.balance) + Number(values?.amount)};
        // update mongo
        await transactionExecute(newUserFrom, 'transfer-from');
        await transactionExecute(newUserTo, 'transfer-to');

        // update local activeUser
        getUserDetails();
        return true
      }
      else {
        console.log('transferExecute() in BankProvider: userFrom or userTo not found')
        return false;
      }
    } catch(error) {
      console.log(error)
    }
  }
// ########################################
  const userLogOutSubmit = async () => {
    try {
      await signOut();
      setActiveUserEmail(undefined);
      setActiveUser(undefined);
      setAllRecords(undefined);
      setRoleAdmin(false);
      history.push('/');
    } catch(error) {
      console.log(error)
    }
  }
// ########################################  
  const userRegisterSubmit = async (values) => {
    console.log('EXECUTED: userRegisterSubmit() in BankProvider with input', values)
    try {
      // firebase
      const firebaseUser = await signUp(values?.email, values?.password);
      console.log('userRegisterSubmit(): signUp() returned firebaseUser', firebaseUser)
      if(firebaseUser === (null ||  undefined)) return false // check if the user is already registered
      // mongo
      const resNodeCreate = await nodeCreate(values?.name, values?.email, values?.password, 0); // Wait for the second promise to resolve
      // indicate success
      if((firebaseUser?.user?.email === values?.email) && resNodeCreate?.status === 200){
        console.log('userRegisterSubmit(): successfully created user in firebase and mongodb')
        return firebaseUser
        // IMPORTANT: not to update setActiveUserEmail() 
        // setActiveUserEmail(JSON.parse(`{"email": "${values?.email}"}`)) // parse the string to JSON
      }
    } catch(error) {
      console.log(error)
    }
  }

// ########################################
  const userDeleteSubmit = async (user) => {
    console.log('EXECUTED: userDeleteSubmit() in BankProvider wih input', user)
    if (user === undefined) {
      console.log('userDeleteSubmit() in BankProvider: user is undefined')
      return
    }
    try {
      await deleteUser(user); // firebase
      await nodeDelete(user._id); // mongo
      nodeRecords(); // update allRecords
    } catch(error) {
      console.log(error)
    }
  }
// ########################################
// ##  TO UPDATE "setActiveUser useState" AS APP CONTEXT ## 
  /**
   * calls nodeReadUserEmail() to get user details
   * - sets activeUser
   * - called from useEffect() with activeUserEmail as dependency
   */
  const getUserDetails = async () => {
    console.log('EXECUTED: getUserDetails() in BankProvider')
    const response = await nodeReadUserEmail(activeUserEmail);
    console.log('getUserDetails() in BankProvider', response)
    setActiveUser(response);
  }
//
  useEffect(() => { // update activeUser when activeUserEmail changes
    console.log('EXECUTED: useEffect()[activeUserEmail] in BankProvider to call getUserDetails()')
    if (!!activeUserEmail) {
      getUserDetails()
      }    
  }, [activeUserEmail])
// ########################################
// ##  TO UPDATE "setAllRecords useState" AS APP CONTEXT ## 
  /**
   * calls nodeReadAll() to get all mongo records
   * @returns all mongo records
   */
  const nodeRecords = async () => {
    const responsePromise = await nodeReadAll();
    const response = await responsePromise
    console.log('mongoRecods() in BankProvider', response)
    setAllRecords(response);
    return response;
  }

  useEffect(() => {  // update allRecords when activeUserEmail changes
    if (activeUserEmail) {
      nodeRecords().then(()=>{console.log('nodeRecords() from useEffect() in BankProvider activeUserEmail')});
    }
  }, [activeUserEmail, activeUser])
// ########################################
  const dataReloadSubmit = async () => {
    try {
      await nodeRecords();
    } catch(error) {
      console.log(error)
    }
  }
// ########################################
	return (
			<BankContext.Provider value={{ activeUserEmail, roleAdmin, activeUser, allRecords ,setActiveUserEmail, getUserDetails, nodeRecords , userLogInSubmit, transactionExecute, userLogOutSubmit, userRegisterSubmit, userDeleteSubmit, dataReloadSubmit, transferExecute, userEditSubmit}}>
					{children}
			</BankContext.Provider>
	)
}