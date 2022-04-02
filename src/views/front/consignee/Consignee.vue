<template>
  <el-row>
    <el-col style="text-align: center">
      <h2>新增收获地址</h2>
      <br>
    </el-col>
    <el-col :span="14" :offset="3">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import request from "../../../network/request";
export default {
  name: "Consignee",
  data() {
    let checkAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入收货人姓名'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入收货人姓名'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入详细地址'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        address: '',
        phone: ''
      },
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        address: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let _this = this
          request({
            url: '/consignee/add',
            method: 'post',
            data: {
              userId: _this.$store.state.userId,
              name: _this.ruleForm.name,
              address: _this.ruleForm.address,
              phone: _this.ruleForm.phone
            }
          }).then(data => {
            if (data.data === 1){
              _this.$store.state.addConsignee = false
              _this.$store.state.selectConsignee = true
            }
          })
        } else {
          alert("请按提示正确填写")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>