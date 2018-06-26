function praise(num, obj) {
    obj.prevAll().attr('class', 'xx-star');
    obj.attr('class', 'xx-star');
    obj.nextAll().attr('class', 'xx-star2');
    $(".display-star").html(num);
}
window.onload= function () {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("post", "/evaMenu.do", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if(xhr.responseText=="0"){

            }else {
                let data = JSON.parse(xhr.responseText);
                $("#flowerImg").get(0).innerHTML='<img src="../images/img/'+data[0].f_url+'" alt="">';
                $("#flowerName").get(0).innerHTML=data[0].f_name;
                $("#flowerMuch").get(0).innerHTML="￥"+Number(data[0].f_price)+".00";
                $("#flowerId").get(0).innerHTML=data[0].f_id;
                $("#forderId").get(0).innerHTML=data[0].f_oid;
            }
        }
    };
    xhr.send(null);
};
//上传图片
$(".showImgBtn").on("click", function () {
    $(this).find('input').trigger('click');
});
$(".showImgBtn input").on("click",function(e){
    e.stopPropagation();
}).on("change",function(){
    var imgLength=$("#imgShow").children().length;
    if(imgLength<=5){
        var fd = new FormData();
        fd.append("photo", this.files[0]);
        //console.log(this.files[0])
        $.ajax({
            url: '/uploadImg.do',
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            success: function (data) {
                //console.log(data)
                if(data!='1'){
                    $("<div class='showImgDiv' data-path='"+data+"'><span class='glyphicon glyphicon-remove'></span></div>").appendTo($('#imgShow')).css("background-image","url('"+data+"')");
                }
            }
        })
    }else{
        alert("只能晒图五张哟亲")
    }

});
//删除图片
$("#imgShow ").on("click" ,'span',function(){
    $(this).parent().remove();
});
//提交评价
$(".submitDtn").on("click",function(){
    let textEva=$("textarea");
    if(textEva.val()==""){
        textEva.attr("placeholder","请输入内容");
    }else{
        let imgLength=$("#imgShow").children().length;
        let arrImg=[];
        for(var i=0;i<imgLength;i++){
            let numImg=$(".showImgDiv").get(0).dataset.path;
            arrImg.push(numImg)
        }
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open("post", "/sendImgEva.do", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                //console.log(xhr.responseText)
                if(xhr.responseText=="0"){

                }else {
                    //let data = JSON.parse(xhr.responseText);
                    location.href='memberCenter.ejs';
                }
            }
        };
        xhr.send(
            'text='+textEva.val()+
            '&imgNum='+arrImg.toString()+
            '&fName='+$("#flowerName").get(0).innerHTML+
            '&e_star='+parseInt($(".display-star").get(0).innerHTML)+
            '&f_id='+parseInt($("#flowerId").get(0).innerHTML)+
            '&a_ids='+parseInt($("#forderId").get(0).innerHTML)
        );
    }
});
