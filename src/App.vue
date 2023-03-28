<script setup>
import { onMounted, reactive } from "vue";
// eslint-disable-next-line no-unused-vars
import ImageComponent from "./components/ImageComponent.vue";
import superagent from "superagent";

const state = reactive({
  corsHeader: "https://any-api.com:8443",
  apiUrl: `http://xkcd.com/${Math.ceil(Math.random() * 2755)}`,
  apiUrlFormat: "info.0.json",
  response: null
});

const getComics = () => {
  const requestUrl = `${state.corsHeader}/${state.apiUrl}/${state.apiUrlFormat}`;
  superagent
    .get(requestUrl)
    .end((error, response) => {
      if (error) {
        console.error(error);
      }
      state.response = response.body;
      console.log(state.response);
    })
};

onMounted(() => {
  getComics();
});
</script>

<template lang="pug">
.app-container
  h1.title.app-container__title {{ state.response?.title }}
  ImageComponent(:src="state.response?.img")
</template>

<style lang="scss" scoped>
.app-container {
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 550px;
  height: 100%;
  overflow-y: auto;
  margin: 0 auto;

  &__title {
    margin-bottom: 2.5rem;
  }
}
</style>
