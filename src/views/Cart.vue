<template>
  <div id="app" class="container">
    <h2 class="title">购物车</h2>
    <table class="tab" width="100%" border="0" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th colspan="2">商品信息</th>
        <th style="width: 14%;">商品金额</th>
        <th style="width: 14%;">商品数量</th>
        <th style="width: 14%;">总金额</th>
        <th>编辑</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in productList" v-if="productList">
        <td style="width: 5%;"><input type="checkbox" v-model="choice" :value="item.num * item.price"/></td>
        <td class="goods">
          <img :src="item.picture" class="goods-left"/>
          <div class="goods-right">
            <p>{{item.name}}</p>
          </div>
        </td>
        <td>￥{{item.price}}</td>
        <td class="num">
          <button class="but" @click="reduce(index)">-</button>&nbsp;&nbsp;
          <input type="text" v-model="item.num"/>&nbsp;&nbsp;
          <button class="but" @click="add(index)">+</button>
        </td>
        <td class="redcolor">{{towNumber(item.price * item.num)}}</td>
        <td class="del" @click="deleteGoods(index,item.id)">删除</td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="footer">
        <td><input type="checkbox"/></td>
        <td>
          <span class="redcolor">全选</span>&nbsp;&nbsp;
        </td>
        <td colspan="4">
          总计：<span>{{totalPrice}}</span>元
          <button class="btn">结账</button>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>

</template>

<script>
import request from "../network/request";
export default {
  name: "Cart",
  data() {
    return {
      productList: [],
      choice: []
    }
  },
  methods: {
    towNumber(val) {
      return val.toFixed(2)
    },
    reduce(index) {
      if (this.productList[index].num !== 0) {
        this.productList[index].num--
      }
    },
    add(index) {
      this.productList[index].num++
    },
    deleteGoods(index,id) {
      this.productList.splice(index,1);
      request({
        url: '/cart/delete',
        params: {
          id: id
        },
        method: 'post'
      }).then(function (data) {
        if (data.data === 0) {
          alert("删除失败")
        }
      })
    }
  },
  computed: {
    totalPrice() {
      let sum = 0
      this.choice.forEach(function (price) {
        sum = sum + price
      })
      return sum
    }
  },
  created() {
    if (this.$store.state.userId === null) {
      alert("请先登录再查看购物车!!!")
    } else {
      let _this = this
      request({
        url:'/queryCart/list',
        method: 'get',
        params: {
          userId: _this.$store.state.userId
        }
      }).then(function (data) {
        _this.productList = data.data
      })
    }

  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

.but {
  height: 10px;
  width: 10px;
  line-height: 2px;
}

.container{
  padding: 20px;
}
.redcolor{
  color: red;
}
.title{
  text-align: center;
  position: relative;
  font-weight: normal;
  margin-bottom: 30px;
  color: #666;
}
.title:after,.title:before{
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  background: #999;
  height: 1px;
}
.title:before{
  left: 0;
}
.title:after{
  right: 0;
}
.tab thead{
  background-color: #999;
  color: #fff;
}
.tab thead th{
  padding: 10px 0;
  font-weight: normal;
}
.tab td{
  text-align: center;
  padding: 10px 0;
}
.goods{
  width: 40%;
  position: relative;
}
.goods-left{
  width: 20%;
  float: left;
}
.goods-right {
  width: 78%;
  float: right;
  text-align: left;
}
.goods-right .tip{
  color: #999;
  position: absolute;
  bottom: 10px;
  font-size: 12px;
}
.num input{
  width: 50px;
  text-align: center;
}
.num a{
  color: #333;
  text-decoration: none;
}
.del{
  cursor: pointer;
}
.footer td{
  border-top: 1px solid #ddd;
}
.footer td:nth-child(2){
  text-align: left;
}
.footer td:nth-child(3){
  text-align: right;
}
.footer .btn{
  background-color: red;
  color: #fff;
  padding: 10px 40px;
  margin-left: 20px;
  border: 0;
}
a {
  cursor: pointer;
}

</style>