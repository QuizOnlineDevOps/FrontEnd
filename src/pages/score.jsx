import React from 'react';

const Score = () => {
    const score = 85; // Hardcoded score

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Your Score</h5>
                    <p className="card-text display-4">{score}</p>
                </div>
            </div>
        </div>
    );
};

export default Score;