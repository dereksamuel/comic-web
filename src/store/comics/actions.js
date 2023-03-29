import superagent from "superagent";
import { setStorage } from "@/utils/storage.js";
import { getStorage } from "../../utils/storage";

export const actions = {
  onGetCurrentComic({ state, commit }) {
    const requestUrl = `${state.cors_header}/${state.api_url}/${state.api_url_format}`;
    superagent
      .get(requestUrl)
      .end((error, response) => {
        if (error) {
          console.error(error);
          commit("setState", { key: "error", value: error });
        } else {
          commit("setState", { key: "current_comic", value: response.body });
        }
      })
  },

  onStarSelection({ state }, rate) {
    const rated_comic = {
      rate: rate + 1,
      ...state.current_comic
    };
    let rated_comics = JSON.parse(JSON.stringify(getStorage("rated_comics")));
    if (rated_comics.find((rc) => rc.num === state.current_comic.num)) {
      // to update
      rated_comics = rated_comics.filter((rc) => rc.num !== state.current_comic.num)
    }

    setStorage("rated_comics", [...rated_comics, rated_comic]);
  }
};
