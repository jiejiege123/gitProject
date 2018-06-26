//订单详情
$("#content").on("click",".orderMenu",function(e) {
    var myid = $(e.target).attr("data-n");
    var formDom=$('<form></form>');
    formDom.attr({
       action: '/orderDetails.do',
        method:'post'
    });
    formDom.append('<input type="text" name="id" value="'+myid+'"/>');
    formDom.appendTo($("body",window.parent.document)).submit().remove();
    /*var myid = $(e.target).attr("data-n");
    console.log(myid);
    $.ajax({
        url: '/orderDetails.do',
        type: 'get',
        data: {
            id: 'myid'
        },
        success: function (data) {
            console.log(data);
        },
        error: function (e) {

        }
    })*/
});
