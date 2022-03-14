<template>
  <div class="main">
    <div class="left">
      <img src="../../../public/img/home/pic.png" height="40" width="150"/>
      <h2 @click="home(null)">首页</h2>
      <select v-model="op">
        <option value="/login" style="color: #358ed5">修改头像</option>
        <option style="color: deeppink">我的淘宝</option>
        <option style="color: #e957ff">修改密码</option>
        <option v-show=false>我的</option>
      </select>
      <img class="head" src="../../../public/img/head/head10.jpg" height="28" width="28">
      <img @click="goCart" class="cart" src="../../../public/img/home/cart.jpg" height="38" width="38">
    </div>
    <div class="container">
        <input type="text" class="search" placeholder="请输入商品名称" name="goodName" v-model="query">
        <button class="btn" @click="changeName"></button>
        <h3 @click="login">登录</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "top.vue",
  data() {
    return {
      query:"",
      op: "我的"
    }
  },
  watch: {
    op() {
      this.$router.push(this.op)
    }
  },
  methods: {
    goCart() {
      if (this.$store.state.userId === null) {
        alert("请先登录再查看购物车!!!")
        this.$router.push("/login")
      } else {
        this.$router.push("/cart")
      }
    },
    home(id) {
      this.$store.commit("changeGoodId",id)
      this.$store.commit("changeGoodName",null)
      if (this.$route.path !== "/"){
        this.$router.push("/")
      }
    },
    login() {
      this.$router.push("/login")
    },
    changeName() {
      this.$store.state.goodName = this.query
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.head {
  position: absolute;
  margin-top: -2px;
  margin-left: -20px;
  border-radius: 50%;
}

select {
  outline: whitesmoke;
  text-align: center;
  color: deeppink;
  position: absolute;
  margin-left: -34.1px;
  margin-top: 26px;
  height: 14px;
  width: 55px;
  font-size: 8px;
  background-color: whitesmoke;
  border: whitesmoke;
  font-weight: 600;
  appearance:none;
}

h3 {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  position: absolute;
  margin-left: 450px;
  color: red;
  margin-top: 10px;
  cursor: pointer;
}

.main {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  background-color: whitesmoke;
  margin-top: 10px;
  margin-left: 33px;
  width: 1200px;
  height: 45px;
  cursor: pointer;
}

.left {
  float: left;
  margin: 5px 40px;
}

.left img {
  float: left;
}

.cart {
  position: absolute;
  margin-left: 50px;
  margin-top: -2px;
}

.left h2 {
  cursor: pointer;  /*将鼠标形状改成手型*/
  color: red;
  float: left;
  margin: 0 80px;
}

.container {
  height: 44px;
  width: 100px;
  margin: 0 auto 0 auto;
}

.parent {
  position: relative;
}

.search {
  width: 300px;
  height: 40px;
  border-radius: 18px;
  outline: none;
  border: 1px solid #ccc;
  padding-left: 20px;
  position: absolute;
  background-color: white;
}

.btn {
  height: 30px;
  width: 30px;
  position: absolute;
  background: url("../../../public/img/home/search.png")  -4px -6px;
  top: 16px;
  left: 865px;
  border: none;
  outline: none;
  cursor: pointer;
}

</style>