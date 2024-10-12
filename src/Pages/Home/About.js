import React from "react";

 function about() {
    return (
        <div style={{ paddingTop: '3cm' }}>
            <h1 style={{ fontSize: '1.5cm' }}> About</h1>
            <p style={{ fontSize: '0.8cm' }} > 
                <br/>
                <br/>
                <br/>
                This is the Web application made using javascript library called Reactjs, 
                for having responsice styling and making it more attractive.
                <br/>
                <br/>
                For signin and register authentication, Firebase is used and for storage again, 
                Firebase Storage is used.
                <br/>
                <br/>
                For Assistant, ChatGPT is integrated using its API, also tried to use Dialogflow of 
                Google Cloud Services.
            </p>
        </div>
    );
};


export default about;

