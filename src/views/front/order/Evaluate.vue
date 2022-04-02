<template>
  <div>
    <h2 style="text-align: center">商品评价</h2>
    <div class="block">
      <br>
      &emsp;&emsp;<span class="demonstration">商品打分</span>
      <el-rate v-model="score" style="position: relative;left: 25px;top: 3px"></el-rate>
      &emsp;&emsp;<p style="position: relative;left: 28px">商品评价</p>
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea"
          class="evaText">
      </el-input>
      <el-button size="small" class="el-button" @click="reset">重置</el-button>
      <el-button size="small" style="left: 440px" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import {handleAlert} from "../../../utils/confirm";
import request from "../../../network/request";
export default {
  name: "Evaluate",
  data() {
    return{
      score:0,
      textarea:''
    }
  },
  props: {
    id: null,
    index: null
  },
  methods: {
    reset() {
      this.score = 0
      this.textarea = ''
    },
    submit() {
      if (this.score === 0 || this.textarea === '') {
        handleAlert("请先打分和评价了再提交")
      } else {
        let _this = this
        request({
          url: "/order/addEvaluate",
          method: 'post',
          data: {
            id: _this.id,
            score: _this.score,
            evaluate: _this.textarea
          }
        }).then(data => {
          if (data.data === 1) {
            let _this = this
            handleAlert("提交成功");
            this.$emit("evaluateState",false)
            this.$emit("addIndex",_this.index)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.el-button {
  position: relative;
  top: 30px;
  left: 430px;
}
.evaText {
  position: relative;
  left: 25px;
  top: 10px;
  width: 550px;
}
</style>