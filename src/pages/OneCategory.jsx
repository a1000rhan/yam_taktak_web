import React from "react";
import "./OneCategory.css";
import info from "../assets/info.svg";

const OneCategory = ({ category, reachMax }) => {
  return (
    <div className="category">
      <img className="info-icon" src={info} />
      {/* <div className="remaining-games">باقي {category.playCount} لعبة</div> */}

      <img src={category.categoryImage} alt="name" className="category-image" />

      <div className="category-name">{category.categoryName}</div>
    </div>
  );
};

export default OneCategory;
