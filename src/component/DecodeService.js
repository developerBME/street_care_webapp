
export const fetchAdminVerification = async (accessToken) => {
  try {
   const response = await fetch('https://us-central1-streetcare-d0f33.cloudfunctions.net/decodeToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: accessToken })
    });
    if (!response.ok) {
      throw new Error('Failed to verify token');
    }
    const verificationData = await response.json();
    //console.log(verificationData)
    return verificationData
  } catch (error) {
    console.error('Failed to fetch verification Data', error);
  }
};


//Using jwtdecode package decoding access token
// import {jwtDecode} from 'jwt-decode'; 

// export const decodeAccessToken = (accessToken) => {
//   try {
//     const decodedToken = jwtDecode(accessToken);
//     console.log('decodedToken',decodedToken)
//     return {
//       email: decodedToken?.email,
//       userId: decodedToken?.user_id,
//     };
//   } catch (error) {
//     console.error('Error decoding access token:', error);
//     return null;
//   }
// };
