import { makeAutoObservable, configure } from "mobx";
configure({
  enforceActions: "never",
});
import API from "./API";
class CategoryAPI {
  constructor() {
    makeAutoObservable(this, {});
  }

  loading = false;
  categories = [];
  category = {};
  getCategories = async () => {
    this.loading = true;
    try {
      const resp = await API.get("/category");
      this.categories = resp.data;
      this.loading = false;
    } catch (error) {
      console.log("🚀 ~ CategoryAPI ~ getCategories= ~ error:", error);
    }
  };
  addCategory = async (category, Swal, navigate, setIsLoading) => {
    try {
      this.loading = true;
      const formData = new FormData();
      for (const key in category) formData.append(key, category[key]);
      await API.post("/category/create", formData);
      navigate("/select-categories");

      Swal.fire("Good job!", "You clicked the button!", "success");

      console.log("🚀 ~ CategoryAPI ~ addCategory= ~ formData:", formData);
      setIsLoading(false);
      this.loading = false;
      this.getCategories();
    } catch (error) {
      console.log("🚀 ~ CategoryAPI ~ addCategory= ~ error:", error);
      setIsLoading(false);

      Swal.fire(
        "You have Entered wrong info!",
        "You clicked the button!",
        "error"
      );
    }
  };
}

const categoryAPI = new CategoryAPI();
export default categoryAPI;
