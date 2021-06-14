<template>
  <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTab">
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  name: "Tabs",
  data() {
    return {
    }
  },
  methods: {

    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },

    changeTab(target){
      console.log(target)
      this.$router.push(target.name)
    }

  },
  computed:{
    editableTabs:{
      set(val){
        this.$store.state.menus.editableTabs = val
      },
      get(){
        return this.$store.state.menus.editableTabs
      }
    },
    editableTabsValue:{
      set(val){
        this.$store.state.menus.editableTabsValue = val
      },
      get(){
        return this.$store.state.menus.editableTabsValue
      }
    }
  }

}
</script>

<style scoped>

</style>