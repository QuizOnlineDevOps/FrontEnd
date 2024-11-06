import axios from "axios";
import React, { useState } from "react";
import { apiNode } from "../utils/url";
import { check1Option } from "../utils/funct";
import Swal from "sweetalert2";

const QuizForm = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([{ soal: "", pilihan: [""], jawaban: "" }]);

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].soal = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].pilihan[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([...questions, { soal: "", pilihan: [""], jawaban: "" }]);
  };

  const addNewOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].pilihan.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].pilihan.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ quizTitle, questions });
    const { error, statusE } = check1Option(questions);
    if(!statusE){
      console.log(statusE);
      await axios.post(`${apiNode}/bankSoal/addSoal`, { quizTitle, questions })
      .then((res) => {
        console.log(res);
      })
    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-0 ms-4 me-4 pt-4">
      <div className="form-group mb-3">
        <label>Quiz Title:</label>
        <input
          type="text"
          className="form-control"
          value={quizTitle}
          onChange={handleQuizTitleChange}
          required
        />
      </div>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-section mb-4">
          <h5>Question {qIndex + 1}</h5>
          <input
            type="text"
            className="form-control mb-2"
            value={q.soal}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            placeholder="Enter question"
            required
          />

          {q.pilihan.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-2">
              <label>Option {optionIndex + 1}:</label>
              <div className="d-flex flex-row align-items-center jusify-content-center">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, optionIndex, e.target.value)}
                  required
                />
                <button type="button" className="btn btn-danger m-0 me-1" onClick={() => removeOption(qIndex, optionIndex)}>
                  X
                </button>
                <button
                  type="button"
                  className={`btn ${q.jawaban === option ? 'btn-success' : 'btn-secondary'} text-nowrap m-0`}
                  onClick={() => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].jawaban = option;
                    setQuestions(newQuestions);
                  }}
                >
                  {q.jawaban === option ? 'Correct' : 'Set as Correct'}
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => addNewOption(qIndex)}>
            Add New Option
          </button>
        </div>
      ))}

      <div className="d-flex flex-row justify-content-center align-items-center">
        <button type="button" className="btn btn-primary me-5" onClick={addNewQuestion}>
          Add New Question
        </button>
        <button type="submit" className="btn btn-success">Submit Quiz</button>
      </div>
    </form>
  );
};

export default QuizForm;
