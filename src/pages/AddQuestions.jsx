import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import questionsAPI from "../api/Questions";
import categoryAPI from "../api/Category";
import { MenuItem, Select } from "@mui/material";
import authAPI from "../api/Auth";

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

export default function AddQuestions(props) {
  const [isLoading, setIsLoading] = useState(false);
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
      game: "66f6b34b31e4766930727704",
      weight: 100,
    });
    await questionsAPI.addQuestion(question);
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
              value={selectedCategory}
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
}
