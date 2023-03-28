<template lang="pug">
#stars.stars
  button.star--inactive(v-for="star in Array(5)" :id="star" :key="star")
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
