export const send2FA = async (userEmail, timestamp) => {
    const data = {
      userEmail,
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
  