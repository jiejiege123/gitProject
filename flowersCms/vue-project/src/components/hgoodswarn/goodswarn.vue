<template>
	<div id="gwarn" :class="{'aside-coll':$store.state.asider.isCollapse,'mains':true}">
		<div class="mainheader">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="iconfont icon-home2"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>库存预警</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <div class="forum-module">
      	<div class="forum-header">
      		<span class="forum-name">
      			库存警戒
      		</span>
      	</div>
      	<div class="table-top-bar clearfix">
      		<el-row :gutter="24">
      			<el-col :xs="24" :sm="24" :md="24" :lg="12">
    		      <label>种类:  </label>
    		      <el-select v-model="value3" filterable placeholder="请选择" @change="noarrow">
  		          <el-option
  		            v-for="item in options"
  		            :key="item.t_name"
  		            :label="item.t_name"
  		            :value="item.t_name">
  		          </el-option>
  		        </el-select>
  		        		<el-button type="default" @click="searchNow">搜索</el-button>
    		    </el-col>
      		</el-row>
      	</div>
    	  <el-table
    	    :data="tableData"
    	    stripe
    	    style="width: 100%">
    	    <el-table-column
    	      prop="t_name"
    	      label="主材"
    	      style="width: 33.3%">
    	    </el-table-column>
    	    <el-table-column
    	      prop="t_num"
    	      label="库存(支)"
    	      style="width: 33.3%">
    	    </el-table-column>
    	    <el-table-column
    	      prop="t_w"
    	      label="库存警戒(支)">
    	    </el-table-column>
    	    <el-table-column
    	      label="操作">
    	      <template slot-scope="scope">
	    	      <a title="添加" class="t-edit edit" @click="handleClick(scope.row)">
	    	        <i class="el-icon-edit"></i>
	    	      </a>
    	      </template>
    	    </el-table-column>
    	  </el-table>
        <!-- 分页 -->
    	  <div class="table-bottom-bar">
          <!-- 分页 -->
    	    <el-pagination
    	      @size-change="handleSizeChange"
    	      @current-change="handleCurrentChange"
    	      :current-page="currentPage"
    	      :page-sizes="[10, 20, 50, 100]"
    	      :page-size="10"
    	      layout="total, sizes, prev, pager, next, jumper"
    	      :total="count">
    	    </el-pagination>
    	  </div>
        <!-- 弹框 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%"
          center
          :before-close="handleClose">
          <el-form 
            :model="typeform" 
            ref="typeform" 
            label-width="80px" 
            class="demo-ruleForm">
              <el-form-item label="名称">
                  <span>{{typeform.t_name}}</span>
              </el-form-item>
              <el-form-item label="库存">
                  <el-input v-model="typeform.t_num"></el-input>
              </el-form-item>
              <el-form-item label="库存警戒">
                  <el-input v-model="typeform.t_w"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="numchange">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
	</div>
</template>

<script>
export default {

  name: 'goodswarn',

  data () {
    return {
  	  tableData: [],
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
      // 弹框可见性
      dialogVisible: false,
      // 弹框内容
      typeform: {},
    }
  },
  methods: {
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
        that.$axios.get('/api'+'/goodswarn',{params:{
          page:that.currentPage,
          pageSize:that.pageSize,
          searchName:that.getschVal,
          searchid:that.getschid,
        }})
          .then(resp => {
            that.tableData = resp.data.items;
          })
      }
      abs()
    },
    // 选项改变时
    noarrow (value) {
      // console.log(value);
      // console.log(this.value3);
      if (!value) return ''
      this.value3 = value
      let obj = {};
      obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.t_name == value;//筛选出匹配数据
      });
      // console.log(obj);
      this.searchVal = obj.c_ord
      this.searchid = obj.c_id
    },
    // 点击查询时
    searchNow () {
      this.getschid = this.searchid
      this.getschVal = this.searchVal
      // console.log(this.getschid);
      // console.log(this.getschVal);
      this.handleCurrentChange(1);
    },
    // 点击添加
    handleClick (row) {
      console.log(row);
      this.dialogVisible = true
      this.typeform = row
      let obj = {};
      obj = this.options.find((item)=>{//这里的userList就是上面遍历的数据源
        return item.c_id == row.c_id;//筛选出匹配数据
      });
      obj.t_num = this.typeform.t_num
      obj.t_w = this.typeform.t_w
    },
    // 确定更改
    numchange () {
      this.$axios.get('/api'+'/updataNum',{params:{
        id:this.typeform.t_id,
        tnum:this.typeform.t_num,
        tw:this.typeform.t_w
      }})
        .then(resp => {
          this.dialogVisible = false
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  created () {
    // 内容
    this.$axios.get('/api'+'/goodswarn',{params:{
      page:this.currentPage,
      pageSize:this.pageSize,
      searchName:this.getschVal,
      searchid:this.getschid,
    }})
      .then(resp => {
        this.tableData = resp.data.items
        this.count = resp.data.count;
        // console.log(this.tableData);
        // console.log(this.count);
    })
    // 种类
    this.$axios.get('/api'+'/warntype')
      .then(resp => {
        this.options = resp.data
        // console.log(this.options);
    })
  }
}
</script>

<style lang="less" scoped>
	@import '../../assets/css/hotgoods.less';
</style>
<style lang="css">
  @import '../../assets/css/common.css';
</style>