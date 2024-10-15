import React, { useState } from "react";
import "./SignUp.css";
import logo from "../assets/logo.svg";
import authAPI from "../api/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@julienvanbeveren/react-datetime-picker";
import { set } from "date-fns";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    dateOfBirth: "",
    type: "admin",
  });
  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, dateOfBirth: date });
    console.log("🚀 ~ handleSubmit ~ user:", user);
    setIsLoading(true);
    authAPI.signUp(user, Swal, navigate, setIsLoading);
  };

  return (
    <div>
      <div className="container">
        <form className="text-form" onSubmit={handleSubmit}>
          <div className="other-actions">
            <input
              className="text-field"
              type="text"
              name="firstName"
              onChange={handleChange}
              placeholder="الاسم الأول"
            />
            <input
              className="text-field"
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="الاسم العائلة"
            />
          </div>
          <input
            className="text-field"
            type="email"
            name="username"
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
          />
          <DatePicker
            style={{ width: "100%" }}
            defaultValue={date}
            // className="date-picker"
            submitOnChange={(e) => setDate(e)}
            name="dateOfBirth"
          />
          <input
            className="text-field"
            type="text"
            name="countryCode"
            onChange={handleChange}
            placeholder="رمز الدولة"
          />
          <input
            className="text-field"
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="رقم الهاتف"
          />
          <input
            className="text-field"
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="كلمة السر"
          />

          <div className="login-actions">
            <button
              onClick={handleSubmit}
              className="btn-login orange-gradient"
            >
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
