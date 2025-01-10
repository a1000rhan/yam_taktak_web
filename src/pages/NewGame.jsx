import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import authAPI from "../api/Auth";
import gameAPI from "../api/Game";
import categoryAPI from "../api/Category";
import { Button, Card } from "@mui/material";
import "./NewGame.css";
import { Link, useNavigate } from "react-router-dom";

const NewGame = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTheGame();

    // }
  }, []);
  const getTheGame = async () => {
    setIsLoading(true);
    const gameId = localStorage.getItem("gameId");
    await gameAPI.fetchOneGame(gameId);
    setGame(gameAPI.game[0]);

    setIsLoading(false);
  };

  // const categoriesList = gameCategories.map((cat) => (
  //   <>
  //     <Card className="category">
  //       <div className="category-name">{cat.categoryName}</div>
  //       <img src={cat.categoryImage} />
  //     </Card>
  //   </>
  // ));
  const goToQuestion = (category) => {
    //take one random category.questions and store it const question
    if (category.questions.length === 0) {
      return;
    }
    const questionId =
      category.questions[Math.floor(Math.random() * category.questions.length)];
    console.log(questionId);
    navigate(`/show-question/${questionId}`);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <div className="teams">
        <div>{game.teamsName[0] ?? ""}</div>
        <div>{game.teamsName[1] ?? ""}</div>
      </div>
      <div className="categories">
        {game.categories.map((cat) => (
          <>
            {/*  vertical line */}
            <div className="question-weight">
              <div className="btns-column">
                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  100
                </Button>

                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  200
                </Button>
                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  300
                </Button>
              </div>
              <Card className="category">
                <img src={cat.categoryImage} />
                <div className="category-name">{cat.categoryName}</div>
              </Card>
              <div className="btns-column">
                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  100
                </Button>
                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  200
                </Button>
                <Button color="primary" onClick={() => goToQuestion(cat)}>
                  300
                </Button>
              </div>
            </div>
            <div className="vertical-line"></div>
          </>
        ))}
      </div>
    </>
  );
};

export default observer(NewGame);
