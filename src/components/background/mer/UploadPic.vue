<template>
  <el-container>
    <el-header height="70px"></el-header>
    <el-main>
      <el-row>
        <el-col :span="8" :offset="7">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名字" prop="name">
              <el-input v-model="ruleForm.name" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="ruleForm.price" autocomplete="off" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="introduction">
              <el-input v-model="ruleForm.introduction" autocomplete="off" type="textarea" maxlength="60"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="balance" maxlength="5">
              <el-input v-model.number="ruleForm.balance"></el-input>
            </el-form-item>
            <el-form-item label="商品地址" prop="address" maxlength="10">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" v-if="option">
              <el-select v-model="id" placeholder="请选择">
                <el-option
                    v-for="item in option"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                  class="upload-demo"
                  action="http://localhost:8084/good/uploadPic"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :data="{groupId:id}"
                  :limit="5"
                  multiple
                  :file-list="fileList">
                <el-button size="small" type="primary">打开图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb和5张图片</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="颜色图片">
              <el-upload
                  class="upload-demo"
                  action="http://localhost:8084/good/uploadPic"
                  :on-remove="handleRemove2"
                  :on-change="handleChange2"
                  :data="{groupId:id}"
                  :limit="5"
                  multiple
                  :file-list="fileListTwo">
                <el-button size="small" type="primary">打开图片</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb和5张图片</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100px">上传商品</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import request from "../../../network/request";
import {handleAlert} from "../../../utils/confirm";

export default {
  data() {
    let checkAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入库存数量'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入价格'));
      } else {
        callback();
      }
    };
    let checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入简介'));
      } else {
        callback();
      }
    };
    let validateEMail = (rule, value,callback) => {
      if (value === '') {
        callback(new Error('请输入名字'));
      } else {
        callback();
      }
    };
    return {
      fileList: [],
      fileListTwo: [],
      option:[],
      id:'',
      ruleForm: {
        name: '',
        price: '',
        introduction: '',
        balance: '',
        address: ''
      },
      rules: {
        name: [
          { validator: validateEMail, trigger: 'blur' }
        ],
        price: [
          { validator: validatePass, trigger: 'blur' }
        ],
        introduction: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        balance: [
          { validator: checkAge, trigger: 'blur' }
        ],
        address: [
          { validator: checkUserName, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      fileList.some((item,i) => {
        if (item.uid === file.uid) {
          fileList.splice(i, 1)
          this.fileList = fileList
          return true;
        }
      })
    },
    handleChange2(file, fileList) {
      this.fileListTwo = fileList
    },
    handleRemove2(file, fileList) {
      fileList.some((item,i) => {
        if (item.uid === file.uid) {
          fileList.splice(i, 1)
          this.fileListTwo = fileList
          return true;
        }
      })
    },
    submitForm(formName) {
      let _this = this
      let pictures = []
      _this.fileList.forEach((item) => {
        pictures.push(item.response.data)
      })
      let colors = []
      _this.fileListTwo.forEach((item) => {
        colors.push(item.response.data)
      })

      const json = {
        merId: this.$store.state.userId,
        groupId: this.id,
        name: this.ruleForm.name,
        price: this.ruleForm.price,
        introduction: this.ruleForm.introduction,
        picture: pictures.join(";"),
        color: colors.join(";"),
        balance: this.ruleForm.balance,
        address: this.ruleForm.address
      }
      this.$refs[formName].validate((valid) => {
        console.log(json)
        if (valid) {
          request({
            url:'/good/upload',
            method: 'post',
            data: json
          }).then(function (data) {
            if (data.code=== 0) {
              alert("上传成功！")
            } else {
              alert("上传失败！")
            }
          })
        } else {
          alert('请按提示正确输入');
          return false;
        }
      });
    }
  },
  created() {
    let _this = this
    request({
      url:'group/list',
      method: 'get'
    }).then(function (data) {
      _this.option = data.data
    })
  }
}

</script>

<style>

</style>