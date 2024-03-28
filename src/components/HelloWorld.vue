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
      <el-option label="展开1" :value="1"></el-option>
      <el-option label="展开2" :value="2"></el-option>
      <el-option label="展开3" :value="3"></el-option>
    </el-select>
    <el-table
        :data="tableData1"
        style="width: 100%"
        :key="tabelKey"
        row-key="id"
        :expand-row-keys="expandID"
        border
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      ExpandedNum: 0,
      tabelKey: true,
      // showTable:true,
      expandID: [],
      tableData1: [],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        children: [{
          id: 43,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 24,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
            id: 343,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 324,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
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
  created() {
    this.initTable()
  },
  methods: {
    initTable() {
      this.tableData1.push(...this.tableData)
    },
    handleExpandNumChange() {
      this.expandID.splice(0);
      this.tabelKey = !this.tabelKey;
      if (this.ExpandedNum > 0) {
        this.setExpandKeys(this.tableData)
      }
    },
    setExpandKeys(dataList, n) {
      if (!n) n = 1
      for (let i = 0; i < dataList.length; i++) {
        if (n <= this.ExpandedNum) {
          this.expandID.push(`${dataList[i].id}`)

          if (Object.prototype.hasOwnProperty.call(dataList[i], 'children')) {
            const children = dataList[i].children
            this.setExpandKeys(children, n + 1)
          }
        }
      }
    },
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