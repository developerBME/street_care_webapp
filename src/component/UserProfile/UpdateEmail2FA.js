import { fetch } from 'node-fetch';

const send2FA = async (userEmail, uid, timestamp) => {
  const data = {
    userEmail,
    uid,
    timestamp
  };

  try {
    const response = await fetch('https://us-central1-streetcare-d0f33.cloudfunctions.net/sendUpdateEmail2FACode', {
    mode: 'no-cors',  
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.text();
      console.log(responseData);
      alert('2FA code sent successfully.');
    } else {
      throw new Error('Failed to send 2FA code');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending 2FA code');
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
    mode: 'no-cors',  
    method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.text();
      console.log(responseData);
      alert('2FA code verified successfully.');
    } else {
      throw new Error('Failed to verify 2FA code');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error verifying 2FA code');
  }
};

export { send2FA, verify2FA };
