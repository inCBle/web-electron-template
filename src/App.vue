<script setup lang="ts">
import { ref } from "vue";
const title = ref("App Title");

function setTitle() {
  window.electron.setTitle(title.value);
}

window.electron.getTitle().then((value) => {
  title.value = value;
});

window.electron.onMessage((value) => {
  window.alert(value);
});
</script>

<template>
  <input type="text" v-model="title" />
  <button @click="setTitle">确认</button>
</template>

<style scoped></style>
