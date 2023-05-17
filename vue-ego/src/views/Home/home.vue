<template>
   <div class="home">
       <div id="main" style="width: 600px;height:400px;background:#ffffff;padding:10px"></div>
   </div>
</template>

<script>
import customed from '../../utils/echartsTheme'
export default {
   mounted(){
       this.bar()
   },
   methods:{
     bar(){
        // 注册主题
     this.$echarts.registerTheme("customed",customed) 
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'),'customed');
      // 指定图表的配置项和数据
      const option = {
            title: {
                text: '月销售额'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
                }
            },
            legend: {
                data: ['电脑', '手机', '相机', '潮服', '电视']
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                boundaryGap: false,
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: '电脑',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                name: '手机',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                name: '相机',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                name: '潮服',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                name: '电视',
                type: 'line',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
            };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
       }
   }
}
</script>

<style lang="less" scoped>
 .home{
     margin: 20px;
 }
</style>