import React, { useState } from "react";
import "./SignUp.css";
import logo from "../assets/logo.svg";
import authAPI from "../api/Auth";
import Swal from "sweetalert2";
import countryCode from "../assets/data/CountryCodes.json";
import countryCodeArr from "../assets/data/CountryCodesArr.json";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import {
  Skeleton,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

function SignUp() {
  const currentYear = dayjs();
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
  const handleCountryCodeChange = (e) => {
    console.log("🚀 ~ handleCountryCodeChange ~ e:", e);

    setUser({
      ...user,
      countryCode: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setUser({
      ...user,
      dateOfBirth: date.format("YYYY-MM-DD"),
    });
    setStartDate(date);
  };

  const countryCodes = countryCode.map((code) => (
    <MenuItem value={code.dial_code} key={code.code}>
      <div>
        {code.name}
        {code.dial_code}
      </div>
    </MenuItem>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser({
      e,
    });
    // setStartDate(date);

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
              // {...register("firstName")}
            />

            <input
              className="text-field"
              type="text"
              name="lastName"
              onChange={handleChange}
              placeholder="الاسم العائلة"
              // {...register("lastName")}
            />
          </div>
          <div className="other-actions">
            {/* <p>{errors.firstName?.message}</p>
            <p>{errors.lastName?.message}</p> */}
          </div>
          <input
            className="text-field"
            type="email"
            name="username"
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            // {...register("username")}
          />
          {/* <p>{errors.username?.message}</p> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="dateOfBirth"
              sx={{
                direction: "rtl",
                textAlign: "left",
                width: "100%",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
              views={["year", "month", "day"]}
              yearsOrder="desc"
              maxDate={currentYear}
              openTo="year"
              defaultValue={dayjs(startDate)}
              onChange={handleDateChange}
              // {...register("dateOfBirth")}
              value={startDate}
            />
          </LocalizationProvider>
          {/* <Autocomplete
            disablePortal
            options={countryCode}
            sx={{ width: 300 }}
            onSelect={handleCountryCodeChange}
            renderInput={(params) => (
              <TextField {...params.name} label="رمز الدولة" />
            )}
          /> */}
          <InputLabel>رمز الدولة</InputLabel>
          <Select
            label="رمز الدولة"
            // name="countryCode"
            defaultValue={""}
            value={"+965"}
            onChange={handleCountryCodeChange}
            // {...register("countryCode")}
          >
            {countryCodes}
          </Select>

          {/* <input
            className="text-field"
            type="text"
            name="countryCode"
            onChange={handleChange}
            placeholder="رمز الدولة"
          /> */}
          <input
            className="text-field"
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            placeholder="رقم الهاتف"
            // {...register("phoneNumber")}
          />
          {/* <p>{errors.phoneNumber?.message}</p> */}
          <input
            className="text-field"
            type="text"
            name="password"
            onChange={handleChange}
            placeholder="كلمة السر"
            // {...register("password")}
          />
          {/* <p>{errors.password?.message}</p> */}
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
