<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import ImageComponent from "./components/ImageComponent.vue";
import StarsComponent from "./components/StarsComponent.vue";

const store = useStore();

let currentComic = computed(() => {
  return store.state.comics.current_comic;
})

onMounted(() => {
  store.dispatch("comics/onGetCurrentComic");
});
</script>

<template lang="pug">
.app-container
  h1.title.app-container__title {{ currentComic?.title }}
  image-component(:src="currentComic?.img")
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
