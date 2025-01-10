import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionsAPI from "../api/Questions";

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

  return isLoading ? <p>isLoading</p> : <div>{question.question}</div>;
};

export default ShowOneQuestion;
