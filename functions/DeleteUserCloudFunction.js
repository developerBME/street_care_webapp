const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Triggered when a user is deleted from Firebase Authentication
exports.deleteUser = functions.auth.user().onDelete(async (user) => {
    const userId = user.uid;

    // Example: Delete user data from Firestore
    const firestore = admin.firestore();
    const userDocRef = firestore.collection('users').doc(userId);

    try {
        await userDocRef.delete();
        console.log('User data deleted successfully for user:', userId);
    } catch (error) {
        console.error('Error deleting user data for user:', userId, error);
    }
});
