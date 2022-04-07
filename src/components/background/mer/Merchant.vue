<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" @click="linkTo('/backGround/welcome')">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" class="menuItem" @click="linkTo('/backGround/uploadPic')">
              上传商品
            </el-menu-item>
            <el-menu-item index="2-2" class="menuItem" @click="linkTo('/backGround/checkGood')">
              查看商品
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" class="menuItem" @click="linkTo('/backGround/orderManager')">
              订单管理
            </el-menu-item>
            <el-menu-item index="3-2" class="menuItem" @click="linkTo('/backGround/checkOrder')">
              查看订单
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" class="menuItem" style="margin-left: -26px">
              <i class="el-icon-key"></i>
              修改密码
            </el-menu-item>
            <el-menu-item index="4-2" class="menuItem" style="margin-left: -26px" @click="quit">
              <i class="el-icon-switch-button"></i>
              退出
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import UploadPic from "./UploadPic"
export default {
  components: {
    UploadPic
  },
  methods: {
    linkTo(val) {
      this.$router.push(val)
    },
    quit() {
      this.$router.replace('/login')
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>

<style scoped>

.router-link{
  text-decoration:none;
  color: black;
}
.menuItem {
  min-width: 120px !important;
  padding-left: 50px !important;
}
</style>