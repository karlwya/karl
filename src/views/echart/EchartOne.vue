<template>
  <div class="echart-container">
    <div id="main" style="width: 625px; height: 400px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("main"));
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      legend: {
        data: ["用户统计", "商品统计", "销售统计"],
      },
      xAxis: [
        {
          type: "category",
          data: ["酒水", "电器", "化妆品", "礼品", "服装", "工艺品", "首饰"],
          axisPointer: {
            type: "shadow",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "订单统计",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} 件",
          },
        },
        {
          type: "value",
          name: "销售统计",
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: "{value} °C",
          },
        },
      ],
      series: [
        {
          name: "用户统计",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + " 件";
            },
          },
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
        },
        {
          name: "商品统计",
          type: "bar",
          tooltip: {
            valueFormatter: function (value) {
              return value + "件";
            },
          },
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
        },
        {
          name: "销售统计",
          type: "line",
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + " °C";
            },
          },
          data: [
            2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
          ],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>
<style lang="less" scoped>
.echart-container {
  // background: yellow;
  height: 100%;
}
</style>
