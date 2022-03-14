<template>
  <div class="main">
    <div class="top1">
      <Top></Top>
    </div>
    <div class="left">
      <Left></Left>
    </div>
      <div class="right">
        <div class="top">
          <img src="../../public/img/home/title.jpg">
        </div>
        <div class="button">
          <Right></Right>
        </div>
      </div>
  </div>
</template>

<script>
import Left from '../components/home/Left';
import Right from "../components/home/Right";
import Top from "../components/home/Top";
export default {
  name: "First",
  components:{
    Left,
    Right,
    Top
  }
}
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
  }
  .left{
    width: 100px;
    float: left;
    margin-left: 40px;
  }
  .right{
    width: 1000px;
    float: left;
    margin-left: 10px;
  }
  .main{
    width: 1200px;
    margin: 10px auto;
  }
  .top img{
    height: 100px;
    width: 1000px;
  }
  .left,.right{
    background-color: #f5f5f5;
    height: 500px;
  }
</style>