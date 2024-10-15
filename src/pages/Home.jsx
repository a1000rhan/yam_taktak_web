import React, { useState, useEffect } from "react";
import "./Home.css";
import logo from "../assets/logo.svg";
import authAPI from "../api/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (authAPI?.user === null) {
      return;
    }
    authAPI?.user?.type === "admin"
      ? navigate("/select-categories")
      : navigate("/about");
    return;
  }, []);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authAPI.signIn(user, Swal, navigate, setIsLoading);
  };

  return (
    <div>
      <div className="container">
        <img src={logo} className="logo" alt="logo" />
        <form className="text-form" onSubmit={handleSubmit}>
          <input
            className="text-field"
            type="email"
            name="username"
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
          />
          <input
            className="text-field"
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="كلمة السر"
          />
          <div className="other-actions">
            <button className="btn-others">نسيت كلمة السر؟</button>
            <button className="btn-others" onClick={() => navigate("/sign-up")}>
              إنشاء حساب جديد
            </button>
          </div>
          <div className="login-actions">
            <button
              onClick={handleSubmit}
              className="btn-login orange-gradient"
            >
              {isLoading ? <CircularProgress /> : "تسجيل الدخول"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
