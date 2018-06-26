/*
* @Author: ZZZ
* @Date:   2018-06-24 21:26:44
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-25 10:02:31
*/
const model = require('./../model/wxappModel.js');

const wxapp = {
	banner: function (req,res) {
		function cb(err,data) {
			if (err == null) {}
			res.send(data)
		}
		model.banner(cb)
	},
	navArry: function (req,res) {
		function cb(err,data) {
			if (err == null) {}
			res.send(data)
		}
		model.navArry(cb)
	}
}
module.exports = wxapp;