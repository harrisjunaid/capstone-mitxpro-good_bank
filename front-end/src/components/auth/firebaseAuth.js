import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBwgK_FD4pIS6NiS5mZ3zsrwBiOgFW-ER4",
//   authDomain: "mitxpro-capstone-1.firebaseapp.com",
//   projectId: "mitxpro-capstone-1",
//   storageBucket: "mitxpro-capstone-1.appspot.com",
//   messagingSenderId: "899645395923",
//   appId: "1:899645395923:web:11ecd5f519d48e6d57d526",
//   measurementId: "G-NFJYQGS4MS"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDn3YVt67m42dryTHoCqHzscxV5xqdiGxY",
  authDomain: "good-bank-5051.firebaseapp.com",
  projectId: "good-bank-5051",
  storageBucket: "good-bank-5051.appspot.com",
  messagingSenderId: "387709040027",
  appId: "1:387709040027:web:03211058ab645ceb11dd3e",
  measurementId: "G-SKHQXPLKCK"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// const db = firebaseApp.firestore();
// const storage = firebase.storage();

export const signUp = async (email, password) =>  {
  console.log('EXECUTED: signUp() in firebaseAuth.js using auth.createUserWithEmailAndPassword(email, password)')
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password); // Wait for the promise to resolve
    const user = userCredential.user;
    console.log('Registered as:', user.email, 'from returned userCredential');
    // console.log(JSON.stringify(userCredential, null, 2))
    return userCredential;
  } catch (error) { // Handle any errors that may occur
    // Sign up failed
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Sign up failed:', errorCode, errorMessage);
    alert(`👾👾 ${errorMessage}`)
  }
}

export const signIn = async (email, password) =>  {
  console.log('EXECUTED: signIn() in firebaseAuth.js')
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('signIn() .signInWighEmailAndPassword:', user.email, typeof(user.email));
    const userCredential_user_email = user.email;
    return userCredential_user_email;
  } catch (error) {
    signOut(); // IMPORTANT: Sign out user if sign in failed
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Sign in failed:', errorCode, errorMessage);
    alert("EMAIL AND PASSWORD DO NOT MATCH: 👾")
  }
}
  export const signOut = async () => {
    console.log('EXECUTED: signOut() in firebaseAuth.js')
    try {
      await auth.signOut()
      console.log('Signed out');
    } catch (error) {
      console.log('Sign out failed:', error);
      alert("SIGN OUT FAILED: 👾")
    }
  }

export const updatePassword = async (values) => {
  console.log("EXECUTED: updatePassword() in firebaseAuth.js input", values)
  const userCredential= await auth.signInWithEmailAndPassword(values?.email, values?.password)
  if(!userCredential) {
    console.log("updatePassword() - no userCredential")
    return null
  };
  try {
    await auth.currentUser.updatePassword(values?.newPassword);
    const updatedUserCredential = firebase.auth.EmailAuthProvider.credential(values?.email, values?.newPassword);
    await auth.currentUser.reauthenticateWithCredential(updatedUserCredential)
    console.log('Password updated');
  } catch (error) {
    // Password update failed
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Password update failed:', errorCode, errorMessage);
  }
}

export const updateEmail = async (values) => {
  console.log("EXECUTED: updateEmail() in firebaseAuth.js input", values)
  const userCredential= await auth.signInWithEmailAndPassword(values?.email, values?.password)
  if(!userCredential) {
    console.log("updateEmail() - no userCredential")
    return null
  };
  try {
    await auth.currentUser.updateEmail(values?.newEmail);
    const updatedUserCredential = firebase.auth.EmailAuthProvider.credential(values?.newEmail, values?.password);
    await auth.currentUser.reauthenticateWithCredential(updatedUserCredential)
    console.log('Email updated');
  } catch (error) {
    // Email update failed
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Email update failed:', errorCode, errorMessage);
  }
};


// export const updateEmailPassword = async (values) =>  {
//   console.log("EXECUTED: updateEmailPassword() in firebaseAuth.js input", values)

//   try {
//     await auth.signInWithEmailAndPassword(values?.email, values?.password)
//     const firebaseUser = auth.currentUser;
//     console.log("firebaseUser with initial values🔥", firebaseUser)
//     async function handleEmailUpdate() {
//       if(values?.email !== values?.newEmail) {
//         try{
//           await firebaseUser.updateEmail(values?.newEmail)
//           const updatedUserCredential = firebase.auth.EmailAuthProvider.credential(values?.newEmail, values?.password);
//           await firebaseUser.reauthenticateWithCredential(updatedUserCredential)
//           console.log("firebaseUser with updated values🔥", firebaseUser)
//           return firebaseUser
//         } catch (error) {
//           // Email update failed
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log('handleEmailUpdate() block error:', errorCode, errorMessage);
//         }
//       } else {
//         return firebaseUser
//       }      
//     }
    
//     async function handlePasswordUpdate() {
//       const updatedUser = await handleEmailUpdate()
//       console.log("updatedUser", updatedUser)
//       if(values?.password !== values?.newPassword) {
//         try{
//           await updatedUser.updatePassword(values?.newPassword)
//           console.log("firebaseUser with updated values🔥", updatedUser)
//           return updatedUser
//         } catch (error) {
//           // Email update failed
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log('handlePasswordUpdate() block error:', errorCode, errorMessage);
//         }
//       } else {
//         return updatedUser
//       }
//     }
//     await handlePasswordUpdate()
//     console.log('Email and Password updated');
//   } catch (error) {
//     // Email update failed
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log('Email and Password update failed:', errorCode, errorMessage);
//   }
// }


export const deleteUser = async (user) => {
  console.log("EXECUTED: deleteUser() in firebaseAuth.js")
  await auth.signInWithEmailAndPassword(user.email, user.password)
  try {
    if(auth?.currentUser?.email === user.email) {
      await auth.currentUser.delete(); // Wait for the promise to resolve
      // User deleted successful
      console.log('**********User deleted********');
    } else {
      console.log("deleteUser() - email does not match currentUser.email")
    }
  } catch (error) { // Handle any errors that may occur
    // User deleted failed
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('User deleted failed:', errorCode, errorMessage);
  }
}

/**
 * auth.currentUser
 * @returns email object
 */
export const getUser = async () => {
  console.log("EXECUTED: getUer() in firebaseAuth.js")
  const userObj = await auth.currentUser;
  if (!userObj) {
    console.log("getUser() - no userObj")
    return null
  };
  // console.log(JSON.stringify(userObj, null, 2))
  console.log("getUser() userOBJ.email",userObj.email)
  return {
    email: userObj.email
  };
}

// export const getAuth = () => {
//   return auth;
// }

// export const addAuthListener = (callback) => auth.onAuthStateChanged((user) => {
//   console.log("ADD AUTH LISTENER: addAuthListener()", user?.email, !!user?.email)
//   callback(!!user?.email ? user?.email : null);
// });


// export const getFirestore = () => {
//   return firebase.firestore();
// }

// export const resetPassword = (email)  => {
//   auth.sendPasswordResetEmail(email)
//     .then(() => {
//       // Password reset successful
//       console.log('Password reset email sent');
//     })
//     .catch((error) => {
//       // Password reset failed
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log('Password reset failed:', errorCode, errorMessage);
//     });
// }


