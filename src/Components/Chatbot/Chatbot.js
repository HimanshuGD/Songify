import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer, ChatContainer, MessageList,
    Message, MessageInput, TypingIndicator
} from '@chatscope/chat-ui-kit-react';


const API_KEY = "YOUR_API_KEY";
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
            let role = "";
            if (messageObject.sender === "ChatGPT") role = "assistant";
            else role = "user";
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
                console.log(data);
                setMessages([...chatMessages, { message: data.choices[0].message.content, sender: "ChatGPT" }]);
                setIsTyping(false);
            });
    }


    return (
        <div className="chat-container" style={{}} >
            <div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            style={{ justifyContent: 'left' }}
                            typingIndicator={isTyping ? <TypingIndicator content="Assistant is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};

export default Chatbot;