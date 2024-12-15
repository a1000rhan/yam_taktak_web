import React, { useEffect, useState, useRef } from "react";
import authAPI from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import logo from "../assets/logo-white.svg";
import red from "../assets/red.svg";
import yellow from "../assets/yello.svg";
import "./SelectCategories.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import OneCategory from "./OneCategory";
// import categoriesList from "../../categories.json";
import Button from "../components/Button";
import categoryAPI from "../api/Category";
import { Card, Skeleton, Typography } from "@mui/material";
import gameAPI from "../api/Game";

const SelectCategories = () => {
  const ref = useRef(null);

  const navigator = useNavigate();
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const clickToScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCategoryList = (category) => {
    let newSelected;

    if (selected.includes(category)) {
      newSelected = selected.filter((cat) => cat !== category);
    } else {
      newSelected = [...selected, category];
    }

    setSelected(newSelected);
    console.log("🚀 ~ addToCategoryList ~ newSelected:", newSelected);
  };
  const categoriesList = categoryAPI.categories;

  const categories = categoriesList.map((cat) => (
    <div
      key={cat._id} // Assuming each category has a unique id
      onClick={() => addToCategoryList(cat)}
      style={{
        border: selected.includes(cat) ? "2px solid #3093e8" : "none",
        borderRadius: "10px",
      }}
    >
      <OneCategory category={cat} />
    </div>
  ));

  const createGame = async (e) => {
    e.preventDefault();

    // Get the selected category IDs
    const CategoriesIds = selected.map((cat) => cat._id);

    // Update the game state using the updater function
    setGame((prevGame) => {
      const updatedGame = { ...prevGame, categories: CategoriesIds };
      console.log("🚀 ~ createGame ~ updatedGame", updatedGame);

      // You can perform the API call here after ensuring state is updated
      // await gameAPI.createGame(updatedGame);

      return updatedGame;
    });
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
          <div className="hero-section orange-gradient ">
            <img src={red} alt="red" className="red-circle" />
            <img src={yellow} alt="yellow" className="yellow-circle" />
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
          <div ref={ref} className="categories">
            {categories}
          </div>
          <div>
            <h1 className="big-title">حدد معلومات الفرق</h1>
            <input placeholder="أسم اللعبة" className="text-field" />
            <div className="btn-row">
              <input
                placeholder="اسم الفريق A"
                className="text-field width-40"
              />
              <input
                placeholder="اسم الفريق B"
                className="text-field width-40"
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
