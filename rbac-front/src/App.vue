<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>
<script>

export default {
  name: "App",
  // 刷新页面，根据uri路径内容判定要跳转的路由，添加进tab标签页
  watch: {
    $route(to) {

      if (to.path !== '/login') {
        let tab = {
          path: to.path,
          title: to.meta.title
        }

        this.$store.commit("menus/addTab", tab)
      }

    }
  }
}
</script>
<style>
html,
body,
#app {
  font-family: "Helvetica Neue", "Hiragino Sans GB", "WenQuanYi Micro Hei",
    "Microsoft Yahei", sans-serif;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
</style>
