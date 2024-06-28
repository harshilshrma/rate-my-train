import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = 'https://mxzlckzdtftvotpgmclw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14emxja3pkdGZ0dm90cGdtY2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTExMTMsImV4cCI6MjAzNDk2NzExM30.8YqzdHdO51pIR2IcabROTGOuXiKYuYQeZARWVu_TnG0';
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCewhbYaMaAIJwI\nDUlttEh+jj70+wmuqXM66PfUG2A9cvsBCKk/uTKw0m+XxKNshZuSU4G6gMEnIyNA\nTJ2eJX5lKQTLElRlzL//HhHhqGdAc40dG09RvK78fQtu7gyciUSCD5hJkXhGRULI\nl3ETdx+xfPcrwFa6C2wmphkGcE2DWc85oaDOMOFbRPTMXmB6OiaQ/V1d4NoK5GTn\nB3BzjgltcWcK+WY2YHcVYEaMOBtEk28T3+vh1x6SywJU3mp8iGgNp4gCsEYzA7yl\n1zMzlGulXvGqAAAIuKd/tfqV8090HXXcxvpekedmIFAPxDtDKFP1HDnfiSnoQ1SZ\n0Vcq6sTlAgMBAAECggEABOqtOx3g6pOX9tE1MUuVudhSmihdgBD0EPf+wjfoKXRd\nJ7Ff+dQ/ffsWb6nXBy5gHLkEry+mS72qgtGcnrWPOOIl/tqzeG+jO+saJ1Xy1KvU\ny/j44jwouIhwM+BKzbJGnTc5woAvLGX1ZTGjfonVlnFF/7ng4GQoK6OV6igiORYg\nyMyznr/cZbA+ThrpalTW+w7ZuuPqd7fDaegZ7ZtPyHtgcm7hpdr3RBum2wyXrHaI\ng/e+vF8btxBeSuosjrHSp4Ss1jDHR/tv2KPSE+uHbx3kdjdZcLzWw6za0fNM6lbE\ny7NiaaOJBqi2p8d4u6aw+m0JEr8QhTlus3IQD7dI5QKBgQDVL5d71MW5xHstn+jz\n05iI2SqSfC9P3oZFtl0F9FmaCXhugGuLF9t++HRRRfqeRoc8vHsGZEOeDrrcXTa3\n0r5nXav02CBoRgnJzDZApW9f0Df9iaOZz5EJjcnHC2+es5yIrow5zxc40emjWXh3\n5L23lg0lQ2aCvuPu4XuCABU4XwKBgQC+pDv0W5IGpF8S2WV3bN/CI+UxKbdBJhL5\nb174N/7oP4sJjPOBeYHXuwOMf7LSwM6QdF72tqXyrto0RLP/vqLxVzr5GHKr7Le1\n4ManVLiy30kPxurM4aDDgjhnqC58dDF9f0QHhrLkyjrMGR+C5sAhjIF1a6RyvVP4\nl3zI4GqZOwKBgFJtwGjE8F7PtcECX5RHcGcZcPiKw9Bh/hDeXkF7JVoF52byiKKT\nau9BKdhy8mBYbNnzFq51/h8TGvUxpYKWHcDh2yckmgM3cXlxWFjOnq2xWLTTj0pd\nk3raM/aeWV5HnHLM6rM/e38gyvG6GnZhH2novtR1pyFOpdsrnBG77niJAoGBAJrs\nSDSZvZ9cME7XEBfvCB9yoCxFpEBzOnQtx1Wb27DNAqYuPyx2m8e+mHGyzJVsTfEi\nQJHpeA4xfe1/727jcvMBWlFXRsjkQ56wHX+Z38asoWkK04DP0p9O0ZubFrvYiOdd\nZuFe2z4GAaYevHbaIkShNAtCAI+lv/mC0ctEZBxFAoGBALMuk+hoPISrGgoQZblz\n2nyZNwRNVMUdbGu6ATt2+Ao+jkSV6cG56NgR5jrfGVUptZ/8cgD+LVvsmlog8aAI\nhaTsNxBvn06DE+9rvyvgf2qLtgCMPJbsLTsPhpx+ds+SxyHKTeUY7FAWf+OwJF1J\nvBi59yKJdj/9b850Qa3XIttw\n-----END PRIVATE KEY-----\n";
const client_email = "rate-my-train@rate-my-train.iam.gserviceaccount.com";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to authorize with Google Sheets API
async function authorize() {
    const auth = new google.auth.JWT(
        client_email,
        null,
        private_key,
        ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
    await auth.authorize();
    return auth;
}

// Function to get data from the Google Sheet
async function getSheetData(auth, spreadsheetId, sheetName) {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: sheetName,
    });
    return response.data.values;
}

// Function to export Google Sheets data to Supabase
async function exportToSupabase(spreadsheetId) {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.get({ spreadsheetId });

    for (const sheet of response.data.sheets) {
        const sheetName = sheet.properties.title;
        const data = await getSheetData(auth, spreadsheetId, `${sheetName}!A:E`);

        if (data && data.length > 0) {
            const headers = data[0];
            const rows = data.slice(1);

            for (const row of rows) {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index] || null;
                });

                // Map headers to match the Supabase table columns and clean train name
                const train_id = rowData['train_number'];
                const train_name = rowData['train_name'];
                const from_station = rowData['from'];
                const to_station = rowData['to'];

                const { error } = await supabase
                    .from('valid_trains')
                    .insert([{ train_id, train_name, from_station, to_station }]);

                if (error) {
                    console.error('Error inserting data:', error.message, error.details, error.hint);
                } else {
                    console.log(`Inserted: ${train_id} - ${train_name}`);
                }
            }
        }
    }
    console.log('Data export completed');
}

// Running the logic to export the Google Sheets data to Supabase
const spreadsheetId = '1DzqCCCHwmnM2b5x-_cwds5SEw7jxNWvS5uZw_4PM60I';
exportToSupabase(spreadsheetId).catch(error => {
    console.error('Error exporting data:', error.message, error.details, error.hint);
});
