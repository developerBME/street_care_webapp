const send2FA = async (userEmail, uid, timestamp) => {
    const data = {
      userEmail,
      uid,
      timestamp
    };
    try {
      const response = await fetch('https://us-central1-streetcare-d0f33.cloudfunctions.net/send2FACodeForEmailUpdate', {
        //mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.text();
  
      if (response.ok) {
        console.log(responseData);
        console.log('2FA code sent successfully.');
      } else {
        console.error(responseData);
        console.log('Failed to send 2FA code: ' + responseData);
      }
      return { status: response.status, data: responseData };
    } catch (error) {
      console.error('Error:', error);
      console.log('Error sending 2FA code');
      return { status: 'error', data: error.message };
    }
  };
  
  const verify2FA = async (userEmail, uid, timestamp, code) => {
    const data = {
      userEmail,
      uid,
      timestamp,
      code
    };
  
    try {
      const response = await fetch('https://us-central1-streetcare-d0f33.cloudfunctions.net/verifyUpdateEmail2FACode', {
        //mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const responseData = await response.text();
  
      if (response.ok) {
        console.log(responseData);
        console.log('2FA code verified successfully.');
      } else {
        console.error(responseData);
        console.log('Failed to verify 2FA code: ' + responseData);
      }
      return { status: response.status, data: responseData };
    } catch (error) {
      console.error('Error:', error);
      console.log('Error verifying 2FA code');
      return { status: 'error', data: error.message };
    }
  };

const customUpdateEmail = async (user, newEmail) => {
    //const idToken = await user.getIdToken(true);
    const idToken = user?.accessToken;//user.stsTokenManager.accessToken
    const uid = user?.uid;
    try {
    const response = await fetch('https://us-central1-streetcare-d0f33.cloudfunctions.net/customUpdateUserEmail', {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ newEmail, uid: uid })
    });
    const responseData = await response.text();//await response.json();
    if (response.ok) {
      console.log(responseData);
    } else {
      console.log(responseData);
      console.error('Failed to update email');
    }
    return { status: response.status, data: responseData };
  } catch (error) {
    console.error('Error:', error);
    console.log('Error updating email without firebase verification');
    return { status: 'error', data: error.message };
  }
};

export { send2FA, verify2FA , customUpdateEmail};
  