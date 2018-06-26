export default {
	state: {
		isCollapse: false,
      	isSestem: true,
      	flower: '',
      	nowpage: 1,
      	pagesize: 20,
      	publish: '',
      	islogin: false,
      	
	},
	mutations: {
		increment (state) {
			state.isCollapse = !state.isCollapse
			state.isSestem = !state.isSestem
		},
		handleEdit (state,n) {
			state.flower = n
			// console.log(state.flower);
		},
		pagechange (state,n) {
			state.nowpage = n
			// console.log('保存页'+state.nowpage);
		},
		pageSizechange (state,n) {
			state.pagesize = n
		},
		publishment (state,n) {
			state.publish = n
		},
		islogin (state,n) {
			state.islogin = n
		}
	},
	actions: {

	}
}