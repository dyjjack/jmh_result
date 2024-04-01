<template>
  <div id="app">
    <div id="SerializationTask" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
export default {
  name: 'SerializationTask',
  mounted() {
    this.myEcharts();
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('SerializationTask'));

// const rpc = replaceVariables('$rpc');
// const serialization = replaceVariables('$serialization');
// console.log(rpc)
// console.log(serialization)

// 获取JMH结果字符串
      let jmh;
      this.$.ajax({
        type: 'GET',
        async: false,
        url: 'https://raw.kkgithub.com/dyjjack/jmh_result/main/test-results/fixed/serialization/merged_prop_results.json',
        success: function (res) {
          jmh = res;
        }
      });

// let filterSerialization = ["hessian2"]

// let filterProtocol = ["dubbo"]

// filterSerialization = serialization.replace(/{/g, '').replace(/}/g, '').split(',')
// filterProtocol = rpc.replace(/{/g, '').replace(/}/g, '').split(',')

// console.log(jmh);
// 解析JMH结果字符串为JSON对象
      let resultList;
      try {
        resultList = JSON.parse(jmh);
      } catch (error) {
        console.error('解析JMH结果字符串出错：', error);
      }

      let time = resultList[0].params.time

      console.log(resultList)
// 转换数据结构，按serialization属性分类并收集Item对象
      let collect = resultList
          .filter((a) => a.mode === 'ss')
          .map((result) => {
            // 注意这里只用一个参数接收当前元素
            let protocol = JSON.parse(result.params.prop)['dubbo.protocol.serialization'];
            return {
              score: Math.round(result.primaryMetric.scorePercentiles['99.0']),
              protocol: protocol
            };
          });

      // let seriesDate = collect.map((result) => {
      //   // 注意这里只用一个参数接收当前元素
      //   return {
      //     type: 'bar'
      //   };
      // });
      //
      // console.log(collect);
      // console.log(seriesDate);

      let option = {
        title: {
          text: 'Serialization对比',
          x: 'center',
          subtext: this.timestampToTime(time)
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].data.score + 'ms';
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          // top: '3%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          name: '耗时(ms)'
        },
        dataset: {
          dimensions: ['protocol', 'score'],
          source: collect
        },
        series: [
          {
            type: 'bar',
            label: {
              //柱体上显示数值
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: {
                //数值样式
                fontSize: '30px',
                color: '#666'
              },
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    timestampToTime(timestamp) {
      let date = new Date(Number(timestamp));
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();

      return Y + M + D + h + m + s;
    }
  }
}

</script>

<style scoped>

</style>