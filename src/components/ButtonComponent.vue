<template lang="pug">
button.button
  p(v-if="!slots.default") No hay contenido
  slot(v-else)
</template>

<script setup>
import { useSlots } from "vue";

// eslint-disable-next-line no-unused-vars
const slots = useSlots();
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.button {
  border: 3px solid $color-primary;
  padding: 1.25rem;
  border-radius: 0.625rem;
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
