<template>
  <div>
    <el-table
        :data="classifies"
        height="278"
        border
        style="width: 60%;margin-left: 200px;margin-top: 140px">
      <el-table-column
          prop="id"
          label="id(顺序)"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名字"
          width="180">
      </el-table-column>
      <el-table-column
          prop="englishName"
          label="英文名"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="deleteGroup(scope.row.id)" type="text" size="small" :disabled="$store.state.roleId === 2">删除</el-button>
          <el-button type="text" size="small" @click="update(scope.row.id)" :disabled="$store.state.roleId === 2">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h5 style="margin-left: 800px;margin-top: 5px; color: #358ed5; cursor: pointer" @click="add" v-if="$store.state.roleId !== 2">
      增加分类
    </h5>
    <el-dialog  :visible.sync="ifClassify" append-to-body style="margin-top: 50px">
      <add-classify v-if="ifClassify" :getData="getData" :setData="setData" :state="state"></add-classify>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
import addClassify from "./AddClassify";
export default {
  name: "GoodClassify",
  components: {
    addClassify
  },
  data() {
    return {
      state: 0,
      classifies: [],
      ifClassify: false
    }
  },
  methods: {
    deleteGroup(id) {
      let _this = this
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/group/delete',
          method: 'post',
          params: {
            id: id
          }
        }).then(() =>{
          _this.classifies.splice(id-1,1);
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
    },
    setData(val) {
      this.classifies = val
    },
    getData() {
      return this.classifies
    },
    add() {
      this.ifClassify = true
    },
    update(id) {
      this.state = id
      this.ifClassify = true
    }
  },
  created() {
    let _this = this
    request({
      url: '/group/allList',
      method: 'get'
    }).then(data =>{
      _this.classifies = data.data
    })
  }
}
</script>

<style scoped>

</style>