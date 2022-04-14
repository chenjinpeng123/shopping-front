<template>
  <div>
    <div ref="echartsPie" style="width: 550px;height: 430px;float: left"></div>
    <div ref="echartsPieTwo" style="width: 550px;height: 430px; margin-left: 530px"></div>
    <el-tooltip class="item" effect="dark" content="切换时间间隔" placement="right">
      <i class="el-icon-date"
         style="float: left;margin-left: 130px;margin-top: 28px;cursor: pointer;position: relative;z-index:9999"
         @click="switchTime"></i>
    </el-tooltip>
    <div ref="echartsOne" style="width: 1060px;height: 400px;"></div>
    <div style="margin-left: 480px;margin-top: -35px">
      <h5>{{orderTitle}}</h5>
    </div>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import request from "../../network/request";
export default{
  data() {
    return {
      orderTitle: "近12天的交易情况",
      orderTime: "day",
      option: {
        tooltip : {},
        legend: {
          top: '10',
          icon: 'roundRect',
          itemWidth: 20,  // 设置宽度
          itemHeight: 10, // 设置高度
        },
          xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: [
          {
            type: 'value',
            name: '数量'
          },
          {
            type: 'value',
            name: '金额',
            position: 'right'
          }
        ],
        series: [
          {
            data: [],
            yAxisIndex: 0,
            type: 'bar',
            name: '订单',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
          },
          {
            data: [],
            type: 'bar',
            yAxisIndex: 0,
            name: '待发货',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
          },
          {
            data: [],
            type: 'bar',
            yAxisIndex: 0,
            name: '催发货',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
          },
          {
            data: [],
            type: 'line',
            yAxisIndex: 1,
            name: '交易金额',
            showBackground: false,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            },
          }
        ]
      },
      optionPie:  {
        title: {
          text: '购物商品分布',
          subtext: '数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Number',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 345, name: '手机' },
              { value: 725, name: '电脑' },
              { value: 521, name: '冰箱' },
              { value: 900, name: '空调' },
              { value: 100, name: '相机' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionPieTwo:  {
        title: {
          text: '购物商品分布',
          subtext: '金额',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '￥ Money',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '手机' },
              { value: 735, name: '电脑' },
              { value: 580, name: '冰箱' },
              { value: 484, name: '空调' },
              { value: 300, name: '相机' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
    }
  },
  mounted() {
    this.setTest();
  },
  methods:{
    switchTime() {
      let _this = this
      if (_this.orderTime === "day") {
        _this.orderTime = "month"
        _this.orderTitle = "近一年的交易情况"
      } else {
        _this.orderTime = "day"
        _this.orderTitle = "近12天的交易情况"
      }
      request({
        url: '/order/searchTime',
        method: 'get',
        params: {
          name: _this.orderTime,
        }
      }).then(data => {
        _this.option.series[0].data = data.data.orderNum
        _this.option.series[1].data = data.data.dropShip
        _this.option.series[2].data = data.data.pushDelivery
        _this.option.series[3].data = data.data.money
        _this.option.xAxis.data = data.data.dates
        console.log(_this.option.xAxis.date)
        _this.setTest()
      })
    },
    setTest(){
      let myChart = echarts.init(this.$refs.echartsOne);
      let myChartPie = echarts.init(this.$refs.echartsPie);
      let myChartPieTwo = echarts.init(this.$refs.echartsPieTwo);
      myChart.setOption(this.option);
      myChartPie.setOption(this.optionPie);
      myChartPieTwo.setOption(this.optionPieTwo);
    }
  },
  created() {
    let _this = this
    request({
      url: '/order/searchTime',
      method: 'get',
      params: {
        name: "day",
      }
    }).then(data => {
      _this.option.series[0].data = data.data.orderNum
      _this.option.series[1].data = data.data.dropShip
      _this.option.series[2].data = data.data.pushDelivery
      _this.option.series[3].data = data.data.money
      _this.option.xAxis.data = data.data.dates
      _this.setTest()
    })

    request({
      url: '/order/classifyNumber',
      method: 'get'
    }).then(data => {
      _this.optionPie.series[0].data = data.data
      _this.setTest()
    })

    request({
      url: '/order/classifyMoney',
      method: 'get'
    }).then(data => {
      _this.optionPieTwo.series[0].data = data.data
      _this.setTest()
    })
  }
}
</script>


<style scoped>

</style>