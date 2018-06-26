window.onload = function () {
    getHaveGoods();
};
function getHaveGoods() {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", "/haveGoods.do", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);
            let oTbody = document.getElementById("content");
            //console.log(data)
            if(xhr.responseText=="0"){
                oTbody.innerHTML = "<td class='text-center' colspan='6'><img src='../images/timg.jpg' alt='' class='noImg'>没有符合条件的宝贝，请尝试其他搜索条件。</td>";
            }else{
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
                        '<td>￥' + Number(data[i].f_p) + '.00</td>' +
                        '<td>￥' + Number(data[i].f_price) + '.00</td>' +
                        '<td>' +
                        '<p>交易成功</p>' +
                        '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                        '</td>' +
                        '<td>' +
                        '<p class="evaluateC" data-n="'+data[i].f_oid+'">评价</p>' +
                        '</td>' +
                        '</tr>';
                }
                oTbody.innerHTML = str;
            }
        }
    };
    xhr.send(null);
}

//已到商品
$("#hG").on("click", function () {
    $("#hG").attr("class", "btnsck");
    $("#wG").attr("class", "btns");
    getHaveGoods();
});
//未到商品
$("#wG").on("click", function () {
    $("#wG").attr("class", "btnsck");
    $("#hG").attr("class", "btns");
    //未到列表
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", "/waitGoods.do", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            //console.log(xhr.responseText)
            let oTbody = document.getElementById("content");
            if (xhr.responseText == '0') {
                oTbody.innerHTML = "<td class='text-center' colspan='6'><img src='../images/timg.jpg' alt='' class='noImg'>没有符合条件的宝贝，请尝试其他搜索条件。</td>";
            } else {
                let data = JSON.parse(xhr.responseText);
                //console.log(data)
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
                        '<td>￥' + Number(data[i].f_p) + '.00</td>' +
                        '<td>￥' + Number(data[i].f_price) + '.00</td>' +
                        '<td>' +
                        '<p>交易进行中</p>' +
                        '<p class="orderMenu" data-n="'+data[i].f_oid+'">订单详情</p>' +
                        '</td>' +
                        '<td>' +
                        '<p>退款</p>' +
                        '</td>' +
                        '</tr>';
                }
                oTbody.innerHTML = str;
            }
        }
    };
    xhr.send(null);
});
