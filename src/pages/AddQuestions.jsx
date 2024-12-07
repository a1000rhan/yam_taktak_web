import React, { useState, useEffect } from "react";

import MuiCard from "@mui/material/Card";

import questionsAPI from "../api/Questions";
import categoryAPI from "../api/Category";
import {
  MenuItem,
  Select,
  styled,
  Typography,
  TextField,
  FormControl,
  CssBaseline,
  Button,
  Box,
} from "@mui/material";
import authAPI from "../api/Auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

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

const AddQuestions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    setIsLoading(true);
    await categoryAPI.getCategories();
    setIsLoading(false);
  };

  const [previewQImage, setPreviewQImage] = useState("");
  const [previewAImage, setPreviewAImage] = useState("");
  const [question, setQuestion] = useState({
    question: null,
    answer: null,
    weight: null,
    hint: null,
    options: null,
    questionImage: null,
    answerImage: null,
  });
  const [options, setOptions] = useState("");

  const handleChange = (e) => {
    setQuestion({
      ...question,
      [e.target.name]: e.target.value,
    });
  };
  const handleOptions = (e) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.value,
    });
    setQuestion({ ...question, options: Object.values(options) });
    // console.log(e.target.name + " " + e.target.value);
  };

  const handleQImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewQImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setQuestion({ ...question, questionImage: event.target.files[0] });
  };

  const handleAImage = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewAImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
    setQuestion({ ...question, answerImage: event.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 ~ handleSubmit ~ authAPI.user:", authAPI.user["_id"]);
    setQuestion({
      ...question,
      profile: authAPI.user["_id"] ?? "",
      weight: 100,
    });
    setIsLoading(true);
    await questionsAPI.addQuestion(question, Swal, navigate, setIsLoading);
  };

  const categories = categoryAPI.categories;
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdown = categories.map((cat) => (
    <MenuItem key={cat?._id ?? ""} value={cat?._id ?? ""}>
      {cat?.categoryName ?? ""}
      {/* <img width={24} height={24} src={cat?.image ?? ""} /> */}
    </MenuItem>
  ));

  if (isLoading) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <CssBaseline enableColorScheme />

        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            إضافة سؤال جديد
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
              <TextField placeholder="السؤال:" name="question" />

              <TextField placeholder="الإجابة:" name="answer" />

              <TextField placeholder="الدرجة:" name="weight" type="number" />

              <TextField placeholder="مساعدة:" name="hint" />
            </FormControl>
            <FormControl onChange={handleOptions}>
              <div>
                <TextField placeholder="الخيارات:" name="option1" />
                <TextField placeholder="الخيارات:" name="option2" />
                <TextField placeholder="الخيارات:" name="option3" />
                <TextField placeholder="الخيارات:" name="option4" />
              </div>
            </FormControl>
            <Select
              onChange={handleChange}
              value={selectedCategory._id}
              className="drop"
              name="category"
              id="category"
            >
              {dropdown}
            </Select>
            <input type="file" onChange={handleQImage} />
            <input type="file" onChange={handleAImage} />
            {previewQImage === "" ? (
              <></>
            ) : (
              <img
                className="img-thumbnail"
                src={previewQImage}
                alt="profile"
                accept="image/*"
              />
            )}
            {previewAImage === "" ? (
              <></>
            ) : (
              <img
                className="img-thumbnail"
                src={previewAImage}
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
};
export default observer(AddQuestions);
