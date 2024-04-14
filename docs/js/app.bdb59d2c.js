(function(){"use strict";var e={9569:function(e,t,a){var s=a(2856),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("el-row",[t("el-col",{attrs:{span:24}},[t("div",{staticStyle:{"font-size":"30px"}},[e._v("Dubbo 基准测试")])])],1),t("el-row",[t("el-col",{attrs:{span:24}},[t("div",{staticStyle:{"font-size":"15px","text-align":"right"}},[t("a",{attrs:{target:"_blank",href:"https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for-public-repositories"}},[e._v(" 32并发线程 Linux 4C8T 16GB JDK1.8")])])])],1),t("el-row",[t("el-divider",[t("span",{staticStyle:{"font-size":"20px"}},[e._v("提交性能趋势")])]),t("el-col",{attrs:{span:12}},[t("PullRequest")],1),t("el-col",{attrs:{span:12}},[t("ScheduledTask")],1)],1),t("el-row",[t("el-divider",[t("span",{staticStyle:{"font-size":"20px"}},[e._v("相同场景对比")])]),t("el-col",{attrs:{span:12}},[t("RpcTask")],1),t("el-col",{attrs:{span:12}},[t("SerializationTask")],1)],1),t("el-row",[t("el-col",{attrs:{span:24}},[t("TraceDetail")],1)],1),t("el-row",{staticStyle:{"margin-top":"100px"}},[t("el-divider",[t("span",{staticStyle:{"font-size":"20px"}},[e._v("手动触发对比")])]),t("el-col",{attrs:{span:24}},[t("trigger-trace-detail")],1)],1)],1)},i=[],l=function(){var e=this;e._self._c;return e._m(0)},o=[function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"PullRequestSample"}}),t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"PullRequestThrpt"}})])}],n=(a(4114),{name:"PullRequest",data(){return{resultList:[]}},mounted(){this.init(),this.sampleEcharts(),this.thrptEcharts()},methods:{init(){let e;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/pr/merged_results.json",success:function(t){e=t}});try{this.resultList=JSON.parse(e)}catch(t){console.error("解析JMH结果字符串出错：",t)}},sampleEcharts(){const e=this.$echarts.init(document.getElementById("PullRequestSample"));let t=this.resultList.filter((e=>"sample"===e.mode)).reduce(((e,t)=>{let{time:a,serialization:s,protocol:r}=t.params,i={time:Number(a),score:Number((1e3*t.primaryMetric.scorePercentiles["99.0"]).toFixed(1)),serialization:s,protocol:r,commitId:t.commitId},l=r+"-"+s;return e[l]||(e[l]=[]),e[l].push(i),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score)),commitId:s.map((e=>e.commitId))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s],a[e].commitId[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"提交记录 P99",x:"center"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].data.name+"<br/>";return e.forEach((e=>{t+=e.marker+" "+(null!==e.data.value[2]?e.data.value[2]:"")+"："+(null!==e.data.value[1]?e.data.value[1]:"-")+"ms<br/>"})),t}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"耗时(ms)"},dataZoom:[{type:"inside",start:60,end:100},{type:"slider",start:60,end:100}],series:s};e.setOption(r)},thrptEcharts(){const e=this.$echarts.init(document.getElementById("PullRequestThrpt"));let t=this.resultList.filter((e=>"thrpt"===e.mode)).reduce(((e,t)=>{let{time:a,serialization:s,protocol:r}=t.params,i={time:Number(a),score:Math.round(t.primaryMetric.scorePercentiles["99.0"]),serialization:s,protocol:r},l=r+"-"+s;return e[l]||(e[l]=[]),e[l].push(i),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"提交 QPS",x:"center"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].data.name+"<br/>";return e.forEach((e=>{t+=e.marker+" "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ops/s<br/>"})),t}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"ops/s"},dataZoom:[{type:"inside",start:60,end:100},{type:"slider",start:60,end:100}],series:s};e.setOption(r)},timestampToTime(e){let t=new Date(Number(e)),a=t.getFullYear()+"-",s=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()+" ",i=t.getHours()+":",l=t.getMinutes()+":",o=t.getSeconds();return a+s+r+i+l+o}}}),p=n,c=a(1656),m=(0,c.A)(p,l,o,!1,null,"5bb8e3c4",null),u=m.exports,h=function(){var e=this;e._self._c;return e._m(0)},d=[function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"ScheduledTask"}}),t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"ScheduledTaskThrpt"}})])}],b={name:"ScheduledTask",data(){return{resultList:[]}},mounted(){this.init(),this.sampleEcharts(),this.thrptEcharts()},methods:{init(){let e;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/scheduled/merged_results.json",success:function(t){e=t}});try{this.resultList=JSON.parse(e)}catch(t){console.error("解析JMH结果字符串出错：",t)}},sampleEcharts(){const e=this.$echarts.init(document.getElementById("ScheduledTask"));let t=this.resultList.filter((e=>"sample"===e.mode)).reduce(((e,t)=>{let{time:a,serialization:s,protocol:r}=t.params,i={time:Number(a),score:Number((1e3*t.primaryMetric.scorePercentiles["99.0"]).toFixed(1)),serialization:s,protocol:r},l=r+"-"+s;return e[l]||(e[l]=[]),e[l].push(i),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"定时 P99",x:"center"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].data.name+"<br/>";return e.forEach((e=>{t+=e.marker+" "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ms<br/>"})),t}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"耗时(ms)"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},thrptEcharts(){const e=this.$echarts.init(document.getElementById("ScheduledTaskThrpt"));let t=this.resultList.filter((e=>"thrpt"===e.mode)).reduce(((e,t)=>{let{time:a,serialization:s,protocol:r}=t.params,i={time:Number(a),score:Math.round(t.primaryMetric.scorePercentiles["99.0"]),serialization:s,protocol:r},l=r+"-"+s;return e[l]||(e[l]=[]),e[l].push(i),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"定时 QPS",x:"center"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].data.name+"<br/>";return e.forEach((e=>{t+=e.marker+" "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ops/s<br/>"})),t}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"ops/s"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},timestampToTime(e){let t=new Date(Number(e)),a=t.getFullYear()+"-",s=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()+" ",i=t.getHours()+":",l=t.getMinutes()+":",o=t.getSeconds();return a+s+r+i+l+o}}},g=b,f=(0,c.A)(g,h,d,!1,null,"216e4142",null),y=f.exports,v=function(){var e=this,t=e._self._c;return t("div",[t("el-row",[t("el-col",{attrs:{span:6}},[t("span",[e._v("选择两个配置对比")]),t("el-cascader",{attrs:{"show-all-levels":!1,props:e.props,options:e.cascaderOptions,clearable:""},on:{change:e.handleCascaderChange},model:{value:e.selectedOptions,callback:function(t){e.selectedOptions=t},expression:"selectedOptions"}})],1)],1),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-header",[t("h1",[e._v(e._s(e.leftTableTitle))])]),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.leftTableDate,"row-key":"spanId_",border:"",lazy:"","default-expand-all":"","tree-props":{children:"children"}}},[t("el-table-column",{attrs:{prop:"operationName_",label:"方法名","min-width":"90%"}}),t("el-table-column",{attrs:{prop:"cost",label:"耗时（ms）","min-width":"10%"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-header",[t("h1",[e._v(e._s(e.rightTableTitle))])]),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rightTableDate,"row-key":"spanId_",border:"",lazy:"","default-expand-all":"","tree-props":{children:"children"}}},[t("el-table-column",{attrs:{prop:"operationName_",label:"方法名","min-width":"90%"}}),t("el-table-column",{attrs:{prop:"cost",label:"耗时（ms）","min-width":"10%"}})],1)],1)],1)],1)},T=[],S={name:"TraceDetail",data(){return{rpcTable:[],serializationTable:[],leftTableTitle:"",leftTableDate:[],rightTableDate:[],rightTableTitle:"",selectedOptions:[],disabledRoots:[],disabledChildren:[],props:{multiple:!0},cascaderOptions:[{value:"rpc",label:"RPC 协议",children:[{value:"dubbo",label:"Dubbo协议"},{value:"rmi",label:"Rmi协议"},{value:"tri",label:"Triple协议"}]},{value:"serialization",label:"序列化",children:[{value:"hessian2",label:"Hessian2"},{value:"fastjson2",label:"Fastjson2"},{value:"fastjson",label:"Fastjson"},{value:"avro",label:"Avro"},{value:"fst",label:"Fst"},{value:"gson",label:"Gson"},{value:"kryo",label:"Kryo"},{value:"msgpack",label:"Msgpack"}]}],tmpCascaderOptions:[{value:"rpc",label:"RPC 协议",children:[{value:"dubbo",label:"Dubbo协议"},{value:"rmi",label:"Rmi协议"},{value:"tri",label:"Triple协议"}]},{value:"serialization",label:"序列化",children:[{value:"hessian2",label:"Hessian2"},{value:"fastjson2",label:"Fastjson2"},{value:"fastjson",label:"Fastjson"},{value:"avro",label:"Avro"},{value:"fst",label:"Fst"},{value:"gson",label:"Gson"},{value:"kryo",label:"Kryo"},{value:"msgpack",label:"Msgpack"}]}]}},mounted(){this.initTable(),this.selectedOptions=[["serialization","hessian2"],["serialization","fastjson2"]],this.handleCascaderChange(this.selectedOptions)},methods:{initTable(){let e,t;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/fixed/rpc/trace/merged_prop_traces.json",success:function(t){e=t}});try{this.rpcTable=JSON.parse(e),console.log("this.rpcTable",this.rpcTable)}catch(a){console.error("解析JMH结果字符串出错：",a)}this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/fixed/serialization/trace/merged_prop_traces.json",success:function(e){t=e}});try{this.serializationTable=JSON.parse(t),console.log("this.serializationResultList",this.serializationTable)}catch(a){console.error("解析JMH结果字符串出错：",a)}},createSpanTree(e){if(console.log(e),!e)return console.error("spans is null"),[];let t=new Map,a=[];for(let s of e)t.set(s.spanId_,{...s,spanId_:s.spanId_.toString(),cost:s.endTime_-s.startTime_,children:[]}),-1===s.parentSpanId_&&a.push(t.get(s.spanId_));for(let s of e)if(-1!==s.parentSpanId_){let e=t.get(s.parentSpanId_);e&&e.children.push(t.get(s.spanId_))}return console.log(a),a},handleCascaderChange(e){let t;if(console.log("this.value",e),console.log("this.selectedOptions",this.selectedOptions),this.cascaderOptions=this.deepCopy2DArray(this.tmpCascaderOptions),null!=e&&e.length>0&&(t=this.cascaderOptions.find((t=>t.value===e[0][0]))),t)if(this.disabledRoots=this.cascaderOptions.filter((e=>e.value!==t.value)).map((e=>e.value)),e.length>2){this.selectedOptions.splice(2),e=this.selectedOptions;let a=e.map((e=>e[1]));this.disabledChildren=t.children.filter(((e,t)=>t>=2&&!a.includes(e.value))).map((e=>e.value))}else if(2===e.length){let a=e.map((e=>e[1]));this.disabledChildren=t.children.filter((e=>!a.includes(e.value))).map((e=>e.value))}else this.disabledChildren=[];else this.disabledRoots=[],this.disabledChildren=[];this.updateCascaderOptions(t),this.updateTable()},updateCascaderOptions(e){e&&(e.children=e.children.map((e=>({...e,disabled:this.disabledChildren.includes(e.value)})))),this.cascaderOptions=this.cascaderOptions.map((e=>({...e,disabled:this.disabledRoots.includes(e.value)})))},deepCopy2DArray(e){return JSON.parse(JSON.stringify(e))},updateTable(){if(null==this.selectedOptions||0===this.selectedOptions.length)return this.leftTableDate=[],this.rightTableDate=[],this.leftTableTitle="",void(this.rightTableTitle="");let e=this.selectedOptions[0][0],t=this.selectedOptions.map((e=>e[1]));if("rpc"===e){let e=this.rpcTable.find((e=>t[0]===JSON.parse(e.prop)["dubbo.protocol.name"])),a=this.rpcTable.find((e=>t[1]===JSON.parse(e.prop)["dubbo.protocol.name"]));this.leftTableDate=e?this.createSpanTree(e.spans_):[],this.rightTableDate=a?this.createSpanTree(a.spans_):[],this.leftTableTitle=e?JSON.parse(e.prop)["dubbo.protocol.name"]:"",this.rightTableTitle=a?JSON.parse(a.prop)["dubbo.protocol.name"]:""}if("serialization"===e){let e=this.serializationTable.find((e=>t[0]===JSON.parse(e.prop)["dubbo.protocol.serialization"])),a=this.serializationTable.find((e=>t[1]===JSON.parse(e.prop)["dubbo.protocol.serialization"]));console.log("leftSerializationFilter",e),console.log("rightSerializationFilter",a),this.leftTableDate=e?this.createSpanTree(e.spans_):[],this.rightTableDate=a?this.createSpanTree(a.spans_):[],this.leftTableTitle=e?JSON.parse(e.prop)["dubbo.protocol.serialization"]:"",this.rightTableTitle=a?JSON.parse(a.prop)["dubbo.protocol.serialization"]:""}}}},x=S,_=(0,c.A)(x,v,T,!1,null,"84b889ba",null),O=_.exports,E=function(){var e=this;e._self._c;return e._m(0)},P=[function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"RpcTaskP99"}}),t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"RpcTaskQPS"}})])}],N={name:"RpcTask",data(){return{resultList:[]}},mounted(){this.init(),this.sampleEcharts(),this.thrptEcharts()},methods:{init(){let e;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/fixed/rpc/merged_prop_results.json",success:function(t){e=t}});try{this.resultList=JSON.parse(e)}catch(t){console.error("解析JMH结果字符串出错：",t)}},sampleEcharts(){const e=this.$echarts.init(document.getElementById("RpcTaskP99"));let t=this.resultList.filter((e=>"sample"===e.mode)).reduce(((e,t)=>{let a=t.params.time,s=JSON.parse(t.params.prop)["dubbo.protocol.name"],r={time:Number(a),score:Number((1e3*t.primaryMetric.scorePercentiles["99.0"]).toFixed(1)),protocol:s},i=s;return e[i]||(e[i]=[]),e[i].push(r),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"RPC协议 P99对比"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].axisValueLabel+"<br/>";return e.forEach((e=>{t+=e.marker+" "+e.seriesName+": "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ms<br/>"})),t}},legend:{data:Object.keys(a)},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"耗时(ms)"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},thrptEcharts(){const e=this.$echarts.init(document.getElementById("RpcTaskQPS"));let t=this.resultList.filter((e=>"thrpt"===e.mode)).reduce(((e,t)=>{let a=t.params.time,s=JSON.parse(t.params.prop)["dubbo.protocol.name"],r={time:Number(a),score:Math.round(t.primaryMetric.scorePercentiles["99.0"]),protocol:s},i=s;return e[i]||(e[i]=[]),e[i].push(r),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"RPC协议 QPS对比"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].axisValueLabel+"<br/>";return e.forEach((e=>{t+=e.marker+" "+e.seriesName+": "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ops/s<br/>"})),t}},legend:{data:Object.keys(a)},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"ops/s"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},timestampToTime(e){let t=new Date(Number(e)),a=t.getFullYear()+"-",s=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()+" ",i=t.getHours()+":",l=t.getMinutes()+":",o=t.getSeconds();return a+s+r+i+l+o}}},k=N,M=(0,c.A)(k,E,P,!1,null,"9b568e18",null),A=M.exports,w=function(){var e=this;e._self._c;return e._m(0)},j=[function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"SerializationTaskP99"}}),t("div",{staticStyle:{width:"100%",height:"400px"},attrs:{id:"SerializationTaskQPS"}})])}],z={name:"SerializationTask",data(){return{resultList:[]}},mounted(){this.init(),this.sampleEcharts(),this.thrptEcharts()},methods:{init(){let e;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/wxbty/jmh_result/main/test-results/fixed/serialization/merged_prop_results.json",success:function(t){e=t}});try{this.resultList=JSON.parse(e)}catch(t){console.error("解析JMH结果字符串出错：",t)}},sampleEcharts(){const e=this.$echarts.init(document.getElementById("SerializationTaskP99"));let t=this.resultList.filter((e=>"sample"===e.mode)).reduce(((e,t)=>{let a=t.params.time,s=JSON.parse(t.params.prop)["dubbo.protocol.serialization"],r={time:Number(a),score:Number((1e3*t.primaryMetric.scorePercentiles["99.0"]).toFixed(1)),serialization:s},i=s;return e[i]||(e[i]=[]),e[i].push(r),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"序列化协议 P99对比"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].axisValueLabel+"<br/>";return e.forEach((e=>{t+=e.marker+" "+e.seriesName+": "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ms<br/>"})),t}},legend:{data:Object.keys(a)},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"耗时(ms)"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},thrptEcharts(){const e=this.$echarts.init(document.getElementById("SerializationTaskQPS"));let t=this.resultList.filter((e=>"thrpt"===e.mode)).reduce(((e,t)=>{let a=t.params.time,s=JSON.parse(t.params.prop)["dubbo.protocol.serialization"],r={time:Number(a),score:Math.round(t.primaryMetric.scorePercentiles["99.0"]),serialization:s},i=s;return e[i]||(e[i]=[]),e[i].push(r),e}),{}),a={};Object.entries(t).forEach((([e,t])=>{let s=t.sort(((e,t)=>e.time-t.time));a[e]={time:s.map((e=>e.time)),score:s.map((e=>e.score))}}));let s=Object.keys(a).map((e=>{let t=a[e].time.map(((t,s)=>({name:this.timestampToTime(t),value:[t,a[e].score[s]]})));return{name:e,type:"line",smooth:!0,showSymbol:!0,hoverAnimation:!1,symbolSize:10,markPoint:{data:[{type:"max",name:"Max"},{type:"min",name:"Min"}]},markLine:{data:[{type:"average",name:"Avg"}]},data:t}})),r={title:{text:"序列化协议 QPS对比"},tooltip:{trigger:"axis",formatter:function(e){let t=e[0].axisValueLabel+"<br/>";return e.forEach((e=>{t+=e.marker+" "+e.seriesName+": "+(null!==e.data.value[1]?e.data.value[1]:"-")+"ops/s<br/>"})),t}},legend:{data:Object.keys(a)},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},xAxis:{type:"time",boundaryGap:!1},yAxis:{type:"value",name:"ops/s"},dataZoom:[{type:"inside",start:80,end:100},{type:"slider",start:80,end:100}],series:s};e.setOption(r)},timestampToTime(e){let t=new Date(Number(e)),a=t.getFullYear()+"-",s=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()+" ",i=t.getHours()+":",l=t.getMinutes()+":",o=t.getSeconds();return a+s+r+i+l+o}}},R=z,L=(0,c.A)(R,w,j,!1,null,"37e9092a",null),H=L.exports,I=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"form-layout"},[t("el-form",{staticClass:"left-form",attrs:{model:e.form,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"仓库地址",prop:"repo_url"}},[t("el-input",{attrs:{placeholder:"仓库地址"},model:{value:e.REPO_URL,callback:function(t){e.REPO_URL=t},expression:"REPO_URL"}})],1),t("el-form-item",{attrs:{label:"Github Token",prop:"PUSH_TOKEN"}},[t("el-input",{attrs:{placeholder:"token"},model:{value:e.PUSH_TOKEN,callback:function(t){e.PUSH_TOKEN=t},expression:"PUSH_TOKEN"}})],1),t("el-row",{staticClass:"form-row",attrs:{gutter:20}},[t("el-col",{attrs:{span:8}},[t("el-form-item",{staticClass:"form-item-in-row",attrs:{label:"左侧配置",prop:"leftSelectedOptions"}},[t("el-cascader",{attrs:{options:e.cascaderOptions,clearable:""},model:{value:e.leftSelectedOptions,callback:function(t){e.leftSelectedOptions=t},expression:"leftSelectedOptions"}})],1)],1),t("el-col",{attrs:{span:8}},[t("el-form-item",{staticClass:"form-item-in-row",attrs:{label:"右侧配置",prop:"rightSelectedOptions"}},[t("el-cascader",{attrs:{options:e.cascaderOptions,clearable:""},model:{value:e.rightSelectedOptions,callback:function(t){e.rightSelectedOptions=t},expression:"rightSelectedOptions"}})],1)],1),t("el-col",{attrs:{span:8}},[t("el-form-item",{staticClass:"form-item-in-row"},[t("el-button",{attrs:{type:"primary"},on:{click:e.open}},[e._v("开始运行")])],1)],1)],1)],1),t("div",{staticClass:"right-text",staticStyle:{margin:"10px auto"}},[t("el-text",{staticStyle:{"font-size":"16px","line-height":"1.5",border:"1px solid #ccc",padding:"10px","margin-bottom":"20px"}},[e._v(" 这里需要用户自己的 GitHub 仓库来存储数据。数据仓库可以重新创建，或者使用任意已存在的。我们只需要配置仓库的 workflow 即可，参考样例："),t("a",{attrs:{href:"https://github.com/wxbty/jmh_result",target:"_blank"}},[e._v("https://github.com/wxbty/jmh_result")]),e._v("（可以直接 fork）。 另外，再配置用户的 GitHub Token，保证有权限可以推送。 ")])],1)],1),t("el-row",[t("el-col",{attrs:{span:12}},[t("el-header",[t("h1",{staticStyle:{overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"}},[e._v(e._s(e.leftTableTitle))])]),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.leftTableDate,"row-key":"spanId_",border:"",lazy:"","default-expand-all":"","tree-props":{children:"children"}}},[t("el-table-column",{attrs:{prop:"operationName_",label:"方法名","min-width":"88%"}}),t("el-table-column",{attrs:{prop:"cost",label:"耗时（ms）","min-width":"12%"}})],1)],1),t("el-col",{attrs:{span:12}},[t("el-header",[t("h1",[e._v(e._s(e.rightTableTitle))])]),t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.rightTableDate,"row-key":"spanId_",border:"",lazy:"","default-expand-all":"","tree-props":{children:"children"}}},[t("el-table-column",{attrs:{prop:"operationName_",label:"方法名","min-width":"88%"}}),t("el-table-column",{attrs:{prop:"cost",label:"耗时（ms）","min-width":"12%"}})],1)],1)],1)],1)},J=[],C=(a(4979),{name:"TriggerTraceDetail",data(){return{REPO_URL:null,PUSH_NAME:null,REPO_NAME:null,PUSH_TOKEN:null,triggerTable:[],leftTableTitle:"",leftTableDate:[],rightTableDate:[],rightTableTitle:"",leftSelectedOptions:[],rightSelectedOptions:[],resultList:[],cascaderOptions:[{value:"dubbo",label:"Dubbo协议",children:[{value:"hessian2",label:"Hessian2"},{value:"fastjson2",label:"Fastjson2"},{value:"fastjson",label:"Fastjson"},{value:"avro",label:"Avro"},{value:"fst",label:"Fst"},{value:"gson",label:"Gson"},{value:"kryo",label:"Kryo"},{value:"msgpack",label:"Msgpack"}]},{value:"rmi",label:"Rmi协议",children:[{value:"hessian2",label:"Hessian2"},{value:"fastjson2",label:"Fastjson2"},{value:"fastjson",label:"Fastjson"},{value:"avro",label:"Avro"},{value:"fst",label:"Fst"},{value:"gson",label:"Gson"},{value:"kryo",label:"Kryo"},{value:"msgpack",label:"Msgpack"}]},{value:"tri",label:"Triple协议",children:[{value:"hessian2",label:"Hessian2"},{value:"fastjson2",label:"Fastjson2"},{value:"fastjson",label:"Fastjson"},{value:"avro",label:"Avro"},{value:"fst",label:"Fst"},{value:"gson",label:"Gson"},{value:"kryo",label:"Kryo"},{value:"msgpack",label:"Msgpack"}]}]}},mounted(){try{this.init()}catch(e){console.error("init：",e)}try{this.initTable()}catch(e){console.error("initTable：",e)}try{this.sampleEcharts()}catch(e){console.error("sampleEcharts：",e)}try{this.thrptEcharts()}catch(e){console.error("thrptEcharts：",e)}},methods:{init(){if(this.message=localStorage.getItem("myMessage")||"",this.PUSH_NAME=localStorage.getItem("PUSH_NAME")||"",this.REPO_NAME=localStorage.getItem("REPO_NAME")||"",this.PUSH_TOKEN=localStorage.getItem("PUSH_TOKEN")||"",this.PUSH_NAME&&this.REPO_NAME){let t;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/"+this.PUSH_NAME+"/"+this.REPO_NAME+"/main/merged_prop_results.json",success:function(e){t=e}});try{this.resultList=JSON.parse(t)}catch(e){console.error("解析JMH结果字符串出错：",e)}}},sampleEcharts(){const e=this.$echarts.init(document.getElementById("TriggerP99"));let t=this.resultList[0].params.time,a=this.resultList.filter((e=>"sample"===e.mode)).map((e=>{let t=JSON.parse(e.params.prop)["dubbo.protocol.name"],a=JSON.parse(e.params.prop)["dubbo.protocol.serialization"];return{score:Number((1e3*e.primaryMetric.scorePercentiles["99.0"]).toFixed(1)),protocol:t+"-"+a}})),s={title:{text:"P99对比",x:"center",subtext:this.timestampToTime(t)},tooltip:{trigger:"axis",axisPointer:{type:"none"},formatter:function(e){return e[0].data.score+"ms"}},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},xAxis:{type:"category"},yAxis:{type:"value",name:"耗时(ms)"},dataset:{dimensions:["protocol","score"],source:a},series:[{barWidth:"25%",type:"bar",label:{show:!0,position:"top",textStyle:{fontSize:"15px",color:"#666"}}}]};e.setOption(s)},thrptEcharts(){const e=this.$echarts.init(document.getElementById("TriggerQps"));let t=this.resultList[0].params.time,a=this.resultList.filter((e=>"thrpt"===e.mode)).map((e=>{let t=JSON.parse(e.params.prop)["dubbo.protocol.name"],a=JSON.parse(e.params.prop)["dubbo.protocol.serialization"];return{score:Math.round(e.primaryMetric.scorePercentiles["99.0"]),protocol:t+"-"+a}})),s={title:{text:"QPS对比",x:"center",subtext:this.timestampToTime(t)},tooltip:{trigger:"axis",axisPointer:{type:"none"},formatter:function(e){return e[0].data.score+"ops/s"}},toolbox:{feature:{saveAsImage:{}}},grid:{left:"3%",right:"3%",bottom:"3%",containLabel:!0},xAxis:{type:"category"},yAxis:{type:"value",name:"ops/s"},dataset:{dimensions:["protocol","score"],source:a},series:[{barWidth:"25%",type:"bar",label:{show:!0,position:"top",textStyle:{fontSize:"15px",color:"#666"}}}]};e.setOption(s)},timestampToTime(e){let t=new Date(Number(e)),a=t.getFullYear()+"-",s=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",r=t.getDate()+" ",i=t.getHours()+":",l=t.getMinutes()+":",o=t.getSeconds();return a+s+r+i+l+o},initTable(){if(this.PUSH_NAME&&this.REPO_NAME){let t;this.$.ajax({type:"GET",async:!1,url:"https://raw.githubusercontent.com/"+this.PUSH_NAME+"/"+this.REPO_NAME+"/main/merged_prop_traces.json",success:function(e){t=e}});try{this.resultList=JSON.parse(t)}catch(e){console.error("解析JMH结果字符串出错：",e)}this.leftTableDate=this.createSpanTree(null!=this.triggerTable&&this.triggerTable.length>0?this.triggerTable[0].spans_:[]),this.rightTableDate=this.createSpanTree(null!=this.triggerTable&&this.triggerTable.length>1?this.triggerTable[1].spans_:[]),this.leftTableTitle=null!=this.triggerTable&&this.triggerTable.length>0?JSON.parse(this.triggerTable[0].prop)["dubbo.protocol.name"]+"-"+JSON.parse(this.triggerTable[0].prop)["dubbo.protocol.serialization"]:"",this.rightTableTitle=null!=this.triggerTable&&this.triggerTable.length>1?JSON.parse(this.triggerTable[1].prop)["dubbo.protocol.name"]+"-"+JSON.parse(this.triggerTable[1].prop)["dubbo.protocol.serialization"]:""}},createSpanTree(e){console.log(e);let t=new Map,a=[];for(let s of e)t.set(s.spanId_,{...s,spanId_:s.spanId_.toString(),cost:s.endTime_-s.startTime_,children:[]}),-1===s.parentSpanId_&&a.push(t.get(s.spanId_));for(let s of e)if(-1!==s.parentSpanId_){let e=t.get(s.parentSpanId_);e&&e.children.push(t.get(s.spanId_))}return console.log(a),a},open(){if((null==this.leftSelectedOptions||0===this.leftSelectedOptions.length)&&(null==this.rightSelectedOptions||0===this.rightSelectedOptions.length))return void this.$message({type:"warning",message:"请选择至少一个"});if(!this.PUSH_TOKEN)return void this.$message({type:"warning",message:"token为空"});let e=null,t=null;console.log(this.leftSelectedOptions),this.leftSelectedOptions.length>0&&(e=this.leftSelectedOptions[0],t=this.leftSelectedOptions[1]);let a=null,s=null;this.rightSelectedOptions.length>0&&(a=this.rightSelectedOptions[0],s=this.rightSelectedOptions[1]);const r=this.$createElement;this.$msgbox({title:"消息",message:r("p",null,[r("p",null,"左边内容：rpc协议："+(null==e?"":e)+"序列化："+(null==t?"":t)),r("p",null,"右边内容：rpc协议："+(null==a?"":a)+"序列化："+(null==s?"":s))]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:(r,i,l)=>{if("confirm"===r){let r="";e&&(r+="dubbo.protocol.name|"+e),t&&(e&&(r+="|"),r+="dubbo.protocol.serialization|"+t);let o="";a&&(o+="dubbo.protocol.name|"+a),s&&(a&&(o+="|"),o+="dubbo.protocol.serialization|"+s);let n=r+(r?"@":"")+o;i.confirmButtonLoading=!0,i.confirmButtonText="执行中...";const p=/^https:\/\/github\.com\/([^/]+)\/([^/]+)\.git$/,c=this.REPO_URL.match(p);c?(this.PUSH_NAME=c[1],this.REPO_NAME=c[2]):(this.PUSH_NAME="",this.REPO_NAME="",this.$message({type:"error",message:"输入的URL格式不正确，请确保它是带有.git后缀的GitHub仓库URL"})),this.$.ajax({url:"https://api.github.com/repos/"+this.PUSH_NAME+"/"+this.REPO_NAME+"/dispatches",type:"POST",beforeSend:e=>{e.setRequestHeader("Authorization","Basic "+btoa("username:"+this.PUSH_TOKEN)),e.setRequestHeader("Content-Type","application/json"),e.setRequestHeader("Accept","application/vnd.github.everest-preview+json")},data:JSON.stringify({event_type:"manual-trigger",client_payload:{prop:n,PUSH_NAME:this.PUSH_NAME,REPO_NAME:this.REPO_NAME,PUSH_TOKEN:this.PUSH_TOKEN,RESULTS_REPO_BRANCH:"main"}}),PUSH_NAME:null,REPO_NAME:null,PUSH_TOKEN:null,success:e=>{i.confirmButtonLoading=!1,console.log("Success:",e),localStorage.setItem("PUSH_NAME",this.PUSH_NAME),localStorage.setItem("REPO_NAME",this.REPO_NAME),localStorage.setItem("PUSH_TOKEN",this.PUSH_TOKEN),l()},error:(e,t,a)=>{i.confirmButtonLoading=!1,console.error("Error:",a),this.$message({type:"error",message:"触发失败"})}})}else l()}}).then((()=>{this.$message({type:"success",message:"触发成功！结果将在一小时内显示"})})).catch((()=>{this.$message({type:"info",message:"已取消"})}))},downloadFile(){const e="/trigger-sample-benchmark.yml",t=`${e}`,a=document.createElement("a");a.href=t,a.setAttribute("download","trigger-sample-benchmark.yml"),document.body.appendChild(a),a.click(),document.body.removeChild(a)}}}),D=C,U=(0,c.A)(D,I,J,!1,null,"5351175f",null),$=U.exports,F={name:"App",components:{TriggerTraceDetail:$,SerializationTask:H,RpcTask:A,TraceDetail:O,ScheduledTask:y,PullRequest:u}},G=F,B=(0,c.A)(G,r,i,!1,null,null,null),K=B.exports,q=a(4927),Q=a.n(q),Z=a(5225),Y=a(755),V=a.n(Y);s["default"].prototype.$=V(),s["default"].prototype.$echarts=Z,s["default"].use(Q()),s["default"].config.productionTip=!1,new s["default"]({render:e=>e(K)}).$mount("#app")}},t={};function a(s){var r=t[s];if(void 0!==r)return r.exports;var i=t[s]={exports:{}};return e[s].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,s,r,i){if(!s){var l=1/0;for(c=0;c<e.length;c++){s=e[c][0],r=e[c][1],i=e[c][2];for(var o=!0,n=0;n<s.length;n++)(!1&i||l>=i)&&Object.keys(a.O).every((function(e){return a.O[e](s[n])}))?s.splice(n--,1):(o=!1,i<l&&(l=i));if(o){e.splice(c--,1);var p=r();void 0!==p&&(t=p)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[s,r,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var s in t)a.o(t,s)&&!a.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};a.O.j=function(t){return 0===e[t]};var t=function(t,s){var r,i,l=s[0],o=s[1],n=s[2],p=0;if(l.some((function(t){return 0!==e[t]}))){for(r in o)a.o(o,r)&&(a.m[r]=o[r]);if(n)var c=n(a)}for(t&&t(s);p<l.length;p++)i=l[p],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(c)},s=self["webpackChunkdubbo_benchmark"]=self["webpackChunkdubbo_benchmark"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=a.O(void 0,[504],(function(){return a(9569)}));s=a.O(s)})();
//# sourceMappingURL=app.bdb59d2c.js.map