import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import MuiCard from "@mui/material/Card";

import categoryAPI from "../api/Category";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function AddCategory(props) {
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    categoryName: "",
    categoryImage: "",
  });

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setCategory({ ...category, categoryImage: event.target.files[0] });
    console.log("🚀 ~ handleImage ~ category:", category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleSubmit ~ question:", category);

    await categoryAPI.addCategory(category, Swal, navigate, setIsLoading);
    // await categoryAPI.addCategory(category);
  };
  return (
    <>
      <CssBaseline enableColorScheme />

      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          إضافة فئة جديدة
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl onChange={handleChange}>
            <TextField placeholder="الفئة:" name="categoryName" />
          </FormControl>

          <input type="file" onChange={handleImage} />
          {previewImage === "" ? (
            <></>
          ) : (
            <img
              className="img-thumbnail"
              src={previewImage}
              alt="profile"
              accept="image/*"
            />
          )}

          <Button onClick={handleSubmit}>add</Button>
          <Typography sx={{ textAlign: "center" }}></Typography>
        </Box>
      </Card>
    </>
  );
}
