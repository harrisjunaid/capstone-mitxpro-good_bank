// Initialize the default app
import admin from 'firebase-admin'
var app = admin.initializeApp();

// Get the user by email
export const bingDeleteFirebaseUser = (email) => {
  admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}
