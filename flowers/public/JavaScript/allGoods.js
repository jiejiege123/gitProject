var pageCount=0; //总页数
var page=1; //默认第一页
var windowName=''; //网页名字
let path=location.pathname;
window.onload=function(){
    searchCount();//总页数
    searchPageContent();//分页
};
if(path=="/page/allGoods.html"){
    windowName="allGoods"
}else if(path=="/page/waitPay.html"){
    windowName="waitPay"
}else if(path=="/page/haveGoods.html"){
    windowName="haveGoods"
}else{
    windowName="allGoods"
}
//console.log(windowName);
function searchCount(){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject();
    }
    xhr.open("post","/pageCount.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange= function () {
        if(xhr.status==200 && xhr.readyState==4){
            pageCount=Number(xhr.responseText);
        }
    };
    xhr.send("windowName="+windowName);
}
function searchPageContent(){
    //console.log(windowName)
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post","/pageContent.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        //console.log("回调的输出");
        if(xhr.status==200 && xhr.readyState==4){
            let data=JSON.parse(xhr.responseText);
            //console.log(data);
            let oTbody = document.getElementById("content");
            if(xhr.responseText=="0"){
                oTbody.innerHTML = "<td class='text-center' colspan='6'>" +
                    "<img src='../images/timg.jpg' alt='' class='noImg'>" +
                    "没有符合条件的宝贝，请尝试其他搜索条件。</td>";
            }else{
                oTbody.innerHTML="";
                let str="";
                for(let i=0;i<data.length;i++) {
                    str += '<tr class="bgTr">' +
                        '<td>' +
                        '<input type="checkbox">' + '<span class="orderDate">'+data[i].f_otime+'</span>' +
                        '</td>' +
                        '<td>' +
                        '<span>订单号：</span>' + '<span class="orderId">'+data[i].f_oid+'</span>' +
                        '</td>' +
                        '<td colspan="5" class="text-right">' +
                        '<i class="glyphicon glyphicon-trash delTd"></i>' +
                        ' </td>' +
                        '</tr>' +
                        '<tr class="text-center listTr">' +
                        '<td>' +
                        '<div class="goodsDiv">' +
                        '<img src="../images/img/'+data[i].f_url+'" alt="">' +
                        '</div>' +
                        '</td>' +
                        '<td>' +
                        '<div class="row">' +
                        '<div class="flowerName col-lg-4 col-md-4 col-sm-4">'+data[i].f_name+'</div>' +
                        '<div class="flowerMenu col-lg-8 col-md-8 col-sm-8 text-left"> '+data[i].f_word+'</div>' +
                        '</div>' +
                        '</td>' +
                        '<td>'+data[i].n_num+'</td>' +
                        '<td> ￥'+Number(data[i].f_p)+'.00 </td>' +
                        '<td> ￥'+Number(data[i].f_price)+'.00</td>';
                    if(data[i].p_id==1){
                        str+='<td>'+
                                '<p>'+data[i].p_state+'</p>'+
                                '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                            '</td>'+
                            '<td>' +
                            '<button class="pageBtn orderPay" data-n="'+data[i].f_oid+'">立即付款</button>' +
                            '<p id="closeOrder" data-toggle="modal" data-target="#myModal" data-n="'+data[i].f_oid+'">取消订单</p>' +
                            '</td>' +
                            '</tr>'
                    }else if(data[i].p_id==2){
                        str+='<td>' +
                            '<p>'+data[i].p_state+'</p>'+
                            '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                            '</td>'+
                            '<td>' +
                            '<button class="pageBtn checkGoods" data-n="'+data[i].f_oid+'">确认收货</button>' +
                            '</td>' +
                            '</tr>'
                    }else if(data[i].p_id==3){
                        str+='<td>' +
                            '<p>交易成功</p>' +
                            '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                            '</td>' +
                            '<td>' +
                            '<p class="evaluateC" data-n="'+data[i].f_oid+'">评价</p>' +
                            '</td>' +
                            '</tr>'
                    }else if(data[i].p_id==4){
                        str+='<td>'+
                            '<p>'+data[i].p_state+'</p>'+
                            '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                            '</td>'+
                            '<td>' +
                            '<button class="pageBtn orderPay" data-n="'+data[i].f_oid+'">提醒发货</button>' +
                            '<p id="closeOrder" data-toggle="modal" data-target="#myModal" data-n="'+data[i].f_oid+'">退款</p>' +
                            '</td>' +
                            '</tr>'
                    }
                }
                oTbody.innerHTML=str;
                let waitPayBtn= document.getElementById("waitPayBtn");
                waitPayBtn.innerHTML='<button class="pageBtn">批量付款</button>';
            }
        }
    };
    xhr.send(
        'page='+page+
    '&windowName='+windowName);
}
var preBtn=document.getElementById("preBtn");
var nextBtn=document.getElementById("nextBtn");
preBtn.onclick=function(){
    page--;
    if(page<1){
        page=1;
        alert("这已经是第一页了");
    }
    searchPageContent();
};
nextBtn.onclick=function(){
    page++;
    if(page>pageCount){
        page=pageCount;
        alert("这已经是最后一页了");
    }
    searchPageContent();
};
//立即付款
$("#content").on("click",".orderPay",function(e) {
    var myid = $(e.target).attr("data-n");
    var formDom=$('<form></form>');
    formDom.attr({
        action: '/promptlyPay.do',
        method:'post'
    });
    formDom.append('<input type="text" name="id" value="'+myid+'"/>');
    formDom.appendTo($("body",window.parent.document)).submit().remove();
});
//确认收货
$("#content").on("click",".checkGoods",function(e){
    var myid = $(e.target).attr("data-n");
    //console.log(myid);
    var formDom=$('<form></form>');
    formDom.attr({
        action: '/checkGoods.do',
        method:'post'
    });
    formDom.append('<input type="text" name="id" value="'+myid+'"/>');
    formDom.appendTo($("body",window.parent.document)).submit().remove();
});
$("#content").on("click",".delTd",function(e){
    var myid = $(e.target).attr("data-n");
    //console.log(myid);
    var formDom=$('<form></form>');
    formDom.attr({
        action: '/delTd.do',
        method:'post'
    });
    formDom.append('<input type="text" name="id" value="'+myid+'"/>');
    formDom.appendTo($("body",window.parent.document)).submit().remove();
});
//取消订单
$("#closeModel").on("click",function() {
    $("#myModal").modal("hide");
    var myid = $("#closeOrder").attr("data-n");
    //console.log(myid)
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", "/cancelOrder.do", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            //console.log(xhr.responseText)
            if (xhr.responseText == "0") {
            } else {
                //let data = JSON.parse(xhr.responseText);
                console.log("删除成功")
            }
        }
    };
    xhr.send('id='+myid)
});

//已到商品
$("#hG").on("click", function () {
    $("#hG").attr("class", "btnsck");
    $("#wG").attr("class", "btns");
    windowName='haveGoods';
    searchPageContent();
});
//未到商品
$("#wG").on("click", function () {
    $("#wG").attr("class", "btnsck");
    $("#hG").attr("class", "btns");
    windowName='waitGoods';
    searchPageContent();
});
