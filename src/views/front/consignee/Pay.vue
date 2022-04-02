<template>
  <div>
    <h2>扫码支付</h2>
    <img src="../../../../public/img/scan.webp" alt="">
    <br>
    <br>
    {{num}}秒后自动关闭
  </div>
</template>

<script>
export default {
  name: "pay",
  data() {
    return {
      num:3
    }
  },
  created() {
    setTimeout(() => {
      this.$emit("payFalse",false)
    }, 3300);
    setTimeout(() => {
      this.num--
      setTimeout(() => {
        this.num--
        setTimeout(() => {
          this.num--
          setTimeout(() => {
            this.num--
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }
}
</script>

<style scoped>
img {
  position: relative;
  top: 10px;
  left: -15px;
  width: 240px;
  height: 250px;
}

</style>