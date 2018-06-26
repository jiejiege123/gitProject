//评价
$("#content").on("click",".evaluateC",function(e) {
    var myid = $(e.target).attr("data-n");
    //console.log(myid)
    var formDom = $('<form></form>');
    formDom.attr({
        action: '/orderEvaluate.do',
        method: 'post'
    });
    formDom.append('<input type="text" name="id" value="' + myid + '"/>');
    formDom.appendTo($("body", window.parent.document)).submit().remove();
});