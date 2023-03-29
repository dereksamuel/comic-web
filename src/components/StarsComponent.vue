<template lang="pug">
#stars.stars(:class="starsLength ? 'rated-stars' : 'current-stars'")
  .tap(v-if="isDisabled")
  button(v-for="(n, index) in Array(5)" :disabled="isDisabled" :id="`star-${index}`" :key="index" @click="() => onSelectStar(index)" :class="isActive(index)")
    svg(width='59' height='58' viewbox='0 0 59 58' fill='none' xmlns='http://www.w3.org/2000/svg')
      path(d='M30.9266 4.48075L35.0926 17.3024C35.9628 19.9806 38.4585 21.7938 41.2745 21.7938L54.756 21.7938C56.2091 21.7938 56.8132 23.6533 55.6377 24.5074L44.7309 32.4316C42.4527 34.0868 41.4994 37.0207 42.3696 39.6988L46.5357 52.5205C46.9847 53.9025 45.403 55.0517 44.2274 54.1976L33.3206 46.2733C31.0424 44.6181 27.9576 44.6181 25.6794 46.2733L14.7726 54.1976C13.597 55.0517 12.0153 53.9025 12.4643 52.5205L16.6304 39.6988C17.5006 37.0207 16.5473 34.0868 14.2691 32.4316L3.36232 24.5074C2.18675 23.6533 2.79092 21.7938 4.244 21.7938L17.7255 21.7938C20.5415 21.7938 23.0372 19.9806 23.9074 17.3024L28.0734 4.48075C28.5224 3.09878 30.4776 3.09878 30.9266 4.48075Z' fill='#D9D9D9' stroke='#0C0C0C' stroke-width='3')
</template>

<script setup>

import { useStore } from "vuex";

const emit = defineEmits(["selected"]);
const store = useStore();

const props = defineProps({
  isDisabled: Boolean,
  starsLength: Number
});

// eslint-disable-next-line no-unused-vars
function isActive(index) {
  if (props.starsLength && props.starsLength === index + 1) {
    return "star--active";
  }
  return "star--inactive";
}

function onCleanStar(star) {
  star.classList.add("star--inactive");
  star.classList.remove("star--active");
}

// eslint-disable-next-line no-unused-vars
function onSelectStar(index) {
  const star = document.querySelector(`#star-${index}`);
  const stars = [...document.querySelectorAll("#stars.current-stars button")].filter((s) => s.id !== `star-${index}`);
  if (stars && stars.length) {
    stars.forEach((star) => {
      onCleanStar(star);
    });
  }

  if (star?.classList.contains("star--active")) {
    // When points are 0
    store.commit("comics/setState", { key: "starsLengthState", value: 0 });
    // store.dispatch("comics/onStarSelection", -1);
    onCleanStar(star);
  } else {
    store?.commit("comics/setState", { key: "starsLengthState", value: index + 1 });
    // store?.dispatch("comics/onStarSelection", index);
    star?.classList.remove("star--inactive");
    star?.classList.add("star--active");
  }

  emit("selected", index);
}
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.stars {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
  gap: 1.25rem;
  padding: 2.5rem;
  max-width: 550px;
  margin: 0 auto;
  position: relative;

  .tap {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .star--inactive,
  .star--active {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    max-width: 60px;
    height: 60px;
    transition: 0.5s all;

    svg {
      max-width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      pointer-events: none;

      path {
        transition: 0.5s all;
        transform-origin: center;
      }
    }

    &:hover {
      transform: scale(1.2);
    }

    &:hover svg path {
      filter: drop-shadow(0 0 3px rgba(240, 213, 155, 0.384));
      animation: animateRotation 2s linear forwards alternate infinite;
      fill: $color-secondary;
    }

    &:nth-child(1):hover ~ button,
    &:nth-child(2):hover ~ button,
    &:nth-child(3):hover ~ button,
    &:nth-child(4):hover ~ button,
    &:nth-child(5):hover ~ button {
      svg path {
        fill: $color-radiant;
      }
      opacity: 0.8;
      transform: rotate(360deg);
    }

    &:disabled {
      cursor: auto;
    }
  }

  .star--active {
    animation: animateRotationScale 2s linear forwards alternate infinite;

    svg path {
      filter: drop-shadow(0 0 3px rgba(240, 213, 155, 0.384));
      fill: $color-secondary;
    }

    &:nth-child(1) ~ button,
    &:nth-child(2) ~ button,
    &:nth-child(3) ~ button,
    &:nth-child(4) ~ button,
    &:nth-child(5) ~ button {
      svg path {
        fill: $color-radiant;
        opacity: 0.75;
      }
      opacity: 0.75;
      transform: rotate(360deg);
    }
  }
}

@keyframes animateRotation {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(-180deg);
  }
}

@keyframes animateRotationScale {
  from {
    transform: rotateZ(0deg) scale(1.2);
  }
  to {
    transform: rotateZ(-180deg) scale(1.2);
  }
}
</style>
