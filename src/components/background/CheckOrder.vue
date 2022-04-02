<template>
  <div id="app" class="container">
    <h2 class="title">我的订单</h2>
    <table class="tab" width="100%" border="0" cellspacing="0" cellpadding="0">
      <thead>
      <tr style="background: white">
        <td colspan="9" style="text-align: center;">
          <el-input style="width: 12%;text-align: center" size="small" v-model="inputId" placeholder="输入单号">
            <el-button class="button" slot="append" icon="el-icon-search" style="width: 13px" @click="searchById"></el-button>
          </el-input>
          <el-input style="width: 15%;text-align: center;margin-left: 30px" size="small" v-model="inputName" placeholder="输入商品名字">
            <el-button class="button" slot="append" icon="el-icon-search" style="width: 13px" @click="searchByName"></el-button>
          </el-input>
          <el-select
              size="small"
              style="width: 20%;padding: 4px;margin-left: 50px"
              :multiple-limit=4
              v-model="groupId"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="按商品分类(最多选3个)">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <el-button size="small" round style="margin-left: 50px" @click="orderByState('待发货')">未发货</el-button>
          <el-button size="small" round style="margin-left: 20px" @click="orderByState('已催发货')">已催货</el-button>
        </td>
      </tr>
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
          <el-button class="button" size="mini"  :disabled=item.ifDelete @click="deleteOrder(index)">删除</el-button>
          <el-button class="button" size="mini" @click="clickState(index)" :disabled="item.disable">发货</el-button>
        </td>
      </tr>
      <tr>
        <td colspan="9">
          <el-button size="small" @click="lastPage">上一页</el-button>
          &emsp;&emsp;&emsp;
          <el-button size="small" @click="nextPage">下一页</el-button>
          &emsp;
          <el-select
              style="width: 6%"
              size="small"
              v-model="page"
              allow-create
              filterable
              placeholder="页数">
            <el-option
                v-for="item in optionPage"
                :key="item.value"
                :label="item.value"
                :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import request from "../../network/request";
import { handleConfirm, handleAlert } from '../../utils/confirm'
export default {
  data() {
    return {
      orderList: [],
      id: null,
      index: null,
      inputId: '',
      inputName:'',
      groupId: [],
      options: [],
      page: 1,
      totalPage: null,
      state: null,
      optionPage: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ]
    }
  },
  methods: {
    lastPage() {
      if (this.page === 1) {
        this.$message({
          message: '这已经是第一页了',
          type: 'info'
        })
        return
      }
      this.page --
    },
    nextPage() {
      if (this.page === this.totalPage) {
        this.$message({
          message: '这已经是最后一页了',
          type: 'info'
        })
        return
      }
      this.page ++
    },
    searchById() {
      this.state = null
      this.inputName= ''
      let _this = this
      let groupId = _this.groupId
      let merId = null
      if (_this.$store.state.roleId === 3)
      {
        merId = _this.$store.state.userId
      }
      request({
        url: 'order/checkSearch',
        method: 'post',
        data: {
          groupId,
          page: _this.page,
          merId,
          id: _this.inputId
        }
      }).then(data => {
        if (data.data !== null) {
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
        }
      })
    },
    searchByName() {
      this.state = null
      this.inputId = ''
      let _this = this
      let groupId = _this.groupId
      let merId = null
      if (_this.$store.state.roleId === 3)
      {
        merId = _this.$store.state.userId
      }
      request({
        url: 'order/checkSearch',
        method: 'post',
        data: {
          groupId,
          page: _this.page,
          merId,
          name: _this.inputName
        }
      }).then(data => {
        if (data.data !== null) {
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
        }
      })
    },
    orderByState(val) {
      this.state = val
      this.inputId = ''
      this.inputName= ''
      let _this = this
      let groupId = _this.groupId
      let merId = null
      if (_this.$store.state.roleId === 3)
      {
        merId = _this.$store.state.userId
      }
      request({
        url: 'order/checkSearch',
        method: 'post',
        data: {
          groupId,
          page: _this.page,
          merId,
          state: val
        }
      }).then(data => {
        if (data.data !== null) {
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
        }
      })
    },
    deleteOrder(index) {
      if (this.orderList[index].state === "待发货" || this.orderList[index].state === "已催发货") {
        this.$message({
          type: 'info',
          message: '订单还未发货之前不能删除订单'
        });
      } else {
        let _this = this
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: 'order/merDelete',
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
      let _this = this
      request({
        url: '/order/deliver',
        method: 'post',
        params: {
          id: _this.orderList[index].id
        }
      }).then(()=>{
        handleAlert("发货成功")
      })
    },
  },
  watch: {
    page() {
      let _this = this
      if (this.page > this.totalPage) {
        this.$message({
          type: 'info',
          message: '一共只有'+ _this.totalPage + '页'
        });
        this.page = this.totalPage
      }
      let groupId = _this.groupId
      let merId = null
      if (_this.$store.state.roleId === 3)
      {
        merId = _this.$store.state.userId
      }
      request({
        url: 'order/checkSearch',
        method: 'post',
        data: {
          state: _this.state,
          groupId,
          page: _this.page,
          merId,
          id : _this.inputId,
          name: _this.inputName
        }
      }).then(data => {
        if (data.data !== null) {
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
        }
      })
    },
    groupId() {
      this.state = null
      let _this = this
      let groupId = _this.groupId
      let merId = null
      if (_this.$store.state.roleId === 3)
      {
        merId = _this.$store.state.userId
      }
      request({
        url: 'order/checkSearch',
        method: 'post',
        data: {
          groupId,
          page: _this.page,
          merId,
          id : _this.inputId,
          name: _this.inputName
        }
      }).then(data => {
        if (data.data !== null) {
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
        }
      })
    }
  },
  created() {
    let _this = this
    if (this.$store.state.userId === null) {
      handleConfirm("请先登录").then(function () {
        _this.$router.push('/admin')
      })
    } else {
      let merId = null
      if (_this.$store.state.roleId === 3) {
        merId = _this.$store.state.userId
      }
      request({
        url:'/order/merList',
        method: 'get',
        params: {
          merId
        }
      }).then(data => {
        if (data.code === 0) {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].deleteState === 2) {
              data.data.splice(i,1)
            }
          }
          _this.orderList = data.data.records
          _this.totalPage = data.data.pages
          _this.orderList.forEach(function (order) {
            order.disable = (order.state === "已发货" || order.state === "已评价");
          })
        } else {
          handleAlert("请求订单数据失败,请联系管理员")
        }
      })
      // 后端查找有多少种分类
      request({
        url: 'group/list',
        method: 'get',
      }).then(data => {
        _this.options = data.data
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
.button {
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