import React, { useRef, useState, useEffect } from "react";
import './Quiz.css';
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { shuffle } from "../utils/funct";
import { apiNode } from "../utils/url";
import axios from "axios";
import { FaTruckLoading } from "react-icons/fa";

const Quiz = () => {
    const { id } = useParams();
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(null);
    let [data, setData] = useState([]);
    let [AlrChoose, setAlrChoose] = useState(false);
    let [score, setScore] = useState(0);

    let optionRefs = useRef([]);
    let nextButtonRef = useRef();
    let completeButtonRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiNode}/quiz/getQuiz/${id}`);
                const result = response.data.data.daftarSoal;
                shuffle(result);

                result.forEach((question) => {
                    shuffle(question.pilihan);
                });
                setData(result);
                setQuestion(result[0]);
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Quiz tidak ditemukan atau terjadi kesalahan pada server",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.href = "/";
                });
                // console.error("Error fetching quiz data:", error);
            }
        };

        fetchData();
    }, [id]);

    const checkAns = (e, ans) => {
        if (AlrChoose === false) {
            if (question.jawaban === ans) {
                e.target.classList.add("Benar");
                setAlrChoose(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("Salah");
                optionRefs.current[question.pilihan.findIndex(option => option === question.jawaban)].classList.add("Benar");
                setAlrChoose(true);
                optionRefs.current[question.jawaban - 1].classList.add("Benar");
            }
        }
    };

    const Next = () => {
        if (AlrChoose === true) {
            if (index === data.length - 1) {
                Swal.fire({
                    title: "Quiz Selesai",
                    text: `Score Anda : ${score}/${data.length}`,
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#347928",
                    confirmButtonText: "Try Again",
                    cancelButtonText: "Back to Home",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    } else {
                        window.location.href = "/";
                    }
                });
            } else if (index === data.length - 2) {
                setIndex(index + 1);
                setQuestion(data[index + 1]);
                setAlrChoose(false);
                optionRefs.current.forEach(option => {
                    option.classList.remove("Salah");
                    option.classList.remove("Benar");
                });
                nextButtonRef.current.classList.add("d-none");
                completeButtonRef.current.classList.remove("d-none");
            } else {
                setIndex(index + 1);
                setQuestion(data[index + 1]);
                setAlrChoose(false);
                optionRefs.current.forEach(option => {
                    option.classList.remove("Salah");
                    option.classList.remove("Benar");
                });
            }
        } else {
            Swal.fire({
                title: "Pilih jawaban terlebih dahulu",
                icon: "warning",
            });
        }
    };

    if (!question) {
        return <>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <FaTruckLoading size={100} className="mb-4" />
                <h1 >404</h1>
                <h1 >Page Not Found</h1>
            </div>
        </>
    }

    return (
        <div className="pt-5">

            <div className="container mt-5 p-4 w-50" style={{ color: 'white', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.7)' }}>
                <h1 className="text-center mb-4">Buat Quiz</h1>
                <hr />
                <h2>{index + 1}. {question.soal}</h2>
                <ul className="list-group">
                    {question.pilihan.map((option, i) => (
                        <li
                            key={i}
                            ref={el => optionRefs.current[i] = el}
                            onClick={(e) => { checkAns(e, option) }}
                            className="list-group-item list-group-item-action mt-2 mb-2 rounded"
                            style={{ cursor: 'pointer' }}
                        >
                            {String.fromCharCode(65 + i)}. {option}
                        </li>
                    ))}
                </ul>
                <button ref={nextButtonRef} className="btn btn-primary mt-4" onClick={Next}>Next</button>
                <button ref={completeButtonRef} className="btn btn-primary mt-4 d-none" onClick={Next}>Complete</button>
                <div className="soal mt-3">{index + 1} dari {data.length} soal</div>
            </div>
        </div>
    );
};

export default Quiz;
