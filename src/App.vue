<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "@/assets/less/global.less";
import "@/assets/font/iconfont.css";
export default {
  name: "app",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* caret-color: #fff; */
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
