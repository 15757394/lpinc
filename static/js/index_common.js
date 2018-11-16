/*
 * @Author By:zero XC
 * @Create Date:2015-06-26
 * 主页与子页交互JS
 */
//滚动处理
$(function() {
    var winHeight = $(document).scrollTop();
    $(window).scroll(function() {
        var scrollY = $(document).scrollTop();
        if (scrollY > 600){
            $('.scrollTop').show();
        }
        else {
            $('.scrollTop').hide();
        }
        if (scrollY > winHeight){
            $('.scrollTop').show();
        }
        else {
            $('.scrollTop').hide();
        }
        if(scrollY > 599){
           $('.e-proList .dh').find('.actBox').eq(0).addClass('animate');
        }
        if(scrollY > 1500){
            $('.e-proList .dh').find('.actBox').eq(1).addClass('animate');
        }
        if(scrollY > 2400){
            $('.e-proList .dh').find('.actBox').eq(2).addClass('animate');
        }
    });
    $('.scrollTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 'slow');
    });

    $('.font_box .sle').hover(function(){
        var i = $(this).index();
        $(this).closest('.font_box').find('.topimg').removeClass('active');
        $('.topimg',this).addClass('active');
        $(this).closest('.font_box').find('.item').eq(i).show().siblings('.item').hide();
        $(this).closest('.wrap').find('img').eq(i).show().siblings('img').hide();
    });

    $('.bot_point').each(function(){
       var len = $(this).siblings('.ec_point').find('li').length;
       for(var i = 0;i<len;i++){
        $(this).append('<a href="javascript:;"></a>');
       }
       $(this).find('a').eq(0).addClass('active');
    });

    $('.bot_point a').hover(function(){
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.bot_point').siblings('.ec_point').find('li').eq(i).show().siblings().hide();
    });

    //视频播放
    // $('#video_list li').click(function(){
    //     debugger;
    //     console.log('djkdl')
    //     var videoSRC = $(this).attr('src');
    //     $('.video_bg,.video_box_pup').show();
    //     $('#video_play_box').attr('src',videoSRC);
    // });
    // //视频关闭
    // $('.video_close').click(function(){
    //     $('.video_bg,.video_box_pup').fadeOut('fast');
    //     $('#video_play_box').attr('src','');
    // });
});


//跳转展示对应产品功能
$(function(){
    if(location.hash == '#cm'){
        $('.e-blueNav').find('a').eq(0).trigger('click');
    };
    if(location.hash == '#cd'){
        $('.e-blueNav').find('a').eq(1).trigger('click');
    };
    if(location.hash == '#cf'){
        $('.e-blueNav').find('a').eq(2).trigger('click');
    };
    if(location.hash == '#pm'){
        $('.e-blueNav').find('a').eq(3).trigger('click');
    };
});

//案例行业类型点击跳转
$('.simBox li').click(function(){
   var $liVal = $(this).text();
   var type = $(this).attr('type');
   window.location.href='/case/successcase.html?type='+type;
});

//隔行换色
$('.contentBox li:odd').addClass('odd');

//两栏等高
$(function(){
    var rightH = $('.contentBox').height();
    if(rightH > 674){
      $('.heplList').height(rightH);
    };
});















