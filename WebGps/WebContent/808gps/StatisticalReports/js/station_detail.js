$(document).ready(function(){
	setTimeout(loadHighTemperatureDetailPage, 50);
});

var searchOpt = new searchOption(false, true);

function loadHighTemperatureDetailPage() {
	//等待父窗口加载完成后，再加载资源信息
	if (typeof parent.lang == "undefined") {
		setTimeout(loadHighTemperatureDetailPage, 50);
	} else {
		buttonQueryOrExport();
		$('#selectName').flexPanel({
			InputModel : {display: parent.lang.selectVehicleTip,value:'',name : 'vehiIdnos', pid : 'vehiIdnos', pclass : 'buttom',bgicon : '',hidden:true, hide : false} 
		});
		
		$('#selecttime').flexPanel({
			ComBoboxModel :{
				input : {name : 'selecttime',pclass : 'buttom',bgicon : 'true',hidden: true,readonly: true},
				combox: 
					{name : 'selecttime', option : arrayToStr(getSelectTime(1))}
			}	
		});
		
		$('#select-selecttime li').each(function() {
			var index= $(this).attr('data-index');
			$(this).on('click',function() {
				selectTime(index, 1);
			});
			if(index == 0) {
				$(this).click();
			}
		});
		
		//加载语言
		loadHighTemperatureDetailLang();
		//加载搜索选项
		searchOpt.initSearchOption();
		$('#combox-vehiIdnos').on('click keyup',selVehicle);
		$(".btnQuery").click(queryHighTemperatureDetail);
		$(".btnExport").click(exportHighTemperatureDetail);
		$(".btnExportCSV").click(exportHighTemperatureDetailCSV);
		$(".btnExportPDF").click(exportHighTemperatureDetailPDF);
		var width = 0;
		if(parent.screenWidth >= 1680) {
			width = 'auto';
		}else {
			width = 1680;
			$('#sysuserLogDate').css('width','1720px');
		}
		$("#highTemperatureDetailTable").flexigrid({
			url: "StandardReportLineAction_detail.action",
			dataType: 'json',
			colModel : [
				{display: parent.lang.index, name : 'index', width : 40, sortable : false, align: 'center'},
				{display: parent.lang.rule_line, name : 'ln', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.direction, name : 'ld', width : 60, sortable : false, align: 'center'},
				{display: parent.lang.plate_number, name : 'vn', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.report_plate_color, name : 'pt', width : 60, sortable : false, align: 'center'},
				{display: parent.lang.driver_name, name : 'dn', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.line_station_name, name : 'sn', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.line_stop_time, name : 'it', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.line_stop_speed, name : 'is', width : 80, sortable : false, align: 'center'},
				{display: parent.lang.line_outbound_time, name : 'ot', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.line_outbound_speed, name : 'os', width : 80, sortable : false, align: 'center'},
				{display: parent.lang.when_long_stops, name : 'dt', width : 80, sortable : false, align: 'center'},
				{display: parent.lang.line_station_limit_speed, name : 'ls', width : 80, sortable : false, align: 'center'},
				{display: parent.lang.report_licheng_all, name : 'lc', width : 120, sortable : false, align: 'center'},
				{display: parent.lang.report_youLiangCurrent, name : 'yl', width : 120, sortable : false, align: 'center'}
				],
			pernumber: parent.lang.pernumber,
			pagestat: parent.lang.pagestatInfo,
			pagefrom: parent.lang.pagefrom,
			pagetext: parent.lang.page,
			pagetotal: parent.lang.pagetotal,
			findtext: parent.lang.find,
			procmsg: parent.lang.procmsg,
			nomsg : parent.lang.nomsg,
			usepager: true,
			autoload: false,
			useRp: true,
			rp: 15,
			showTableToggleBtn: true,
			width: width,
			onSubmit: false,
			height: 'auto'
		});
		loadReportTableWidth(fixHeight);
	}
}

function fixHeight() {
	$('#highTemperatureDetailTable').flexFixHeight();
}

function loadHighTemperatureDetailLang(){
	searchOpt.loadLang();
	$("#reportTitle").text(parent.lang.report_station_detail);
}

//function disableForm(disable) {
//	searchOpt.disableForm(disable);
//}

function queryHighTemperatureDetail() {
	var query = searchOpt.getQueryDataNew(false);
	if (query === null) {
		return ;
	}
	if($('#hidden-vehiIdnos').val() == null || $('#hidden-vehiIdnos').val() == '') {
		alert(parent.lang.report_selectVehiNullErr);
		return;
	}
	searchOpt.requireParam.vehiIdnos = $('#hidden-vehiIdnos').val();
	var params = [];
	params.push({
		name: 'json',
		value: encodeURIComponent(JSON.stringify(searchOpt.requireParam))
	});
	params.push({
		name: 'begintime',
		value: query.begindate
	});
	params.push({
		name: 'endtime',
		value: query.enddate
	});
	params.push({
		name: 'type',
		value: 'station'
	});
	$('#highTemperatureDetailTable').flexOptions(
			{newp: 1,sortname: '', sortorder: '', query: '', qtype: '', params: params}).flexReload();
}

function fillCellInfo(p, row, idx, index) {
	var pos = "";
	var name = p.colModel[idx].name;
	if(name == 'pt') {
		switch (parseIntDecimal(row[name])) {
		case 1:
			pos = parent.lang.blue_label;
			break;
		case 2:
			pos = parent.lang.yellow_label;
			break;
		case 3:
			pos = parent.lang.black_label;
			break;
		case 4:
			pos = parent.lang.white_label;
			break;
		case 0:
			pos = parent.lang.other;
			break;
		default:
			break;
		}
	}else if(name == 'ld'){
		if(row[name] == 0){
			pos = parent.lang.line_up;
		}else{
			pos = parent.lang.line_down;
		}
	}else if(name == 'it'){
		if(dateTime2TimeString(row[name]) == '1970-01-01 08:00:00'){
			pos = "";
		}else{
			pos = dateTime2TimeString(row[name]);
		}
	}else if( name == 'ot'){
		if(dateTime2TimeString(row[name]) == '1970-01-01 08:00:00'){
			pos = "";
		}else{
			pos = dateTime2TimeString(row[name]);
		}
	}else if(name == 'is' || name == 'os' || name == 'ls') {
		pos = gpsGetSpeed(row[name], 1);
	}else if(name == 'lc'){
		pos = gpsGetLiCheng(row[name]);
	}else if(name == 'yl'){
		pos = gpsGetYouLiang(row[name]);
	}else {
		pos = changeNull(row[name]);
	}
	return pos;
}

function exportReport(exportType) {
	var query = searchOpt.getQueryDataNew(false);
	if (query === null) {
		return ;
	}
	
	var toMap = 2;  //百度地图
	if(!parent.langIsChinese()) {
		toMap = 1; //谷歌地图
	}
	if($('#hidden-vehiIdnos').val() == null || $('#hidden-vehiIdnos').val() == '') {
		alert(parent.lang.report_selectVehiNullErr);
		return;
	}
	document.reportForm.action = "StandardReportLineAction_detailExcel.action?toMap="+toMap+"&exportType="+exportType+"&begintime="+$('#begintime').val()+"&endtime="+$('#endtime').val()+"&type=station";
	document.reportForm.submit(); 
}
//导出至excel，导出至csv，导出至pdf
function exportHighTemperatureDetail() {
	exportReport(1);
}

function exportHighTemperatureDetailCSV() {
	exportReport(2);
}

function exportHighTemperatureDetailPDF() {
	exportReport(3);
}

var selIds;
//选择车辆
function selVehicle() {
	$.dialog({id:'info', title:parent.lang.selectVehicleTitle,content: 'url:StatisticalReports/selectInfo.html?type=selVehicle&singleSelect=false&selectAll=true&isOil=false',
		width:'800px',height:'530px', min:false, max:false, lock:true});
}

function doSelectVehicle(ids,vehicleList) {
	if(ids != null && ids == '0') {
		$('#combox-vehiIdnos').val(parent.lang.all_vehicles);
		$('#hidden-vehiIdnos').val(getNewArrayByArray(parent.vehicleList,'name').toString());
	}else {
		selIds = ids;
		if(ids != null && ids.split(',').length > 0) {
			if(ids.split(',').length > 1) {
				$('#combox-vehiIdnos').val(parent.lang.isSelected + ids.split(',').length);
			}else {
				$('#combox-vehiIdnos').val(vehicleList);
			}
		}
		$('#hidden-vehiIdnos').val(vehicleList);
	}
	$.dialog({id:'info'}).close();
}

function doExit() {
	$.dialog({id:'info'}).close();
}