import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [quizId, setQuizId] = useState('');

    const navigate = useNavigate();

    const handleDoQuizClick = () => {
        navigate('/search');
    };

    const handleMakeQuizClick = () => {
        navigate('/makeQuiz');
    }

    const handleInputQuizIdClick = () => {
        navigate(`/doQuiz/${quizId}`);
    }

    return (
        <div className="container text-center w-100 h-100 d-flex flex-column justify-content-center align-items-center" >
            <div className="pt-5">
                <h1>QuizOnline</h1>
                <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex flex-row">
                        <button className="btn text-nowrap btn-secondary mx-2" onClick={handleDoQuizClick}>Do Quiz</button>
                        <button className="btn text-nowrap btn-primary mx-2" onClick={handleMakeQuizClick}>Make Quiz</button>

                    </div>
                    <div className="d-flex mt-2 flex-row align-items-center">
                        <input type="text" className="form-control mx-2" placeholder="Enter Quiz ID" onChange={
                            (e) => setQuizId(e.target.value)
                        } />
                        <button className="btn m-0 text-nowrap btn-warning mx-2" onClick={handleInputQuizIdClick}>Input Quiz ID</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
