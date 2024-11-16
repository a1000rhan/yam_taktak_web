import React, { useState } from "react";
import "./SignUp.css";
import logo from "../assets/logo.svg";
import authAPI from "../api/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Skeleton } from "@mui/material";
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
  const [startDate, setStartDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (date) => {
    setUser({
      ...user,
      dateOfBirth: date.format("YYYY-MM-DD"),
    });
    setStartDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ handleSubmit ~ user:", user);
    setIsLoading(true);
    await authAPI.signUp(user, Swal, navigate, setIsLoading);
  };

  return isLoading ? (
    <>
      <div className="container">
        <Skeleton variant="rect" width={210} height={118} />
      </div>
    </>
  ) : (
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs(startDate)}
              onChange={handleDateChange}
              value={startDate}
            />
          </LocalizationProvider>

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
