// 数果埋点js
// Yifeng Wang
// 2017/5/23
// gAppendScript('//www.staticec.com/api/scripts/sugoio_init.js');

; (function () {


    function isLowerBrowser() {
        var userAgent = navigator.userAgent;
        var isOpera = userAgent.indexOf("Opera") > -1;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);

            if (fIEVersion == 6.0 || fIEVersion == 7.0 || fIEVersion == 8.0) {
                return true;
            }
        }
    }


    try {
        if (isLowerBrowser()) {
            return;
        }
        if (typeof sugoio !== 'undefined') {
            return sugoio;
        }
        var __utility = {
            getCookieItem: function (sKey) {
                var _key = encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&");
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + _key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            }
        }
        var url = 'https://eccollect1.workec.com';
        var project_id = 'com_ryMzKwz6l_project_rJZvsXdeW';
        var project_token = '17c4b172acf2fce803350524bb653da6';
        //    var project_id = window.sogo_project_id || "com_ryMzKwz6l_project_rJZvsXdeW";
        var SUGOIO_CUSTOM_LIB_URL = "https://www.staticec.com/api/scripts/node_report/sugoio.20180117.js";

        (function (e, a) {
            if (!a.__SV) {
                var b = window; try { var c, n, k, l = b.location, g = l.hash; c = function (a, b) { return (n = a.match(new RegExp(b + "=([^&]*)"))) ? n[1] : null }; g && c(g, "state") && (k = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === k.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(k.desiredHash || "", e.title, l.pathname + l.search))) } catch (p) { } var m, h; window.sugoio = a; a._i = []; a.init = function (b, c, f) {
                    function e(b, a) {
                        var c = a.split("."); 2 == c.length && (b = b[c[0]], a = c[1]); b[a] = function () {
                            b.push([a].concat(Array.prototype.slice.call(arguments,
                                0)))
                        }
                    } var d = a; "undefined" !== typeof f ? d = a[f] = [] : f = "sugoio"; d.people = d.people || []; d.toString = function (b) { var a = "sugoio"; "sugoio" !== f && (a += "." + f); b || (a += " (stub)"); return a }; d.people.toString = function () { return d.toString(1) + ".people (stub)" }; m = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for (h = 0; h < m.length; h++)e(d, m[h]); a._i.push([b, c, f])
                }; a.__SV = 1.2; b = e.createElement("script"); b.type = "text/javascript"; b.async = !0; "undefined" !== typeof SUGOIO_CUSTOM_LIB_URL ? b.src = SUGOIO_CUSTOM_LIB_URL : b.src = "file:" === e.location.protocol && "//10.10.0.201:8000/_bc/sugo-sdk-js/libs/sugoio-latest.min.js?v=2".match(/^\/\//) ? "https://10.10.0.201:8000/_bc/sugo-sdk-js/libs/sugoio-latest.min.js?v=2" : "//10.10.0.201:8000/_bc/sugo-sdk-js/libs/sugoio-latest.min.js?v=2"; c = e.getElementsByTagName("script")[0]; c.parentNode.insertBefore(b,
                    c)
            }
        })(document, window.sugoio || []);

        sugoio.init(project_token, {
            project_id: project_id,
            api_host: url,       // sugoio-latest.min.js文件以及数据上报的地址
            app_host: url,       // 可视化配置时服务端地址
            cdn: url,            // cdn地址
            decide_host: url,    // 加载已埋点配置地址
            loaded: function (lib) {
                sugoio.time_event('停留')
                sugoio._.register_event(window, 'beforeunload', function () {
                    sugoio.track('停留', { path_name: location.pathname });
                }, false, true);
                
                var _eclgid = __utility.getCookieItem('eclgid');
                if (_eclgid && _eclgid.length > 0) {
                    var _cookie_id = _eclgid.split('.');
                    var _user_id = _cookie_id[0];
                    var _corp_id = _cookie_id[1];

                    // sugoio.register 提供全局设置为每条上报记录都设置共有属性，在 Cookie 中永久保存属性，永久有效，如果存在这个属性了则覆盖
                    sugoio.register({
                        global_user_id: _user_id,
                        global_corp_id: _corp_id
                    });

                    //登录统计
                    sugoio.track_first_time(_user_id, 'a_login', function () { });
                }

            },// **sugoio** **sdk** 加载完成回调函数
            DEBUG: false // 是否启用debug
        });







    } catch (e) {
        console.log(e + ' 数果上报出错。');
    }

})();

/*
 * Name: bad_js_report.js
 * Version: 0.0.1
 * Author:  Yifeng Wang
 * Released on: 2017/5/24
 *
 * */


; (function () {
    'use strict';

    if (typeof window.badJSReport !== 'undefined') {
        return window.badJSReport;
    }

    // url
    var URL = {
        badjs: '//eccollect.workec.com/node/report/badjs'
    }

    // 工具方法
    var __utility = {
        random: function () {
            return (+new Date()) + 'ec' + Math.floor(Math.random() * 1000);
        },
        formatURIParams: function (data) {
            var _arr = [];
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    var _str = encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]);
                    _arr.push(_str);
                }
            }
            return _arr.join('&');
        },
        imgForRequest: function (url, success, fail) {
            var global = window;

            // 避免内存回收，请求不能发送；
            var _num = 'bas_js_report' + __utility.random();
            var _img = global[_num] = new Image();

            _img.src = url;
            _img.onload = function () {
                success && success();
                global[_num] = null;
            }

            _img.onerror = function () {
                fail && fail();
                global[_num] = null;
            }

        }
    };

    function badJSReport(options) {
        if (typeof options.url === 'undefined') {
            throw new Error('请设置上报服务器url！');
            return false;
        }

        window.onerror = function (msg, url, line, col, error) {

            // 避免阻塞
            var setTimeoutID = setTimeout(function () {

                var defaultErrorData = {
                    msg: msg,
                    url: url,
                    line: line,
                    col: col,
                    error: error
                };
                //defaultErrorData.default_data = options.data || {};

                var reportData = '';

                try {
                    reportData = __utility.formatURIParams(defaultErrorData);
                }
                catch (e) {
                    console.log(e);
                }

                var _url = options.url + '?' + reportData;
                __utility.imgForRequest(_url, options.successCallback, options.failCallback);

                clearTimeout(setTimeoutID);
            }, 0);

        };
    }

    badJSReport({ url: URL.badjs });
}
)();
