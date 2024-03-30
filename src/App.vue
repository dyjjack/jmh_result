<template>
  <div id="app">
    <el-row>
      <el-col :span="12"><PullRequest></PullRequest></el-col>
      <el-col :span="12"><ScheduledTask></ScheduledTask></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><RpcTask></RpcTask></el-col>
      <el-col :span="12"><SerializationTask></SerializationTask></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><TraceDetail></TraceDetail></el-col>
    </el-row>
  </div>
</template>

<script>
import PullRequest from "@/components/PullRequest.vue";
import ScheduledTask from "@/components/ScheduledTask.vue";
import TraceDetail from "@/components/TraceDetail.vue";
import RpcTask from "@/components/RpcTask.vue";
import SerializationTask from "@/components/SerializationTask.vue";

const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
export default {
  name: 'App',
  components: {
    SerializationTask,
    RpcTask,
    TraceDetail,
    ScheduledTask,
    PullRequest
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
