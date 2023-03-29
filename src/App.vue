<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import ImageComponent from "./components/ImageComponent.vue";
import StarsComponent from "./components/StarsComponent.vue";
import ButtonComponent from "./components/ButtonComponent.vue";

const store = useStore();

let currentComic = computed(() => {
  return store.state.comics.current_comic;
});

let ratedComics = computed(() => {
  return store.state.comics.rated_comics;
});

function onSave() {
  store?.dispatch("comics/onStarSelection");
}

function onCleanAll() {
  store?.dispatch("comics/onCleanAll");
}

onMounted(() => {
  store.dispatch("comics/onGetCurrentComic");
});
</script>

<template lang="pug">
.app-container
  .current-comic
    h1.title.current-comic__title {{ currentComic?.title }}
    image-component(:src="currentComic?.img")
    stars-component
    button-component(@click="onSave") Guardar calificación
  .rated-comics
    h1.title.rated-comics__title
      | Cómics calificados{{ ratedComics && `: ${ratedComics.length}` }}
      button(@click="onCleanAll").non-styles
        span.material-symbols-outlined.icon-delete delete
    ul.list-rated(v-if="ratedComics && ratedComics.length")
      li.list-rated__item(v-for="comic in ratedComics" :key="comic.num")
        h1.subtitle.current-comic__title {{ comic?.title }}
        image-component(:src="comic?.img" :isRated="true")
        stars-component(:starsLength="comic.rate" :isDisabled="true")
</template>

<style lang="scss" scoped>
@import "./variables.scss";

.app-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}

.current-comic,
.rated-comics {
  width: 100%;
  flex: 2;
  padding: 2.5rem;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  margin: 0 auto;
  vertical-align: middle;
  text-align: center;

  &__title {
    margin-bottom: 2.5rem;
  }
}

.rated-comics {
  flex: 1;
  background-color: $color-primary;
  margin: 0;
  height: 100vh;

  &__title {
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.list-rated {
  display: grid;
  gap: 3.75rem;
}

@media screen and (max-width: 1500px) {
  .app-container {
    flex-direction: column;
  }

  .current-comic,
  .rated-comics {
    height: fit-content;
    max-height: fit-content;
    flex: none;
  }
}

@media screen and (max-width: 544px) {
  .app-container {
    flex-direction: column;
  }

  .current-comic,
  .rated-comics {
    height: fit-content;
    max-height: fit-content;
    flex: none;
  }
}
</style>
