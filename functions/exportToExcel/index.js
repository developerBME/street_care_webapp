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
const RANGE = 'Sheet1!A1:Z1000';
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

function getStartEndOfDate(dateString) {
  const date = new Date(dateString);
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

async function fetchRecordsForDate(collectionName, dateString) {
  try {
    const { start, end } = getStartEndOfDate(dateString);

    const snapshot = await db.collection(collectionName)
      .where('DateOfSignature', '>=', start)
      .where('DateOfSignature', '<=', end)
      .orderBy('DateOfSignature', 'desc')
      .get();

    if (snapshot.empty) {
      throw new Error(`No documents found for the date: ${dateString}.`);
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

async function fetchExistingGoogleSheetData(sheetsApi, sheetId, range) {
  try {
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching data from Google Sheet:', error);
    throw error;
  }
}

async function updateGoogleSheet(newRecords, sheetsApi, sheetId, range) {
  try {
    const existingData = await fetchExistingGoogleSheetData(sheetsApi, sheetId, range);

    const newEntries = newRecords.filter(record => {
      return !existingData.some(row => row[0] === record[0]);
    });

    if (newEntries.length === 0) {
      console.log('No new records to add.');
      return;
    }

    const request = {
      spreadsheetId: sheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: newEntries,
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

exports.exportToExcel = functions.https.onRequest(async (req, res) => {
  try {
    const dateString = req.query.date; //(e.g., ?date=2024-08-20)

    if (!dateString) {
      return res.status(400).send('Bad Request: date query parameter is required');
    }

    const sheetsApi = await initializeGoogleSheetsAPI(serviceAccount);

    const records = await fetchRecordsForDate(COLLECTION_NAME, dateString);

    await updateGoogleSheet(records, sheetsApi, SHEET_ID, RANGE);

    res.status(200).send('Google Sheet updated successfully.');
  } catch (error) {
    console.error('Error in exportToExcel function:', error);
    res.status(500).send('Internal Server Error');
  }
});
