import React, { useState } from 'react';
import './ChatSymbol.css'; // CSS for styling chat symbol
import Chatbot from './Chatbot';
import { sendQueryToDialogflow } from '../../Firebase/Dialogflow';
import logo from '../../assets/chatbot.png';

const ChatSymbol = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="chat-symbol-container">
            <div className="chat-symbol" onClick={toggleChat}>
                <img src={logo} alt="Chat" />
            </div>
            {showChat && <Chatbot sendMessage={sendQueryToDialogflow} />}
        </div>
    );
};

export default ChatSymbol;

