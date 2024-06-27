// /scripts/fetchTrains.js

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://mxzlckzdtftvotpgmclw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14emxja3pkdGZ0dm90cGdtY2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTExMTMsImV4cCI6MjAzNDk2NzExM30.8YqzdHdO51pIR2IcabROTGOuXiKYuYQeZARWVu_TnG0';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch train details and push to Supabase
async function fetchAndPushTrainDetails(trainNumber) {
    const apiKey = '68334ea5102bbe2e78fcaa174d9c0f40';
    const apiUrl = `http://indianrailapi.com/api/v2/TrainNumberToName/apikey/${apiKey}/TrainNumber/${trainNumber}/`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.ResponseCode === '200') {
            const { TrainNo, TrainName, Source, Destination } = data;
            // Push data to Supabase table
            const { data: insertedData, error } = await supabase.from('trains').insert([
                {
                    train_number: TrainNo,
                    train_name: TrainName,
                    source_code: Source.Code,
                    source_arrival: Source.Arrival,
                    destination_code: Destination.Code,
                    destination_arrival: Destination.Arrival,
                }
            ]);

            if (error) {
                console.error('Error inserting data:', error.message);
            } else {
                console.log('Data inserted successfully:', insertedData);
            }
        } else {
            console.error('Train details not found:', data.Message);
        }
    } catch (error) {
        console.error('Error fetching train details:', error.message);
    }
}

for (let i = 10000; i <= 20000; i++) {
    fetchAndPushTrainDetails(i);  
}

