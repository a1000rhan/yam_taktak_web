import { makeAutoObservable, configure } from "mobx";
configure({
  enforceActions: "never",
});
import API from "./API";

class GameAPI {
  games = [];
  game = null;

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

  fetchOneGame = async (gameId) => {
    try {
      if (this.game != null) return;
      const resp = await API.get(`/games/${gameId}`);
      this.game = resp.data;
    } catch (error) {
      console.log("🚀 ~ GameAPI ~ fetchOneGame= ~ error", error);
    }
  };
  createGame = async (game, navigator) => {
    try {
      const resp = await API.post("/games/create", game);

      // store the game._id in local storage
      localStorage.setItem("gameId", resp.data._id);

      navigator("/new-game");
    } catch (error) {
      console.log("🚀 ~ GameAPI ~ fetchGames= ~ error", error);
    }
  };
}

const gameAPI = new GameAPI();
export default gameAPI;
