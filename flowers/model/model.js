/*
* @Author: ZZZ
* @Date:   2018-04-24 00:04:45
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-01 10:59:56
*/
/* jshint esversion: 6 */ 
const db = require('./../db/dbConfig.js');

const header = {
    drop_down: function (cb) {
        let sql = 'SELECT se_url FROM selectimg';
        //console.log(cb);
        //db.config.host = 'localhost';
        db.connection(sql, [], cb);
    },
    drop_user: function (param,cbd) {
    	let sql = 'SELECT * FROM login s1 JOIN users s2 ON s1.l_id = s2.u_l_id AND s1.l_id = ?';
    	db.connection(sql, param, cbd);
    },
    //确认支付
    flowerZf:function(param,cb){
        let sql="UPDATE forder SET p_id=4 where f_oid=?";
        db.connection(sql, param, cbd);
    }
};
module.exports = header;