import { makeAutoObservable, configure } from "mobx";
import decode from "jwt-decode";
import API from "./API";

configure({
  enforceActions: "never",
});
class AuthAPI {
  user = null;
  loading = true;
  constructor() {
    makeAutoObservable(this, {});
  }

  setUser = async (token) => {
    // await AsyncStorage.setItem("myToken", token);
    await localStorage.setItem("myToken", token);
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  checkForToken = async () => {
    // const token = await AsyncStorage.getItem("myToken");
    const token = localStorage.getItem("myToken");

    if (token) {
      const decodedToken = decode(token);
      if (Date.now() < decodedToken.exp) {
        this.setUser(token);
        this.loading = false;
      } else {
        this.signOut();
      }
    }
  };

  signIn = async (user, Swal, navigate, setIsLoading) => {
    try {
      const resp = await API.post("/signin", user);
      await this.setUser(resp.data.token);

      this.user.type === "admin";

      navigate("/select-categories");

      this.loading = false;
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You have Successfully Signed Up",
        showConfirmButton: false,
        timer: 3000,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(
        "🚀 ~ file: authStore.js ~ line 47 ~ AuthStore ~ signIn= ~ error",
        error
      );

      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Enter the right data",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  signUp = async (user, Swal, navigate, setIsLoading) => {
    try {
      const resp = await API.post("/signup", user);

      await this.setUser(resp.data.token);
      navigate("/select-categories");

      setIsLoading(false);
      Swal.fire("Good job!", "You clicked the button!", "success");
    } catch (error) {
      console.log("🚀 ~ AuthAPI ~ signUp= ~ error:", error);
      setIsLoading(false);

      Swal.fire(
        "You have Entered wrong info!",
        "You clicked the button!",
        "error"
      );
    }
  };

  signOut = (navigate) => {
    this.user = null;
    delete API.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    localStorage.clear();
    this.loading = false;
    navigate("/");
  };
}
const authAPI = new AuthAPI();
authAPI.checkForToken();
export default authAPI;
