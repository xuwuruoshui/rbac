export default {
  install (Vue) {
    Vue.mixin({
      methods: {
        hasAuth (perm) {
          let authorities = this.$store.state.menus.permissionList

          return authorities.indexOf(perm) !== -1
        }
      }
    })
  }
}