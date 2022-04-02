<template>
  <el-container class="el-container">
    <el-header height="70px"></el-header>
    <el-main>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userName">
              <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              &emsp;&emsp;
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            <el-form-item style="text-align: right;">
              <span class="span" @click="buss">注册成为商家</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import request from "../../network/request";
//import alert from "../assets/js/alert"

export default {
  data() {
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 14) {
            callback(new Error('必须年满14岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let validateEMail = (rule, value,callback) => {
      const reg =/^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.[a-z]+$/;
      if(value ===''){
        callback(new Error('邮箱不能为空'));
      }else{
        if (!reg.test(value)){
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        age: '',
        email: '',
        phone: '',
        userName: ''
      },
      rules: {
        email: [
          { validator: validateEMail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        userName: [
          { validator: checkUserName, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    buss() {
      this.$router.push('/business')
    },
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url:'/user/add',
            method: 'post',
            data: _this.ruleForm
          }).then(function (data) {
            if (data.data === 1) {
              alert("注册成功！")
              _this.$router.push('/login')
            } else {
              alert("注册失败！")
            }
          })
        } else {
          alert('请按提示正确输入');
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

<style>
.el-container {
  background-color: whitesmoke;
}
.span {
  position: relative;
  top: -28px;
  font-size: 13px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}
</style>