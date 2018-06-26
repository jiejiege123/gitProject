/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-19 10:15:51
*/
/* jshint esversion: 6 */
const model = require('./../model/model.js');
const indexModel=require("./../model/indexModel.js");
const path=require('path');
const fs=require('fs');
const project = {
    indexlist:function(req,res){

        //req.session.user = req.params.quite;
        var username = req.session.user;
        //console.log(username);
        var header;
        /*console.log(req.session.user);*/
        var param = [];
        param.push(req.session.user);
        var userMessg;

        //头部导航
        function cb(err,data) {
            if (err == null) {
                header=data;
                indexModel.myGetNewProduct(callback);
            }
        }
        //个人信息
        function header(err,data) {
            if (err == null) {
                userMessg = data;
                //console.log(userMessg); 
            }
        }
        model.drop_user(param,header);

        //新品上架 页面渲染
        function callback (err,data) {
            if(err == null){
                let myIndex = {
                    datas:header,
                    user:username,
                    content:data,
                    contentBan:banner,
                    contentPro:production,
                    contentCom:Comment,
                    contentRes:reserve,
                    userMeg:userMessg
                };
                res.render("index",myIndex);
            }
        }

        //首页轮播
        var banner;
        function callbackBan(err,data) {
            if(err == null){
                //console.log(data);
                banner=data;
                model.drop_down(cb);
            }
        }


        //鲜花作品
        var production;
        function callbackPro(err,data) {
            if(err == null){
                production=data
                indexModel.myGetBanner(callbackBan);
            }
        }

        //网上订花
        var reserve ;
        function callbackRes(err,data) {
            if(err == null)
                reserve =data
            indexModel.myGetComment(callbackCom)
        }
        indexModel.myGetReserve(callbackRes);


        //评论
        var Comment;
        function callbackCom(err,data) {
            if(err == null)
             Comment=data;
                indexModel.myGetProduction(callbackPro);
        }
    },

    //售后
    sale:function (req,res) {
        function cb(err,data) {
            if (err == null) {
                let mydata = {user:req.session.user,datas:data};
                //console.log(mydata);
                res.render('afterSale',mydata);
            }
        }
        model.drop_down(cb);
    },
    //支付方式
    payment:function (req,res) {
        function cb(err,data) {
            if (err == null) {
                let mydata = {user:req.session.user,datas:data};
                //console.log(mydata);
                res.render('payment',mydata);
            }
        }
        model.drop_down(cb);
    },


    //登录页
    login:function (req,res) {
        res.render('login');
    },
    //个人中心
    userHome:function (req,res) {
        var users;
        var param = [];
        param.push(req.session.user);
        function cbd(err,data) {
            if (err == null) {
                users = data;
                //console.log(users);
                model.drop_down(cb);
            }
        }
        model.drop_user(param,cbd);
        function cb(err,data) {
            if (err == null) {
                let mydata = {
                    user:req.session.user,
                    datas:data,
                    userMeg:users
                };
                //console.log(mydata);
                res.render('memberCenter',mydata);
            }
        }
    },

    quite:function (req,res) {
        req.session.user = undefined;
        //console.log(req.session.user);
        res.send('1');
    }
};

module.exports = project;