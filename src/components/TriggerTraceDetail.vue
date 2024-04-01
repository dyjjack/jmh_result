<template>
  <div>

    <el-row>
      <el-col :span="8">
        <el-cascader v-model="leftSelectedOptions"
                     :options="cascaderOptions"
                     @change="handleCascaderChange"
                     clearable>

        </el-cascader>
      </el-col>
      <el-col :span="8">
        <el-button @click="open">触发Actions</el-button>
      </el-col>
      <el-col :span="8">
        <el-cascader v-model="rightSelectedOptions"
                     :options="cascaderOptions"
                     @change="handleCascaderChange"
                     clearable>

        </el-cascader>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-table
            :data="leftTableDate"
            style="width: 100%"
            row-key="spanId_"
            border
            lazy
            default-expand-all
            :tree-props="{children: 'children'}"
        >
          <el-table-column prop="operationName_" label="方法名" min-width="90%"></el-table-column>
          <el-table-column prop="cost" label="耗时（ms）" min-width="10%"></el-table-column>
        </el-table>
      </el-col>

      <el-col :span="12">
        <el-table
            :data="rightTableDate"
            style="width: 100%"
            row-key="spanId_"
            border
            lazy
            default-expand-all
            :tree-props="{children: 'children'}"
        >
          <el-table-column prop="operationName_" label="方法名" min-width="90%"></el-table-column>
          <el-table-column prop="cost" label="耗时（ms）" min-width="10%"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--    <el-table :data="tableData" border style="width: 100%">-->
    <!--      <el-table-column label="指标" width="180">-->
    <!--        <template slot-scope="scope">-->
    <!--          {{ scope.row['dubbo.protocol.serialization'] }}-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column>-->
    <!--        <template slot-scope="{row}">-->
    <!--          <el-table-->
    <!--              :data="createSpanTree(row.spans_)"-->
    <!--              style="width: 100%"-->
    <!--              row-key="spanId_"-->
    <!--              border-->
    <!--              lazy-->
    <!--              :tree-props="{children: 'children'}"-->
    <!--          >-->
    <!--            <el-table-column prop="operationName_" label="日期"></el-table-column>-->
    <!--            <el-table-column prop="cost" label="耗时（ms）"></el-table-column>-->
    <!--          </el-table>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->
  </div>
</template>

<script>
export default {
  name: 'TriggerTraceDetail',
  data() {
    return {
      rpcTable: [],
      serializationTable: [],
      leftTableTitle: '',
      leftTableDate: [],
      rightTableDate: [],
      rightTableTitle: '',

      leftSelectedOptions: [],
      rightSelectedOptions: [],

      disabledRoots: [],
      disabledChildren: [],

      cascaderOptions: [{
        value: 'dubbo',
        label: 'Dubbo协议',
        children: [{
          value: 'hessian2',
          label: 'Hessian2'
        }, {
          value: 'fastjson2',
          label: 'Fastjson2'
        }, {
          value: 'fastjson',
          label: 'Fastjson'
        }, {
          value: 'avro',
          label: 'Avro'
        }, {
          value: 'fst',
          label: 'Fst'
        }, {
          value: 'gson',
          label: 'Gson'
        }, {
          value: 'kryo',
          label: 'Kryo'
        }, {
          value: 'msgpack',
          label: 'Msgpack'
        }]
      }, {
        value: 'rmi',
        label: 'Rmi协议',
        children: [{
          value: 'hessian2',
          label: 'Hessian2'
        }, {
          value: 'fastjson2',
          label: 'Fastjson2'
        }, {
          value: 'fastjson',
          label: 'Fastjson'
        }, {
          value: 'avro',
          label: 'Avro'
        }, {
          value: 'fst',
          label: 'Fst'
        }, {
          value: 'gson',
          label: 'Gson'
        }, {
          value: 'kryo',
          label: 'Kryo'
        }, {
          value: 'msgpack',
          label: 'Msgpack'
        }]
      }, {
        value: 'tri',
        label: 'Triple协议',
        children: [{
          value: 'hessian2',
          label: 'Hessian2'
        }, {
          value: 'fastjson2',
          label: 'Fastjson2'
        }, {
          value: 'fastjson',
          label: 'Fastjson'
        }, {
          value: 'avro',
          label: 'Avro'
        }, {
          value: 'fst',
          label: 'Fst'
        }, {
          value: 'gson',
          label: 'Gson'
        }, {
          value: 'kryo',
          label: 'Kryo'
        }, {
          value: 'msgpack',
          label: 'Msgpack'
        }]
      }],
    };
  },

  mounted() {
    this.initTable();
  },

  methods: {
    initTable() {

      let rpcResultList;
      this.$.ajax({
        type: "GET",
        async: false,
        url: "https://raw.kkgithub.com/dyjjack/jmh_result/main/test-results/fixed/rpc/merged_prop_traces.json",
        success: function (res) {
          rpcResultList = res
        }
      });

      try {
        this.rpcTable = JSON.parse(rpcResultList)
        console.log("this.rpcTable", this.rpcTable)
      } catch (error) {
        console.error("解析JMH结果字符串出错：", error);
      }

      let serializationResultList;
      this.$.ajax({
        type: "GET",
        async: false,
        url: "https://raw.kkgithub.com/dyjjack/jmh_result/main/test-results/fixed/serialization/merged_prop_traces.json",
        success: function (res) {
          serializationResultList = res;
        }
      });

      try {
        this.serializationTable = JSON.parse(serializationResultList)
        console.log("this.serializationResultList", this.serializationTable)
      } catch (error) {
        console.error("解析JMH结果字符串出错：", error);
      }
    }
    ,

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
    },

    handleCascaderChange(value) {
      console.log("this.value", value)
      console.log("this.selectedOptions", this.leftSelectedOptions)
      let selectedRoot

      this.cascaderOptions = this.deepCopy2DArray(this.tmpCascaderOptions)
      if (value != null && value.length > 0) {
        // 当用户选择一个根节点时，禁用其他根节点
        selectedRoot = this.cascaderOptions.find(item => item.value === value[0][0]);
      }

      if (selectedRoot) {
        this.disabledRoots = this.cascaderOptions
            .filter(item => item.value !== selectedRoot.value)
            .map(item => item.value);


        if (value.length > 2) {

          this.leftSelectedOptions.splice(2)
          value = this.leftSelectedOptions
          let myValue = value.map(item => item[1])
          this.disabledChildren = selectedRoot.children.filter(((item, index) => index >= 2 && !myValue.includes(item.value))).map(item => item.value);

        } else if (value.length === 2) {

          let myValue = value.map(item => item[1])
          this.disabledChildren = selectedRoot.children.filter(item => !myValue.includes(item.value)).map(item => item.value);

        } else {

          this.disabledChildren = []

        }
      } else {
        // 如果用户取消了选择，或者选择了子节点，重置禁用状态
        this.disabledRoots = [];
        this.disabledChildren = []
      }

      this.updateCascaderOptions(selectedRoot);

      this.updateTable();
    },

    updateCascaderOptions(selectedRoot) {
      // 根据禁用状态数组，动态修改数据源
      if (selectedRoot) {
        selectedRoot.children = selectedRoot.children.map(item => ({
          ...item,
          disabled: this.disabledChildren.includes(item.value),
        }));
      }

      this.cascaderOptions = this.cascaderOptions.map(item => ({
        ...item,
        disabled: this.disabledRoots.includes(item.value),
      }));
    },

    deepCopy2DArray(arr) {
      return JSON.parse(JSON.stringify(arr));
    },

    updateTable() {
      if (this.leftSelectedOptions == null || this.leftSelectedOptions.length === 0) {
        this.leftTableDate = []
        this.rightTableDate = []

        this.leftTableTitle = ''
        this.rightTableTitle = ''

        return
      }

      let type = this.leftSelectedOptions[0][0];
      let value = this.leftSelectedOptions.map(item => item[1])

      if (type === 'rpc') {
        let leftRpcFilter = this.rpcTable.find(item => value[0] === item['dubbo.protocol.name']);
        let rightRpcFilter = this.rpcTable.find(item => value[1] === item['dubbo.protocol.name']);

        this.leftTableDate = leftRpcFilter ? this.createSpanTree(leftRpcFilter.spans_) : []
        this.rightTableDate = rightRpcFilter ? this.createSpanTree(rightRpcFilter.spans_) : []

        this.leftTableTitle = leftRpcFilter ? leftRpcFilter['dubbo.protocol.name'] : ''
        this.rightTableTitle = rightRpcFilter ? rightRpcFilter['dubbo.protocol.name'] : ''
      }

      if (type === 'serialization') {
        let leftSerializationFilter = this.serializationTable.find(item => value[0] === item['dubbo.protocol.serialization']);
        let rightSerializationFilter = this.serializationTable.find(item => value[1] === item['dubbo.protocol.serialization']);

        this.leftTableDate = leftSerializationFilter ? this.createSpanTree(leftSerializationFilter.spans_) : []
        this.rightTableDate = rightSerializationFilter ? this.createSpanTree(rightSerializationFilter.spans_) : []

        this.leftTableTitle = leftSerializationFilter ? leftSerializationFilter['dubbo.protocol.serialization'] : ''
        this.rightTableTitle = rightSerializationFilter ? rightSerializationFilter['dubbo.protocol.serialization'] : ''
      }
    },
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '内容可以是 '),
          h('i', { style: 'color: teal' }, 'VNode')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(action => {
        this.$message({
          type: 'info',
          message: 'action: ' + action
        });
      });
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