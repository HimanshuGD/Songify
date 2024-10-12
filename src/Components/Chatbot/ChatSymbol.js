import React, { useState } from 'react';
import logo from '../../assets/chatbot.png'; // Ensure this path is correct
import Chatbot from './Chatbot';

const ChatSymbol = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div style={styles.chatSymbolContainer}>
            <div style={styles.chatSymbol} onClick={toggleChat}>
                <img src={logo} alt="Chat" style={styles.chatSymbolImage} />
            </div>
            {showChat && <Chatbot />}
        </div>
    );
};

const styles = {
    chatSymbolContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
    },
    chatSymbol: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    chatSymbolImage: {
        width: '80%',
    }
};

export default ChatSymbol;
