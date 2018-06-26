window.onload= function () {
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post","/orderList.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.status==200 && xhr.readyState==4) {
            if(xhr.responseText=="0"){

            }else {
                let data = JSON.parse(xhr.responseText);
                //console.log(data)
                if(data[0].p_id==1){
                    $("#borderDiv1 div:not(:last-child)").addClass("bgDiv");
                }else if(data[0].p_id==2){
                    $("#borderDiv1 div").addClass("bgDiv");
                    $("#borderDiv2 div").addClass("bgDiv");
                    $("#borderDiv3 div").addClass("bgDiv");
                    $("#borderDiv4 div:not(:last-child)").addClass("bgDiv");
                }else if(data[0].p_id==3){
                    $("#borderDiv1 div").addClass("bgDiv");
                    $("#borderDiv2 div").addClass("bgDiv");
                    $("#borderDiv3 div").addClass("bgDiv");
                    $("#borderDiv4 div").addClass("bgDiv");
                    $("#borderDiv5 div:not(:last-child)").addClass("bgDiv");
                }
                else if(data[0].p_id==4){
                    $("#borderDiv1 div").addClass("bgDiv");
                    $("#borderDiv2 div:not(:last-child)").addClass("bgDiv");
                }
                if(data[0].a_area==null){
                    data[0].a_area="&nbsp";
                }
                if(data[0].a_areas==null){
                    data[0].a_areas="&nbsp";
                }
                if(data[0].f_note==null){
                    data[0].f_note="&nbsp";
                }
                if(data[0].oa_plea==null){
                    data[0].oa_plea="&nbsp";
                }
                $("#orderName").get(0).innerHTML=""+data[0].a_area+data[0].a_areas+"";
                if(data[0].f_note==null){
                    data[0].f_note="&nbsp";
                }
                $("#leaveWord").get(0).innerHTML=""+data[0].f_note+"";
                $("#orderId").get(0).innerHTML=""+data[0].f_oid+"";
                $("#orderStatus").get(0).innerHTML=""+data[0].p_state+"";
                let ybtn=$(".yBtn");
                if(data[0].p_id==1){
                    ybtn.get(0).innerHTML="立即付款";
                    ybtn.addClass("orderPay");
                    ybtn.attr("data-n",data[0].f_oid)
                }else if(data[0].p_id==2){
                    ybtn.get(0).innerHTML="立即收货";
                    ybtn.addClass("checkGoods");
                    ybtn.attr("data-n",data[0].f_oid)
                }else if(data[0].p_id==3){
                    ybtn.get(0).innerHTML="评价";
                    ybtn.addClass("evaluateC");
                    ybtn.attr("data-n",data[0].f_oid)
                }
                else if(data[0].p_id==4){
                    ybtn.get(0).innerHTML="提醒发货";
                    ybtn.attr("data-n",data[0].f_oid)
                }
                if(data[0].f_chat==0){
                    data[0].f_chat="&nbsp"
                }else if(data[0].f_chat==1){
                    data[0].f_chat="优惠价"
                }else{
                    data[0].f_chat="&nbsp"
                }
                let str="";
                let oTbody = document.getElementById("content");
                oTbody.innerHTML="";
                str+='<tr>' +
                    '<td><img src="../images/img/'+data[0].f_url+'"></td>' +
                    '<td class="text-left">'+
                        '<div class="row">' +
                            '<div class="flowerName col-lg-3 col-md-3 col-sm-3">'+data[0].f_name+'</div>' +
                            '<div class="flowerWord col-lg-9 col-md-9 col-sm-9 text-left"> '+data[0].f_word+'</div>' +
                        '</div>' +
                    '</td>' +
                    '<td>￥'+data[0].f_p+'.00</td>' +
                    '<td>'+data[0].n_num+'</td>' +
                    '<td>'+data[0].f_chat+'</td>' +
                    '<td>'+data[0].p_state+'</td>' +
                    '</tr>';
                oTbody.innerHTML=str;
                $("#shopAll").get(0).innerHTML="￥"+data[0].f_p*data[0].n_num+".00";
                $("#orderAll").get(0).innerHTML="￥"+Number(data[0].f_price)+".00";
                $("#payOrder").get(0).innerHTML="￥"+Number(data[0].f_price)+".00";
            }
        }
    };
    xhr.send(null);
};

//立即付款
$("#payBtn").on("click",".orderPay",function(e) {
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
$("#payBtn").on("click",".checkGoods",function(e){
    var myid = $(e.target).attr("data-n");
    console.log(myid);
    var formDom=$('<form></form>');
    formDom.attr({
        action: '/memberCenter.do',
        method:'post'
    });
    formDom.append('<input type="text" name="id" value="'+myid+'"/>');
    formDom.appendTo($("body",window.parent.document)).submit().remove();
});
//评价
//评价
$("#payBtn").on("click",".evaluateC",function(e) {
    var myid = $(e.target).attr("data-n");
    console.log(myid)
    var formDom = $('<form></form>');
    formDom.attr({
        action: '/orderEvaluate.do',
        method: 'post'
    });
    formDom.append('<input type="text" name="id" value="' + myid + '"/>');
    formDom.appendTo($("body", window.parent.document)).submit().remove();
});