/*
* @Author: ZZZ
* @Date:   2018-04-24 00:04:45
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-21 00:24:53
*/
/* jshint esversion: 6 */ 
const db = require('./../db/dbConfig.js');

const header = {
	hotgoods: function (ifsale,whatif,search,iftp,ifnew,fname,startime,endtime,param,cb) {
        let sql
        if (startime != undefined && startime != '') {
            sql = 'SELECT SUM(f_sale) AS f_sale,t_name,f_name FROM(SELECT SUM(n_num) f_sale,t_name,f_name FROM flowers fl'+ 
                ' JOIN bigtype bt ON fl.c_id=bt.c_id'+  
                ' JOIN bvar bv ON fl.t_id = bv.t_id'+ 
                ' JOIN nowshop ns ON ns.f_id = fl.f_id'+ 
                ' JOIN forder fo ON ns.f_oid = fo.f_oid'+
                ' AND '+ifsale+' AND '+iftp+' AND '+whatif+'='+search+fname+
                ' AND f_otime BETWEEN '+'"'+startime+'"'+' AND '+'"'+endtime+'"'+ 
                ' GROUP BY f_name'+ 
                ' UNION SELECT SUM(n_num) f_sale,t_name,f_name FROM flowers fl'+  
                ' JOIN bigtype bt ON fl.c_id=bt.c_id'+  
                ' JOIN bvar bv ON fl.t_id = bv.t_id'+ 
                ' JOIN shoporder so ON so.f_id = fl.f_id'+  
                ' JOIN forder fo ON so.f_oid = fo.f_oid'+
                ' AND '+ifsale+' AND '+iftp+' AND '+whatif+'='+search+fname+
                ' AND f_otime BETWEEN '+'"'+startime+'"'+' AND '+'"'+endtime+'"'+  
                ' GROUP BY f_name) AS abb GROUP BY f_name'+ 
                ' ORDER BY f_sale DESC LIMIT ?,?'
        }
        else {
            sql = 'SELECT *'+
                ' FROM flowers fl'+
                ' JOIN bigtype bt ON fl.c_id=bt.c_id'+ 
                ' JOIN bvar bv ON fl.t_id = bv.t_id'+
                ' AND '+ifsale+' AND '+iftp+' AND '+whatif+'='+search+fname+
                ' ORDER BY f_sale DESC'+ifnew+' LIMIT ?,?';
        }
        // console.log(sql);
        db.connection(sql,param,cb);
    },
    pageCount: function (ifsale,whatif,search,iftp,fname,dislink,startime,endtime,cb) {
        let sql
        if (startime != undefined && startime != '') {
            sql = 'SELECT COUNT(*) AS pagecount FROM (SELECT SUM(f_sale) AS f_sale,t_name,f_name FROM(SELECT SUM(n_num) f_sale,t_name,f_name FROM flowers fl'+ 
                ' JOIN bigtype bt ON fl.c_id=bt.c_id'+  
                ' JOIN bvar bv ON fl.t_id = bv.t_id'+ 
                ' JOIN nowshop ns ON ns.f_id = fl.f_id'+ 
                ' JOIN forder fo ON ns.f_oid = fo.f_oid'+
                ' AND '+ifsale+' AND '+iftp+' AND '+whatif+'='+search+fname+
                ' AND f_otime BETWEEN '+'"'+startime+'"'+' AND '+'"'+endtime+'"'+ 
                ' GROUP BY f_name'+ 
                ' UNION SELECT SUM(n_num) f_sale,t_name,f_name FROM flowers fl'+  
                ' JOIN bigtype bt ON fl.c_id=bt.c_id'+  
                ' JOIN bvar bv ON fl.t_id = bv.t_id'+ 
                ' JOIN shoporder so ON so.f_id = fl.f_id'+  
                ' JOIN forder fo ON so.f_oid = fo.f_oid'+
                ' AND '+ifsale+' AND '+iftp+' AND '+whatif+'='+search+fname+
                ' AND f_otime BETWEEN '+'"'+startime+'"'+' AND '+'"'+endtime+'"'+  
                ' GROUP BY f_name) AS abbb GROUP BY f_name) AS bbb'
        }else{
            sql = "SELECT COUNT("+dislink+") AS pagecount"+
                " FROM flowers fl"+
                " JOIN bigtype bt ON fl.c_id=bt.c_id"+
                " JOIN bvar bv ON fl.t_id = bv.t_id"+
                " AND "+ifsale+" AND "+iftp+" AND "+whatif+"="+search+fname;
        }
        // console.log(sql);
        db.connection(sql,[search],cb);
    },
    ftype: function (cb) {
    	let sql = "SELECT * FROM bigtype UNION SELECT * FROM bsut UNION SELECT * FROM bobj UNION SELECT * FROM bvar ORDER BY c_ids,c_ord,c_id";
    	db.connection(sql,[],cb);
    },
    delGoods: function (flowerId,cb) {
        let sql = 'DELETE FROM flowers WHERE f_id in ('+flowerId+');'
        db.connection(sql,[],cb);
    },
    flowermsg: function (param,cb) {
        let sql = "SELECT * FROM flowers WHERE f_id = ?"
        db.connection(sql,param,cb);
    },
    upload: function (whatid,whatif,pwhatid,pwhatif,content,param,cb) {
        if (pwhatif == undefined) {
            var sql = "UPDATE flowers SET f_msg='"+content+"',f_url = ?,f_mr = ?,f_name = ?,f_p = ?,f_pk = ?,f_word = ?,f_zmr = ?,f_zs = ?,f_fmr = ?,f_fs = ? WHERE f_id = ?;"+
                "insert into fdetimg(f_id,f_msg) values(?,'"+content+"')"
            console.log(sql);
            console.log(param);
            db.connection(sql,param,cb);
        }
        else{
            var sql = "insert into flowers(f_msg,f_url,f_mr,f_name,f_p,f_pk,f_word,f_zmr,f_zs,f_fmr,f_fs,"+whatif+pwhatif+") values('"+content+"',?,?,?,?,?,?,?,?,?,?,"+whatid+pwhatid+");"+
                "insert into fdetimg(f_id,f_msg) values(?,'"+content+"')"
            console.log(sql);
            console.log(param);
            db.connection(sql,param,cb);
        }
    },
    goodswarn: function (whatif,search,param,cb) {
        let sql = 'SELECT * FROM bvar JOIN bvarwarn ON bvar.t_id = bvarwarn.b_t_id where '+whatif+'='+search+' LIMIT ?,?;'
        // console.log(sql);
        db.connection(sql,param,cb);
    },
    goodcount: function (whatif,search,cb) {
        let sql = 'SELECT count(*) AS pagecount FROM bvar where '+whatif+'='+search
        // console.log(sql);
        db.connection(sql,[],cb);
    },
    warntype: function (cb) {
        let sql = 'SELECT * FROM bvar'
        db.connection(sql,[],cb);
    },
    updataNum: function (param,cb) {
        let sql = 'UPDATE bvarwarn SET t_num = ?,t_w = ? WHERE b_t_id = ?'
        db.connection(sql,param,cb);
    },
    echart: function (cb) {
        let sql = 'SELECT * FROM bvar '
        db.connection(sql,[],cb);
    },
    echsale: function (startime,endtime,cb) {
        let sql = 'SELECT SUM(n_num) f_sale,t_name,f_name,f_otime  FROM flowers fl'+  
            ' JOIN bigtype bt ON fl.c_id=bt.c_id'+  
            ' JOIN bvar bv ON fl.t_id = bv.t_id'+  
            ' JOIN nowshop ns ON ns.f_id = fl.f_id'+  
            ' JOIN forder fo ON ns.f_oid = fo.f_oid'+  
            ' AND f_otime BETWEEN '+'"'+startime+'"'+' AND '+'"'+endtime+'"'+ 
            ' GROUP BY t_name ORDER BY bv.t_id'
        // console.log(sql);
        db.connection(sql,[],cb);
    }
};
module.exports = header;