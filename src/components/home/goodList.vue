<template>
    <div name="show">
      <ul class="goodList">
        <li v-for="goods in list" @click="good(goods.id)">
          <img v-bind:src="goods.pictures[0]">
          <p>{{goods.name}}</p>
          <h2>￥{{goods.price}}</h2>
        </li>
      </ul>
      <div class="page">
        <button @click="last">上一页</button>
        &emsp;&emsp;&emsp;&emsp;
        <button @click="next">下一页</button>
      </div>
    </div>
</template>
<style>

.page {
  position: absolute;
  bottom: 1%;
  right: 45%;
}

.goodList {
  float: left;
  margin-left: 35px;
}

.goodList li{
  width: 183px;
  height: 160px;
  list-style: none;
  float: left;
  font-size: 9px;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;  /*将鼠标形状改成手型*/
}

.goodList li p {
  margin-top: 3px;
  color: black;
}

.goodList li h2 {
  color: red;
  margin-top: 0;
}


.goodList img{
  width: 160px;
  height: 130px;
}
</style>
<script>
import request from "../../network/request";
import {mapGetters} from 'vuex'

export default {
  name: "show",
  data() {
    return{
      list: [],    //记录商品信息
      page: 1,      //当前页数
      goodId: null,
      goodName: null
    }
  },
  computed: {
    ...mapGetters([
      'getGoodId',
      'getGoodName'
    ])
  },
  methods: {

    // 点击商品跳转
    good(id) {
      this.$router.push({path: '/goods',query: {id:id}})
    },

    // 上一页
    last() {
      if (this.page !== 1) {
        let _this = this
        this.page--
        request({
          url: '/queryGood/list',
          method: "get",
          params: {
            page: _this.page,
            num: 10,
            groupId: _this.goodId,
            name: _this.$store.state.goodName
          }
        }).then(function (date) {
          _this.list = date.data.contentList
        })
      } else {
        alert("已经是第一页了")
      }
    },

    // 下一页
    next() {
      let _this = this
      this.page++
      request({
        url: '/queryGood/list',
        method: "get",
        params: {
          page: _this.page,
          num: 10,
          groupId: _this.goodId,
          name: _this.$store.state.goodName
        }
      }).then(function (date) {
        if (date.data.currentPage > date.data.totalPage) {
          console.log(date.data)
          alert("亲,这是最后一页")
          _this.page--
          return
        }
        _this.list = date.data.contentList
      })
    }
  },

  watch:{
    // 监听用户点击商品分类
    getGoodId: function (id) {
      this.page = 1
      this.goodId = id
      let _this = this
      request({
        url: '/queryGood/list',
        method: "get",
        params: {
          page: _this.page,
          num: 10,
          groupId: _this.goodId,
          name: _this.$store.state.goodName
        }
      }).then(function (date) {
        _this.list = date.data.contentList
      })
    },
    getGoodName: function (name) {
      if (name !== null) {
        this.page = 1
        this.goodName = name
        let _this = this
        request({
          url: '/queryGood/list',
          method: "get",
          params: {
            page: _this.page,
            num: 10,
            groupId: _this.goodId,
            name: _this.$store.state.goodName
          }
        }).then(function (date) {
          _this.list = date.data.contentList
        })
      }
    }
  },
  created() {
    // 组件创建时请求服务器
    let _this = this
    request({
      url: '/queryGood/list',
      method: "get",
      params: {
        page: 1,
        num: 10
      }
    }).then(function (date) {
      _this.list = date.data.contentList
    })
  }
}
</script>

<style scoped>

</style>