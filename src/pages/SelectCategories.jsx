import React, { useEffect, useState, useRef } from "react";
import authAPI from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import wholeLogo from "../assets/whole-logo.png";
import red from "../assets/red.svg";
import yellow from "../assets/yello.svg";
import blue from "../assets/blue.svg";
import "./SelectCategories.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OneCategory from "./OneCategory";
// import categoriesList from "../../categories.json";
import Button from "../components/Button";
import categoryAPI from "../api/Category";
import { Card, Skeleton, Typography } from "@mui/material";
import gameAPI from "../api/Game";
import Balls from "../components/Balls";

const SelectCategories = () => {
  const ref = useRef(null);

  const navigator = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teamNameA, setTeamNameA] = useState("");
  const [teamNameB, setTeamNameB] = useState("");
  const [game, setGame] = useState({
    gameName: "",
    teamNumber: 2,
    teamsName: "",
    categories: [],
    profile: authAPI.user._id,
  });
  useEffect(() => {
    if (authAPI.user == null) {
      navigator("/about");
    } else {
      getCategories();
    }
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    await categoryAPI.getCategories();

    setIsLoading(false);
  };

  const categoriesList = categoryAPI.categories;

  const categories = categoriesList.map((cat) => (
    <div
      key={cat._id} // Assuming each category has a unique id
      style={{
        border: selectedCategories.includes(cat) ? "2px solid #3093e8" : "none",
        borderRadius: "10px",
        padding: "10px",
      }}
      onClick={() => addToCategoryList(cat)}
    >
      <OneCategory category={cat} />
    </div>
  ));

  const addToCategoryList = (categoryId) => {
    console.log("🚀 ~ addToCategoryList ~ categoryId:", categoryId._id);
    const index = selectedCategories.findIndex(
      (cat) => cat._id === categoryId._id
    );
    if (index === -1) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      const newCategories = selectedCategories.filter(
        (cat) => cat._id !== categoryId._id
      );
      setSelectedCategories(newCategories);
    }
    setGame({ ...game, categories: selectedCategories });
  };

  useEffect(() => {
    setGame({ ...game, categories: selectedCategories });
  }, [selectedCategories]);

  const clickToScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOnChange = (e) => {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  };

  const handleTeamsChange = (text) => {
    if (text.target.name === "teamNameA") {
      setTeamNameA(text.target.value);
    } else {
      setTeamNameB(text.target.value);
    }
    const teamsName = [teamNameA, teamNameB];
    setGame({ ...game, teamsName: teamsName });
  };

  const createGame = async (e) => {
    e.preventDefault();

    // await gameAPI.createGame(game, navigator);

    await gameAPI.createGame(game, navigator);
  };

  {
    if (isLoading)
      return (
        <div className="start-game">
          <div className="hero-section orange-gradient ">
            <Skeleton width={200} height={50} className="ex-lar-title" />
            <Skeleton width={400} height={50} className="hero-title" />
            <Skeleton width={500} height={50} className="hero-description" />
            <div className="btn btn-row">
              <Skeleton
                variant="rectangular"
                width={200}
                height={50}
                className="btn"
              />

              <Skeleton
                variant="rectangular"
                width={200}
                height={50}
                className="btn"
              />

              <Skeleton
                variant="rectangular"
                width={200}
                height={50}
                className="btn"
              />
            </div>
            <div className="actions">
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                className="btn btn-circle-game"
              />
            </div>
          </div>

          <div>
            <Skeleton width={200} height={50} className="big-title" />
            <Skeleton width={200} height={50} className="text-field" />
            <div className="btn-row">
              <Skeleton
                width={200}
                height={50}
                className="text-field width-40"
              />
              <Skeleton
                width={200}
                height={50}
                className="text-field width-40"
              />
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="start-game">
          <div className="top-logo">
            <img className="big-logo" src={wholeLogo} alt="logo" />
          </div>
          <div className="hero-section orange-gradient">
            <Balls />
            <img src={red} alt="red" className="red-circle" />
            <img src={blue} alt="blue" className="blue-circle" />
            <h1 className="ex-lar-title">إنشاء لعبة</h1>
            <h2 className="hero-title">
              لعبة جماعية تفاعلية نختبر فيها معرفتكم و ثقافتكم
            </h2>
            <p className="hero-description">
              لانشاء لعبة جديدة اضغط على ( لعبة جديدة )
              <br />و لاسترجاع الألعاب السابقة، اضغط على ( ألعابي )
            </p>
            <div className="btn btn-row">
              <Button
                type="hero-section"
                text="واجهة الأطفال"
                isLarge={true}
                isBold={true}
              />
              <Link to="/new-game">
                <Button
                  text="إنشاء لعبة"
                  type="secondary"
                  isBold={true}
                  isLarge={true}
                />
              </Link>
              <Link to="/game-history">
                <Button
                  type="tenty"
                  text="تصفح الألعاب"
                  isLarge={true}
                  isBold={true}
                />
              </Link>
            </div>
            <div className="actions">
              <button onClick={clickToScroll} className="btn btn-circle-game">
                <KeyboardArrowDownIcon sx={{ fontSize: "large", scale: 2 }} />
              </button>
            </div>
          </div>

          <img src={yellow} alt="yellow" className="yellow-circle" />

          <div ref={ref} className="categories">
            {categories}
          </div>
          <div>
            <h1 className="big-title">حدد معلومات الفرق</h1>
            <input
              placeholder="أسم اللعبة"
              name="gameName"
              className="text-field"
              onChange={handleOnChange}
            />
            <div className="btn-row">
              <input
                placeholder="اسم الفريق A"
                name="teamNameA"
                className="text-field width-40"
                onChange={handleTeamsChange}
              />
              <input
                placeholder="اسم الفريق B"
                name="teamNameB"
                className="text-field width-40"
                onChange={handleTeamsChange}
              />
            </div>
          </div>
          <div className="btn-row">
            <Button
              text="ابدأ اللعبة"
              onClick={createGame}
              type="secondary"
              isBold={true}
              isLarge={true}
            />
          </div>
        </div>
      );
  }
};

export default observer(SelectCategories);
