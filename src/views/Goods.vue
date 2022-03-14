
<template>
  <div>
    <Top></Top>
    <div id="div_box">
      <div class="wrap" v-if="good.pictures">
        <div class="smallImg imgBox">
          <img :src="picture" width="400" height="400" alt="图片加载不出来"/>
        </div>
      </div>
      <div id="div_box-right">
        <div id="div_box-right-1">
          <span id="div_box-right-1-span_1">{{good.introduction}}</span>
          <!--        <span id="div_box-right-1-span_2">现在购买,立刻发货！</span>-->
        </div>
        <div id="div_box-right-2">
          <span id="div_box-right-2-span_1">价格</span>
          <span id="div_box-right-2-span_2"><span style="font-weight: 200;">￥</span>{{good.price}}</span>
        </div>
        <div class="div_box-right-3">
          <span class="div_box-right-3-span_1">地址</span>
          <span class="div_box-right-3-span_2">{{good.address}}</span>
        </div>

        <div class="div_box-right-3">
          <span class="div_box-right-3-span_1">库存</span>
          <span class="div_box-right-3-span_2">{{good.balance}}</span>
        </div>

<!--        <div id="div_box-right-5">
          <span>尺码</span>
          <div id="div_box-right-5-div-1">S</div>
          <div id="div_box-right-5-div-2">M</div>
          <div id="div_box-right-5-div-3">L</div>
          <div id="div_box-right-5-div-4">XL</div>
          <div id="div_box-right-5-div-5">2XL</div>
        </div>-->

        <div id="div_box-right-6" v-if="good.colors">
          <span>颜色</span>
          <div id="div_box-right-6-div-1" v-if="good.colors[0]" :style="bor0" @click="select0"><img :src="good.colors[0]" width="38px" height="38px"/></div>
          <div id="div_box-right-6-div-2" v-if="good.colors[1]" :style="bor1" @click="select1"><img :src="good.colors[1]" width="38px" height="38px"/></div>
          <div id="div_box-right-6-div-3" v-if="good.colors[2]" :style="bor2" @click="select2"><img :src="good.colors[2]" width="38px" height="38px"/></div>
          <div id="div_box-right-6-div-4" v-if="good.colors[3]" :style="bor3" @click="select3"><img :src="good.colors[3]" width="38px" height="38px"/></div>
          <div id="div_box-right-6-div-5" v-if="good.colors[4]" :style="bor4" @click="select4"><img :src="good.colors[4]" width="38px" height="38px"/></div>
        </div>
        <div id="div_box-right-7"  onselectstart="return false;">
          <span>数量</span>
          <div id="div_box-right-7-div-1">{{num}}</div>
          <div id="div_box-right-7-div-2">
            <div id="div_box-right-7-div-2-onck1" @click="add">
              <svg t="1588663432940" style="width: 0.7em;height: 0.7em;font-weight: 700;" viewBox="0 0 1024 1024" version="1.1"  p-id="2160" width="200" height="200">
                <path d="M511.867 399.019l292.16 292.155c12.27 12.28 32.186 12.28 44.457 0 12.28099999-12.27 12.281-32.186 0-44.457l-314.388-314.388c-12.27-12.28-32.186-12.28-44.457 0l-314.387 314.388c-6.14 6.136-9.211 14.183-9.211 22.228s3.071 16.092 9.21099999 22.228c12.27 12.28 32.186 12.28 44.45700001 1e-8l292.159-292.15500001z" p-id="2161" fill="#bfbfbf"></path>
              </svg>
            </div>
            <div id="div_box-right-7-div-2-onck2" @click="decrease">
              <svg t="1588663543242" style="width: 0.7em;height: 0.7em;font-weight: 700;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2343" width="200" height="200">
                <path d="M512.133 624.981l-292.16-292.155c-12.27-12.28-32.186-12.28-44.457 0-12.281 12.27-12.281 32.186 0 44.457l314.388 314.388c12.27 12.28 32.186 12.28 44.457 0l314.387-314.388c6.14-6.136 9.211-14.183 9.211-22.228s-3.071-16.092-9.211-22.228c-12.27-12.28-32.186-12.28-44.457 0l-292.159 292.155z" p-id="2344" fill="#bfbfbf"></path>
              </svg>
            </div>
          </div>
          <span style="position: absolute;left: 0;color: #838383;line-height: 43px;font-size: 12px;margin-left: 170px;float: left;">件</span>
        </div>
        <br>
        <br>
        <br>
        <div id="div_box-right-8">
          <div id="div_box-right-8-div-1"><span>立即购买</span></div>
          <div id="div_box-right-8-div-2" @click="joinCart">
            加入购物车</div>
        </div>
      </div>
      <div id="div_box-bottom">
        <div id="div_box-bottom-left" v-if="good.pictures">
          <div :style="active0" id="div_box-bottom-left-div-1"><img @mouseover="showpic0" :src="good.pictures[0]" width="55px" height="55px"/></div>
          <div v-if="good.pictures[1]" :style="active1" id="div_box-bottom-left-div-2"><img @mouseover="showpic1" :src="good.pictures[1]" width="55px" height="55px"/></div>
          <div v-if="good.pictures[2]" :style="active2" id="div_box-bottom-left-div-3"><img @mouseover="showpic2" :src="good.pictures[2]" width="55px" height="55px"/></div>
          <div v-if="good.pictures[3]" :style="active3" id="div_box-bottom-left-div-4"><img @mouseover="showpic3" :src="good.pictures[3]" width="55px" height="55px"/></div>
          <div v-if="good.pictures[4]" :style="active4" id="div_box-bottom-left-div-5"><img @mouseover="showpic4" :src="good.pictures[4]" width="55px" height="55px"/></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import request from "../network/request";
import Top from "../components/home/Top";
export default {
  name: "Goods",
  components: {
    Top
  },
  data() {
    return {
      good: {},
      picture: String,
      color: String,
      num: 1,
      active0: "border-width:2px;border-color:red",
      active1: "",
      active2: "",
      active3: "",
      active4: "",
      bor0: "",
      bor1: "",
      bor2: "",
      bor3: "",
      bor4: "",
    }
  },
  methods: {
    joinCart() {
      if (this.$store.state.userId === null) {
        alert("请先登录!!!")
      } else {
        let _this = this
        request({
          url: '/cart/add',
          method: 'post',
          data: {
            'goodId': this.good.id,
            'name': this.good.name,
            'picture': this.picture,
            'num': this.num ,
            'price': this.good.price,
            'userId': _this.$store.state.userId
          }
        }).then(function (data) {
          if (data.data === "增加成功"){
            alert(data.data)
          } else {
            alert("增加失败")
          }
        })
      }
    },
    add() {
      if (this.num === this.good.balance) {
        alert("亲，已超过库存数量，不能再增加了")
      } else {
        this.num++
      }
    },
    decrease() {
      if (this.num !== 1) {
        this.num--
      }
    },
    showpic0() {
      this.picture = this.good.pictures[0]
      this.active0 = "border-width:2px;border-color:red"
      this.active1 = ""
      this.active2 = ""
      this.active3 = ""
      this.active4 = ""
    },
    showpic1() {
      this.picture = this.good.pictures[1]
      this.active1 = "border-width:2px;border-color:red"
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active4 = ""
    },
    showpic2() {
      this.picture = this.good.pictures[2]
      this.active2 = "border-width:2px;border-color:red"
      this.active0 = ""
      this.active1 = ""
      this.active3 = ""
      this.active4 = ""
    },
    showpic3() {
      this.picture = this.good.pictures[3]
      this.active3 = "border-width:2px;border-color:red"
      this.active0 = ""
      this.active2 = ""
      this.active1 = ""
      this.active4 = ""
    },
    showpic4() {
      this.picture = this.good.pictures[4]
      this.active4 = "border-width:2px;border-color:red"
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    },
    select1() {
      this.picture = this.good.colors[1]
      this.color = this.good.colors[1]
      this.bor1 = "border-width:1.5px;border-color:deepPink"
      this.bor0 = ""
      this.bor2 = ""
      this.bor3 = ""
      this.bor4 = ""
      this.active4 = ""
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    },
    select0() {
      this.picture = this.good.colors[0]
      this.color = this.good.colors[0]
      this.bor0 = "border-width:1.5px;border-color:deepPink"
      this.bor1 = ""
      this.bor2 = ""
      this.bor3 = ""
      this.bor4 = ""
      this.active4 = ""
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    },
    select2() {
      this.picture = this.good.colors[2]
      this.color = this.good.colors[2]
      this.bor2 = "border-width:1.5px;border-color:deepPink"
      this.bor0 = ""
      this.bor1 = ""
      this.bor3 = ""
      this.bor4 = ""
      this.active4 = ""
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    },
    select3() {
      this.picture = this.good.colors[3]
      this.color = this.good.colors[3]
      this.bor3 = "border-width:1.5px;border-color:deepPink"
      this.bor0 = ""
      this.bor2 = ""
      this.bor1 = ""
      this.bor4 = ""
      this.active4 = ""
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    },
    select4() {
      this.picture = this.good.colors[4]
      this.color = this.good.colors[4]
      this.bor4 = "border-width:1.5px;border-color:deepPink"
      this.bor0 = ""
      this.bor2 = ""
      this.bor3 = ""
      this.bor1 = ""
      this.active4 = ""
      this.active0 = ""
      this.active2 = ""
      this.active3 = ""
      this.active1 = ""
    }
  },
  created() {
    let _this = this
    request({
      url: '/queryGood/detail',
      method: "get",
      params: {
        id: this.$route.query.id
      }
    }).then(function (date) {
      _this.good = date.data
      _this.picture = _this.good.pictures[0]
    })
  }
}
</script>

<style scoped>
@import "../assets/css/shopping.css";
</style>