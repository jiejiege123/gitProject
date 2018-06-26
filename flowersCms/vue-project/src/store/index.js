/*
* @Author: ZZZ
* @Date:   2018-06-05 16:56:06
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-07 21:59:14
*/
import Vue from 'vue'
import Vuex from 'vuex'
//导入模板
import asider from './modules/asider.js'
//导入使用Vuex
Vue.use(Vuex)

//声明state
export default new Vuex.Store({
	modules: {
		asider,
	}
})
