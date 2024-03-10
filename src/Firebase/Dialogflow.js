import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const sessionId = uuidv4();

const API_KEY = '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';

const DIALOGFLOW_PROJECT_ID = 'songify-7a272';
const DIALOGFLOW_LANGUAGE_CODE = 'en-US'; 
const DIALOGFLOW_API_URL = `https://dialogflow.googleapis.com/v2/projects/${DIALOGFLOW_PROJECT_ID}/agent/sessions/${sessionId}:detectIntent`;

// Function to send a text query to Dialogflow and get the response
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
                'Authorization': `Bearer AIzaSyCwUfipp_F0jQK2XRDSdESNI2HeYuEx1IU`, // Replace YOUR_DIALOGFLOW_API_KEY with your actual Dialogflow API key
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error querying Dialogflow:', error);
        return null;
    }
};

export const sendQueryToChatGPT = async (query) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', { prompt: query }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer MgTL2GuASpoWkRKGUvmkT3BlbkFJV8mSAflKc8MmQhllHVyg`, // Include API key as Bearer token
            },
        });
        return response.data; // Assuming the response contains the bot's message
    } catch (error) {
        throw new Error('Error sending message to ChatGPT');
    }
};



// chatopenaikey = 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

// nano ~/.bash_profile
// export OPENAI_API_KEY = 'MgTL2GuASpoWkRKGUvmkT3BlbkFJV8mSAflKc8MmQhllHVyg'
// export OPENAI_API_KEY = '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'

