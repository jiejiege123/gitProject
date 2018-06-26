/*
* @Author: ZZZ
* @Date:   2018-05-27 00:22:43
* @Last Modified by:   ZZZ
* @Last Modified time: 2018-05-27 00:44:22
*/
//登录时使用
var prevLink = document.referrer;
console.log(prevLink);
$('.quitess').on("click",function () {
    $.ajax({
        url:"/quite",
        type:"post",
        success:function (data) {
            console.log(data)
            if(data=="1"){
                //location.href="../";
                if($.trim(prevLink)==''){  
                    location.href = 'http://localhost:8888';  
                }else{  
                    if(prevLink.indexOf('www.example.com')==-1){    //来自其它站点  
                        location.href = 'www.example.com/index.html';  
                    }  
                    if(prevLink.indexOf('register.html')!=-1){      //来自注册页面  
                        location.href = 'www.example.com/index.html';  
                    }  
                    location.href = prevLink;
                } 
            }
            else{
                // $(".loginpromit").css("display","block")
                $(".loginpromit").html("!账号或密码不正确")
            }
        }
    })
});
//退出时使用
location.href = window.location.href;