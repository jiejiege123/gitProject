/*
* @Author: ZZZ
* @Date:   2018-06-24 21:28:26
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-25 11:34:22
*/
const db = require('./../db/dbConfig.js');

const wxapp = {
	banner: function (cb) {
		let sql = 'SELECT i_url FROM ibanner';
		db.connection(sql, [], cb);
	},
	navArry: function (cb) {
		let sql = 'SELECT * FROM nvas';
		db.connection(sql, [], cb);
	}
}
module.exports = wxapp;