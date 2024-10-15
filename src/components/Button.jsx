import React from "react";
import "./Button.css";
const Button = (prams) => {
  const type = prams.type;
  const text = prams.text;
  const onClick = prams.onClick;
  const isLarge = prams.isLarge || false;
  const isBold = prams.isBold || false;

  if (type === "prod") {
    return <button className="btn btn-prod">{text}</button>;
  } else if (type === "secondary") {
    return (
      <button
        onClick={onClick}
        style={{
          fontSize: isLarge ? "1.5rem" : "1rem",
          fontFamily: isBold ? "Cairo-Bold" : "Cairo-Regular",
        }}
        className="btn btn-secondary"
      >
        {text}
      </button>
    );
  } else if (type === "tenty") {
    return (
      <button
        style={{
          fontSize: isLarge ? "1.5rem" : "1rem",
          fontFamily: isBold ? "Cairo-Bold" : "Cairo-Regular",
        }}
        className="btn btn-tenty"
      >
        {text}
      </button>
    );
  } else {
    return (
      <button
        style={{
          fontSize: isLarge ? "1.5rem" : "1rem",
          fontFamily: isBold ? "Cairo-Bold" : "Cairo-Regular",
        }}
        className="btn btn-primary"
      >
        {text}
      </button>
    );
  }
};
export default Button;
