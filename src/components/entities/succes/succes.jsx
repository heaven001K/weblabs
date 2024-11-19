import React from 'react';
import './succes.css';

const Success = () => {
    return (
        <div className="success-container">
            <h2>Order Successful!</h2>
            <p>Thank you for your order! Your transaction has been successfully processed.</p>
            <button className="back-home-button">
                <a href="/">Back to Home</a>
            </button>
        </div>
    );
};

export default Success;
