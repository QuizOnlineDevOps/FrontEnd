import axios from "axios";
import { useEffect, useState } from "react";
import { apiNode } from "../utils/url";
import { useNavigate } from "react-router-dom";
import QuizListCard from "../components/quizListcard";

function SearchPage() {

    const [keyword, setKeyword] = useState()

    const handleSearch = () => {
        alert("Coming Soon")
    }

    const [Quiz, setQuiz] = useState([])

    useEffect(() => {
        async function getData (){
            await axios.get(`${apiNode}/quiz/getAllQuiz`)
            .then((res) => {
                setQuiz(res.data.data)
            })
        }
        getData()
    },[])



    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-start h-100 p-5">
            <div className="input-group mb-3 h-25">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn m-0 rounded btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>
            {Quiz.map((quiz) => (
                <QuizListCard key={quiz._id} quiz={quiz} />
            ))}
        </div>
    )
}

export default SearchPage;