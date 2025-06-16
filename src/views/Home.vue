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
  window.electron.sendMessage("收到消息了😉");
});

function handleLogin() {
  window.electron.openLoginView();
}
</script>

<template>
  <input type="text" v-model="title" />
  <button @click="setTitle">确认</button>
  <button @click="handleLogin">登录</button>
</template>

<style scoped></style>
