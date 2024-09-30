const { google } = require('googleapis');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(Buffer.from(functions.config().serviceaccount.adminkey, 'base64').toString('utf8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://streetcare-d0f33.firebaseio.com"
  });
}

const db = admin.firestore();

const SHEET_ID = '1rMucKP9lKsJMhsAo33azC0te_MIlmOWQofsvqKwLD28';
const RANGE = 'Sheet1!A1:Z2000';
const COLLECTION_NAME = 'BMEMembershipForm';

async function initializeGoogleSheetsAPI(serviceAccount) {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

function flattenArray(arr) {
  return arr.join(', ');
}

async function fetchAllRecords(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();

    if (snapshot.empty) {
      throw new Error(`No documents found in the collection: ${collectionName}.`);
    }

    const records = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      const flattenedData = Object.values(data).map(value =>
        Array.isArray(value) ? flattenArray(value) : value
      );
      records.push([doc.id, ...flattenedData]);
    });

    return records;
  } catch (error) {
    console.error('Error fetching records from Firestore:', error);
    throw error;
  }
}

async function clearGoogleSheet(sheetsApi, sheetId, range) {
  try {
    const request = {
      spreadsheetId: sheetId,
      range: range,
      resource: {
        values: [['']],
      },
    };
    await sheetsApi.spreadsheets.values.clear(request);
  } catch (error) {
    console.error('Error clearing Google Sheet:', error);
    throw error;
  }
}

async function updateGoogleSheet(newRecords, sheetsApi, sheetId, range) {
  try {
    const request = {
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: newRecords,
      },
    };

    console.log('Google Sheets API Request:', JSON.stringify(request, null, 2));

    const response = await sheetsApi.spreadsheets.values.append(request);

    console.log('Google Sheets API Response:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('Error updating Google Sheet:', error.response?.data || error.message);
    throw error;
  }
}

exports.exportToExcel = functions.pubsub.schedule('every Sunday 00:00').timeZone('America/New_York').onRun(async () => {
  try {
    const sheetsApi = await initializeGoogleSheetsAPI(serviceAccount);
    const records = await fetchAllRecords(COLLECTION_NAME);
    await clearGoogleSheet(sheetsApi, SHEET_ID, RANGE);
    await updateGoogleSheet(records, sheetsApi, SHEET_ID, RANGE);
    console.log('Google Sheet updated successfully with all records.');
  } catch (error) {
    console.error('Error in exportAllRecordsToExcel function:', error);
  }
});
