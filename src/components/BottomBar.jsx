import React from "react";
import apple from "../assets/apple.svg";
import android from "../assets/android.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import Tiktok from "../assets/tiktok.webp";

import "./BottomBar.css";

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="logos">
        <img src={apple} alt="logo" className="logo" />
        <img src={android} alt="logo" className="logo" />
      </div>
      <div className="social-media">
        <div className="btn-circle">
          <InstagramIcon />
        </div>
        <div className="btn-circle">
          <img src={Tiktok} alt="tiktock" className="tiktock" />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
