window.onload=function(){
    waitPayGoods();
};
function waitPayGoods(){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post","/waitPay.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if (xhr.status == 200 && xhr.readyState == 4) {
            let oTbody = document.getElementById("content");
            if(xhr.responseText=="0"){
                oTbody.innerHTML = "<td class='text-center' colspan='6'><img src='../images/timg.jpg' alt='' class='noImg'>没有符合条件的宝贝，请尝试其他搜索条件。</td>";
            }else{
                let data = JSON.parse(xhr.responseText);
                oTbody.innerHTML = "";
                let str = "";
                for (let i = 0; i < data.length; i++) {
                    str += '<tr class="bgTr">' +
                        '<td>' +
                        '<input type="checkbox">' + '<span class="orderDate">' + data[i].f_otime + '</span>' +
                        '</td>' +
                        '<td>' +
                        '<span>订单号：</span>' + '<span class="orderId">' + data[i].f_oid + '</span>' +
                        '</td>' +
                        '<td colspan="5" class="text-right">' +
                        '<i class="glyphicon glyphicon-trash"></i>' +
                        '</td>' +
                        '</tr>' +
                        '<tr class="text-center listTr">' +
                        '<td>' +
                        '<div class="goodsDiv">' +
                        '<img src="../images/img/' + data[i].f_url + '" alt="">' +
                        '</div>' +
                        '</td>' +
                        '<td>' +
                        '<div class="row">' +
                        '<div class="flowerName col-lg-4 col-md-4 col-sm-4">' + data[i].f_name + '</div>' +
                        '<div class="flowerMenu col-lg-8 col-md-8 col-sm-8 text-left">' + data[i].f_word + '</div>' +
                        '</div>' +
                        '</td>' +
                        '<td>￥' +Number( data[i].f_p) + '.00</td>' +
                        '<td>￥' + Number(data[i].f_price) + '.00</td>' +
                        '<td>' +
                        '<p>等待买家付款</p>' +
                        '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                        '</td>' +
                        '<td>' +
                        '<button class="pageBtn orderPay">立即付款</button>' +
                        '<p>取消订单</p>' +
                        '</td>' +
                        '</tr>';
                }
                oTbody.innerHTML = str;
                let waitPayBtn= document.getElementById("waitPayBtn");
                waitPayBtn.innerHTML='<button class="pageBtn">批量付款</button>';
            }
        }
    };
    xhr.send(null);
}
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