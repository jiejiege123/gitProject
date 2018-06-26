/*
* @Author: ZZZ
* @Date:   2018-05-10 14:55:03
* @Last Modified by:   jiejiege123
* @Last Modified time: 2018-06-26 15:09:26
*/
/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
//产品获取控制器
const control = require('./../controller/projectControl.js');
const FlowerKZQ=require('../controller/FlowerKZQ.js');

//关于我们
const about=require('../controller/aboutControler.js');

//订单
const allGoodsControl = require('./../controller/allGoodsControler.js');
const haveGoodsControl = require('./../controller/haveGoodsControler.js');
const waitGoodsControl = require('./../controller/waitGoodsControler.js');
const waitPayControl = require('./../controller/waitPayControler.js');
//鲜花-猜你喜欢
const parMenuControl=require('./../controller/parMenuControler.js');

//分页
const pageControl = require('./../controller/pageControler.js');
//鲜花故事
const flowerStrory=require('./../controller/flowerStroyControler.js');

const controller=require("./../controller/controller");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
//购物车
const shopCarControl=require('./../controller/shopCarController');

// vue
const conty = require('./../controller/project.js');
// 订单
const orderListcontrol=require('./../controller/orderListControl.js')
const expressagecontrol=require('./../controller/expressageControl.js')
const informationcontrol=require('./../controller/informationControl.js')
const materialrejectcontrol=require('./../controller/materialrejectControl.js')
const orderinfocontrol=require('./../controller/orderinfoControl.js')
const expressageinfocontrol=require('./../controller/expressageinfoControl.js')
const modifyDeliverycontrol=require('./../controller/modifyDeliveryControl.js')
const modifyrefundcontrol=require('./../controller/modifyrefundControl.js')
const Info2control=require('./../controller/Info2Control.js')
const evaulatecontrol=require('./../controller/evaulateControl.js')

// 小程序
const wxapp = require('./../controller/wxappControl.js')
/*======= 接口 =======*/

/*=== 首页 ===*/
//首页
router.route('/')
	.get(control.indexlist);
//售后
router.route("/afterSale")
    .get(control.sale);
//支付方式
router.route("/payment")
    .get(control.payment);
//关于我们
router.route("/about")
    .get(about.about);
//登录
router.route('/login')
	.get(control.login);
//个人中心
router.route('/userHome')
	.get(control.userHome);
//退出登录
router.route('/quite')
	.post(control.quite);

//花列表
router.route('/flower/:paid/:objs')
    .get(FlowerKZQ.flowerStu);
//发送产品详情请求
router.route('/flowerPars/:Fid')
    .get(FlowerKZQ.FlowerPars);

//发送购买页面请求
router.route('/flowerbuy/:Bid')
    .get(FlowerKZQ.FlowerBuy);
//发送订单到数据库
router.route('/flowerOrder')
    .post(FlowerKZQ.flowerOrders);
//支付页面跳转
router.route('/flowerZhtml')
    .get(FlowerKZQ.flowerZhtml);
//确认支付
router.route('/flowerZf')
    .post(FlowerKZQ.flowerZf);
//添加新地址
router.route("/flowerAddress")
	.post(FlowerKZQ.FlowerAddress);
//订单
router.route('/allGoodsList.do')
	.post(allGoodsControl.allGoodsList);
router.route('/haveGoods.do')
	.post(haveGoodsControl.haveGoodsList);
router.route('/waitGoods.do')
	.post(waitGoodsControl.waitGoodsList);
router.route('/waitPay.do')
	.post(waitPayControl.waitPayList);
//取消订单
router.route('/cancelOrder.do')
		.post(allGoodsControl.cancelOrder);
//删除订单
router.route('/delTd.do')
		.post(allGoodsControl.delTd);
//立即付款
router.route('/orderDetails.do')
		.post(allGoodsControl.details);
router.route('/orderList.do')
		.post(allGoodsControl.orderList);
router.route('/promptlyPay.do')
		.post(allGoodsControl.promptlyPay);
//确认收货
router.route('/checkGoods.do')
		.post(allGoodsControl.checkGoods);
//评价
router.route('/orderEvaluate.do')
		.post(allGoodsControl.orderEva);
router.route('/evaMenu.do')
		.post(allGoodsControl.orderEvaMenu);
router.route('/uploadImg.do')
		.post(multipartMiddleware,allGoodsControl.uploadImg);
router.route('/sendImgEva.do')
		.post(allGoodsControl.sendImg);
//花的猜你喜欢
router.route('/parMenu.do')
	.get(parMenuControl.parMenuList);
//分页
router.route('/pageCount.do')
	.post(pageControl.pageCount);
router.route('/pageContent.do')
	.post(pageControl.pageContent);
// 登录注册
router.route("/get.do")
    .post(controller.getcontrol);
router.route("/code.do")
    .post(controller.codecontrol);
router.route("/checktel.do")
    .post(controller.checkcontrol);
router.route("/login.do")
    .post(controller.logincontrol);
router.route("/pwdxiugai.do")
    .post(controller.xiugaicontrol);
router.route("/userupdate.do")
    .post(controller.updatecontrol);
router.route("/uploadPhoto.do")
    .post(controller.photocontrol);
router.route("/cook.do")
    .post(controller.mycookcontrol)
//购物车
router.route("/shopCar.do")
    .post(shopCarControl.getShopList);
router.route("/delShop.do")
    .post(shopCarControl.delShop);
router.route("/countpage.do")
    .post(shopCarControl.getCountPage);
router.route("/moreDel.do")
    .post(shopCarControl.delMore);
router.route("/shopGarPay.do")
    .post(shopCarControl.shopCarSure);
router.route("/addShopCar.do")
	.post(shopCarControl.addShopCar);

//鲜花故事
router.route("/flowerStory")
	.get(flowerStrory.getflowerStory);


// vue 
/*======= 接口 =======*/
// hotgoods
router.route('/hotgoods')
	.get(conty.hotgoods);
router.route('/ftype')
	.get(conty.ftype);
router.route('/delGoods')
	.get(conty.delGoods);
router.route('/flowermsg')
	.get(conty.flowermsg);
router.route('/upload')
	.post(conty.upload);
router.route('/goodswarn')
	.get(conty.goodswarn);
router.route('/warntype')
	.get(conty.warntype);
router.route('/updataNum')
	.get(conty.updataNum);
router.route('/echart')
	.get(conty.echart);
router.route('/echsale')
	.get(conty.echsale);	
//订单
router.route('/orderList') // 订单列表
	.get(orderListcontrol.orderList);
router.route('/expressage') // 打印配送单
	.get(expressagecontrol.expressage);
router.route('/changeStatusY') // 标记为已打印
	.get(expressagecontrol.changeStatusY);
router.route('/changeStatusN') // 标记为未打印
	.get(expressagecontrol.changeStatusN);
router.route('/information') //发货信息管理
	.get(informationcontrol.information);
router.route('/materialreject') // 退款/退货订单
	.get(materialrejectcontrol.materialreject);
router.route('/orderinfo') // 查看订单详情
	.get(orderinfocontrol.orderinfo);
router.route('/expressageinfo') // 配送单详情
	.get(expressageinfocontrol.expressageinfo);
router.route('/modifyDelivery')
	.get(modifyDeliverycontrol.modifyDelivery);
router.route('/modifyrefund')
	.get(modifyrefundcontrol.modifyrefund);
router.route('/informationInfo2')
	.get(Info2control.informationInfo2);
router.route('/delorder')
	.get(orderListcontrol.delorder);
router.route('/delInformation')
	.get(informationcontrol.delInformation);
router.route('/modifyorderSubmit')
	.get(orderinfocontrol.modifyorderSubmit);
router.route('/modifySumbit')
	.get(informationcontrol.modifySumbit);
//后台评论
router.route('/getValuate.do')
	.get(evaulatecontrol.getevaulate)
router.route('/selValuate.do')
	.get(evaulatecontrol.selevaulate)
router.route('/updateValuate.do')
	.get(evaulatecontrol.updateValuate)
router.route('/moreDel.do')
	.get(evaulatecontrol.moreDel)
router.route('/oneDel.do')
	.get(evaulatecontrol.oneDel)

// 小程序
router.route('/banner')
	.get(wxapp.banner)
router.route('/navArry')
	.get(wxapp.navArry)

module.exports = router;
