import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionsAPI from "../api/Questions";
import "./ShowOneQuestion.css";

const ShowOneQuestion = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get the question
    const getQuestion = async () => {
      setIsLoading(true);
      await questionsAPI.getQuestion(questionId);
    };
    getQuestion();
    setIsLoading(false);
    setQuestion(questionsAPI.question);
  }, []);

  return isLoading ? (
    <p>isLoading</p>
  ) : (
    <>
      <div>{question.question}</div>
      <img className="question-image" src={question.questionImage} />
    </>
  );
};

export default ShowOneQuestion;
