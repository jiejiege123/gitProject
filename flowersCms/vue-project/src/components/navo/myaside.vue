<template>
	<div class="aside" :class="{'aside-colls':$store.state.asider.isCollapse}">
    <div class="asiderbar">
      <aside id="aside">
        <span class="aside-title" v-show='$store.state.asider.isSestem'>系统主菜单</span>
        <el-menu default-active="1" :unique-opened="true" :collapse="$store.state.asider.isCollapse" class="el-menu-vertical-demo">
          <router-link :to='"/Main"' tag='li'>
            <el-menu-item index='1'>
              <i class="iconfont icon-gongzuotai"></i>
              <span :class="{'issw':$store.state.asider.isCollapse}">工作台</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="2">
            <template slot="title">
              <i class="iconfont icon-bars"></i>
              <span slot="title">商品</span>
            </template>
              <router-link :to="{path:'/productlist'}">
                <el-menu-item index="2-1">
                  商品管理
                </el-menu-item>
              </router-link>
              <router-link to="/myflowersel">
                <el-menu-item index="2-3">
                  分类管理
                </el-menu-item>
              </router-link>
              <router-link to="/productevaluate">
                <el-menu-item index="2-4">
                  商品评价
                </el-menu-item>
              </router-link>
              <router-link :to="{path:'/hotgoods'}">
                <el-menu-item index="2-5">
                  热销商品
                </el-menu-item>
              </router-link>
              <router-link :to="{path:'/goodswarn'}">
                <el-menu-item index="2-6">
                  库存预警
                </el-menu-item>
              </router-link>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-appstoreo"></i>
              <span slot="title">订单</span>
            </template>
            <router-link :to="'/orderList'">
              <el-menu-item index="3-1" >订单管理</el-menu-item>
            </router-link>
            <router-link :to="'/expressage'">
              <el-menu-item index="3-2">打印配送单</el-menu-item>
            </router-link>
            <router-link :to="'/information'">
              <el-menu-item index="3-3">发货信息管理</el-menu-item>
            </router-link>
            <router-link :to="'/materialreject'">
              <el-menu-item index="3-4">退货/退款订单</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="iconfont icon-barschart"></i>
              <span slot="title">运营</span>
            </template>
              <router-link :to="{path:'/guanliyuan'}">
                <el-menu-item index="4-1">管理员</el-menu-item>
              </router-link>
              <router-link :to="{path:'/player'}">
                <el-menu-item index="4-2">角色管理</el-menu-item>
              </router-link>
              <router-link to="/myPicture">
                <el-menu-item index="4-3">
                  首页海报
                </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont icon-user"></i>
              <span slot="title">用户</span>
            </template>
              <router-link :to="{path:'/userguanli'}">
                <el-menu-item index="5-1">用户管理</el-menu-item>
              </router-link>
              <router-link :to="{path:'/userlevel'}">
                <el-menu-item index="5-2">用户等级</el-menu-item>
              </router-link>
              <router-link :to="{path:'/shujuzidian'}">
                <el-menu-item index="5-3">数据字典</el-menu-item>
              </router-link>
              <router-link :to="{path:'/zidianleix'}">
                <el-menu-item index="5-4">字典类型</el-menu-item>
              </router-link>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="iconfont icon-windowso"></i>
               <span slot="title">界面</span>
            </template>
              <el-menu-item index="6-1">资源管理</el-menu-item>
              <el-menu-item index="6-2">栏目</el-menu-item>
            <router-link to="/myArticle">
              <el-menu-item index="6-3">
                文章
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-menu-item index="7">
            <i class="iconfont icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </aside>
    </div>

	</div>
</template>

<script>
export default {

  name: 'myaside',

  data () {
    return {

    }
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
	@import '../../assets/css/myaside.less';
</style>
<style lang="css">
  @import '../../assets/css/common.css';
</style>
