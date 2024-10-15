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
  addCategory = async (category) => {
    try {
      const formData = new FormData();
      for (const key in category) formData.append(key, category[key]);
      this.loading = true;
      await API.post("/category/create", formData);
      this.loading = false;
      this.getCategories();
    } catch (error) {
      console.log("🚀 ~ CategoryAPI ~ addCategory= ~ error:", error);
    }
  };
}

const categoryAPI = new CategoryAPI();
export default categoryAPI;
