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
      <el-dialog  :visible.sync="$store.state.addConsignee"  append-to-body>
        <Consignee v-if="$store.state.addConsignee" ref="menuRole"></Consignee>
      </el-dialog>
      <el-dialog  :visible.sync="$store.state.selectConsignee"  append-to-body>
        <Address v-if="$store.state.selectConsignee" @consignees="consignees"></Address>
      </el-dialog>
      <el-dialog  :visible.sync="$store.state.manageConsignee"  append-to-body>
        <Manage v-if="$store.state.manageConsignee"></Manage>
      </el-dialog>
      <el-dialog  :visible.sync="selectPay" class="pay"  append-to-body>
        <Pay v-if="selectPay" @payFalse="payFalse"></Pay>
      </el-dialog>
      </thead>
      <tbody>
      <tr v-for="(item,index) in productList" v-if="productList">
        <td style="width: 5%;"><input type="checkbox" v-model="choice" :value=index></td>
        <td class="goods">
          <img :src="item.picture" class="goods-left"/>
          <div class="goods-right">
            <p>{{item.name}}</p>
          </div>
        </td>
        <td>￥{{item.price}}</td>
        <td class="num">
          <el-input-number v-model="item.num" :min="1" :max="10" size="small"></el-input-number>
        </td>
        <td class="redcolor">{{towNumber(item.price * item.num)}}</td>
        <td class="del" @click="deleteGoods(index,item.id)">删除</td>
      </tr>
      </tbody>
      <tfoot>
      <tr class="footer">
        <td><input type="checkbox" @click="selectAll"></td>
        <td>
          <span class="redcolor">全选</span>
        </td>

        <td colspan="4">
          总计：<span>{{towNumber(totalPrice)}}</span>元
          <button class="btn" @click="buy">结账</button>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>

</template>

<script>
import request from "../../network/request";
import Consignee from "./consignee/Consignee"
import { handleConfirm, handleAlert } from '../../utils/confirm'
import Address from "./consignee/Address"
import Manage from "./consignee/Manage"
import Pay from "./consignee/Pay"
export default {
  name: "Cart",
  components: {
    Consignee,
    Address,
    Manage,
    Pay
  },
  data() {
    return {
      selectList: [],
      productList: [],
      choice: [],
      person: {},
      totalPrice: 0,
      selectPay: false,
      choiceAll: false
    }
  },
  methods: {
    selectAll() {
      if (this.choiceAll === false) {
        this.choice = []
        for (let i = 0; i < this.productList.length; i++) {
          this.choice.push(i)
        }
        this.choiceAll = true
      } else {
        this.choice = []
        this.choiceAll = false
      }
    },
    payFalse(val) {
      this.selectPay = val
      request({
        url: 'order/add',
        method: 'post',
        data: {
          orderAddressVO: this.person,
          orderAddVOS: this.selectList
        }
      }).then((data) => {
        if (data.code === 1) {
          this.$message({
            type: 'info',
            message: data.msg
          });
          return
        }
        handleAlert("下单成功")
      })
    },
    buy() {
      let _this = this
      if (this.totalPrice === 0){
        handleConfirm("请先选择商品")
      } else {
        console.log(_this.selectList)
        request({
          url: '/order/changeNum',
          method: 'post',
          data: {
            orderAddVOS: _this.selectList,
            OrderAddressVO: _this.person
          }
        }).then(data => {
          if (data.code === 1) {
            this.$message({
              type: 'info',
              message: data.msg
            })
          } else {
            this.$store.state.selectConsignee = true
          }
        })
      }
    },
    consignees(val){
      this.person = val
      this.selectPay = true
    },
    towNumber(val) {
      return val.toFixed(2)
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
  watch: {
    choice() {
      this.totalPrice = 0
      this.selectList = []
      let _this = this
      if (this.productList.length !== 0) {
        this.choice.forEach(function (index) {
          _this.totalPrice = _this.totalPrice + _this.productList[index].num * _this.productList[index].price
          _this.selectList.push({
            name: _this.productList[index].name,
            unitPrice: _this.productList[index].price,
            num: _this.productList[index].num,
            picture: _this.productList[index].picture,
            userId: _this.productList[index].userId,
            dealPrice: _this.productList[index].num * _this.productList[index].price,
            goodId: _this.productList[index].goodId
          })
        })
      }
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
.pay {
  top: 20px;
  left: 350px;
  text-align: center;
  width: 500px;
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
p {
  position: relative;
  top: 40px;
  left: 50px;
}

</style>