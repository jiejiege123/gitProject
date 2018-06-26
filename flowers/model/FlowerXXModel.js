const db = require('./../db/dbConfig.js');

const flowers = {
    //查询产品详情
    flowerParsBL:function (Id,cb) {
        var sql;
        if (Id == 1 || Id == 2 || Id == 3 || Id == 4) {
            sql = 'select * from fdetimg WHERE f_id=? ';
        }else{
            sql = 'select f_msg from flowers WHERE f_id=?'
        }
        db.connection(sql,[Id],cb);
    },
    //查询鲜花信息
    flowerLoveBL:function (whatId,fact,param,cb) {
        var sql = 'select f_id,f_name,f_p,f_word,f_url,f_msg from flowers where '+whatId+' = ? '+fact+' limit ?,16';
        //console.log(sql);
        db.connection(sql,param,cb);
    },
    //查询产品总共有多少个
    pageCountModel:function (whatId,paramPage,cbs) {
        let sql = 'select COUNT(*) as pageCount from flowers where '+whatId+' = ?';
        db.connection(sql,paramPage,cbs);
    },
    //查询产品的文字信息详情
    FlowerMES:function (id,cb) {
        var sql = 'select * from flowers where f_id=? ';
        db.connection(sql,[id],cb);
    },
    //查询用户评价的信息
    flowerAPP:function (id, cb) {
        var sql ='SELECT * FROM evaluate JOIN forder ON  evaluate.f_oid =forder.f_oid \n' +
            'JOIN users c  ON forder.u_l_id=c.u_l_id WHERE f_id = ?'
        db.connection(sql,[id],cb);
    },
    flowerRanBL:function (cb) {
        var sql = 'SELECT * FROM flowers WHERE f_id>0 AND f_id<39 ORDER BY RAND() LIMIT 3'
        db.connection(sql,cb);
    },
    //送花地址查询
    flowerdz:function (param,cb) {
        var sql = 'SELECT * FROM postaddress a JOIN add_form b ON a.a_id=b.a_id JOIN users c ON b.u_l_id = c.u_l_id JOIN login ON c.u_l_id=login.l_id AND c.u_l_id = ?;';
        db.connection(sql,param,cb);
    },
    //用户信息查询
    flowerUSER:function (user,cb) {
        var sql = 'select * from users where u_l_id=? ';
        db.connection(sql,[user],cb);
},
    //订单页花的列表
    flowerBuyBL:function (id, cb) {
        var sql = 'select * from flowers where f_id=?';
        db.connection(sql,[id],cb);
    },
    //添加用户订单 设置新地址 设置立即购买
    flowerOrd:function(param,cb){
        let sql="INSERT INTO forder VALUES(?,1,?,?,?,?,?,?,?,?,1,1,1);"+
        "INSERT INTO order_add VALUES(?,(SELECT a_area FROM postAddress WHERE a_id = ?),(SELECT a_areas FROM postAddress WHERE a_id = ?),(SELECT a_user FROM postAddress WHERE a_id = ?),(SELECT a_phone FROM postAddress WHERE a_id = ?),?,?,?,1);"+
        "INSERT INTO nowshop VALUES(?,?,?,?,?)"+
        "UPDATE flowers SET f_sale = f_sale+? WHERE f_id = ?"
        console.log(sql);
        console.log(param);
        db.connection(sql,param,cb);
    },
    //添加地址
    flowerAdd:function(param,cb){
        let sql='INSERT INTO postaddress(a_user,a_area,a_areas,a_phone) VALUE (?,?,?,?);INSERT INTO add_form VALUE (NULL,?);';
        db.connection(sql,param,cb);
    },
    //支付页 订单号查询
    flowerfoid:function (foid,cb) {
        let sql="select * from forder where f_oid = ?"
        db.connection(sql,[foid],cb);
    },
    //确认支付
    flowerzf:function (foid,cb) {
        let sql="UPDATE forder SET p_id = 2 WHERE f_oid = ?;"
        db.connection(sql,[foid],cb);
    }
};


module.exports = flowers;