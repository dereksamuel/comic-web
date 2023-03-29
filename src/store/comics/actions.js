import superagent from "superagent";
import { setStorage } from "@/utils/storage.js";
import { getStorage } from "../../utils/storage";
import toastr from "toastr";

export const actions = {
  onGetCurrentComic({ state, commit }) {
    commit("setState", { key: "loading", value: true });
    const requestUrl = `${state.cors_header}/${state.api_url}/${state.api_url_format}`;
    superagent.get(requestUrl).end((error, response) => {
      if (error) {
        console.error(error);
        commit("setState", { key: "loading", value: false });
        commit("setState", { key: "error", value: error });
      } else {
        commit("setState", { key: "loading", value: false });
        commit("setState", { key: "current_comic", value: response.body });
      }
    });
  },

  onStarSelection({ state, commit }) {
    const rated_comic = {
      rate: state.starsLengthState,
      ...state.current_comic,
    };
    let rated_comics = JSON.parse(JSON.stringify(getStorage("rated_comics")));
    if (rated_comics.find((rc) => rc.num === state.current_comic.num)) {
      // to update
      rated_comics = rated_comics.filter(
        (rc) => rc.num !== state.current_comic.num
      );
    }

    const value = [...rated_comics, rated_comic];

    toastr.options.positionClass = "toast-top-left";
    toastr.success("Calificación guardada!");
    commit("setState", { key: "rated_comics", value });
    setStorage("rated_comics", value);
  },

  onCleanAll({ commit }) {
    commit("setState", { key: "rated_comics", value: [] });
    setStorage("rated_comics", []);
  },
};
