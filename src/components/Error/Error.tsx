import React from 'react'
import './Error.scss';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    //If have a error log system, we can log the error here
    return (
        <div className='error'>
            <img src="/images/error.png" alt="Error" />
            <h2>{message || "Something went wrong."}</h2>
        </div>
    )
}

export default Error