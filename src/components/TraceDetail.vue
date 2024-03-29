<template>
  <div>
    <el-select
        v-model="ExpandedNum"
        @change="handleExpandNumChange"
        placeholder="选择展开级别"
        size="mini"
        style="width: 100px;left: 0px;"
    >
      <el-option label="不展开" :value="0"></el-option>
      <el-option label="展开" :value="Number.MAX_VALUE"></el-option>
    </el-select>

    <el-table
        :data="tableData"
        style="width: 100%"
        :key="tableKey"
        row-key="spanId_"
        :expand-row-keys="expandID"
        border
        lazy
        :tree-props="{children: 'children'}"
    >
      <el-table-column prop="operationName_" label="日期"></el-table-column>
      <el-table-column prop="cost" label="耗时（ms）"></el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'TraceDetail',
  data() {
    return {
      ExpandedNum: 0,
      tableKey: true,
      expandID: [],
      tableData: []
    }
  },
  watch: {
    ExpandedNum: {
      deep: true,
      handler(val) {
        this.ExpandedNum = val
      }
    },

    ExpandedKeysCache: {
      deep: true,
      handler(val) {
        this.ExpandedKeysCache = val
      }
    },
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

      this.tableData = this.createSpanTree(resultList[0].spans_)
    },

    handleExpandNumChange() {

      this.expandID=[]
      this.tableKey = !this.tableKey;

      console.error("1：", this.ExpandedNum);
      console.error("2：", this.expandID);
      if (this.ExpandedNum > 0) {
        this.setExpandKeys(this.tableData)
      }
      console.error("3：", this.ExpandedNum);
      console.error("4：", this.expandID);
    },
    setExpandKeys(dataList, n) {
      console.error("4：", this.expandID);
      if (!n) n = 1
      for (let i = 0; i < dataList.length; i++) {
        if (n <= this.ExpandedNum) {
          this.expandID.push(`${dataList[i].spanId_}`)

          if (Object.prototype.hasOwnProperty.call(dataList[i], 'children')) {
            const children = dataList[i].children
            this.setExpandKeys(children, n + 1)
          }
        }
      }
    },
    createSpanTree(spans) {
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