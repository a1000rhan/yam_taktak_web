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
      if (this.categories.length != []) return;
      const resp = await API.get("/category");
      this.categories = resp.data;
      this.loading = false;
    } catch (error) {
      console.log("🚀 ~ CategoryAPI ~ getCategories= ~ error:", error);
    }
  };
  // addCategory = async (category, Swal, navigate, setIsLoading) => {
  //   try {
  //     this.loading = true;
  //     const formData = new FormData();
  //     for (const key in category) formData.append(key, category[key]);
  //     await API.post("/category/create", formData);
  //     navigate("/select-categories");

  //     Swal.fire("Good job!", "You clicked the button!", "success");

  //     console.log("🚀 ~ CategoryAPI ~ addCategory= ~ formData:", formData);
  //     setIsLoading(false);
  //     this.loading = false;
  //     this.getCategories();
  //   } catch (error) {
  //     console.log("🚀 ~ CategoryAPI ~ addCategory= ~ error:", error);
  //     setIsLoading(false);

  //     Swal.fire(
  //       `${error.response.data.message}`,
  //       "You clicked the button!",
  //       "error"
  //     );
  //   }
  // };

  addCategory = async (category, Swal, navigate, setIsLoading) => {
    try {
      this.loading = true;

      // Validate payload size (example limit: 2MB)
      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      const payloadSize = new Blob(Object.values(category)).size;
      if (payloadSize > MAX_SIZE) {
        throw new Error("Payload exceeds the maximum size of 2MB.");
      }

      // Prepare form data
      const formData = new FormData();
      for (const key in category) {
        formData.append(key, category[key]);
      }

      // Make API call
      await API.post("/category/create", formData);
      navigate("/select-categories");

      Swal.fire("Good job!", "Category added successfully!", "success");

      setIsLoading(false);
      this.loading = false;

      // Refresh categories
      this.getCategories();
    } catch (error) {
      console.log("🚀 ~ CategoryAPI ~ addCategory= ~ error:", error);
      setIsLoading(false);

      // Handle specific error cases
      if (error.response && error.response.status === 413) {
        Swal.fire(
          "Payload Too Large",
          "The category data exceeds the allowed size. Please reduce the data size and try again.",
          "error"
        );
      } else if (error.message === "Payload exceeds the maximum size of 2MB.") {
        Swal.fire("Payload Too Large", error.message, "error");
      } else {
        Swal.fire(
          `${error.response?.data?.message || "An unexpected error occurred."}`,
          "Please try again!",
          "error"
        );
      }
    }
  };
}

const categoryAPI = new CategoryAPI();
export default categoryAPI;
