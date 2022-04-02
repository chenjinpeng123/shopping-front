<template>
  <div id="app" class="container">
    <h2 class="title">我的订单</h2>
    <table class="tab" width="100%" border="0" cellspacing="0" cellpadding="0">
      <thead>
      <tr>
        <th style="width: 10%;">订单号</th>
        <th style="width: 14%;">商品图片</th>
        <th style="width: 10%;">商品名字</th>
        <th style="width: 10%;">商品单价</th>
        <th style="width: 10%;">购买数量</th>
        <th style="width: 10%;">成交金额</th>
        <th style="width: 16%">下单时间</th>
        <th style="width: 10%;">订单状态</th>
        <th style="width: 12%">编辑</th>
<!--        <td style="width: 12%">编辑</td>-->
      </tr>
      </thead>
      <tbody>
      <tr class="showTr" v-for="(item,index) of orderList">
        <td>{{item.id}}</td>
        <td><img :src="item.picture" height="110" width="110" alt=""/></td>
        <td>{{item.name}}</td>
        <td>￥{{item.unitPrice}}</td>
        <td>{{item.num}}</td>
        <td style="color: red">￥{{item.dealPrice}}</td>
        <td>{{item.createDate}}</td>
        <td>{{item.state}}</td>
        <td>
          <el-button class="el-button" size="mini"  :disabled=item.ifDelete @click="deleteOrder(index)">删除</el-button>
          <el-button size="mini" v-if="item.changeState"  @click="clickState(index)">{{item.changeState}}</el-button>
        </td>
      </tr>
      <el-dialog :visible.sync="addEvaluate" append-to-body>
        <div v-if="addEvaluate"  class="el-dialog-div">
          <Evaluate :id="id" :index="index" v-on:evaluateState="evaluateState" v-on:addIndex="addIndex"></Evaluate>
        </div>
      </el-dialog>
      </tbody>
    </table>
  </div>

</template>

<script>
import request from "../../network/request";
import { handleConfirm, handleAlert } from '../../utils/confirm'
import Evaluate from "../front/order/Evaluate"
export default {
  name: 'order',
  components: {
    Evaluate
  },
  data() {
    return {
      orderList: [],
      addEvaluate: false,
      id: null,
      index: null,
    }
  },
  methods: {
    evaluateState(val) {
      this.addEvaluate = val
    },
    addIndex(val) {
      this.orderList[val].changeState = null
      this.orderList[val].state = "已评价"
    },
    deleteOrder(index) {
      if (this.orderList[index].state === "待发货" || this.orderList[index].state === "已催发货") {
        handleAlert("订单还未发货之前不能取消订单")
      } else {
        let _this = this
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: 'order/userDelete',
            method: 'post',
            params: {
              id: _this.orderList[index].id
            }
          }).then(data => {
            if (data.data === 1) {
              _this.orderList.splice(index,1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '未连接到服务器'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    clickState(index) {
      if (this.orderList[index].changeState === "催货") {
        let _this = this
        request({
          url:"order/updateState",
          method: 'post',
          params: {
            state: "已催发货",
            id: _this.orderList[index].id
          }
        }).then(data => {
          if (data.data === 1) {
            this.orderList[index].state = "已催发货"
            handleAlert("已催商家发货")
            this.orderList[index].changeState = null
          } else {
            handleAlert("催货失败")
          }
        })
      } else {
        this.id = this.orderList[index].id
        this.index = index
        this.addEvaluate = true
      }
    },
  },
  created() {
    let _this = this
    if (this.$store.state.userId === null) {
      handleConfirm("请先登录").then(function () {
        _this.$router.push('/login')
      })
    } else {
      request({
        url:'/order/userList',
        method: 'get',
        params: {
          userId: _this.$store.state.userId
        }
      }).then(data => {
        if (data.code === 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].deleteState === 1 || data.data[i].deleteState === 3) {
              data.data.splice(i,1)
              i--
            }
          }
          _this.orderList = data.data
          for (let i = 0; i < _this.orderList.length; i++) {
            if (_this.orderList[i].state === "待发货") {
              _this.orderList[i].changeState = "催货"
              _this.orderList[i].ifDelete = true
            } else if (_this.orderList[i].state === "已发货") {
              _this.orderList[i].changeState = "评价"
              _this.orderList[i].ifDelete = false
            } else if (_this.orderList[i].state === "已催发货") {
              _this.orderList[i].changeState = null
              _this.orderList[i].ifDelete = true
            } else {
              _this.orderList[i].changeState= null
              _this.orderList[i].ifDelete = false
            }
          }
        } else {
          handleAlert("请求订单数据失败,请联系管理员")
        }
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
.el-button {
  padding: 0;
  width:36%;
  height: 22px;
  text-align: center;
  margin: 4px 0 0;
}
span:hover {
  text-decoration:underline
}
span {
  font-weight: 550;
  cursor: pointer;
  color: #353dd5;
}
.el-dialog-div{
  height: 300px;
}
.showTr {
  position: relative;
  top: 8px;
  font-size: 16px;
  font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}
th {
  font-weight: 500;
}
td {

}
.container{
  padding: 20px;
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