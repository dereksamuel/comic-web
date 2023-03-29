<template lang="pug">
img(:src="state.src" @error="onImageError").image-component
</template>

<script setup>
import { computed, defineProps, reactive } from "vue";
import ErrorImage from "@/assets/ErrorImage.png";

const props = defineProps({
  src: String,
});

const state = reactive({
  src: computed(() => props.src || ErrorImage),
});

// eslint-disable-next-line no-unused-vars
function onImageError(event) {
  console.error(event);
  state.src = ErrorImage;
};
</script>

<style lang="scss" scoped>
.image-component {
  max-width: 100%;
  object-fit: cover;
  display: inline-block;
  object-position: center;
}
</style>
