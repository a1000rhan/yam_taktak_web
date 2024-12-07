import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import questionsAPI from "../api/Questions";
import "./ShowAllQuestions.css";

const ShowAllQuestions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      await questionsAPI.getQuestions();
      setQuestions(questionsAPI.questions);
    };
    setIsLoading(false);

    fetchQuestions();
  }, []);

  const listAllQuestions = questions.map((question) => (
    <div>
      <tr key={question._id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>{question.category.categoryName}</td>
        <td>{question.weight}</td>

        <td>
          <img
            src={question.questionImage}
            alt="question._id"
            className="thumbnail-img"
          />
        </td>
        <td>
          <img
            src={question.answerImage}
            alt="question._id"
            className="thumbnail-img"
          />
        </td>
      </tr>
    </div>
  ));

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>بنك الأسئلة</h1>
          <table>{listAllQuestions}</table>
        </>
      )}
    </>
  );
};

export default ShowAllQuestions;
