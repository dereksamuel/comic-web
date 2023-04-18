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
        commit("setState", { key: "loading", value: false }); // aqui hay un error
        commit("setState", { key: "error", value: error });
      } else {
        commit("setState", { key: "loading", value: false }); // aqui hay un error
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
      // to update, es una eliminacion parcial de mi comic para no tener repetidos en el array. NO ES UN SET
      rated_comics = rated_comics.filter(
        (rc) => rc.num !== state.current_comic.num
      );
      // esto es para que no se repitan los comics
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

  onClearOne({ state, commit }, num) {
    const rated_comics = state.rated_comics.filter((rc) => rc.num !== num);

    toastr.success(`Eliminación del comic #${num} exitosa!`);
    commit("setState", { key: "rated_comics", value: rated_comics });
    setStorage("rated_comics", rated_comics);
  },
};
