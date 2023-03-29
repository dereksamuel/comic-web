<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive } from "vue";
import ImageComponent from "./components/ImageComponent.vue";
import StarsComponent from "./components/StarsComponent.vue";
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
    })
};

onMounted(() => {
  getComics();
});
</script>

<template lang="pug">
.app-container
  h1.title.app-container__title {{ state.response?.title }}
  image-component(:src="state.response?.img")
  stars-component
</template>

<style lang="scss" scoped>
.app-container {
  padding: 2.5rem;
  height: 100%;
  overflow-y: auto;
  margin: 0 auto;
  vertical-align: middle;
  text-align: center;

  &__title {
    margin-bottom: 2.5rem;
  }
}
</style>
