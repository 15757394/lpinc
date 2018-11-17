var EC = {

	ePage : $('#ePage'),

    debug: window.location.hash.replace('#','') === 'debug',

	init : function(){
        if(this.debug)EC.start = Date.now();
	},
	timeouts : null,
	urlParam : function(name) {//获取url参数
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	},
	events : function(){//统一事件
		var _self = this;
		this.ePage.on('click','header a',function(){//打开菜单
			var a = $(this),
				menu = _self.ePage.find('#eMenu');

				if(0 === a.index()){
					$(this).toggleClass('on');
					_self.ePage.toggleClass('omneu');
					menu.show().find('div').removeClass('def').addClass('on');

					if(!$(this).hasClass('on')){
						menu.show().find('div').removeClass('on').addClass('def');
						clearTimeout(_self.timeouts);
					 	_self.timeouts = setTimeout(function(){
					 		menu.hide();
					 	},300)
					}
				}

		}).on('touchmove','.menu',function(e){
			e.preventDefault();
		});
	},
	robot : function(){
		var delval = function(id){
			var clear = id.parent().find('.clear_val');
			if(id.val())clear.addClass('block');
			else clear.removeClass('block');
        };

		return {

			clearEvent : function(el,c_dir,i_dir){//删除表单值

				el.on('click',c_dir,function(){
					$(this).parents('.p').find('input').val('');
					$(this).parents('.p').parent().find('.clear_val').removeClass('block');
				}).on('keyup',i_dir,function(){
					delval($(this));
				})/*.on('blur',i_dir,function(){
					$(this).parent().find('.clear_val').removeClass('block');
				})*/.on('focus',i_dir,function(){
					delval($(this));
				});
			}
		}

	},
	setMenu: function(){//加载菜单

		//头部菜单条
		/* this.bar = $('<img src="//www.staticec.com/m/img/new/new-logo.png" class="new-logo" alt=""/>\
					<a class="bbtn" href="//account.workec.com/m/register">立即注册</a>'); */

		this.bar = $('<img src="//www.staticec.com/m/img/new/new-logo.png" class="new-logo" alt=""/>\
					<a href="mprices.html">价格</a>');

		if(window.location.pathname.indexOf('prices.html') !== -1) {
			this.bar = $('<img src="//www.staticec.com/m/img/new/new-logo.png" class="new-logo" alt=""/>\
					<a href="mindex.html">返回</a>');
		}

		this.bar.appendTo(EC.ePage.find('#header'));

		var iPage = $('#iPage'),
			path = '';
		if(iPage.length)path = iPage.val();

		this.el = $('<div id="eMenu" class="menu">\
						<div>\
							<a href="'+path+'index.html">首页</a>\
							<a href="'+path+'products.html">产品</a>\
							<a href="'+path+'projects.html">案例</a>\
							<a href="'+path+'prices.html">价格</a>\
							<a href="//www.workec.com/html/form/NVlYMSUyQjJZaTlORSUzRA==.html?channel=12991">合作</a>\
							<a href="'+path+'about.html">关于</a>\
						</div>\
					</div>');

		this.el.appendTo(EC.ePage);
		this.events();

	},
	setFooter: function(){//加载footer

		this.el = $('<footer id="eFooter"><a class="register" href="https://account.workec.com/m/register">立即注册</a><i></i><a href="tel:13310201162">13310201162</a></footer>');

		this.el.appendTo(EC.ePage);

		$('#download').click(function() {
	    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			    window.location.href ="https://itunes.apple.com/cn/app/ec-lite/id684155938?mt=8";
			} else if (/(Android)/i.test(navigator.userAgent)) {
			    window.location.href ="http://t.cn/R72Z3pf";
			}
		});

	},
	log: function (msg) {
        if (!this.debug) return;
        var time = Date.now() - EC.start;
        if (time < 1000) {
            time = ' [' + time + 'ms]';
        } else {
            time = ' [' + (time / 1000).toFixed(2) + 's]';
        }
        msg = msg + time;
        console.log(msg);
    }
};

EC.init();
