<template>
  <div>
    <el-row>
      <el-col>
        <h2 style="text-align: center">选择地址</h2>
        <br>
      </el-col>
      <el-col :span="14" :offset="5" v-for="(address,index) of list" v-if="list">
        <ul class="showAddress" @click="submit(index)">
          <li>姓名：{{address.name}}</li>
          <li>地址：{{address.address}}</li>
          <li>电话：{{address.phone}}</li>
        </ul>
        <br>
      </el-col>
      <el-col style="text-align: center">
        <el-button @click="addAddress">管理地址</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from "../../../network/request";
import { handleConfirm, handleAlert } from '../../../utils/confirm'
export default {
  name: "Address",
  data() {
    return {
      list:null,
      person: {}
    }
  },
  methods: {
    submit(index) {
      this.person = {
        name: this.list[index].name,
        address: this.list[index].address,
        phone: this.list[index].phone
      }
      this.$emit("consignees",this.person)
      this.$store.state.selectConsignee = false
    },
    addAddress() {
      this.$store.state.selectConsignee = false
      this.$store.state.manageConsignee = true
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
}
ul {
  background-color: whitesmoke;
  list-style: none;
}
.showAddress:hover{
  border: 1.5px solid orchid;
  cursor: pointer;
}
</style>