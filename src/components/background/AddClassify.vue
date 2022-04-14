<template>
  <el-container style="background-color: white">
    <el-header style="height: 20px">
      <h3 style="margin-left: 268px">增加分类</h3>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12" :offset="5">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名字" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="英文名" prop="eName">
              <el-input v-model="ruleForm.eName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
import request from "../../network/request";
export default {
  data() {
    let validateEName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入英文名字'));
      } else {
        callback();
      }
    };
    let checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入名字'));
      } else {
        callback();
      }
    };
    return {
      classifies: [],
      ruleForm: {
        name: '',
        eName: ''
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        eName: [
          { validator: validateEName, trigger: 'blur'}
        ]
      }
    };
  },
  props: {
    state: Number,
    getData: Function,
    setData: {
      type: Function
    }
  },
  methods: {
    submitForm(formName) {
      this.classifies = this.getData()
      let _this = this
      this.$refs[formName].validate((valid) => {
        let act = true
        if (valid) {
          _this.classifies.every(classify => {
            if (classify.name === _this.ruleForm.name || classify.englishName === _this.ruleForm.eName) {
              _this.$message.error('该分类的中文名或英文名已存在')
              act = false
              return false
            }
            return true
          })
          if (act) {
            let id;
            if (_this.state === 0) {
              id = _this.classifies.length + 1
            } else {
              id = _this.state
            }
            request({
              url: '/group/add',
              data: {
                id: id,
                name: _this.ruleForm.name,
                englishName: _this.ruleForm.eName
              },
              method: 'post'
            }).then(data =>{
              if (data.data === 1) {
                this.$message.success('增加成功')
                request({
                  url: '/group/allList',
                  method: 'get'
                }).then(data =>{
                  _this.setData(data.data)
                })
              }
            })
          }
        }
        else {
          this.$message.error('请按提示正确输入！！！')
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