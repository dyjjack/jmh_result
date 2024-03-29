<template>
  <div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="指标" width="180">
        <template slot-scope="scope">
          {{ scope.row['dubbo.protocol.serialization'] }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="{row}">
          <el-table
              :data="createSpanTree(row.spans_)"
              style="width: 100%"
              row-key="spanId_"
              border
              lazy
              :tree-props="{children: 'children'}"
          >
            <el-table-column prop="operationName_" label="日期"></el-table-column>
            <el-table-column prop="cost" label="耗时（ms）"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TraceDetail',
  props: {
    url: String
  },
  data() {
    return {
      tableData: []
    }
  },

  mounted() {
    this.initTable();
  },

  methods: {
    initTable() {
      let traceSpan;

      this.$.ajax({
        type: "GET",
        async: false,
        url: "https://raw.kkgithub.com/wxbty/jmh_result/main/test-results/trace/jmh_trace_result.json",
        success: function (res) {
          traceSpan = res
        }
      });


      // 解析JMH结果字符串为JSON对象
      let resultList;
      try {
        resultList = JSON.parse(traceSpan);
      } catch (error) {
        console.error("解析JMH结果字符串出错：", error);
        return
      }

      this.tableData = resultList;
    },

    createSpanTree(spans) {
      console.log(spans)
      let spanMap = new Map();
      let rootSpans = [];

      // 遍历原始spans，初始化每个span，创建映射表和寻找根span
      for (let span of spans) {
        spanMap.set(span.spanId_, {
          ...span,
          spanId_: span.spanId_.toString(),
          cost: span.endTime_ - span.startTime_,
          children: []
        });
        if (span.parentSpanId_ === -1) {
          rootSpans.push(spanMap.get(span.spanId_));
        }
      }

      // 根据 parentSpanId_ 属性构建树结构
      for (let span of spans) {
        if (span.parentSpanId_ !== -1) {
          let parentSpan = spanMap.get(span.parentSpanId_);
          if (parentSpan) {
            parentSpan.children.push(spanMap.get(span.spanId_));
          }
        }
      }

      console.log(rootSpans)
      return rootSpans;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>