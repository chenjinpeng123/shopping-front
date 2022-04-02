<template>
  <el-row>
    <el-col style="text-align: center">
      <h2>修改商品</h2>
      <br>
    </el-col>
    <el-col :span="14" :offset="3">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="名字" prop="name">
          <el-input v-model="goodUpdate.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="goodUpdate.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="balance">
          <el-input v-model="goodUpdate.balance" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="goodUpdate.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import request from "../../network/request";
import {handleAlert} from "../../utils/confirm";
export default {
  props: {
    goodUpdate: {}
  },
  methods: {
    resetForm() {
      this.goodUpdate.name= ''
      this.goodUpdate.address= ''
      this.goodUpdate.price = ''
      this.goodUpdate.balance = ''
    },
    submitForm() {
      let _this = this
      if(this.goodUpdate.name===''||this.goodUpdate.price===''||this.goodUpdate.balance===''){
        alert("除了发货地址其他都不能为空")
      } else {
        request({
          url: '/good/update',
          method: 'post',
          data: {
            name: _this.goodUpdate.name,
            price: _this.goodUpdate.price,
            balance: _this.goodUpdate.balance,
            address: _this.goodUpdate.address,
            id: _this.goodUpdate.id
          }
        }).then( ()=>{
          handleAlert("修改成功")
        })
      }
    }
  }
}
</script>

<style scoped>

</style>