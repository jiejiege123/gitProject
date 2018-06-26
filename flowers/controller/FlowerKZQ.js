/* jshint esversion: 6 */
const model = require('./../model/FlowerXXModel');
const modelF = require('./../model/model.js');
const path=require('path');
const fs=require('fs');
const async = require('async')

const flowerGzq = {

    //详情页
    FlowerPars:function(req, res){
        var headers
        var flowerMes
        var flowerRan
        var flowerApp
        //获取A标签ID
        let Id=req.params.Fid;
        console.log(Id);
        
        //console.log(req.session.user); //用户id
        var params = [];
        params.push(req.session.user);
        var userMessg;
        //头部请求
        function cbd(err,data) {
            //console.log('第一个调用');
            if (err == null) {
                headers = data;
                model.flowerParsBL(Id,cb)
            }
            
        }
        function header(err,data) {
            if (err == null) {
                userMessg = data;
                //console.log(userMessg);
                
            }
        }
        modelF.drop_user(params,header);

        //用户评价遍历的请求
        function pj(err,data) {
            //console.log('第二个调用');
            if(err == null){
                flowerApp = data;
                modelF.drop_down(cbd)
            }

        }

        //产品文字详情请求
        function fx(err,data) {
            //console.log('第三个调用');
            if (err == null){
                flowerMes = data;
                model.flowerAPP(Id,pj)
            }
        }

        //随机产品遍历请求
        function fr(err,data) {
            //console.log('第四个调用');
            if(err == null){
                flowerRan = data;
                model.FlowerMES(Id,fx)
            }
        }
        model.flowerRanBL(fr);

        //产品信息页请求
        function cb(err,data) {
            //console.log('第五个调用');
            if (err == null) {//不用判断 data.length>0
                //let datas = JSON.stringify(data);
                console.log(data);
                //console.log(datas);
                let typeTitle = '产品详情';
                let mydata = {
                    user:req.session.user,
                    datas:headers,
                    flowers:data,
                    flowermes:flowerMes,
                    flowerran:flowerRan,
                    flowerApps:flowerApp,
                    userMeg:userMessg
                };
                res.render('FlowerParsDo',mydata);
            }
        }
    },
    //列表页
    flowerStu:function (req,res) {
        var headers;
        var count;
        //页数计算
        let paid=req.params.paid;
        //console.log(paid);
        let fact = req.params.objs;//条件
        //console.log(fact);
        let paids = paid.split('_');
        let ids = paids[0];
        let page = Number(paids[1]);
        let param = [];
        let whatId;
        let port = paids[0]+'_';
        let titWord;
        let factpg = req.params.objs;
        let paramPage = [];

        if (ids == 'flowerStu') {
            ids = 1;
            whatId = 'c_id';
            titWord = '花之场景';
        }
        else if (ids == 'flowerType') {
            ids = 2;
            whatId = 'c_id';
            titWord = '花之分类';
        }
        else if (ids == 'flowerObj') {
            ids = 3;
            whatId = 'c_id';
            titWord = '花之对象';
        }else if (ids == 'flowerChoi') {
            ids = 1;
            whatId = 1;
            titWord = '花之选择';
        }

        else if (ids == 'sad') {
            ids = 3;
            whatId = 's_id';
            titWord = '哀思鲜花';
        }
        else if (ids == 'love') {
            ids = 1;
            whatId = 's_id';
            titWord = '爱情鲜花';
        }
        else if (ids == 'apologize') {
            ids = 4;
            whatId = 's_id';
            titWord = '道歉鲜花';
        }
        else if (ids == 'brithday') {
            ids = 6;
            whatId = 's_id';
            titWord = '生日鲜花';
        }
        else if (ids == 'wedding') {
            ids = 2;
            whatId = 's_id';
            titWord = '婚庆鲜花';
        }
        else if (ids == 'hospital') {
            ids = 7;
            whatId = 's_id';
            titWord = '探病鲜花';
        }
        else if (ids == 'business') {
            ids = 5;
            whatId = 's_id';
            titWord = '商务鲜花';
        }
        else if (ids == 'keepsake') {
            ids = 8;
            whatId = 's_id';
            titWord = '纪念鲜花';
        }

        else if (ids == 'red') {
            ids = 1;
            whatId = 't_id';
            titWord = '红玫瑰';
        }
        else if (ids == 'pink') {
            ids = 4;
            whatId = 't_id';
            titWord = '粉玫瑰';
        }
        else if (ids == 'purple') {
            ids = 5;
            whatId = 't_id';
            titWord = '紫玫瑰';
        }
        else if (ids == 'chanpagne') {
            ids = 6;
            whatId = 't_id';
            titWord = '香槟玫瑰';
        }
        else if (ids == 'carnation') {
            ids = 7;
            whatId = 't_id';
            titWord = '康乃馨';
        }
        else if (ids == 'gerber') {
            ids = 9;
            whatId = 't_id';
            titWord = '扶郎';
        }
        else if (ids == 'tulip') {
            ids = 10;
            whatId = 't_id';
            titWord = '郁金香';
        }
        else if (ids == 'white') {
            ids = 2;
            whatId = 't_id';
            titWord = '白玫瑰';
        }
        else if (ids == 'blue') {
            ids = 11;
            whatId = 't_id';
            titWord = '蓝玫瑰';
        }
        else if (ids == 'yellow') {
            ids = 3;
            whatId = 't_id';
            titWord = '黄玫瑰';
        }
        else if (ids == 'lily') {
            ids = 8;
            whatId = 't_id';
            titWord = '百合';
        }
        else if (ids == 'lily') {
            ids = 12;
            whatId = 't_id';
            titWord = '向日葵';
        }
        else if (ids == 'calla') {
            ids = 13;
            whatId = 't_id';
            titWord = '马蹄莲';
        }

        else if (ids == 'lover') {
            ids = 2;
            whatId = 'o_id';
            titWord = '爱人';
        }
        else if (ids == 'friend') {
            ids = 3;
            whatId = 'o_id';
            titWord = '好友';
        }
        else if (ids == 'liker') {
            ids = 1;
            whatId = 'o_id';
            titWord = '恋人';
        }
        else if (ids == 'elder') {
            ids = 4;
            whatId = 'o_id';
            titWord = '长辈';
        }

        //条件
        if (fact == 'cpre') {
            fact = 'ORDER BY f_id DESC';
        }else if(fact == 'timenew'){
            fact = 'ORDER BY f_id';
        }else if(fact == 'pricehig'){
            fact = 'ORDER BY f_p DESC';
        }else if(fact == 'pricelow'){
            fact = 'ORDER BY f_p';
        }else if(fact == 'sales'){
            fact = 'ORDER BY f_sale DESC,f_id DESC';
        }
        //console.log(factpg);

        let pages=(page-1)*16;
        param.push(ids);
        param.push(pages);
        //console.log(param);
        paramPage.push(ids);
        //console.log(param);
        
        var params = [];
        params.push(req.session.user);
        var userMessg;
        //头部请求
        function cbd(err,data) {
            if (err == null) {
                headers = data
                model.flowerLoveBL(whatId,fact,param,cb);
            }
        }
        modelF.drop_down(cbd);
        //个人信息
        function header(err,data) {
            if (err == null) {
                userMessg = data;
                //console.log(userMessg);
                
            }
        }
        modelF.drop_user(params,header);
        
        //页数请求
        function cp(err,data) {

            if(err == null && data.length>0){
              count = Number(Math.ceil(data[0].pageCount/16));

            }else {
             res.send("0");
            }
        }
        model.pageCountModel(whatId,paramPage,cp);
        //产品遍历到EJS文件
        function cb(err,data) {
            //console.log(data)
            if (err == null) {//不用判断 data.length>0
                //let datas = JSON.stringify(data);
                //console.log(datas);
                // let typeTitle = '产品页面';
                let mydata = {
                    user:req.session.user,
                    datas:headers,
                    flowers:data,
                    pageNow:Number(page),
                    pageCount:Number(count),
                    ports:port,
                    telword:titWord,
                    facts : factpg,
                    userMeg:userMessg
                };
                res.render('FlowerScene',mydata);
                // console.log(mydata)
            }
        }
    },

    //立即购买
    FlowerBuy:function (req, res) {
        //console.log(req);
        let fid=req.params.Bid;
        var headers
        var flowerDZ
        var flowerUser
        var uid = req.session.user;
        var param = [];
        param.push(uid);

        var params = [];
        params.push(req.session.user);
        var userMessg;
        //头部请求
        function cbd(err,data) {
            if (err == null) {
                headers = data;
                model.flowerBuyBL(fid,cb);
            }
        }
        //地址请求
        function dz(err,data) {
            if(err == null){
                flowerDZ = data;
                //console.log(data);
                modelF.drop_down(cbd);
            }
        }
        //个人信息
        function header(err,data) {
            if (err == null) {
                userMessg = data;
                //console.log(userMessg);
                
            }
        }
        modelF.drop_user(params,header);

        //用户信息请求
        function yh(err,data) {
            if(err == null){
                flowerUser = data;
                //console.log(data);
                model.flowerdz(param,dz);

            }
        }
        model.flowerUSER(req.session.user,yh);

        //用户购买的产品的信息
        function cb(err,data) {
            if (err == null) {//不用判断 data.length>0
                //let datas = JSON.stringify(data);
                let typeTitle = '购买页面';
                let mydata = {
                    user:req.session.user,
                    datas:headers,
                    flowers:data,
                    flowerdz:flowerDZ,
                    floweruser:flowerUser,
                    userMeg:userMessg
                };
                console.log(mydata);
                res.render('flowerpur.ejs',mydata);

            }
        }
    },
    //确认订单
    flowerOrders:function (req,res){
        //console.log(req);
        //花的id
        let f_id = req.body.f_id
        //用户id
        let username = req.session.user
        //被选中的地址id
        let a_id = req.body.adressid
        //订货人姓名
        let oa_adim = req.body.adminname
        //订货人电话,默认是用户注册手机号
        let oa_tel = req.body.adminetel
        //订货人邮箱
        let oa_em = req.body.adminem
        //送货时间
        let f_time = req.body.getime
        //贺卡留言
        let f_card = req.body.poword
        //订单备注
        let f_note = req.body.oword
        //花的数量
        let n_num = req.body.flnum
        //总价
        let n_price = req.body.flpay
        //付款方式
        let f_pay = req.body.payway
        //订单生成时间
        let otime = req.body.time
        //订单号
        let f_oid = req.body.foid
        // 为了方便观察 分开写
        let param=[]
        param.push(username)
        param.push(a_id)
        param.push(f_time)
        param.push(f_note)
        param.push(f_card)
        param.push(f_oid)
        param.push(f_pay)
        param.push(otime)
        param.push(n_price)

        param.push(f_oid)
        param.push(a_id)
        param.push(a_id)
        param.push(a_id)
        param.push(a_id)
        param.push(oa_adim)
        param.push(oa_tel)
        param.push(oa_em)
        
        param.push(f_id)
        param.push(f_oid)
        param.push(n_num)
        param.push(n_price)
        param.push(username)

        param.push(n_num)
        param.push(f_id)
        

        console.log(param)

        function call(err, data) {
            res.send('1');
        }
        model.flowerOrd(param,call);
    },
    //添加新地址
    FlowerAddress:function (req,res) {
        let usertel= req.session.user
        let name=req.body.myName
        let tel=req.body.tel
        let addree=req.body.addree
        let addrees=req.body.addrees
        let param=[]
        param.push(name,addree,addrees,tel,usertel)
        //console.log(param)
        function cb(err,data) {
            if (err == null) {
                res.send('1');
            }
        }
        model.flowerAdd(param,cb);
    },
    //跳转支付页面
    flowerZhtml:function (req,res) {
        console.log('信息:'+req.query);
        let username = req.session.user
        let f_oid = req.query.foid
        let headers

        var params = [];
        params.push(req.session.user);
        var userMessg;
        //头部
        function cbd(err,data) {
            if (err == null) {
                headers = data
                model.flowerfoid(f_oid,cb)
            }
        }
        modelF.drop_down(cbd);
        //个人信息
        function header(err,data) {
            if (err == null) {
                userMessg = data;
                //console.log(userMessg);
                
            }
        }
        modelF.drop_user(params,header);
        function cb(err,data) {
            if (err == null) {
                let mydata = {
                    foid : data,
                    user : username,
                    datas : headers,
                    userMeg:userMessg
                }
                res.render('FlowerHtmlZf',mydata);
            }
        }

    },
    //支付确认
    flowerZf:function (req,res) {
        //console.log(req.body)
        let f_oid = req.body.foid

        function cb(err,data) {
            //console.log(data);
            if (err == null) {
                res.send('1')
            }
        }
        model.flowerzf(f_oid,cb)
    }
};

module.exports = flowerGzq;
