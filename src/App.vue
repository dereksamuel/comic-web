<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import ImageComponent from "./components/ImageComponent.vue";
import StarsComponent from "./components/StarsComponent.vue";
import ButtonComponent from "./components/ButtonComponent.vue";
import LoadingComponent from "./components/LoadingComponent.vue";

const store = useStore();

// COMPUTED PROPS
let currentComic = computed(() => {
  return store.state.comics.current_comic;
});
let loading = computed(() => {
  return store.state.comics.loading;
});
let ratedComics = computed(() => {
  return store.state.comics.rated_comics;
});
let apiUrl = computed(() => {
  return store.state.comics.api_url;
});

// METHODS
function onSave() {
  store?.dispatch("comics/onStarSelection");
}
function onCleanAll() {
  store?.dispatch("comics/onCleanAll");
}
function onClearOne(num) {
  store?.dispatch("comics/onClearOne", num);
}
function onGetRandomicComic(isRandom) {
  store.commit("comics/setState", { key: "starsLengthState", value: 0 });
  if (isRandom) {
    const stars = [
      ...document.querySelectorAll("#stars.current-stars button"),
    ];
    if (stars && stars.length) {
      stars.forEach((star) => {
        star.classList.add("star--inactive");
        star.classList.remove("star--active");
      });
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const value = Math.ceil(Math.random() * 2755);
      // que por esa iteracion no se muestre el comic, pero lo mas efectivo es tener un array de esos comics que ya vi y hacer la evaluacion de abajo
      if (value !== parseInt(apiUrl.value.split("http://xkcd.com/")[1])) {
        store.commit("comics/setState", { key: "api_url", value: `http://xkcd.com/${value}` });
        break;
      }
    }
  }

  store.dispatch("comics/onGetCurrentComic");
}

onMounted(() => {
  onGetRandomicComic();
});
</script>

<template lang="pug">
.app-container
  transition(name="fadeIn")
    loading-component(v-if="loading")
  .current-comic
    h1.title.current-comic__title--main {{ currentComic?.title }}
    image-component(:src="currentComic?.img")
    stars-component
    .current-comic__buttons
      button-component(@click="onSave") Guardar calificación
      button-component(@click="() => onGetRandomicComic(true)") Ver otro comic
  .rated-comics
    h1.title.rated-comics__title
      | Calificados{{ ratedComics && `: ${ratedComics.length}` }}
      button(@click="onCleanAll" :disabled="!ratedComics || !ratedComics.length").non-styles
        span.material-symbols-outlined.icon-delete delete
    ul.list-rated(v-if="ratedComics && ratedComics.length")
      li.list-rated__item(v-for="comic in ratedComics" :key="comic.num")
        h1.subtitle.current-comic__title
          | {{ comic?.title }}
          button(@click="() => onClearOne(comic.num)").non-styles
            span.material-symbols-outlined.icon-delete close
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

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: fit-content;
    margin: 0 auto;

    button:nth-child(2) {
      margin-left: 1.25rem;
    }
  }

  &__title,
  &__title--main {
    text-align: center;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &--main {
      justify-content: center;
    }
  }
}

.rated-comics {
  flex: 1;
  background-color: $color-primary;
  margin: 0;
  height: 100vh;

  &__title {
    color: white;
    max-width: 80%;
    margin: 0 auto;
    margin-bottom: 2.5rem;
  }
}

.list-rated {
  display: grid;
  gap: 3.75rem;

  &__item {
    max-width: 80%;
    margin: 0 auto;
  }
}

.fadeIn-enter-active {
  animation: fadeIn .5s;
}

.fadeIn-leave-active {
  animation: fadeIn .5s reverse;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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

    .list-rated {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media screen and (max-width: 1200px) {

  .current-comic,
  .rated-comics {
    .list-rated {
      grid-template-columns: 1fr;
    }
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
