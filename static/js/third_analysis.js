var gAppendScript = function(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(s);
};
/**** 百度统计代码开始处  ****/
var _hmt = _hmt || [];
gAppendScript("//hm.baidu.com/hm.js?e12af789ce086776781930e56a586414");
/**** 百度统计代码结束处  ****/

/**** cnzz统计代码 begin ****/
gAppendScript('//s4.cnzz.com/z_stat.php?id=1260089775');
/**** cnzz统计代码 end ****/

/**** growingio begin ****/
function ec_getCookie(name) {
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"), val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]).replace(/(^")|("$)/g, "") : "") : null;
}

// 是否付费企业
var ecgrow_agenttype = parseInt(ec_getCookie('ecatype'));
//获取企业id和用户id  格式：userid.corpid
var eclgid = ec_getCookie('eclgid');
//格式不正确
var eclgid_reg = /^[0-9]{5,}\.[0-9]{5,}$/;

//判断企业id和用户id是否定义过
if (typeof ecgrow_corpid == 'undefined' || typeof ecgrow_userid == 'undefined') {
    var ecgrow_userid = 0;
    var ecgrow_corpid = 0;
}

//如果未定义过，则从cookie中获取出来的值格式正确
if (ecgrow_corpid == 0 && eclgid_reg.test(eclgid) != false) {
    var eclgid_arr = eclgid.split(".");
    ecgrow_userid = eclgid_arr[0];
    ecgrow_corpid = eclgid_arr[1];
}

//从cookie中获取企业行业一级行业分类名称，没有则默认为空
var ecgrow_vocation = decodeURI(decodeURI(ec_getCookie('ecvocation0')));

var _vds = _vds || [];
window._vds = _vds;

if (ecgrow_agenttype != 1 && ecgrow_agenttype != 0) {
    ecgrow_agenttype = 1;
}

_vds.push(['setAccountId', 'a4206e92c3a477e4']);
_vds.push(['setCS1', 'ecgrow_userid', ecgrow_userid]);
_vds.push(['setCS2', 'ecgrow_corpid', ecgrow_corpid]);
_vds.push(['setCS6', 'ecgrow_agenttype', ecgrow_agenttype]);
_vds.push(['setCS7', 'ecgrow_vocation', ecgrow_vocation]);
_vds.push(['setImp', false]); //禁止内容采集
_vds.push(['enableHT', true]);
gAppendScript('//dn-growing.qbox.me/vds.js');
/**** growingio end ****/

/** node report */
gAppendScript('//www.staticec.com/api/scripts/nreport.js');
/** node report */