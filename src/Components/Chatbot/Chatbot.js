import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer, ChatContainer, MessageList,
    Message, MessageInput, TypingIndicator
} from '@chatscope/chat-ui-kit-react';

const API_KEY = "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"; // Use your actual API key here
const systemMessage = { "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience." }

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm your Assistant! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = { message, direction: 'outgoing', sender: "user" };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role: role, content: messageObject.message }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => data.json())
            .then((data) => {
                setMessages([...chatMessages, { message: data.choices[0].message.content, sender: "ChatGPT" }]);
                setIsTyping(false);
            });
    }

    return (
        <div style={styles.chatContainer}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior="smooth"
                        typingIndicator={isTyping ? <TypingIndicator content="Assistant is typing" /> : null}
                    >
                        {messages.map((message, i) => (
                            <Message key={i} model={message} />
                        ))}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

const styles = {
    chatContainer: {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        maxWidth: '700px',
        width: '100%', // Makes it responsive
        height: 'auto', // Allows height to adjust based on content
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }
};

export default Chatbot;
