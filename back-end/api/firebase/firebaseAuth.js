import { initializeApp } from 'firebase-admin/app'; // To use the module in your application, require it from any JavaScript file
import admin from 'firebase-admin; // Admin SDK configuration snippet
const serviceAccount = require('./key.json');

const app = initializeApp();

// Admin SDK configuration snippet
// - https://firebase.google.com/docs/admin/setup#initialize-sdk
// -- Initialize the SDK in non-Google environments
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize the default app
const defaultApp = initializeApp(defaultAppConfig);
console.log(defaultApp.name);  // '[DEFAULT]'

// Retrieve services via shorthand notation
defaultAuth = getAuth();
defaultDatabase = getDatabase();

// Initialize the default app
initializeApp(defaultAppConfig);
console.log(getApp().name);  // '[DEFAULT]'

const deleteUserUsingEmail = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(user.uid);
    console.log('Successfully deleted user');
  } catch (error) {
    console.log('Error deleting user:', error);
  }
}

export default deleteUserUsingEmail;