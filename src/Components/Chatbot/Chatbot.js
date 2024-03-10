import React, { useState } from 'react';
import './Chatbot.css'; // CSS file for styling
import { sendQueryToChatGPT } from '../../Firebase/Dialogflow';


const Chatbot = ({ sendMessage }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (input.trim() !== '') {
    //         // Send user query to Dialogflow
    //         sendMessage(input)
    //             .then((response) => {
    //                 // Update messages state with response from Dialogflow
    //                 setMessages([...messages, { text: input, sender: 'user' }, { text: response, sender: 'bot' }]);
    //                 setInput(''); // Clear input field
    //             })
    //             .catch((error) => console.error('Error sending message to Dialogflow:', error));
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.trim() !== '') {
            try {
                // Send user query to ChatGPT
                const response = await sendQueryToChatGPT(input);
                // Update messages state with response from ChatGPT
                setMessages([...messages, { text: input, sender: 'user' }, { text: response, sender: 'bot' }]);
                setInput(''); // Clear input field
            } catch (error) {
                console.error('Error sending message to ChatGPT:', error);
            }
        }
    };

    return (
        <div className="chat-container" >
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
