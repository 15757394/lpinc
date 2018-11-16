window.onload = function(){
	url = "/getagent?__="+(new Date()).getTime();
	var chkAjax = $.ajax(url, {
		method: "post",
		dataType: 'json',
		success: function(json){
			 if(json.no == -1){
				$('#noagents').show();
				$('#hasagents').hide();
				$('#hasshow').hide();		
			}else{
				$('#noagents').hide();
				$('#hasagents').show();
				 $('#hasshow').show();
			}
			$('#agentinfo').html(json.cont);
			
			if(!json.cont && json.has_search == 0){
				document.getElementById('agentinfo').parentNode.style.display='none';
				document.getElementById('noagents').innerHTML = '咨询购买请致电400-0060-100，为您安排对应的运营中心做服务。';
			}

			if (!json.cont && json.has_search == 1) {
				document.getElementById('agentinfo').parentNode.style.display='none';
				document.getElementById('noagents').parentNode.parentNode.style.display='none';
			}

			if(json.has_search == 1){
				document.getElementById('agent_search').style.display='block';
			}
		}
	});
	
};
function searchAgent(){
	var aname = $('#aname').val();
	$tipObj = $('#tip');
	$tipObj.show();
	if(aname === '' || aname == '请输入公司全称') {
		$tipObj.className = 'cuow';
//		$('tip').update('请输入公司全称');
		$('#aname').focus();
		return;
	}
	$tipObj.className = '';
	url = "/getagent/getInputAgent";
	var pars = 'aname=' + encodeURI(aname);
	var chkAjax = $.ajax(url, {
		method: "post",
		data: pars,
		dataType: 'json',		
		success: function(json){
			if(json.code > 0){
				$('#noagents').show();
				$('#hasagents').hide();
				$('#hasshow').hide();
				document.getElementById('agentinfo').parentNode.style.display='none';
				document.getElementById('noagents').parentNode.parentNode.style.display='block';
				document.getElementById('hasagents').parentNode.style.display='block';
				document.getElementById('noagents').innerHTML = '您所在的区域暂时没有经销商，请联系EC营销即时通总部为您处理，立即致电：400-0060-100';
				document.getElementById('agent_search').style.display='block';
			}else{
				
				document.getElementById('agent_search').style.display='block';
				document.getElementById('agentinfo').parentNode.style.display='block';
				document.getElementById('hasagents').parentNode.style.display='none';
				document.getElementById('noagents').parentNode.parentNode.style.display='block';
				$('#agentinfo').html(json.data);
			}
			$tipObj.html();
			
		}

	});
}