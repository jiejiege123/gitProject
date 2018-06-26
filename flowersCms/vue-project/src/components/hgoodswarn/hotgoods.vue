<template>
	<div id="hotg" :class="{'aside-coll':$store.state.asider.isCollapse,'mains':true}">
		<div class="mainheader">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="iconfont icon-home2"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>热销商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <div class="forum-module">
      	<div class="forum-header">
      		<span class="forum-name">
      			订单列表
      		</span>
      	</div>
      	<div class="table-top-bar clearfix">
      		<el-row :gutter="24">
      			<!-- 时间选择 -->
    		    <el-col :xs="24" :sm="24" :md="24" :lg="12" class="search">
  		        <label>查询时间:  </label>
  		        <div class="block">
		            <el-date-picker
		              v-model="value1"
		              type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
		              placeholder="选择日期">
		            </el-date-picker>
		          </div>
		          <span>-</span>
  		        <div class="block">
		            <el-date-picker
		              v-model="value2"
		              type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
		              placeholder="选择日期">
		            </el-date-picker>
		          </div>
    		    </el-col>
    		    <!-- 分类搜索 -->
    		    <el-col :xs="24" :sm="24" :md="24" :lg="12">
    		      <label>类别/名称:  </label>
    		      <el-select v-model="value3" :name="searchVal" filterable clearable :filter-method="getsearch" placeholder="请选择或搜索" @change="noarrow">
  		          <el-option
  		            v-for="item in options"
  		            :key="item.c_id+item.c_ord"
  		            :label="item.c_name"
  		            :value="item.c_name">
  		          </el-option>
  		        </el-select>
  		        <el-button type="default" @click="searchNow">查询</el-button>
    		    </el-col>
      		</el-row>
      	</div>
        <!-- 产品遍历 -->
    	  <el-table
    	    :data="tableData"
          height="500"
    	    stripe
    	    style="width: 100%">
    	    <el-table-column
    	      prop="f_name"
    	      label="商品名称"
    	      style="width: 33.3%">
    	    </el-table-column>
    	    <el-table-column
    	      prop="t_name"
    	      label="分类"
    	      style="width: 33.3%">
    	    </el-table-column>
    	    <el-table-column
    	      prop="f_sale"
    	      label="销量">
    	    </el-table-column>
    	  </el-table>
        <!-- 分页 -->
    	  <div class="table-bottom-bar">
    	    <el-pagination
    	      @size-change="handleSizeChange"
    	      @current-change="handleCurrentChange"
    	      :current-page="currentPage"
    	      :page-sizes="[5, 10, 50, 100]"
    	      :page-size="10"
    	      layout="total, sizes, prev, pager, next, jumper"
    	      :total="count">
    	    </el-pagination>
    	  </div>
      </div>
    </el-main>
	</div>
</template>

<script>
export default {

  name: 'hotgoods',

  data () {
    return {
  	  tableData: [],
      // 默认有个时间
  	  value1: '',
  	  value2: '',
      value3: '',
  	  options: [],
      // 加载时默认页数
      currentPage: 1,
      // 当前页数
      nowpage: '',
      // 每页行数 默认是5
      pageSize: 10,
      // 总页数
      count: 0,
      // 查询的id
      searchid: '',
      // 查询的字段
      searchVal: '',
      // 获取查询的id
      getschid: 1,
      // 获取查询的字段
      getschVal: '',
      // 不选时间 默认个时间
      value11: '',
      value22: '',
  	}
  },
  methods: {
    searchNow () {
      if ((this.value1 && this.value2) || (!this.value1 && !this.value2 && this.value3)){
        this.getschid = this.searchid
        this.getschVal = this.searchVal
        console.log(this.value1);
        console.log(this.value2);
        let val1,val2
        if (this.value1 == '') {
          val1 = this.value11
          val2 = this.value22
        }else{
          val1 = this.value1
          val2 = this.value2
        }
        this.$axios.get('/api'+'/hotgoods',{params:{
          page:this.currentPage,
          pageSize:this.pageSize,
          searchName:this.getschVal,
          searchid:this.getschid,
          startime:val1,
          endtime:val2,
          ifsale:'yes'
        }})
        .then(resp => {
           // console.log(resp);
           // console.log(resp.data);
          this.tableData = resp.data.items;
          this.count = resp.data.count;
        })
      }else{
        return ''
      }  
    },
  	handleSizeChange(val) {
  	  // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
  	},
  	handleCurrentChange(val) {
      this.nowpage = val;
      let that = this;
      // console.log(this.nowpage);
  	  // console.log(`当前页: ${val}`);
      function abs() {
        that.$axios.get('/api'+'/hotgoods',{params:{
          page:that.nowpage,
          pageSize:that.pageSize,
          searchName:that.getschVal,
          searchid:that.getschid,
          ifsale:'yes'
        }})
          .then(resp => {
            that.tableData = resp.data.items;
          })
      }
      abs()
  	},
    getsearch (value) {
      this.value3 = value
    },
    noarrow (value) {
      // console.log(value);
      // console.log(this.value3);
      if (!value) return ''
      this.value3 = value.replace('>>','')
      let obj = {};
      obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.c_name == value;//筛选出匹配数据
      });
      this.searchVal = obj.c_ord
      this.searchid = obj.c_id
    }
  },
  created () {
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
    this.value11 = 2000 + seperator1 + '01' + seperator1 + '00'
    this.value22 = currentdate

    let that = this
  	this.$axios.get('/api'+'/hotgoods',{params:{
      page:this.currentPage,
      pageSize:this.pageSize,
      searchName:this.getschVal,
      searchid:this.getschid,
      startime:this.value11,
      endtime:this.value22,
      ifsale:'yes'
      }})
      .then(resp => {
         // console.log(resp);
         // console.log(resp.data);
        this.tableData = resp.data.items;
        this.count = resp.data.count;
    })
    this.$axios.get('/api'+'/ftype',{params:{ifsale:'yes'}})
      .then(resp => {
         // console.log(resp);
         // console.log(resp.data);
        let items = resp.data
        for (var i = 0; i < items.length; i++) {
          if (items[i].c_ord != 'c_id') {
            items[i].c_name = '>> ' + items[i].c_name
          }
        }
        this.options = items;
      })
  },
}
</script>

<style lang="less" scoped>
	@import '../../assets/css/hotgoods.less';
</style>
<style lang="css">
  @import '../../assets/css/common.css';
</style>