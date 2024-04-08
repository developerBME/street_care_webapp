import { auth, db } from "../firebase";
import { getAuth, updateEmail, sendEmailVerification } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

//code is work in progress
export async function updateUserEmail(oldEmail, newEmail) {
    try {
      console.log(auth);
      const user = auth?.currentUser;
      const uid = user?.uid;
      console.log(uid);

      //1. sending 2FA code to old email id
      const send2FAResponse = await axios.post('https://us-central1-your-project-id.cloudfunctions.net/sendUpdateEmail2FACode', {
        userEmail: oldEmail,
        UID: uid,
        timestamp: Date.now().toString()
      });
  
      if (send2FAResponse.status !== 200) {
        throw new Error('Failed to send 2FA code');
      }
  
      //2. verifying 2FA code for old email within 5 min duration
      const minimumDuration = 5 * 60 * 1000; 
      const startTime = Date.now();
      let isCodeVerified = false;
  
      while (Date.now() - startTime < minimumDuration) {
        let code; // how do we retrive code from user since its not passed in the function parameters? Dont we get it from UI elementId?
        const verify2FAResponse = await axios.post('https://us-central1-your-project-id.cloudfunctions.net/verifyUpdateEmail2FACode', {
          userEmail: oldEmail,
          UID: uid,
          timestamp: Date.now().toString(),
          code: code
        });
  
        if (verify2FAResponse.status === 200) {
          isCodeVerified = true;
          break;
        }
  
        //checking after every 30 sec inteval
        await new Promise(resolve => setTimeout(resolve, 30 * 1000));
      }
  
      if (!isCodeVerified) {
        throw new Error('Failed to verify 2FA code within the minimum duration');
      }

      //repeat same logic for sending 2FA to new email and verifying it
      //3. sending 2FA code to old email id
      //4. verifying 2FA code for new email within 5 min duration 

      //5. update user's new email in db
      await updateEmail(user, newEmail);
      const currentUser = auth?.currentUser;
      console.log(currentUser);
      
      const userRef = doc(db, "users", uid);
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const userEmail = userData.email;  
        console.log(userData);
  
        await updateDoc(userRef, {
          email: newEmail
        });
  
        //6. code for logging code, old and new email in db
        console.log("New email updated");
      } else {
        console.error("User not found");
      }
  
      console.log('Email updated successfully');

    

    } catch (error) {
      console.error('Error updating email:', error);
      return false;
    }
  }
  