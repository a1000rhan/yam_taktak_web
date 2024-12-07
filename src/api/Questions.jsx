import { makeAutoObservable, configure } from "mobx";
configure({
  enforceActions: "never",
});
import API from "./API";
class QuestionsAPI {
  constructor() {
    makeAutoObservable(this, {});
  }

  loading = false;
  questions = [];
  question = {};
  getQuestions = async () => {
    this.loading = true;
    try {
      const resp = await API.get("/questions");
      this.questions = resp.data;
      this.loading = false;
    } catch (error) {
      console.log(
        "🚀 ~ file: Questions.jsx ~ line 11 ~ QuestionsAPI ~ getQuestions= ~ error",
        error
      );
    }
  };
  addQuestion = async (question, Swal, navigate, setIsLoading) => {
    try {
      const formData = new FormData();
      for (const key in question) formData.append(key, question[key]);
      this.loading = true;
      await API.post("/questions/create", formData);
      navigate("/select-categories");

      Swal.fire("Good job!", "You clicked the button!", "success");
      this.loading = false;
      setIsLoading(false);
      this.getQuestions();
    } catch (error) {
      setIsLoading(false);
      console.log(
        "🚀 ~ file: Questions.jsx ~ line 11 ~ QuestionsAPI ~ getQuestions= ~ error",
        error
      );
      Swal.fire(
        `${error.response.data.message}`,
        "You clicked the button!",
        "error"
      );
    }
  };
}

const questionsAPI = new QuestionsAPI();
export default questionsAPI;
