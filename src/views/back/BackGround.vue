<template>
  <div>
    <Merchant v-if="$store.state.roleId === 3"></Merchant>
  </div>
</template>

<script>
import Merchant from "../../components/background/mer/Merchant"
import {handleAlert} from "../../utils/confirm";
export default {
  name: "BackGround",
  components: {Merchant},
  component: {
    Merchant
  },
  created() {
    if (this.$store.state.userId === null) {
      handleAlert("请先登录")
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>

</style>