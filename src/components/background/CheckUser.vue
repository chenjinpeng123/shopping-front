<template>
  <el-table
      :data="userList"
      border
      style="width: 75%;margin-left: 120px;margin-top: 110px"
      max-height="334">
    <el-table-column
        fixed
        prop="userName"
        label="用户名"
        width="150">
    </el-table-column>
    <el-table-column
        prop="password"
        label="密码"
        width="120">
    </el-table-column>
    <el-table-column
        prop="age"
        label="年龄"
        width="120">
    </el-table-column>
    <el-table-column
        prop="email"
        label="邮箱"
        width="180">
    </el-table-column>
    <el-table-column
        prop="phone"
        label="电话"
        width="180">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作">
      <template slot-scope="scope">
        <el-button @click="deleteUser(scope.row.id)" type="text" size="small" :disabled="$store.state.roleId === 2">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import request from "../../network/request";
export default {
  name: "CheckUser",
  data() {
    return {
      userList: [],
    }
  },
  methods: {
    deleteUser(id) {
      let _this = this
      this.$confirm('此操作将永久删除该用户分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/user/delete',
          method: 'post',
          params: {
            id: id
          }
        }).then(() =>{
          _this.userList.splice(id-1,1);
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {
    let _this = this
    request({
      url: 'user/list',
      method: 'get',
    }).then(data => {
      _this.userList = data.data;
    })
  }
}
</script>

<style scoped>

</style>