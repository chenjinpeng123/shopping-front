<template>
  <el-container>
    <el-header height="150px"></el-header>
    <el-main>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原始密码" prop="oldPassword">
              <el-input v-model="ruleForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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

export default {
  data() {
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
    let checkOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'));
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
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        oldPassword: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPassword: [
          { validator: checkOldPassword, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.ruleForm.oldPassword !== _this.$store.state.password) {
            console.log(_this.ruleForm.oldPassword)
            alert("原始密码错误")
          } else {
            request({
              url: 'user/updatePassword',
              method: 'post',
              data: {
                newPassword: _this.ruleForm.password,
                userId: _this.$store.state.userId,
              }
            }).then(function (data) {
              if (data.data === 1) {
                _this.$store.commit("changePassword",_this.ruleForm.password)
                alert("密码修改成功")
                _this.$router.push("/")
              } else {
                alert("密码修改失败,请联系管理员")
              }
            })
          }
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

</style>