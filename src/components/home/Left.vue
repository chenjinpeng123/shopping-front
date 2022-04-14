<template>
  <div>
    <div class="title">热门推荐</div>
    <ul class="menu" v-for="item of groups">
      <li @click="changeMenu(item.id)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      groups: [],
    }
  },
  methods: {
    changeMenu(id) {
      this.$store.commit("changeGoodId",id)
      this.$store.commit("changeGoodName",null)
    }
  },
  created() {
    let _this = this
    request({
      url: 'group/list',
      method: 'get'
    }).then(data => {
      console.log(data.data);
      _this.groups = data.data
    })
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