/**
 * 渠道来源统计
 */
(function(win){
    $ = win.jQuery;

    var referer = '';
    if(win.document.referrer) {
        referer = encodeURIComponent(win.document.referrer);
    }

    var param = {};
    param.referer = referer;
    var url = '/default/statistics';
    $.ajax({
        type: "POST",
        url: url,
        data: param,
        dateType: 'json',
        success: function(res){
            // console.log(res);
        }
    });

}(window));