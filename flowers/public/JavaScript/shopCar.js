
//此变量用于存储后台返回的数据
let allData;
window.onload=function(){
    let countPage=getCountPage();
    loadxuanran();
    if(countPage==1){
        document.getElementsByClassName("downPage")[0].style.display="none";
    }else{
        document.getElementsByClassName("upPage")[0].style.display="block";
    }
};
//分页
var countPage;
var page=1;
//得到总页数
function getCountPage(){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Mircrosoft.XMLHTTP");
    }
    xhr.open("post","/countpage.do",true)
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.status==200&&xhr.readyState==4){
            countPage=xhr.responseText;
        }
    }
    xhr.send(null);//发起请求
}
//当购物车页面加载时，将用户名以及page=1发送给后台，获取该用户的购物车信息
function loadxuanran(){
    let xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest()
    }else if(window.ActiveXObject){
        xhr=new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.open("post","/shopCar.do",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.onreadystatechange=function(){
        if(xhr.status==200&&xhr.readyState==4){
            var mydata=JSON.parse(xhr.responseText);
            allData=mydata;
            if(mydata.length>0) {
                var myTable = document.getElementById("mytbody");
                myTable.innerHTML = "";
                var str = "";
                for (var i = 0; i < mydata.length; i++) {
                    str += "<tr class='contentTr' data_n='" + i + "' >" +
                        "                            <td id='td1'>" +
                        "                                <input type='checkbox' class='mybox tbodyCheckBox'>" +
                        "                                <img src='/images/shopCar/" + mydata[i].f_url + "' alt='' class='liimg'>" +
                        "                            </td>" +
                        "                            <td class='myth'>" +
                        "                                <p>" + mydata[i].f_name + "</p>" +
                        "                            </td>" +
                        "                            <td class='myth shopPrice'>" + mydata[i].f_p + "</td>" +
                        "                            <td class='myth'>" +
                        "                                <button class='mybtn myReduce' >-</button><span class='shopNum'>" + mydata[i].s_num + "</span><button class='mybtn myAdd'>+</button>" +
                        "                            </td>" +
                        "                            <td class='myth'>" +
                        "                                <button class='mybtn delFlower'>删除</button>" +
                        "                            </td>" +
                        "                        </tr>"
                }
                myTable.innerHTML = str;
            }
        }
    }
    xhr.send("page="+page);
}
//增加商品的运算
$("#mytbody").on("click",".myAdd",function(e){
    console.log("点击时总数据",allData);
    var count=0;
    var myPrice=0;
    var mytar=e.target.parentNode.parentNode;//获得点击的商品
    //自动将增加的商品勾选上
    var myShopListBox=mytar.children[0].children[0];
    myShopListBox.setAttribute("checked","true");
    console.log("目标",myShopListBox);
    var tarId=mytar.getAttribute("data_n");
    console.log("目标id",tarId);
    var param=[];//此数组用于存储页面所有商品数量
    var shopNum=document.getElementsByClassName("shopNum");
    for(var i=0;i<shopNum.length;i++){
        param.push(shopNum[i].innerHTML)
    }
    shopNum[tarId].innerHTML=(Number(param[tarId]))+1;
    var myresult=numtotal();
    //商品数量
    var totalNum=document.getElementById("totalNum");
    if(page==1){
        totalNum.innerHTML=String(Number(myresult[0].num));
    }else{
        console.log("第二页",Number(totalNum.innerHTML),Number(myresult[0].num))
        var num1=Number(totalNum.innerHTML)+Number(myresult[0].num);
        document.getElementById("totalNum").innerHTML=String(num1);
    }

    //点击时金额计算
    var totalPrice=document.getElementById("theTotalMoeny");
    var price1=Number(totalPrice.innerHTML)+Number(myresult[1].price);
    if(page==1){
        totalPrice.innerHTML=String(Number(myresult[1].price));
    }else{
        document.getElementById("theTotalMoeny").innerHTML=String(price1);
    }
})
//减少商品的运算
$("#mytbody").on("click",".myReduce",function(e){
    var count=0;
    var myPrice=0;
    var mytar=e.target.parentNode.parentNode;//获得点击的商品
    var myShopListBox=mytar.children[0].children[0];
    myShopListBox.setAttribute("checked","true");
    var tarId=mytar.getAttribute("data_n");
    var param=[];
    var shopNum=document.getElementsByClassName("shopNum");
    for(var i=0;i<shopNum.length;i++){
        param.push(shopNum[i].innerHTML)
    }
    if(param[tarId]!="0"){
        shopNum[tarId].innerHTML=(Number(param[tarId]))-1;
    }
    if(param[tarId]=="1"){
        shopNum[tarId].innerHTML="1";
    }
    var myresult=numtotal();
    var totalNum=document.getElementById("totalNum");
    var num1=Number(totalNum.innerHTML)+Number(myresult[0].num);
    if(page==1){
        totalNum.innerHTML=String(Number(myresult[0].num));
    }else{
        document.getElementById("totalNum").innerHTML=String(num1);
    }
    //点击时金额计算
    var totalPrice=document.getElementById("theTotalMoeny");
    var price2=Number(totalPrice.innerHTML)+Number(myresult[1].price);
    if(page==1){
        totalPrice.innerHTML=String(Number(myresult[1].price));
    }else{
        document.getElementById("theTotalMoeny").innerHTML=String(price2);
    }
})
//勾选商品事件
$("#mytbody").on("click",".tbodyCheckBox",function(){
    let myresult=numtotal();
    let totalNum=document.getElementById("totalNum");
    let num1=Number(totalNum.innerHTML)+Number(myresult[0].num);
    if(page==1){
        totalNum.innerHTML=String(Number(myresult[0].num));
    }else{
        document.getElementById("totalNum").innerHTML=String(num1);
    }
    let totalPrice=document.getElementById("theTotalMoeny");
    let price2=Number(totalPrice.innerHTML)+Number(myresult[1].price);
    if(page==1){
        totalPrice.innerHTML=String(Number(myresult[1].price));
    }else{
        document.getElementById("theTotalMoeny").innerHTML=String(price2);
    }
})
//封装一个函数，用于计算勾选的商品件数，返回总件数和总金额
function numtotal(){
    var myCheckBox=document.getElementById("mytbody").getElementsByTagName("input");
    var num=0;
    var price=0;
    for (var i = 0; i < myCheckBox.length; i++) {
        if (myCheckBox[i].checked== true) {
            //如果选中了该商品就获取该商品的数量以及金额
            var father = myCheckBox[i].parentNode.parentNode;
            num += Number(father.getElementsByClassName("shopNum")[0].innerHTML);
            price += Number(father.getElementsByClassName("shopPrice")[0].innerHTML) * Number(father.getElementsByClassName("shopNum")[0].innerHTML);
        }
    }
    return ([{"num": num}, {"price": price}]);
}
//删除商品
$("#mytbody").on("click",".delFlower",function(e) {
    $("#myModal").modal("show");
    var count = 0;
    var myPrice = 0;
    var mytar = e.target.parentNode.parentNode;//获得点击的商品
    var tarId = mytar.getAttribute("data_n");
    var flowerId=allData[tarId].f_id;
    var myDelSure=document.getElementById("modalSure");
    myDelSure.addEventListener("click",function(){
        //将购物车id发送至后台进行删除操作
        $.ajax({
            url:"/delShop.do",
            type:"post",
            async:true,
            data:{
                shopId:flowerId,
            },
            // dataType:text,
            success:function(data){
                if(data.length>0){
                    theData=data;
                    if(theData==1){
                        $("#warnText").html("删除成功！");
                        $("#modalSure").css("display","none");
                        $("#modalClose").html("确定");
                        $("#myModal").modal("show");
                        document.getElementById("modalClose").addEventListener("click", function () {
                            location.href = "shopCar.html";
                        })
                    }
                }
            },
            error:function(err){
                console.log("错误信息",err.responseText)
            }
        })
    })
})
//上一页
document.getElementsByClassName("upPage")[0].onclick=function(){
    page--;
    if(page<1){
        page=1;
        $("#warnText").html("哎呀！这已经是第一页啊！");
        $("#modalSure").css("display","none");
        $("#modalClose").html("确定");
        $("#myModal").modal("show");
    }
    loadxuanran();
}
//下一页
document.getElementsByClassName("downPage")[0].onclick=function(){
    page++;
    if(page>countPage){
        page=countPage;
        $("#warnText").html("哎呀！这已经是最后一页了啊！");
        $("#modalSure").css("display","none");
        $("#modalClose").html("确定");
        $("#myModal").modal("show");
    }
    loadxuanran();
}
//封装一函数用于得到表格内所有为选中状态的checkbox，并返回选中商品的id
function getCheckBoxOk(){
    let mytbody=document.getElementById("mytbody");
    let checkBox=[];//此数组用于存储所有选中商品的id
    let myBox=mytbody.getElementsByClassName("mybox");
    for(let i=0;i<myBox.length;i++){
        if(myBox[i].checked==true){
            let mytar2 = myBox[i].parentNode.parentNode;//获得点击的商品
            let tarId2 = mytar2.getAttribute("data_n");
            let flowerId2=allData[tarId2].f_id;
            checkBox.push(flowerId2);
        }
    }
    return checkBox;
}
//批量删除
let moreDel=document.getElementById("alldel");
moreDel.addEventListener("click",function(){
    let myresult=getCheckBoxOk();
    if(myresult.length==0){
        $("#warnText").html("请选择商品！");
        $("#modalSure").css("display","none");
        $("#modalClose").html("确定");
        $("#myModal").modal("show");
    }
    else {
        $("#myModal").modal("show");
        let delFlowersId = getCheckBoxOk();
        // console.log("选中花的ID为", delFlowersId);
        var myDelSure = document.getElementById("modalSure");
        myDelSure.addEventListener("click", function () {
            $.ajax({
                url: "/moreDel.do",
                type: "post",
                async: true,
                // dataType:text,
                data: {
                    shopId: delFlowersId,
                },
                success: function (data) {
                    if (data.length > 0) {
                        console.log("前端执行了！")
                        $("#warnText").html("删除成功！");
                        $("#modalSure").css("display", "none");
                        $("#modalClose").html("确定");
                        $("#myModal").modal("show");
                        document.getElementById("modalClose").addEventListener("click", function () {
                            location.href = "shopCar.html";
                        })
                    }
                },
                error: function (err) {
                    console.log("全部删除错误信息", err)
                }
            })
        })
    }
});
//全选按钮事件
//封装一个函数用于全选和全不选,并且根据选择结果来统计商品数量和商品金额
let flage=false;
function myAllCheck(){
    let mytbody=document.getElementById("mytbody");
    let myBox=mytbody.getElementsByClassName("mybox");
    if(flage==false){
        document.getElementById("thAllCheck").innerHTML="全不选";
        document.getElementById("allcheck").innerHTML="全不选";
        for(let i=0;i<myBox.length;i++){
            myBox[i].checked=true;
        }
        flage=true;
    }else if(flage==true){
        document.getElementById("thAllCheck").innerHTML="全选";
        document.getElementById("allcheck").innerHTML="全选";
        for(let i=0;i<myBox.length;i++){
            myBox[i].checked=false;
        }
        flage=false;
    }
    let myresult=numtotal();
    var totalNum=document.getElementById("totalNum");
    var num1=Number(totalNum.innerHTML)+Number(myresult[0].num);
    if(page==1){
        totalNum.innerHTML=String(Number(myresult[0].num));
    }else{
        document.getElementById("totalNum").innerHTML=String(num1);
    }
    var totalPrice=document.getElementById("theTotalMoeny");
    var price2=Number(totalPrice.innerHTML)+Number(myresult[1].price);
    if(page==1){
        totalPrice.innerHTML=String(Number(myresult[1].price));
    }else{
        document.getElementById("theTotalMoeny").innerHTML=String(price2);
    }
}
let headAllCheck=document.getElementById("headAllCheck");
headAllCheck.addEventListener("click",function(){
    myAllCheck();
})
let footAllCheck=document.getElementById("footAllCheck");
footAllCheck.addEventListener("click",function(){
    myAllCheck();
})
let allCheck=document.getElementById("allcheck");
allCheck.addEventListener("click",function(){
    myAllCheck();
})
//去结算
let goPay=document.getElementById("payBtn");
goPay.addEventListener("click",function(){
    //得到这个页面所有选中商品的商品id
    let flowerid=getCheckBoxOk();
    let mytbody=document.getElementById("mytbody");
    let myCheckBox=mytbody.getElementsByClassName("mybox");
    let thePrice=[];
    let theNum=[];
    for(let j=0;j<myCheckBox.length;j++){
        if(myCheckBox[j].checked==true){
            let priceNode=myCheckBox[j].parentNode.parentNode;
            let shopPrice=priceNode.getElementsByClassName("shopPrice")[0].innerHTML;
            let shopNum=priceNode.getElementsByClassName("shopNum")[0].innerHTML;
            thePrice.push(shopPrice);
            theNum.push(shopNum);
        }
    }
    console.log("待付款",flowerid,thePrice,theNum);
    $.ajax({
        url:"/shopGarPay.do",
        type:"post",
        async:true,
        data:{
            flowerId:flowerid,
            flowerPrice:thePrice,
            flowerNum:theNum
        },
        success:function(data){
            console.log("最后返回的",data)
            if(data.length>0){
                top.location.href="/flowerbuy/2";
            }
        },
        error:function(err){
            console.log("结算错误信息提醒",err)
        }
    })
})
