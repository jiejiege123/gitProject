<template>
  <div id="allproduct" :class="{'aside-coll':$store.state.asider.isCollapse,'mains':true}">
    <div class="mainheader">
      <el-breadcrumb separator-class="el-icon-d-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="iconfont icon-home2"></i>
        </el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-main>
      <div class="forum-module">
        <div class="forum-header">
          <span class="forum-name">
            分类列表
          </span>
        </div>
        <div class="tree-layout">
          <!-- 树形控件 -->
          <div class="tree">
            <!-- 刷新 -->
            <div class="reflash" @click="reflash">
              <i class="el-icon-refresh"></i>
              刷新
            </div>
            <!-- 控件组件 -->
            <el-tree 
              :data = "treedata" 
              :props = "defaultProps" 
              node-key = "c_id"
              :default-expanded-keys="['1/s']"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
          <!-- 右侧结果 -->
          <div class="tree-list">
            <!-- bar -->
            <div class="table-top-bar clearfix">
              <!-- 多选框 -->
              <div class="chioch">
                <el-checkbox-group v-model="checkboxGroup1" size="small" @change="getchioce">
                  <el-checkbox-button v-for="city in cities" :label="city.id" :key="city.id">{{city.label}}</el-checkbox-button>
                </el-checkbox-group>
                <!-- 发布框 -->
                <div class="chioch chio">
                  <el-cascader
                    :options="treedata[0].children"
                    :props = "Props" 
                    :show-all-levels="false"
                    @change = "publishs"
                    change-on-select>
                  </el-cascader>
                  <el-button type="primary" @click="" size="small" :disabled='isTrue' v-html='jump'>
                    {{jump}}
                  </el-button>
                </div>
              </div>
              <!-- 搜索框 -->
              <div class="chioch">
                <div class="search-group">
                  <label>商品名称: </label>
                  <el-input v-model='input1' placeholder=""></el-input>
                </div>
                <el-button type="default" @click="nameSearch" size='small'>查询</el-button>
              </div>
            </div>
            <!-- 列表 -->
            <el-table
              ref="multipleTable"
              :data="tableData"
              height="550"
              stripe
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="图片"
                width="120">
                <template slot-scope="scope">
                  <img :src="'/api/images/img/'+scope.row.f_url" alt="" class="imgs">
                </template>
              </el-table-column>
              <el-table-column
                prop="f_name"
                label="商品名称"
                show-overflow-tooltip
                style="width: 25%">
              </el-table-column>
              <el-table-column
                prop="t_name"
                label="种类"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="f_p"
                label="价格"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="f_sale"
                label="销量"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="120"
                align="center">
                <template slot-scope="scope">
                  <router-link to="/productEdit" title="修改" class="t-edit" @click.native='handleEdit(scope.row)'>
                    <i class="el-icon-edit"></i>
                  </router-link>
                  <a title="删除" class="t-del" @click="handleClick(scope.row)">
                    <i class="el-icon-delete"></i>
                  </a>
                </template>
              </el-table-column>
            </el-table>
            <!-- 列表脚 -->
            <div class="table-footer">
              <div style="margin: 20px">
                <!-- <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button> -->
                <el-button @click="toggleSelection()" size="small">取消选择</el-button>
                <el-button @click="allclear()" size="small">批量删除</el-button>
              </div>
              <!-- 分页 -->
              <div class="table-bottom-bar" style="margin: 20px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="$store.state.asider.nowpage"
                  :page-sizes="[20, 50, 100, 300]"
                  :page-size="$store.state.asider.pagesize"
                  layout="total,sizes,prev,pager,next,jumper"
                  :total="count">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
// 引入映射
 import { mapMutations,mapActions ,mapGetters } from 'vuex'
export default {

  name: 'product',

  data() {
    return {
      tableData: [],
      treedata: [
        {
          c_id: '1/s',
          c_name: '所有分类',
          c_ord: '1',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'c_name'
      },
      Props: {
        children: 'children',
        label: 'c_name',
        value: 'c_idss'
      },
      // 多选框
      checkboxGroup1: [] ,// 默认选中项
      cities: [
        {id: 1, label: '热卖'} ,  
        {id: 2, label: '新品'} ,  
        {id: 3, label: '特价'}
      ],
      // 列表的选中
      multipleSelection: [],
      // 加载时默认页数
      /*currentPage: 1,
      // 当前页数
      nowpage: 1,
      // 每页行数 默认是20
      pageSize: 20,*/
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
      // 编辑的花的id
      flowerId: '',
      // 销量排序
      ifsale: 'no',
      // 时间排序
      ifnew: 'no',
      // 特价排序
      iftp: 'no',
      // 商品名称模糊查询
      input1: '',
      // 批量删除
      ids: '',
      // 发布布尔
      isTrue: true,
      jump: '发布'
    };
  },
  methods: {
    // 刷新
    reflash () {
      location.reload()
    },
    // 点击删除弹框的操作
    handleClick (row) {
      let that = this

      // console.log(row);
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row.f_id)
        that.flowerId = row.f_id
        console.log(that.flowerId);

        function ab () {
          that.$axios.get('/api' + '/delGoods', {params: {flowerID: that.flowerId}})
            .then(resp => {
              console.log(resp)
              let pages = that.$store.state.asider.nowpage
              that.handleCurrentChange(pages)
            })
        }
        ab()

        this.$message({
          type: 'success',
          message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })        
      })
    },
    // 发布商品选项切换
    publishs (val) {
      // 获取分类
      console.log(val);
      var parry = val[0].split('*')
      var flower = new Object()
      // flower.c_name = parry[2]
      flower.t_name = parry[2]
      flower.pwhatif = parry[1]
      flower.pwhatid = parry[0]
      // 获取子分类
      if (val.length > 1) {
        var arry = val[val.length-1].split('*')
        flower.t_name = arry[2]
        flower.whatif = arry[1]
        flower.whatid = arry[0]
      }
      this.isTrue = false;
      this.$store.commit('publishment',val)
      this.$store.commit('handleEdit',flower)
      this.jump = '<a href="#/productEdit">发布</a>'
    },

    // {{ scope.row.f_url }} 表格获取id的方法
    // 树形控件切换时
    handleNodeClick (data) {
      // console.log(data);
      this.getschVal = data.c_ord
      // 单项分类不超过10 否则出错 用分割
      this.getschid = data.c_id.split('*')[0]
      console.log(this.getschid);
      // this.getschid = data.c_id.slice(0,1)
      this.handleCurrentChange(1);
    },
    /* 多选框 */
    getchioce () {
      console.log(this.checkboxGroup1);
      if (this.checkboxGroup1.indexOf(1) != -1) {
        this.ifsale = 'yes'
      }
      if (this.checkboxGroup1.indexOf(2) != -1) {
        this.ifnew = 'yes'
      }
      if (this.checkboxGroup1.indexOf(3) != -1) {
        this.iftp = 'yes'
      }
      if (this.checkboxGroup1.indexOf(1) == -1) {
        this.ifsale = 'no'
      }
      if (this.checkboxGroup1.indexOf(2) == -1) {
        this.ifnew = 'no'
      }
      if (this.checkboxGroup1.indexOf(3) == -1) {
        this.iftp = 'no'
      }
      this.handleCurrentChange(1);
    },
    /* 按名称查询 */
    nameSearch () {
      console.log(this.input1)
      if (this.input1 !== '') {
        this.handleCurrentChange(1)
      }
    },
    /* 表格 */
    // 取消全选
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 选择项发生变化时
    handleSelectionChange (val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },
    // 批量删除
    allclear () {
      let that = this
      this.ids = this.multipleSelection.map(item => item.f_id).join()
      console.log(this.ids)
      // console.log(row);
      this.$confirm('此操作将永久删除这些商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(that.ids)
        that.flowerId = that.ids

        function ab () {
          that.$axios.get('/api' + '/delGoods',{params: {flowerID: that.flowerId}})
            .then(resp => {
              console.log(resp)
              let pages = that.$store.state.asider.nowpage
              that.handleCurrentChange(pages)
            })
        }
        ab()

        this.$message({
          type: 'success',
          message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    /* 分页 */
    // 每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.pageSize = val;
      this.$store.commit('pageSizechange',val)
      this.handleCurrentChange(1);
    },
    // 页数改变时
    handleCurrentChange(val) {
      // this.nowpage = val;
      let that = this;
      this.$store.commit('pagechange',val)
      // console.log(this.nowpage);
      // console.log(`当前页: ${val}`);
      function abs() {
        that.$axios.get('/api'+'/hotgoods',{
          params:{
            page:that.$store.state.asider.nowpage,
            pageSize:that.$store.state.asider.pagesize,
            searchName:that.getschVal,
            searchid:that.getschid,
            ifsale:that.ifsale,
            ifnew:that.ifnew,
            iftp:that.iftp,
            input:that.input1
          }
        })
          .then(resp => {
            that.tableData = resp.data.items;
            that.count = resp.data.count;
          })
      }
      abs()
    },
    // 点击编辑
    ...mapMutations(['handleEdit']),

  },
  created () {
    // console.log(this.$store.state.asider.nowpage);
    let that = this
    var children1 = [];
    this.$axios.get('/api'+'/hotgoods',{
      params:{
        page:this.$store.state.asider.nowpage,
        pageSize:this.$store.state.asider.pagesize,
        searchName:this.getschVal,
        searchid:this.getschid,
        ifsale:that.ifsale,
        ifnew:that.ifnew,
        iftp:that.iftp,
        input:that.input1}})
      .then(resp => {
        // console.log(resp);
        // console.log(resp.data);
        this.tableData = resp.data.items;
        this.count = resp.data.count;
      })
    this.$axios.get('/api'+'/ftype')
      .then(resp => {
        // console.log(resp);
        console.log(resp.data);
        var data0 = resp.data;
        for (var i = 0; i < data0.length; i++) {
          data0[i].c_idss = data0[i].c_id+'*'+data0[i].c_ord+'*'+data0[i].c_name
          data0[i].c_id = data0[i].c_id+'*'+data0[i].c_ord
          if (data0[i].c_ord == 'c_id') {
            // delete  data0[i].c_ids
            data0[i].children = []
            children1.push(data0[i])
          }
          for (var j = 0; j < children1.length; j++) {
            if (data0[i].c_ids == children1[j].c_ids && data0[i].c_name != children1[j].c_name) {
              children1[j].children.push(data0[i])
            }
          }
        }
        // console.log(children1);

      })
    // this.$set(this.treedata[0], 'children', [{label:1,children:[{label:1}]},{label:2},{label:3}]);
    this.$set(this.treedata[0], 'children', children1);
  },
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/productList.less';
</style>
<style lang="css">
  @import '../../assets/css/common.css';
</style>