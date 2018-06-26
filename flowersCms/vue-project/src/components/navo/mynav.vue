<template>
	<el-row class='nav'>
		<el-col :span="24">
			<div class="log">
				<img src="./logo.png" alt="">
			</div>
			<div class="collapse-menu" @click='increment'>
				<img src="./menu.png" alt="">
			</div>
			<div class="user-inner">
				<img src="./defHeadImg.jpg" alt="">
				<span>test1</span>
				<span title="编辑用户"><i class="iconfont icon-edit-user"></i></span>
				<span title="查看网站"><i class="iconfont icon-liulanqi-IE"></i></span>
				<span title="退出"><i class="iconfont icon-guanbi2"></i></span>
			</div>
		</el-col>
	</el-row>
</template>

<script>
import { mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  name: 'mynav',

  data () {
    return {

    }
  },
   methods: {
    /*addcount () {
      // this.$store.commit('increment',2)
      // 载荷对象
      // this.$store.commit('increment',{num: 2})
      // 全对象风格
      this.$store.commit({
        type: 'increment',
        num: 2
      })
    },*/
    ...mapMutations(['increment'])
  }
}
</script>

<style lang="less" scoped>
	@import '../../assets/css/nav.less';
</style>