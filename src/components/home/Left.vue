<template>
  <div>
    <div class="title">热门推荐</div>
    <ul class="menu">
      <li @click="changeMenu(1)">手机</li>
      <li @click="changeMenu(2)">笔记本电脑</li>
      <li>笔记本电脑</li>
      <li>手机</li>
      <li>笔记本电脑</li>
      <li>手机</li>
      <li>笔记本电脑</li>
      <li>手机</li>
      <li>笔记本电脑</li>
      <li>手机</li>
      <li>笔记本电脑</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    changeMenu(id) {
      this.$store.commit("changeGoodId",id)
      this.$store.commit("changeGoodName",null)
    }
  }
}
</script>

<style scoped>
.title{
  color: red;
  width: 100px;
  height: 22px;
  text-align: center;
}
.menu li{
  height: 42px;
  width: 100px;
  list-style: none;
  margin-bottom: 2px;
  background-color: white;
  line-height: 41px;
  cursor: pointer;  /*将鼠标形状改成手型*/
  text-align: center;
}
.menu{
  padding: 0;

}

</style>