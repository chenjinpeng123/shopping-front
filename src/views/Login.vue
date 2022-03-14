<template>
<div class="main">
  <form>
    <h1>欢迎来到拓胜商城</h1>
    <input class=input_1  size=15  name="username"  placeholder=用户名 v-model="username"><br />
    <input class=input_1  type=text size=15 name="password" placeholder=密码 v-model="password"><br />
    <span class="radio_box">
      <input type="radio" name="gettype" value="users" v-model="power">
<!--               <label for="radio_1"></label>-->
              普通用户
    </span>
    <span class="radio_box">
      <input type="radio" name="gettype" value="admin" v-model="power">
<!--               <label for="radio_2"></label>-->
               管理员
    </span><br/>
    <input class=input_3 type="button" @click="login" :style="action" value="登录" @mouseover="action1" @mouseleave="action2"/>
    <input class=input_3 type="button" @click="register" value="注册" :style="action0" @mouseover="action3" @mouseleave="action4"/>
  </form>

</div>
</template>

<script>
import request from "../network/request";
export default {
  name: "Login",
  data() {
    return {
      password:null,
      username:null,
      action:"",
      action0:"",
      power:"users"
    }
  },
  methods: {
    register() {
      this.$router.push('/register')
    },
    action1() {
      this.action="background:#666666"
    },
    action2() {
      this.action="background:#fff"
    },
    action3() {
      this.action0="background:#666666"
    },
    action4() {
      this.action0="background:#fff"
    },
    login() {
      if (this.username === null || this.password === null) {
        alert("用户名和密码不能为空!!!")
      } else {
        let _this = this
        let json = {
          password: this.password,
          userName: this.username
        }
        if (this.power === "users") {
          request({
            method: "post",
            url:"/user/login",
            data: json
          }).then(function (data) {
            if (data.data !== "用户名或密码错误") {
              _this.$router.push("/")
              _this.$store.commit("changeUserId",data.data)
              _this.$store.commit("changePU", json)
            } else {
              alert(data.data)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>

form{
  position:absolute;
  left:50%;
  top:50%;
  margin-left:-300px;
  margin-top:-220px;
  width:480px;
  height:280px;
  background:url("../../public/img/beijin.jpg") no-repeat;
  border-radius:25px;
  color:#fff;
  text-align:center;
  padding:65px;
  /*box-shadow: 0px 0px 15px #0005;*/
}
.input_1{
  outline:none;
  margin-top:10px;
  border:0;
  width:300px;
  height:50px;
  border-radius:15px;
  padding-left:15px;
  font-size:18px;
  color:#999;
}

h1{
  color:#fff;
}
/*单选*/
.radio_box{ display:inline-block; position:relative;margin:20px 5px;}
.radio_box label{ width:15px; height:15px; position:absolute; top:0; left:0; border:2px solid #3A5367; border-radius:50%; background:#fff; cursor:pointer;}
.radio_box input:checked + label:after{ content:''; width:9px; height:9px; position:absolute; top:3px; left:3px; background:#3A5367; border-radius:50%;}
.check_box em{ margin:0 0 0 5px;}
.input_3{
  outline: none;
  width:50px;
  height:30px;
  border:0;
  padding:5px 7px;
  background:#fff;
  border-radius:20px;
  margin:0 10px;
  cursor: pointer;
}
</style>