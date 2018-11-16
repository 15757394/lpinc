/*
 * @Author By:TYM 
 * @Create Date:2015-07-05
 * 留言板JS
 */
 var msgObj = {
      'emptyName' : '请填写正确的姓名',
      'maxName' : '姓名的字数不超过10个',
      'allowName' : '姓名只能由汉字字母数字下划线组成',
      'emptyCname' : '请填写正确的公司名称',
      'maxCname' : '字数不能超过30个',
      'emptyTel' : '请填写正确的电话号码',
      'errorTel' : '电话号码不正确',
      'emptyRequire' : '请填写正确的需求信息',
      'maxRequire' : '字数不能超过70个',
      'emptyCode' : '请填写正确的图形验证码',
      'maxCode' : '图形验证码长度最多4位',
      'nameMaxLen': 10, //姓名最大字数
      'cnameMaxLen': 30, //企业名称最大字数
      //'telMaxLen': 11, //手机最大长度
      'requireMaxLen': 70,  //需求信息最大字数
      'verifyMaxLen': 4  //图形验证码长度
 };
$(function() {
    //姓名
    $("#box-name").bind('focus',function() {
       $('#nameerr').html('');
    });

    $("#box-name").bind('blur',function() {
        var msgNamer = $(this).val();
            msgNamer = jQuery.trim(msgNamer);
        var nameFlag = checkName(msgNamer);
        if( nameFlag !== true ){
            $('#nameerr').html(msgObj[nameFlag]);
        } 
    });

    //公司名称
    $("#box-company").bind('focus',function() {
       $('#comerr').html('');
    });

    $("#box-company").bind('blur',function() {
        var cname = $(this).val();
            cname = jQuery.trim(cname);
        var cnameFlag = checkCorpName(cname);
        if( cnameFlag !== true ){
            $('#comerr').html(msgObj[cnameFlag]);
        } 
    });

    //电话
    $("#box-tel").bind('focus',function() {
       $('#telerr').html('');
    });

    $("#box-tel").bind('blur',function() {
        var tel = $(this).val();
            tel = jQuery.trim(tel);
        var telFlag = isMobile(tel);
        if( telFlag !== true ){
            $('#telerr').html(msgObj[telFlag]);
        } 
    });

    //需求信息
    $("#box-content").bind('focus',function() {
       $('#conerr').html('');
    });

    $("#box-content").bind('blur',function() {
        var requireInfo = $(this).val();
            requireInfo = jQuery.trim(requireInfo);
        var requireFlag = checkRequire(requireInfo);
        if( requireFlag !== true ){
            $('#conerr').html(msgObj[requireFlag]);
        } 
    });


    //图形验证码
    $("#box-verification").bind('focus',function() {
       $('#vfierr').html('');
    });

    $("#box-verification").bind('blur',function() {
        var imgCode = $(this).val();
            imgCode = jQuery.trim(imgCode);
        var codeFlag = checkImgValidate(imgCode);
        if( codeFlag !== true ){
            $('#vfierr').html(msgObj[codeFlag]);
        } 
    });


    $("#message-button").click(function(){
            //提示语回滚
            $(".box-error").html('');
            var boxname = $("#box-name").val(),
                boxsex  = $("input[name='sex']:checked").val(),
                boxcompany = $("#box-company").val(),
                boxtel = $("#box-tel").val(),
                boxcon = $("#box-content").val(),
                boxcode = $("#box-verification").val();
                boxname = jQuery.trim(boxname);
                boxcompany = jQuery.trim(boxcompany);
                boxtel = jQuery.trim(boxtel);
                boxcon = jQuery.trim(boxcon);
                boxcode = jQuery.trim(boxcode);

            var boxnameflag = checkName(boxname);
            if ( boxnameflag !== true ) {
                $("#box-name").focus();
                $('#nameerr').html(msgObj[boxnameflag]);
                return false;
            }

            var boxcompanyflag = checkCorpName(boxcompany);
            if ( boxcompanyflag !== true ) {
                $("#box-company").focus();
                $('#comerr').html(msgObj[boxcompanyflag]);
                return false;
            }


            var boxtelflag = isMobile(boxtel);
            if ( boxtelflag !== true ) {
                $("#box-tel").focus();
                $('#telerr').html(msgObj[boxtelflag]);
                return false;
            }


            var boxconflag = checkRequire(boxcon);
            if ( boxconflag !== true ) {
                $("#box-content").focus();
                $('#conerr').html(msgObj[boxconflag]);
                return false;
            }

            var boxcodeflag = checkImgValidate(boxcode);
            if ( boxcodeflag !== true ) {
                $("#box-verification").focus();
                $('#vfierr').html(msgObj[boxcodeflag]);
                return false;
            }

            jQuery.ajax({
                url: '/messageboard/dosave',
                type: 'POST',
                dataType: 'json',
                data: {'mname': boxname,'msex':boxsex,'mcname':boxcompany,'mtel':boxtel,'mcon':boxcon,'mcode':boxcode},
                beforeSend:function(){
                    $("#message-button").prop('disabled',true);
                    $("#message-button").addClass('going');
                    $("#message-button").val('提交中...');
                },
                success:function(data){
                    if( data.code ==0 ){
                        //初始化留言板表单数据
                        initForm();
                        $("#suctips").html('提交成功，感谢您对我们工作的支持！');
                         $("#suctips").animate({"opacity":1},100,function(){
                            $("#suctips").delay(2000).animate({"opacity":0});
                        })
                    }
                    else{
                        $("#suctips").html(data.msg);
                         $("#suctips").animate({"opacity":1},100,function(){
                            $("#suctips").delay(2000).animate({"opacity":0});
                        })
                    }
                    //console.dir(data);
                },
                error:function(){
                    $("#suctips").html('提交失败');
                     $("#suctips").animate({"opacity":1},100,function(){
                            $("#suctips").delay(2000).animate({"opacity":0});
                        })
                },
                complete:function(){
                    $("#message-button").prop('disabled',false);
                    $("#message-button").removeClass('going');
                    $("#message-button").val('提交需求');
                }
            });
            
    }); 
});

//初始化表单数据
function initForm(){
    //姓名
   jQuery("#box-name").val('');
   //称呼
   jQuery("input[name='sex']").first().prop('checked', 'checked');
   //公司名称
   jQuery("#box-company").val('');
   //电话
   jQuery("#box-tel").val('');
   //需求
   jQuery("#box-content").val('');
   //图形验证码
   jQuery("#box-verification").val('');
   jQuery("#suctips").val('感谢您对我们工作的支持！');
   getIdentifyCode();
}


//检查名称
function checkName(bname){
    var namerLen = bname.length,
        nameExp  = /[^\u4E00-\u9FA5a-zA-Z0-9_]/; 
    if( namerLen==0 ){
        return 'emptyName';
    }else{
        if( namerLen>msgObj.nameMaxLen ){
            return 'maxName';
        }else if( nameExp.test(bname) ){
            return 'emptyName';
        }
    }

    return true;
}


//检查公司名称
function checkCorpName(cname){
    var cnameLen = cname.length;
    if( cnameLen==0 ){
        return 'emptyCname';
    }else{
        if( cnameLen>msgObj.cnameMaxLen ){
            return 'maxCname';
        }
    }

    return true;
}

/**
 * 判断是否为电话【座机或者手机号码】
 * @param account
 */
function isMobile(tel){
    var telLen = tel.length,
        telReg0 = /^1[3|4|5|7|8][0-9]\d{8}$/,
        telReg1 = /^(?:(?:\(?0?\d{0,3}[\+\-]?\d{2,3}\)?)[\s-]?)?[0][0-9]{2,4}[\-]?[0-9]{5,8}(-[0-9]{3,5})?$/
        //telReg2 = /09\d{8}$/; //台湾手机号

    if( !(telReg0.test(tel) || telReg1.test(tel)) ){
        return 'emptyTel';
    }

    return true;
}



//检查公司名称
function checkRequire(require){
    var requireLen = require.length;
    if( requireLen == 0 ){
        return 'emptyRequire';
    }else{
        if( requireLen > msgObj.requireMaxLen ){
            return 'maxRequire';
        }
    }

    return true;
}

//图形验证
function checkImgValidate(code){
    var codeLen = code.length;
    if( codeLen == 0 ){
        return 'emptyCode';
    }else{
        if( codeLen != msgObj.verifyMaxLen ){
            return 'emptyCode';
        }
    }

    return true;
}

//获得图形验证码
function getIdentifyCode(){
    jQuery('#captchaimg').attr('src','/register/createcode?__'+(new Date().getTime()));
    return false;
}
















