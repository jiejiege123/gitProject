/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:04
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-24 21:46:20
*/
/* jshint esversion: 6 */ 
//定义模块 添加自己的模块 pakage.json中已经写入了大部分模块，
//直接添加即可，如果自己安装的模块，注意备注出来。
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParse = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const multer = require("multer");//可做评论图片
const fm=require('formidable');//可做头像上传
//自定义路由模块路径 --在这里添加自己的路由路径,项目中接口都放到router.js中
const router = require('./routes/router.js');
const router2 = require('./routes/cooktouter.js');
const router3 = require('./routes/productRouter.js');

//图片管理
const pictureRouter = require('./routes/pictureRouter.js');
//文章管理
const reserveArt = require('./routes/reserveArtRouter.js');

// 百度编辑器
const ueditor = require("ueditor");

const app = express();

// 调用ejs
app.set('views',__dirname+'/views');//设置视图文件目录
//app.engine('html', require('ejs').renderFile); 
app.set('view engine','ejs');//启用视图引擎，调用ejs文件模板。

//cookie
app.use(cookieParser());
app.use(session({
	cookie:{maxAge:1000*7200},
	name:'connect155',
	secret:'bj155',
	resave:false,
	rolling:false
}));

//日志
//app.use(logger('dev'));

//解析url编码
app.use(bodyParse.urlencoded({extends:false}));
app.use(bodyParse.json());

// 百度编辑器
//使用模块
app.use("/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
　　// ueditor 客户发起上传图片请求
　　if (req.query.action === 'uploadimage') {
	　　var foo = req.ueditor;
	　　var imgname = req.ueditor.filename;
	　　var img_url = '/ueditor/images/';
		//你只要输入要保存的地址。保存操作交给ueditor来做
	    res.ue_up(img_url); 
	    //IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
	    res.setHeader('Content-Type', 'text/html'); 
    }
　　//  客户端发起图片列表请求
　　else if (req.query.action === 'listimage') {
　　var dir_url = '/ueditor/images/';
   　　 res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
　　}
　　// 客户端发起其它请求
　　else {
		// console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

//调用自定义路由 --在这里使用自己的路由
//...
app.use(function (req, res, next) {
	//console.log(req.url)
	next()
})
app.use(router);
app.use(router2);
app.use(router3);
app.use(pictureRouter);
app.use(reserveArt);


//调用静态页面
app.use(express.static(__dirname+'/public'));//or
//app.use(express.static(path.join(__dirname,'public','index.html')));

//配置端口
app.listen(8888,function(){
	console.log('服务器已启动，请访问localhost:8888');
});