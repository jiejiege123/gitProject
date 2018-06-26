<template>
	<div id="main" :class="{'aside-coll':$store.state.asider.isCollapse,'mains':true}">
    <div class="mainheader">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="iconfont icon-home2"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>工作台</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-dc">
            <div class="grid-content bg-green">
              <div class="flex-grid">
                <i class="iconfont icon-xiaoshoue"></i>
                <span class="count">0</span>
              </div>
              <div class="grid-name">
                今日销售额
              </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-dc">
            <div class="grid-content bg-yellow">
              <div class="flex-grid">
                <i class="iconfont icon-dingdan"></i>
                <span class="count">0</span>
              </div>
              <div class="grid-name">
                今日订单数
              </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-dc">
            <div class="grid-content bg-blue">
              <div class="flex-grid">
                <i class="iconfont icon-fabushangpin"></i>
                <span class="count">49</span>
              </div>
              <div class="grid-name">
                出售商品数
              </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-dc">
            <div class="grid-content bg-purple">
              <div class="flex-grid">
                <i class="iconfont icon-_zhuzhanghao"></i>
                <span class="count">2</span>
              </div>
              <div class="grid-name">
                总会员数
              </div>
            </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="12">
              <el-col :span="24" class="sys-panel span-dc">
                <div class="sys-header">
                  <h3>待处理</h3>
                </div>
                <div class="sys-body">
                  <ul class="handing-box">
                    <li class="handing-items">
                      <i class="iconfont icon-daifahuo"></i>
                      <div class="handing-name">待发货</div>
                      <div class="handing-count">20</div>
                    </li>
                    <li class="handing-items">
                      <i class="iconfont icon-daifukuan"></i>
                      <div class="handing-name">待付款</div>
                      <div class="handing-count">20</div>
                    </li>
                    <li class="handing-items">
                      <i class="iconfont icon-tuihuotuikuan"></i>
                      <div class="handing-name">退货/退款</div>
                      <div class="handing-count">20</div>
                    </li>
                    <li class="handing-items">
                      <i class="iconfont icon-kucun"></i>
                      <div class="handing-name">库存预警</div>
                      <div class="handing-count">20</div>
                    </li>
                    <li class="handing-items">
                      <i class="iconfont icon-zixun"></i>
                      <div class="handing-name">商品咨询</div>
                      <div class="handing-count">20</div>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="24" class="sys-panel span-dc">
                <div class="sys-header">
                  <h3>常用菜单</h3>
                </div>
                <div class="sys-body">
                  <ul class="handing-box">
                    <li class="handing-items">
                      <div class="clort-box color-1">
                        <i class="iconfont icon-fabushangpin"></i>
                      </div>
                      <div class="handing-name">商品发布</div>
                    </li>
                    <li class="handing-items">
                      <div class="clort-box bg-green">
                        <i class="iconfont icon-tupian"></i>
                      </div>
                      <div class="handing-name">首页轮播他</div>
                    </li>
                    <li class="handing-items">
                      <div class="clort-box color-2">
                        <i class="iconfont icon-youhuiquan"></i>
                      </div>
                      <div class="handing-name">优惠券</div>
                    </li>
                    <li class="handing-items">
                      <div class="clort-box color-3">
                        <i class="iconfont icon-zaixiankefu"></i>
                      </div>
                      <div class="handing-name">在线客服</div>
                    </li>
                    <li class="handing-items">
                      <div class="clort-box color-4">
                        <i class="iconfont icon-wenzhang"></i>
                      </div>
                      <div class="handing-name">文字发布</div>
                    </li>
                  </ul>
                </div>
              </el-col>
          </el-col>
          <el-col :xs="24" :sm="24" :md="42" :lg="12">
            <div class="sys-panel span-dc">
              <div class="sys-header">
                <h3>热销商品</h3>
                <div>
                  <el-radio-group v-model="radio1" size="small" @change="salechange">
                    <el-radio-button label="月"></el-radio-button>
                    <el-radio-button label="年"></el-radio-button>
                    <el-radio-button label="总"></el-radio-button>
                  </el-radio-group>
                  <router-link :to="{path:'/hotgoods'}" tag='span'>
                    <span class="el-icon-more"></span>
                  </router-link>
                </div>
              </div>
              <div class="sys-body" style="height: 345px">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%">
                  <el-table-column
                    prop="f_name"
                    label="商品名称">
                  </el-table-column>
                  <el-table-column
                    prop="t_name"
                    label="商品种类"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="f_sale"
                    label="销量"
                    width="200">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <!-- 柱状图 -->
            <div class="sys-panel span-dc">
              <div class="sys-header">
                <h3>销量统计</h3>
                <div>
                  <el-radio-group v-model="radio2" size="small" @change="echzhu">
                    <el-radio-button label="月"></el-radio-button>
                    <el-radio-button label="年"></el-radio-button>
                  </el-radio-group>
                  <span class="el-icon-more"></span>
                </div>
              </div>
              <div  class="sys-body">
                <div id="salepVol" style="height: 360px;width: 100%">
                </div>
              </div>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
          <!-- 饼状图 -->
            <div class="sys-panel span-dc">
              <div class="sys-header">
                <h3>销售统计</h3>
                <div>
                  <el-radio-group v-model="radio3" size="small">
                    <el-radio-button label="月"></el-radio-button>
                    <el-radio-button label="年"></el-radio-button>
                  </el-radio-group>
                  <span class="el-icon-more"></span>
                </div>
              </div>
              <div  class="sys-body">
                <div id="salepType" style="height: 360px;width: 100%">
                </div>
              </div>
            </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
            <div class="sys-panel p-24 span-dc">
              <el-button type="primary" @click="" size='medium'>生成索引</el-button>
              <p>系统初始时必须生成索引。生成后可加快商品的搜索速度，减小访问数据库的压力。索引只需要生成一次即可。</p>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12">
            <div class="sys-panel p-24 span-dc">
              <div class="flex-system">
                <div class="system-xitong">
                  <i class="iconfont icon-iconfontxianshi4"></i>
                </div>
                <div>
                  <p class="sys-info">
                    <span class="sys-gray">当前系统版本: </span>花庭阁 1.0
                  </p>
                  <p class="sys-info">
                    <span class="sys-gray">最近登录时间: </span>xx-xx-xx xx:xx:xx
                  </p>
                </div>
              </div>
            </div>
        </el-col>
      </el-row>
    </el-main>
	</div>
</template>

<script>
// 映射vuex
// import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {

  name: 'home',

  components: {

  },

  data () {
    return {
      radio1: '月',
      radio2: '月',
      radio3: '月',
      // 销量
      tableData: [],
      // 查询时间
      startime: '',
      endtime: '',
      myChart1: '',
      myChart2: '',
      option1:{
        // title: {text: '测试一下咯'},
        tooltip: {},
        xAxis: {
          data:[],
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [],
        }],
      },
      option2: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:['花之对象','花之场景','花之种类','爱情鲜花','表白鲜花','婚庆鲜花','哀思鲜花','道歉鲜花','商务鲜花','其他']
        },
        series: [
          {
            name:'销售统计',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'花之对象', selected:true},
              {value:679, name:'花之场景'},
              {value:1548, name:'花之种类'}
            ]
          },
          {
            name:'销售统计',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data:[
              {value:335, name:'爱情鲜花'},
              {value:310, name:'表白鲜花'},
              {value:234, name:'婚庆鲜花'},
              {value:135, name:'哀思鲜花'},
              {value:1048, name:'道歉鲜花'},
              {value:251, name:'商务鲜花'},
              {value:147, name:'生日鲜花'},
              {value:102, name:'其他'}
            ]
          }
        ]
      },
    }
  },
  mounted () {
    let that = this
    this.myChart1 = this.$echarts.init(document.getElementById('salepVol'))
    this.myChart2 = this.$echarts.init(document.getElementById('salepType'))
    window.onresize = function(){
      that.myChart1.resize();
      that.myChart2.resize();
    }

    this.myChart1.setOption(this.option1)
    this.myChart2.setOption(this.option2)
  },

  methods: {
    // 销量查询
    salechange (val) {
      console.log(val);
      // 获取时间
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      if (val == '月') {
        this.startime = year + seperator1 + month + seperator1 + '00'
        this.endtime = currentdate
      }
      else if (val == '年') {
        this.startime = year + seperator1 + '01' + seperator1 + '00'
        this.endtime = year + seperator1 + '12' + seperator1 + '31'
      }
      else if (val == '总') {
        this.startime = 2000 + seperator1 + '01' + seperator1 + '00'
        this.endtime = currentdate
      }
      console.log(this.startime);
      console.log(this.endtime);
      this.$axios.get('/api'+'/hotgoods',{params:{
        ifsale:'yes',
        startime: this.startime,
        endtime: this.endtime
      }}).then(resp => {
        // console.log(resp);
        // console.log(resp.data);
        this.tableData = resp.data.items;
        console.log(this.tableData);
      })
    },
    // 柱状图
    echzhu (val) {
      var star,end
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      if (val == '月') {
        star = year + seperator1 + month + seperator1 + '00'
        end = currentdate
      }
      else if (val == '年') {
        star = year + seperator1 + '01' + seperator1 + '00'
        end = year + seperator1 + '12' + seperator1 + '31'
      }
      /*this.$axios.get('/api'+'/echart',{params:{
        ifsale:'yes',
        startime: star,
        endtime: end
      }})*/
      this.$axios.get('/api'+'/echart')
        .then(resp => {
        // console.log(resp);
        // console.log(resp.data);
        var options = resp.data;
        var op = []
        for (var i = 0; i < options.length; i++) {
          op.push(options[i].t_name)
        }
        var temp1 = this.option1;
        temp1.xAxis.data = op
        console.log(op);
        // temp1.series[0].data = num
        this.$axios.get('/api'+'/echsale',{params:{
          startime: star,
          endtime: end
          }}).then(resp => {
          // console.log(resp);
          // console.log(resp.data);
          let num = resp.data;
          console.log(num);
          var arr = new Array(op.length);
          arr.fill(0);
          for (var i = 0; i < op.length; i++) {
            for (var j = 0; j < num.length; j++) {
              if (op[i] == num[j].t_name) {
                arr[j] = num[j].f_sale
              }
            }
          }
          temp1.series[0].data = arr
          this.myChart1.setOption(temp1)
        })
      })
    }
  },
  created () {
    this.salechange (this.radio1)
    this.echzhu(this.radio2)
    /* var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    this.startime = year + seperator1 + month + seperator1 + '00'
    this.endtime = currentdate

    this.$axios.get('/api'+'/hotgoods',{params:{
      ifsale:'yes',
      startime: this.startime,
      endtime: this.endtime
    }}).then(resp => {
      // console.log(resp);
      // console.log(resp.data);
      this.tableData = resp.data.items;
      console.log(this.tableData);
    })*/
  }
}
</script>

<style lang="css" scoped>
  @import '../assets/css/mian.css';
</style>
<style>
  @import '../assets/css/common.css';
</style>
