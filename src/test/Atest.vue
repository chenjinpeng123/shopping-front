<template>
<div>
  <el-button @click="action">点我</el-button>
  <el-dialog  :visible.sync="menuRoleVisible" append-to-body>
    <Btest v-if="menuRoleVisible" ref="menuRole"></Btest>
  </el-dialog>
</div>
</template>

<script>
import Btest from "./Btest.vue"
export default {
  name: "a",
  data() {
    return {
      menuRoleVisible:false
    }
  },
  methods: {
    action() {
      this.menuRoleVisible = !this.menuRoleVisible
    }
  },
  components: {
    Btest
  }
}
</script>

<style scoped>

</style>