window.onload= function () {
    //分页
    searchCount();//总页数
    searchPageContent();//分页
};
//分页
var pageCount=0; //总页数
var page=1; //默认第一页
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
    xhr.send(null);
}
function searchPageContent(){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject();
    }
    xhr.open("post","/pageContent.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.status==200 && xhr.readyState==4){
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
                        '<input type="checkbox">' + '<span class="orderDate">' + data[i].f_time + '</span>' +
                        '</td>' +
                        '<td>' +
                        '<span>订单号：</span>' + '<span class="orderId">' + data[i].a_ids + '</span>' +
                        '</td>' +
                        '<td colspan="5" class="text-right">' +
                        '<i class="glyphicon glyphicon-trash"></i>' +
                        '</td>' +
                        '</tr>' +
                        '<tr class="text-center listTr">' +
                        '<td>' +
                        '<div class="goodsDiv">' +
                        '<img src="' + data[i].f_url + '" alt="">' +
                        '</div>' +
                        '</td>' +
                        '<td>' +
                        '<div class="row">' +
                        '<div class="flowerName col-lg-3 col-md-3 col-sm-3">' + data[i].f_name + '</div>' +
                        '<div class="flowerMenu col-lg-9 col-md-9 col-sm-9 text-left">' + data[i].f_word + '</div>' +
                        '</div>' +
                        '</td>' +
                        '<td>' + data[i].n_num + '</td>' +
                        '<td>' + data[i].n_price + '</td>' +
                        '<td>' +
                        '<p>交易成功</p>' +
                        '<p>订单详情</p>' +
                        '</td>' +
                        '<td>' +
                        '<p>评价</p>' +
                        '</td>' +
                        '</tr>';
                }
                oTbody.innerHTML = str;
            }
        }
    };
    xhr.send("page="+page);
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

