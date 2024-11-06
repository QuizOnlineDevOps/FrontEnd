import { useState } from "react";

import axios from "axios";
import { apiNode } from "./utils/url";
import Home from "./pages/home";
import SearchPage from "./pages/search";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Quiz from "./pages/quiz";
import React from "react";
import QuizForm from "./pages/quizForm";
import "./App.css"; // Import file CSS kustom
import NotFound from "./notFound";

function App() {
  return (
    <>
      <Router>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(orange, black)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/makeQuiz" element={<QuizForm />} />
            <Route path="/doQuiz/:id" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
