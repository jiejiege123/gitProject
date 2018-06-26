/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-06-20 09:30:29
*/
/* jshint esversion: 6 */
const model = require('./../model/modelvue.js');
const path=require('path');
const fs=require('fs');
var formidable = require('formidable');

const project = {
    // 产品列表
	hotgoods:function (req,res) {
        let param = [];
        // 是否热售
        let ifsale = req.query.ifsale
        if (ifsale == 'yes') {
            ifsale = 'f_sale>0'
        }
        else{
            ifsale = '1 = 1'
        }
 
        // 是否新品
        let ifnew = req.query.ifnew
        if (ifnew == 'yes') {
            ifnew = ',f_id DESC'
        }
        else{
            ifnew = ''
        }

        // 是否特价
        let iftp = req.query.iftp
        if (iftp == 'yes') {
            iftp = 'f_chat=1'
        }
        else{
            iftp = '1 = 1'
        }

        // 名称查询
        let fname = req.query.input;
        // console.log(fname);
        let fnamep = '';
        let dislink = '*';
        if (fname != '' && fname != undefined) {
            fnamep = ' AND f_name LIKE "%'+fname+'%"'
            fname = ' AND f_name LIKE "%'+fname+'%" GROUP BY f_name';
            dislink = 'DISTINCT f_name';
        }else if (fname == undefined) {
            fname = fnamep
        }

        // console.log(fname);
        // 查询条件
        let whatif = req.query.searchName;
        // console.log(whatif);

        // 查询的id
        let search = req.query.searchid;
        if (whatif == '' || whatif == undefined) {
            whatif = 1
        }else if (whatif == 't_id') {
            whatif = 'bv.t_id'
        }else if (whatif == 'c_id'){
            whatif = 'bt.c_id'
        }
        // console.log(search);
        if (search == '' || search == undefined) {
           search = 1 
        }
        // console.log(whatif);
        
        // 销量时间查询
        let startime = req.query.startime
        let endtime = req.query.endtime
        // console.log(startime+'and'+endtime);

        // 总页数
        let count;
        // 当前页数
        let page = req.query.page;
        let pageSz = req.query.pageSize
        if (pageSz == undefined) {
            page = 1
            pageSz = 6
        }
        // 每页条数
        let pageSize = Number(pageSz);
        // 设置查询条数
        let pages = (page-1)*pageSize
        // console.log(ids);
        // params.push(search)

        // param.push(search);
        param.push(pages);
        param.push(pageSize);
        console.log(param);
        // 查询总页数
        function pagecount(err,data) {
            if (err == null){
                //console.log(data) //[{pagecount: 10}]
                //count = Math.ceil(data[0].pagecount/pageSize);//小数向上取整
                count = data[0].pagecount
                //res.send(String(count))  //发送的是字符类型的值。
                //res.json({})
                //console.log(String(count));
                // console.log(count);
                model.hotgoods(ifsale,whatif,search,iftp,ifnew,fname,startime,endtime,param,cb)
            }
        }
        model.pageCount(ifsale,whatif,search,iftp,fnamep,dislink,startime,endtime,pagecount);

        function cb(err,data) {
            //console.log(data);
            var items = data
            //console.log(items);
            let mydata = {
                count: count,
                items: items
            }
            // console.log(mydata);
            res.send(mydata)
        }
    },
    // 树形和下拉菜单字段遍历
    ftype: function (req,res) {
        let ifsale = req.query.ifsale
        function cb(err,data) {
            let items = data;
            // console.log(items);
            // console.log(items.length);
            res.send(items)
        }
        model.ftype(cb);
    },
    // 删除商品
    delGoods: function (req,res) {
        let flowerId = req.query.flowerID;
        // console.log(flowerId);

        function cb(err,data) {
            if (err) {
                res.send(err)
            }else{
                res.send('1')
            }
        }
        model.delGoods(flowerId,cb)
    },
    // 编辑商品获取信息
    flowermsg: function (req,res) {
        let flowerId = req.query.flowid
        let param = []
        param.push(flowerId)
        function cb(err,data) {
            res.send(data)
        }
        model.flowermsg(param,cb)
    },
    // 更新商品
    upload: function (req,res) {
        var flowerUrl,flowerurl,flowerId,flowermr,flowerName,
            flowerP,flowerPk,flowerWord,flowerZmr,flowerZs,
            flowerFmr,flowerFs,pwhatif,pwhatid,flowercont;
        var whatIf = '';
        var whatId = '';
        var param = []
        var allFile = []
        var form = new formidable.IncomingForm({
            // encoding : 'utf-8',//上传编码
            // uploadDir : "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
            keepExtensions : true,//保留后缀
            // maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
        })
        function cb(err,data) {
            res.send('1')
        }
        // 设置文件上传存放的地址 可改变路径
        form.uploadDir = "./public/images/img";
        // 上传多个文件,push到数组文件中
        form.on('file', function (filed, file) {
            allFile.push([filed, file]);//收集传过来的所有文件
        })
        // 解析图片
        form.parse(req, function(err, fields, files) {
            // console.log("files:",files)  //这里能获取到图片的信息
            // console.log("fields:",fields.f_name)
            // console.log("fields:",fields.f_id) //这里能获取到传的参数的信息，如上面的message参数，可以通过fields。message来得到

            // 重命名文件
            allFile.forEach(function(file,index){
                // console.log(file);
                // console.log(file.length);
                var fieldName=file[0];
                var types = file[1].name.split('.');
                var date = new Date();
                var ms = Date.parse(date);
                flowerurl = Date.now()+"."+String(types[types.length-1])
                //重命名文件或者改变路径 默认路径 form.uploadDir 默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
                // 源文件名
                // fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));});
                // 日期名
                fs.renameSync(file[1].path,form.uploadDir+"/"+Date.now()+"."+String(types[types.length-1]));
            });

            // console.log(flowerurl);
            flowermr = fields.f_mr
            flowerName = fields.f_name
            flowerP = fields.f_p
            flowerPk = fields.f_pk
            flowerWord = fields.f_word
            flowerZmr = fields.f_zmr
            flowerZs = fields.f_zs
            flowerFmr = fields.f_fmr
            flowerFs = fields.f_fs
            flowercont = fields.contents

            var idd = fields.f_id
            if (idd == 'no') {
                // 新增
                pwhatif = fields.pwhatif
                pwhatid = fields.pwhatid
                // console.log(fields);
                var bigbug = fields.whatif;
                console.log(bigbug);
                flowerUrl = flowerurl

                // push到updata数组中
                param.push(flowerUrl,flowermr,flowerName,flowerP,flowerPk,flowerWord,flowerZmr,flowerZs,flowerFmr,flowerFs,flowerId,flowerId)
                console.log('whatif等于'+fields.whatIf);
                // 判断是否是子项
                if (bigbug != 'undefined') {
                    whatIf = bigbug+",";
                    whatId = fields.whatid+",";
                    // 执行model
                    model.upload(whatId,whatIf,pwhatid,pwhatif,flowercont,param,cb)
                }else{
                    // 执行model
                    model.upload(whatId,whatIf,pwhatid,pwhatif,flowercont,param,cb)
                }
                
            }
            else{
                // 编辑
                // flowerUrl = fields.f_url
                // console.log(files);
                // console.log(allFile);
                // 如果没有改变图片
                if (allFile.length == 0) {
                    flowerUrl = fields.f_url
                }else{
                    flowerUrl = flowerurl
                    // 删除原来的文件
                    fs.unlink('./public/images/img/'+fields.f_url,function (err) {
                        if(err) throw err;
                        console.log('成功')
                    })
                }
                
                flowerId = fields.f_id

                // push到updata数组中
                param.push(flowerUrl,flowermr,flowerName,flowerP,flowerPk,flowerWord,flowerZmr,flowerZs,flowerFmr,flowerFs,flowerId,flowerId)
                // 执行model
                model.upload(whatId,whatIf,pwhatid,pwhatif,flowercont,param,cb)
            }
        }) 
    },
    // 库存内容
    goodswarn: function (req,res) {
        // 查询条件
        let whatif = req.query.searchName;
        // 查询的id
        let search = req.query.searchid;
        if (whatif == '') {
            whatif = 1
        }
        let param = []
        // 总页数
        let count;
        // 当前页数
        let page = req.query.page;
        // 每页条数
        let pageSize = Number(req.query.pageSize);
        // 设置查询条数
        let pages = (page-1)*pageSize

        param.push(pages);
        param.push(pageSize);

        // 查询总页数
        function gc(err,data) {
            if (err == null){
                count = data[0].pagecount
                model.goodswarn(whatif,search,param,cb)
            }
        }
        function cb(err,data) {
            //console.log(data);
            var items = data
            console.log(items);
            let mydata = {
                count: count,
                items: items
            }
             //console.log(mydata);
            res.send(mydata)
        }
        model.goodcount(whatif,search,gc)
    },
    // 种类查询
    warntype: function (req,res) {
        function cb(err,data) {
            res.send(data)
        }
        model.warntype(cb)
    },
    // 更改库存
    updataNum: function (req,res) {
        let id = req.query.id
        let tnum = req.query.tnum
        let tw = req.query.tw
        let param = []
        param.push(tnum,tw,id)
        function cb(err,data) {
            if (err == null) {
                res.send(data)
            }else{
                res.send(err)
            }
        }
        model.updataNum(param,cb)
    },
    // 柱状图
    echart: function (req,res) {
        function cb(err,data) {
            if (err == null) {
                res.send(data)
            }else{
                res.send(err)
            }
        }
        model.echart(cb)
    },
    // 柱状图按时间查询
    echsale: function (req,res) {
        let startime = req.query.startime
        let endtime = req.query.endtime
        function cb(err,data) {
            if (err == null) {
                res.send(data)
            }else{
                res.send(err)
            }
        }
        model.echsale(startime,endtime,cb)
    }
};
module.exports = project;