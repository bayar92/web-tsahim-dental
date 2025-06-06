import React from "react";
const TestPage = () => {
    
    return (
        <div>
            <h1>Text Page</h1>
            <p>API URL: {process.env.DENTAL_DB_USER}</p>
            <p>API HOST: {process.env.DENTAL_DB_HOST}</p>
            <p>API PORT: {process.env.DENTAL_DB_PORT}</p>
        </div>
    )
}
export default TestPage;