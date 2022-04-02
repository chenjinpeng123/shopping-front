<template>
  <div>
    <el-row>
      <el-col>
        <h2 style="text-align: center">管理地址</h2>
        <br>
      </el-col>
      <el-col :span="16" :offset="5" v-for="(address,index) of list" v-if="list">
        <ul class="showAddress">
          <li>姓名：{{address.name}}</li>
          <li>地址：{{address.address}}<span style="color: #358ed5" @click="deleteAddress(address.id,index)">删除</span></li>
          <li>电话：{{address.phone}}</li>
        </ul>
        <br>
      </el-col>
      <el-col style="text-align: center">
        <el-button @click="addAddress">新增地址+</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "../../../network/request";
export default {
  data() {
    return {
      list:null
    }
  },
  methods: {
    addAddress() {
      this.$store.state.manageConsignee = false
      this.$store.state.addConsignee = true
    },
    deleteAddress(id,index) {
      let _this = this
      request({
        url: '/consignee/delete',
        method: 'post',
        params: {
          id: id
        }
      }).then(data => {
        if (data.data === 1) {
          _this.list.splice(index,1)
        }
      })
    }
  },
  created() {
    let _this = this
    request({
      url: '/consignee/list',
      method: 'get',
      params: {
        userId: _this.$store.state.userId
      }
    }).then(data => {
      _this.list = data.data
    })
  }
}
</script>

<style scoped>
span {
  position: absolute;
  left: 470px;
  cursor: pointer;
}
ul {
  background-color: whitesmoke;
  list-style: none;
}
.showAddress:hover{
  border: 1.5px solid orchid;
}
</style>