$(document).ready(function(){
	setTimeout(loadServerPage, 50);
}); 

function loadServerPage() {
	//等待父窗口加载完成后，再加载资源信息
	if (typeof parent.lang == "undefined") {
		setTimeout(loadServerPage, 50);
	} else {
		$('#toolbar-btn').flexPanel({
			ButtonsModel : [[{
				display: parent.lang.save, name : '', pclass : 'btnSave',bgcolor : 'gray', hide : false
			}]]
		});
		//加载语言
		loadLang();
		ajaxLoadLoginInfo();
		$('.btnSave').on('click',ajaxSaveLogin);
	}
}

function loadLang(){
	$("#loginServerTitle").text(parent.lang.server_login);
	$("#lableServerStatus").text(parent.lang.server_labelStatus);
	$("#lableLANAddr").text(parent.lang.server_labelLANAddr);
	$("#lableWLANDevice").text(parent.lang.server_labelWLANDevice);
	$("#lableWLANDevice2").text(parent.lang.server_labelWLANDevice2);
	$("#lablePortDevice").text(parent.lang.server_labelPortDevice);
	$("#lableWLANClient").text(parent.lang.server_labelWLANClient);
	$("#lableWLANClient2").text(parent.lang.server_labelWLANClient2);
	$("#lablePortClient").text(parent.lang.server_labelPortClient);
	$("#save").text(parent.lang.save);
}

//function disableForm(disable) {
//	diableInput("#lanAddress", disable, true);
//	diableInput("#deviceIp", disable, true);
//	diableInput("#deviceIp2", disable, true);
//	diableInput("#devicePort", disable, true);
//	diableInput("#clientIp", disable, true);
//	diableInput("#clientIp2", disable, true);
//	diableInput("#clientPort", disable, true);
//}

function ajaxLoadLoginInfo() {
	disableForm(true);
	$.myajax.showLoading(true);
		//向服务器发送ajax请求
	$.myajax.jsonGet("StandardServerAction_loginGet.action",function(json,action,success){
		if (success) {
			if (json.status) {
				$("#serverStatus").text(parent.lang.online);
			} else {
				$("#serverStatus").text(parent.lang.offline);
			}
			$("#lanAddress").val(json.lanAddress);
			$("#deviceIp").val(json.deviceIp);
			$("#deviceIp2").val(json.deviceIp2);
			$("#devicePort").val(json.devicePort);
			$("#clientIp").val(json.clientIp);
			$("#clientIp2").val(json.clientIp2);
			$("#clientPort").val(json.clientPort);
		}
		$.myajax.showLoading(false);
		$.dialog({id: 'loading'}).close();
		disableForm(false);
	}, null);
}

function checkParam() {
	var ret = true;
	if (!checkIPAddress("#lanAddress", "#lanAddressWrong", parent.lang.server_errIPAddress)) {
		ret = false;
	}

	if (!checkIPAddress("#deviceIp", "#deviceIpWrong", parent.lang.server_errIPAddress)) {
		ret = false;
	}
	
	if (!checkIPAddress("#deviceIp2", "#deviceIp2Wrong", parent.lang.server_errIPAddress)) {
		ret = false;
	}
	
	var devicePortValid = true;
	if (!checkPortValid("#devicePort", "#devicePortWrong", parent.lang.server_errPort)) {
		ret = false;
		devicePortValid = false;
	}
	
	if (!checkIPAddress("#clientIp", "#clientIpWrong", parent.lang.server_errIPAddress)) {
		ret = false;
	}
	
	if (!checkIPAddress("#clientIp2", "#clientIp2Wrong", parent.lang.server_errIPAddress)) {
		ret = false;
	}
	
	var clientPortValid = true;
	if (!checkPortValid("#clientPort", "#clientPortWrong", parent.lang.server_errPort)) {
		ret = false;
		clientPortValid = false;
	}
	
	if (clientPortValid && devicePortValid) {
		if (!checkInputNotEqual("#devicePort", "#clientPort", "#clientPortWrong", parent.lang.server_errPortEqual)) {
			ret = false;
		}
	}
	return ret;
}

function ajaxSaveLogin() {
	if (!checkParam()) {
		return ;
	}
	var data={};
	data.lanip = $.trim($("#lanAddress").val());
	data.deviceIp = $.trim($("#deviceIp").val());
	data.deviceIp2 = $.trim($("#deviceIp2").val());
	data.devicePort = $.trim($("#devicePort").val());
	data.clientIp = $.trim($("#clientIp").val());
	data.clientIp2 = $.trim($("#clientIp2").val());
	data.clientPort = $.trim($("#clientPort").val());
	disableForm(true);
	$.myajax.showLoading(true, parent.lang.saving);
	$.myajax.jsonPost('StandardServerAction_loginSave.action', data, false, function(json, success) {
		if (success) {
			$.dialog.tips(parent.lang.saveok, 1);
		}
		disableForm(false);
		$.myajax.showLoading(false);
	});
}