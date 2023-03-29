import { createStore } from "vuex";
import { comics } from "./comics";

export const store = createStore({
  namespaced: true,
  modules: {
    comics
  }
});
