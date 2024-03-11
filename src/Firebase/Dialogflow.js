import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const sessionId = uuidv4();

const DIALOGFLOW_PROJECT_ID = 'YOUR_PROJECT_ID';
const DIALOGFLOW_LANGUAGE_CODE = 'en-US'; 
const DIALOGFLOW_API_URL = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_PROJECT_ID}/agent/sessions/${sessionId}:detectIntent`;

export const sendQueryToDialogflow = async (text) => {
    try {
        const response = await axios.post(DIALOGFLOW_API_URL, {
            queryInput: {
                text: {
                    text: text,
                    languageCode: DIALOGFLOW_LANGUAGE_CODE,
                },
            },
            queryParams: {
                timeZone: 'Asia/Almaty',
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer API_KEY`, // Replace YOUR_DIALOGFLOW_API_KEY with your actual Dialogflow API key
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error querying Dialogflow:', error);
        return null;
    }
};

// songify_1710079646115

