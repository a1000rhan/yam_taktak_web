import { makeAutoObservable, configure } from "mobx";
configure({
  enforceActions: "never",
});
import API from "./API";

class GameAPI {
  games = [];

  constructor() {
    makeAutoObservable(this, {});
  }
  fetchGames = async () => {
    try {
      const resp = await API.get("/games");

      this.games = resp.data;
      console.log("🚀 ~ GameAPI ~ fetchGames= ~ games:", games);
    } catch (error) {
      console.log("🚀 ~ GameAPI ~ fetchGames= ~ error", error);
    }
  };
  createGame = async (game) => {
    try {
      const resp = await API.post("/games/create", game);

      this.games = resp.data;
      console.log("🚀 ~ GameAPI ~ fetchGames= ~ games:", games);
    } catch (error) {
      console.log("🚀 ~ GameAPI ~ fetchGames= ~ error", error);
    }
  };
}

const gameAPI = new GameAPI();
export default gameAPI;
