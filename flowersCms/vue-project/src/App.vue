<template>
  <div id="app">
    <!-- <my-nav v-if="$store.state.asider.islogin"></my-nav>
    <my-aside v-if="$store.state.asider.islogin"></my-aside> -->
    <my-nav ></my-nav>
    <my-aside></my-aside>
    <router-view/>
  </div>
</template>

<script>
import myNav from './components/navo/mynav'
import myAsider from './components/navo/myaside.vue'
export default {
  name: 'App',
  components: {
    'my-nav': myNav,
    'my-aside': myAsider
  },
  data: function(){
    return {
      // 登录成功之后设置islogin =
      islogin: false,
      // islogin: true,
    }
  },
  methods: {

  },
  // created:function(){
  //   this.$axios.get('/api'+'/app?islogin='+this.$route.query.islogin)
  //     .then(resp => {
  //       this.data=resp.data.items;
  //     })
  // }
}
</script>

<style>
  @import './assets/css/animate.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: #f0f4f6;
    color: #2c3e50;
    min-height: calc(100vh - 0px);
  }
  body{
    margin: 0;
  }
   /*#app>div:nth-child(3){*/
    /*margin-top: 80px!important;*/
  /*}*/
</style>
