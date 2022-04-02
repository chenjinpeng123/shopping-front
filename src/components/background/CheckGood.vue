<template>
  <div>
    <table style="border: solid 1.3px; position: relative; left: 170px; top: 20px">
      <thead>
      <tr>
        <td colspan="6">
          <el-select
              style="width: 25%;padding: 4px;margin-left: 50px"
              :multiple-limit=4
              v-model="groupId"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择分类(最多选4个)">
            <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <el-input style="width: 25%;margin-left: 180px" v-model="input" placeholder="请输入内容"></el-input>
          <el-button style="margin-left: 2px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </td>

      </tr>
      <tr>
        <th style="width: 15%">名字</th>
        <th style="width: 8%">图片</th>
        <th style="width: 10%">价格</th>
        <th style="width: 10%">库存</th>
        <th style="width: 12%">地址</th>
        <th style="width: 7%">编辑</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="goodsList" v-for="(good,index) of goodsList">
        <td style="text-align: center">{{good.name}}</td>
        <td style="text-align: center"><img :src="good.pictures[0]" width="100" height="100" alt=""/></td>
        <td style="text-align: center">{{good.price}}</td>
        <td style="text-align: center">{{good.balance}}</td>
        <td style="text-align: center">{{good.address}}</td>
        <td :class="{'enable': !good.state}">
          <el-tooltip class="item" effect="dark" content="删除" placement="right-start">
            <i class="el-icon-delete delete" @click="deleteGood(index)"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="good.content" placement="right">
            <i @click="clickState(index)" class="state" :class="{'el-icon-video-pause':good.state,'el-icon-video-play':!good.state}"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="right-end">
            <i class="el-icon-edit edit" @click="updateGood(index)"></i>
          </el-tooltip>
          <el-dialog  v-if="goodUpdate" :visible="ifUpdate"  @close="closeDialog" append-to-body>
            <UpdateGoods  v-if="goodUpdate" ref="menuRole" :goodUpdate="goodUpdate"></UpdateGoods>
          </el-dialog>
        </td>
      </tr>
      <tr style="height: 45px">
        <td colspan="6">
          <el-button class="lastPage" size="small" @click="lastPage">上一页</el-button>
          &emsp;&emsp;&emsp;&emsp;
          <el-button class="nextPage" size="small" @click="nextPage">下一页</el-button>
          &emsp;
          <el-select
              style="width: 8%"
              size="small"
              v-model="page"
              allow-create
              filterable
              placeholder="页数">
            <el-option
                v-for="item in optionPage"
                :key="item.value"
                :label="item.value"
                :value="item.value">
            </el-option>
          </el-select>
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import request from "../../network/request";
import {handleAlert} from "../../utils/confirm";
import qs from 'qs';
import UpdateGoods from "../../components/background/UpdateGoods"
export default {
  name: "LookGood",
  components: {
    UpdateGoods
  },
  data() {
    return {
      page: 1,
      goodsList: [],
      options: [],
      groupId: [],
      input: '',
      totalPage: 0,
      ifUpdate: false,
      goodUpdate: null,
      optionPage: [
        {
          value: 1
        },
        {
          value: 2
        },
        {
          value: 3
        },
        {
          value: 4
        },
        {
          value: 5
        }
      ]
    }
  },
  methods: {
    closeDialog() {
      this.ifUpdate = false
    },
    updateGood(index) {
      this.goodUpdate = this.goodsList[index]
      this.ifUpdate = true
    },
    deleteGood(index) {
      let _this = this
      this.$confirm('你确定要永久删除商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        request({
          url: '/good/delete',
          method: 'post',
          params: {
            id: _this.goodsList[index].id
          }
        })
        _this.goodsList.splice(index,1)
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    lastPage() {
      if (this.page !== 1) {
        this.page--
      } else {
        handleAlert("已经是第一页了")
      }
    },
    nextPage() {
      if (this.page >= this.totalPage) {
        handleAlert("这已经是最后一页")
      } else {
        this.page++
      }
    },
    search() {
      let _this = this
      _this.groupId = []
      request({
        url: 'queryGood/list',
        method: 'get',
        params: {
          page: _this.page,
          num: 4,
          name: _this.input,
          roleId: _this.$store.state.roleId,
          userId: _this.$store.state.userId
        }, paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(data => {
        if (data.data !== null) {
          _this.totalPage = data.data.totalPage
          _this.goodsList = data.data.contentList
          for (let i = 0; i < _this.goodsList.length; i++) {
            if (_this.goodsList[i].state) {
              _this.goodsList[i].content = "停用"
            } else {
              _this.goodsList[i].content = "启用"
            }
          }
        }
      })
    },
    clickState(index) {
      let _this = this
      this.$confirm('确定改变商品状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        request({
          url: '/good/changeState',
          method: 'post',
          params: {
            id: _this.goodsList[index].id
          }
        }).then(()=> {
          _this.goodsList[index].state = !_this.goodsList[index].state
          if (_this.goodsList[index].state) {
            _this.goodsList[index].content = "停用"
          } else {
            _this.goodsList[index].content = "启用"
          }
        })
        this.$message({
          type: 'success',
          message: '操作完成'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    }
  },
  created(){
    let _this = this
    let groupId = _this.groupId
    request({
      url: 'queryGood/list',
      method: 'get',
      params: {
        groupId,
        page: _this.page,
        num: 4,
        roleId: _this.$store.state.roleId,
        userId: _this.$store.state.userId
      }, paramsSerializer: params => {
        return qs.stringify(params, { indices: false })
      }
    }).then(data => {
      if (data.data !== null) {
        _this.goodsList = data.data.contentList
        _this.totalPage = data.data.totalPage
        for (let i = 0; i < _this.goodsList.length; i++) {
          if (_this.goodsList[i].state) {
            _this.goodsList[i].content = "停用"
          } else {
            _this.goodsList[i].content = "启用"
          }
        }
      }
    })
    // 后端查找有多少种分类
    request({
      url: 'group/list',
      method: 'get',
    }).then(data => {
      _this.options = data.data
    })
  },
  watch: {
    groupId() {
      let _this = this
      let groupId = _this.groupId
      this.input = ''
      this.page = 1
      request({
        url: 'queryGood/list',
        method: 'get',
        params: {
          groupId,
          page: _this.page,
          num: 4,
          roleId: _this.$store.state.roleId,
          userId: _this.$store.state.userId
        }, paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(data => {
        if (data.data !== null) {
          _this.goodsList = data.data.contentList
          _this.totalPage = data.data.totalPage
          for (let i = 0; i < _this.goodsList.length; i++) {
            if (_this.goodsList[i].state) {
              _this.goodsList[i].content = "停用"
            } else {
              _this.goodsList[i].content = "启用"
            }
          }
        }
      })
    },
    page() {
      if (this.page > this.totalPage) {
        handleAlert("总页数只有"+this.totalPage+"页")
        this.page = this.totalPage
        return
      }
      let _this = this
      let groupId = _this.groupId
      request({
        url: 'queryGood/list',
        method: 'get',
        params: {
          groupId,
          page: _this.page,
          num: 4,
          roleId: _this.$store.state.roleId,
          userId: _this.$store.state.userId
        }, paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        }
      }).then(data => {
        if (data.data !== null) {
          _this.goodsList = data.data.contentList
          for (let i = 0; i < _this.goodsList.length; i++) {
            if (_this.goodsList[i].state) {
              _this.goodsList[i].content = "停用"
            } else {
              _this.goodsList[i].content = "启用"
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.lastPage {
  margin-left: 240px;
}

.enable {
  background-color: #999999;
}

.delete {
  font-size:22px;position: relative;left: 28px;bottom: 26px
}
.state {
  font-size:22px;position: relative;left: 6px;bottom: -2px
}
.edit {
  font-size:22px;position: relative;left: -14px;bottom: -28px;
}
i {
  cursor: pointer;
}
table {
  width: 70%;
}
th{
  border: 1.3px solid;
}
td{
  border: 1.3px solid;
  font-size: small;
}
</style>