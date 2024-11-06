import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const QuizListCard = ({ quiz }) => {
    const navigate = useNavigate();

    const copyLink = () => {
        const currentUrl = `${window.location.origin}/doQuiz/${quiz._id}`;
        navigator.clipboard.writeText(currentUrl);
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: "Link berhasil disalin ke Clipboard",
            background: "#B6FFA1",
        });
    }

    const copyId = () => {
        navigator.clipboard.writeText(quiz._id);
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: "ID quiz berhasil disalin ke Clipboard",
            background: "#B6FFA1",
        });
    }

    return (
        <div key={quiz._id} className="card w-100 mb-3">
            <div className="card-body">
                <h5 className="card-title">{quiz.namaQuiz}</h5>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-outline-secondary me-2 hover-grow"
                        onClick={copyId}
                    >
                        Get this quiz ID
                    </button>
                    <button
                        className="btn btn-outline-success me-2 hover-grow"
                        onClick={copyLink}
                    >
                        Share
                    </button>
                    <button
                        className="btn btn-outline-success me-2 hover-grow"
                        onClick={() => navigate(`/doQuiz/${quiz._id}`)}
                    >
                        Do this quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizListCard;