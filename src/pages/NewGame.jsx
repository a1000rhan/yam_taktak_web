import React, { useEffect } from "react";
import authAPI from "../api/Auth";

const NewGame = () => {
  useEffect(() => {
    if (authAPI.user == null) {
      navigator("/about");
    }
  }, []);
  return <div>NewGame</div>;
};

export default NewGame;
