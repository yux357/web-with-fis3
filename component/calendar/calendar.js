/*
var fileref = document.createElement('link');
fileref.setAttribute("rel","stylesheet");
fileref.setAttribute("type","text/css");
fileref.setAttribute("href"," http://adminv1.ceseasy.com/js/calendar/calendar.css");

document.getElementsByTagName("head")[0].appendChild(fileref);
*/

/**
* target：获取时间的元素;
* strFormat：日期格式;
* type：0--只选择日期，1--选择小时、分钟、秒，2--选择小时、分钟，3--选择小时，4--选择上、下午;
* tLimit：0--无限制，1--只能选择当天或者之前的日期，2--只能选择当天或者之后的日期
* lang：0--中文，1--英文
*/
function show_Calendar(target,strFormat,type,tLimit,lang)
{
	var target = target;
	var strFormat = strFormat || "yyyy-MM-dd hh:mm:ss";
	var type = type || 0;
	var tLimit = tLimit || 0;
	var lang = lang || 0;
	
	var todayDate = new Date() || 0;				// 当前日期
	var nowYear = todayDate.getFullYear() || 0;		// 当前年
	var nowMonth =  todayDate.getMonth() || 0;	   	// 0（一月） 到 11（十二月） 之间的一个整数
	var nowDate =  todayDate.getDate() || 0;	   	//从 Date 对象返回一个月中的某一天 (1 ~ 31)
	var nowDay =  todayDate.getDay() || 0;		   	// 0（周日） 到 6（周六） 之间的一个整数
	var nowHours =  todayDate.getHours() || 0;	   	// 返回 Date 对象的小时 (0 ~ 23)
	var nowMinutes =  todayDate.getMinutes() || 0; 	// 返回 Date 对象的分钟 (0 ~ 59)
	var nowSeconds =  todayDate.getSeconds() || 0;	// 返回 Date 对象的秒数 (0 ~ 59)
	
	var sltYear = nowYear || 0;	//初始化select选中的年
	var sltMonth = nowMonth || 0;//初始化select选中的月
	var sltDate = nowDate || 0;//初始化小时
	var sltHour = nowHours || 0;	//初始化小时
	var sltMinute = nowMinutes || 0;//初始化分钟
	var sltSecond = nowSeconds || 0;//初始化秒
	
	var tagYear = 0;
	var tagMonth = 0;
	var tagDate = 0;
	var tagHour = 0;
	var tagMinute = 0;
	var tagSecond = 0;
	var tagNoon = 0;
	
	var beginYear = (nowYear - 5) || 1970; //初始化开始显示年份
	var endYear = (nowYear + 15) || 2099; //初始化结束显示年份
	
	var sltNoon = "上午";//初始化秒
	
	var offsetTop = $(target).offset().top+$(target).outerHeight();
	var offsetLeft = $(target).offset().left;
	
	var offsetBottom = $("body").outerHeight() - offsetTop;
	
	var tVal = '';
	
	//点击判断是否需要关闭该控件
	$("body").click(
		function(event)
		{
			$(target).unbind(event);
			if($(this).hasClass("in_seledis"))
			{
			}
			else
			{
				$(".js-calender").hide();  
				$(".js-calender").toggle();
				
				$(document).one("click", function () 
				{//对document绑定一个隐藏Div方法 
					
					$(".js-calender").hide(); 
				});
				$(".js-calender").click(
					function(event)
					{
						$(".js-calender").show();
						return false;
					}
				);
				event.stopPropagation();//点击in_agree阻止事件冒泡到document
				
			 }
		}
	);
	
	/**
	* 日历类属性
	*/
	var calendarData = {
		"year"   : [[""], [""]],
		"months" : [
			["1","2","3","4","5","6","7","8","9","10","11","12"],
			["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
		],
		"weeks"  : [
			["日","一","二","三","四","五","六"],
			["SUN","MON","TUR","WED","THU","FRI","SAT"]
		],
		"clear"  : [["清空"], ["CLS"]],
		"today"  : [["今天"], ["TODAY"]],
		"close"  : [["关闭"], ["CLOSE"]]
	};
	
	/**
	* 时间拆分类型
	*/
	var timeTypeData = {
		"0" : ["-"],  //yyyy-MM-dd
		"1" : [" ","-",":"],//yyyy-MM-dd hh:mm:ss
		"2" : [" ","-",":"],//yyyy-MM-dd hh:mm
		"3" : [" ","时"],//yyyy-MM-dd hh时
		"4" : [" ","-"] //yyyy-MM-dd 上午/下午
	};
	
	/**
	* 绑定事件
	*/
	var fun_bind = function()
	{
		//关闭按钮
		$(".js-calender").on("click",".js-calClose",
			function()
			{
				fun_closeCalender();
			}
		);
		//清空按钮
		$(".js-calender").on("click",".js-cancelDate",
			function()
			{
				fun_cancelDate();
			}
		);
		//选择今天按钮
		$(".js-calender").on("click",".js-setNowTime",
			function()
			{
				fun_chooseNowDate();
			}
		);
		//确定时间选择按钮
		$(".js-calender").on("click",".js-showCheckTime",
			function()
			{
				fun_confirmDate();
			}
		);
		//年月翻看操作按钮
		$(".js-calender").on("click",".js-goOptBut",
			function()
			{
				var optFlag = $(this).attr("tfg");
				fun_goOptBut(optFlag);
			}
		);
		//改变年份下拉框
		$(".js-calender").on("change",".js-selectYear",
			function()
			{
				changeSltYear();
			}
		);
		//改变月份下拉框
		$(".js-calender").on("change",".js-selectMonth",
			function()
			{
				changeSltMonth();
			}
		);
		//点中某一天
		$(".js-calender").on("click",".js-checkDay",
			function()
			{
				fun_setDateChecked(this);
			}
		);
		
		//时分秒只能输入数字
		$(".js-calender").on("keyup",".js-selectHour,.js-selectMin,.js-selectSec",
			function()
			{
				var mval = parseInt($(this).attr("mval"));
				if('' != this.value.replace(/\d{1,}/,''))
				{
					this.value = this.value.match(/\d{1,}/) == null ? '' :this.value.match(/\d{1,}/);
				}
				else
				{
					if(parseInt(this.value,10) > mval)
					{
						this.value = '0';
					}
				}
			}
		);
		
		//时分秒
		$(".js-calender").on("focus",".js-selectHour,.js-selectMin,.js-selectSec",
			function()
			{
				clear_down();
			}
		);
		//时分秒
		$(".js-calender").on("blur",".js-selectHour,.js-selectMin,.js-selectSec",
			function()
			{
				if($(this).val() === '')
				{
					$(this).val("0");
				}
			}
		);
		
		//时分秒下拉选择
		$(".js-calender").on("click",".js-drop",
			function()
			{
				if($(this).hasClass("drop_down"))
				{
					clear_down();
					$(this).parent().addClass("has_down");
					$(this).removeClass("drop_down").addClass("drop_up");
					$(this).parent().find("ul").show();
					
					var intHour = Number($(".js-selectHour").val()) || '0';
					var intMin = Number($(".js-selectMin").val()) || '0';
					var intSec = Number($(".js-selectSec").val()) || '0';
					
					$(this).parent().find(".js-hourSlt li").removeClass("has_checked");
					$(this).parent().find(".js-hourSlt li:[name="+intHour+"]").addClass("has_checked");
					$(this).parent().find(".js-minSlt li").removeClass("has_checked");
					$(this).parent().find(".js-minSlt li:[name="+intMin+"]").addClass("has_checked");
					$(this).parent().find(".js-secSlt li").removeClass("has_checked");
					$(this).parent().find(".js-secSlt li:[name="+intSec+"]").addClass("has_checked");
				}
				else
				{
					$(this).parent().removeClass("has_down");
					$(this).removeClass("drop_up").addClass("drop_down");
					$(this).parent().find("ul").hide();
					
				}
			}
		);
		
		$(".js-calender").on("keyup",".js-selectHour,.js-selectMin,.js-selectSec",
			function()
			{
				var mval = parseInt($(this).attr("mval"));
				if('' != this.value.replace(/\d{1,}/,''))
				{
					this.value = this.value.match(/\d{1,}/) == null ? '' :this.value.match(/\d{1,}/);
				}
				else
				{
					if(parseInt(this.value,10) > mval)
					{
						this.value = '0';
					}
				}
			}
		);
		
		//时分秒选中
		$(".js-calender").on("click",".js-hourSlt li,.js-minSlt li,.js-secSlt li",
			function()
			{
				$(".js-drop").removeClass("drop_up").addClass("drop_down");
				
				var valName = $(this).attr("name");
				$(this).parents(".js-eSltBox").find("input[type='text']").val(valName);
				clear_down();
			}
		);
		
		
	}
	
	var clear_down = function()
	{
		$(".js-hourSlt").hide();
		$(".js-minSlt").hide();
		$(".js-secSlt").hide();
		$(".js-drop").removeClass("drop_up").addClass("drop_down");
		$(".js-drop").parent().removeClass("has_down");
	}
	
	//关闭日期控件
	var fun_closeCalender = function()
	{
		$(".js-calender").remove();
	}
	
	//设置日选中
	var fun_setDateChecked = function(obj)
	{
		$(".js-checkDay").removeClass("has_checked");
		$(obj).addClass("has_checked");
	}
	//清空文本框中日期
	var fun_cancelDate =  function()
	{
		$(target).val("");
		$(".js-calender").remove();
	}
	//设置时间，填充时间框内容
	var fun_setChooseDate = function(dataObj)
	{
		var yearValue = parseInt(dataObj.yearValue,10);
		var monthValue = parseInt(dataObj.monthValue,10)+1;
		var dayValue = parseInt(dataObj.dayValue,10);
		var hoursValue = parseInt(dataObj.hoursValue,10);
		var minuteValue = parseInt(dataObj.minuteValue,10);
		var secondValue = parseInt(dataObj.secondValue,10);
		
		var noonValue = $(".js-selectNoon").val();
		
		if(monthValue < 10)
		{
			monthValue = "0" + monthValue;
		}
		if(dayValue < 10)
		{
			dayValue = "0" + dayValue;
		}
		
		if(hoursValue < 10)
		{
			hoursValue = "0" + hoursValue;
		}
		if(minuteValue < 10)
		{
			minuteValue = "0" + minuteValue;
		}
		if(secondValue < 10)
		{
			secondValue = "0" + secondValue;
		}
		
		if(type == 0)
		{
			tVal = yearValue+"-"+monthValue+"-"+dayValue;
		}
		if(type == 1)
		{
			tVal = yearValue+"-"+monthValue+"-"+dayValue+" "+hoursValue+":"+minuteValue+":"+secondValue;
		}
		if(type == 2)
		{
			tVal = yearValue+"-"+monthValue+"-"+dayValue+" "+hoursValue+":"+minuteValue;
		}
		if(type == 3)
		{
			tVal = yearValue+"-"+monthValue+"-"+dayValue+" "+hoursValue+"时";
		}
		if(type == 4)
		{
			tVal = yearValue+"-"+monthValue+"-"+dayValue+" "+noonValue;
		}
		fun_closeCalender();
		$(target).val(tVal);
		$(target).focus();
	}

	//确定选择日期
	var fun_confirmDate =  function()
	{
		tVal = '';
		var dataObj = {};
		
		if($(".js-checkDay.has_checked").length <= 0)
		{
			alert("请选择具体日期");
			return;
		}
		
		if($(".js-checkDay.has_checked").hasClass("has_unclick"))
		{
			alert("请选择具体日期");
			return;
		}
		
		dataObj['yearValue'] = $(".js-selectYear").val();
		dataObj['monthValue'] = $(".js-selectMonth").val();
		dataObj['dayValue'] = $(".js-checkDay.has_checked").text();
		
		dataObj['hoursValue'] = $(".js-selectHour").val();
		dataObj['minuteValue'] = $(".js-selectMin").val();
		dataObj['secondValue'] = $(".js-selectSec").val();
		
		fun_setChooseDate(dataObj);
		
	}
	//选择今天日期
	var fun_chooseNowDate = function()
	{
		tVal = '';
		var dataObj = {};
		
		dataObj['yearValue'] = nowYear;
		dataObj['monthValue'] = nowMonth;
		dataObj['dayValue'] = nowDate;
		
		dataObj['hoursValue'] = nowHours;
		dataObj['minuteValue'] = nowMinutes;
		dataObj['secondValue'] = nowSeconds;
		
		fun_setChooseDate(dataObj);
	}
	
	//年月翻看操作按钮 1--前一年，2--后一年，3--前一月，4--后一月
	var fun_goOptBut = function(tpFlag)
	{
		if(tpFlag == 1)
		{
			if (sltYear == beginYear){return;}
			sltYear--;
		}
		if(tpFlag == 2)
		{
			if (sltYear == endYear){return;}
			sltYear++;
		} 
		if(tpFlag == 3)
		{
			if (sltYear == beginYear && sltMonth == 0){return;}
			sltMonth--;
			if (sltMonth == -1) 
			{
				sltYear--;
				sltMonth = 11;
			}
		} 
		if(tpFlag == 4)
		{
			if (sltYear == endYear && sltMonth == 11){return;}
			sltMonth++;
			if (sltMonth == 12) 
			{
				sltYear++;
				sltMonth = 0;
			}
		} 
		
		fun_setAllSelect();
		fun_fillDate();
	}
	
	//年份下拉框change事件
	var changeSltYear = function()
	{ 
		sltYear = $(".js-selectYear").val();//这就是selected的值 
		fun_fillDate();
	}

	//月份下拉框change事件
	var changeSltMonth = function()
	{ 
		sltMonth = $(".js-selectMonth").val();//这就是selected的值
		fun_fillDate();
	}
	
	//拆分yyyy-MM-dd hh:mm:ss 0--只选择日期，1--选择小时、分钟、秒，2--选择小时、分钟，3--选择小时，4--选择上、下午;
	var	fun_spitDate = function(dValue,yn)
	{
		if (dValue == "0" ||　typeof(dValue) == undefined || dValue == null || dValue == "" || dValue == undefined)
		{
			
		}
		else
		{
			var dateArr = [];
			var dateYMD = [];
			
			var dateArr = dValue.split(" ");
			var dateYMD = dateArr[0].split("-");
			
			sltYear = dateYMD[0];
			sltMonth = dateYMD[1]-1;
			sltDate = dateYMD[2];
			
			if(yn == 1)
			{
				var dateHMS = [];
				var dateHMS = dateArr[1].split(":");
				sltHour = dateHMS[0];
				sltMinute = dateHMS[1];
				sltSecond = dateHMS[2];
			}
			if(yn == 2)
			{
				var dateHMS = [];
				var dateHMS = dateArr[1].split(":");
				sltHour = dateHMS[0];
				sltMinute = dateHMS[1];
			}
			if(yn == 3)
			{
				var dateHMS = [];
				var dateHMS = dateArr[1].split("时");
				sltHour = dateHMS[0];
			}
			if(yn == 4)
			{
				sltNoon = dateArr[1];
			}
		}
		
		sltYear = Number(sltYear) || 0;
		sltMonth = Number(sltMonth) || 0;
		sltDate = Number(sltDate) || 0;
		sltHour = Number(sltHour) || 0;
		sltMinute = Number(sltMinute) || 0;
		sltSecond = Number(sltSecond) || 0;
		sltNoon = sltNoon || '';
		
		tagYear = sltYear;
		tagMonth = sltMonth;
		tagDate = sltDate;
		tagHour = sltHour;
		tagMinute = sltMinute;
		tagSecond = sltSecond;
		tagNoon = sltNoon;
		
	}
	
	//绑定日数据
	var fun_fillDate = function()
	{
		$(".js-dayList").empty();
		sltYear = parseInt(sltYear,10);
		sltMonth = parseInt(sltMonth,10);
		var daysOfMonth  = new Date(sltYear, sltMonth+1, 0).getDate(); //获取每月的实际天数
		var mvArray = '';
		var dayOfFirstDay = new Date(sltYear, sltMonth, 1).getDay(); //获取当月的第一天的星期数
		for (var i = 0; i < dayOfFirstDay; i++) 
		{
			mvArray += "<li></li>";
		}
		
		
		for (var i = 0; i < daysOfMonth; i++)
		{
			if((sltYear == tagYear) && (sltMonth == tagMonth) && ((i+1) == tagDate))
			{
				mvArray += "<li><a tid='"+(i+1)+"' class='js-checkDay has_checked'>"+(i+1)+"</a></li>";
			}
			else if((sltYear == nowYear) && (sltMonth == nowMonth) && ((i+1) == nowDate))
			{
				mvArray += "<li><a tid='"+(i+1)+"' class='js-checkDay has_notice'>"+(i+1)+"</a></li>";
			}
			else
			{
				mvArray += "<li><a tid='"+(i+1)+"' class='js-checkDay'>"+(i+1)+"</a></li>";
			}
		}
		
		if((daysOfMonth+dayOfFirstDay)%7 != 0)
		{
			for (var i = 0; i < 7-(daysOfMonth+dayOfFirstDay)%7; i++)
			{
				mvArray += "<li></li>";
			}
		}
		$(".js-dayList").append(mvArray);
		
		//tLimit：0--无限制，1--只能选择当天或者之前的日期，2--只能选择当天或者之后的日期
		if(tLimit == "1")
		{
			if(Number(nowYear) < Number(sltYear))
			{
				$(".js-dayList li a").addClass("has_unclick");
			}
			if(Number(nowYear) == Number(sltYear))
			{
				if(Number(nowMonth) < Number(sltMonth))
				{
					$(".js-dayList li a").addClass("has_unclick");
				}
				if(Number(nowMonth) == Number(sltMonth))
				{
					$(".js-dayList li a:[tid="+nowDate+"]").parent("li").nextAll("li").find("a").addClass("has_unclick");
				}
			}
		}
		if(tLimit == "2")
		{
			if(Number(nowYear) > Number(sltYear))
			{
				$(".js-dayList li a").addClass("has_unclick");
			}
			if(Number(nowYear) == Number(sltYear))
			{
				if(Number(nowMonth) > Number(sltMonth))
				{
					$(".js-dayList li a").addClass("has_unclick");
				}
				if(Number(nowMonth) == Number(sltMonth))
				{
					$(".js-dayList li a:[tid="+nowDate+"]").parent("li").prevAll("li").find("a").addClass("has_unclick");
				}
			}
		}
		
	}
	
	/*设置年、月、时、分、秒选中状态*/
	var fun_setAllSelect = function()
	{
		$(".js-selectYear").val(sltYear);
		$(".js-selectMonth").val(sltMonth);
		
		$(".js-selectHour").val(sltHour);
		$(".js-selectMin").val(sltMinute);
		$(".js-selectSec").val(sltSecond);
		
		$(".js-selectNoon").val(sltNoon);
	}
	
	//初始化年、月、时、分、秒下拉框
	var fun_initAllSelect = function() 
	{
		$(".js-selectYear").empty();
		var yearArr = '';
		for (var yr = beginYear; yr <= endYear; yr++)
		{
			yearArr +="<option value='"+yr+"'>"+yr+"</option>";
		}
		$(".js-selectYear").append(yearArr);
		
		$(".js-selectMonth").empty();
		var monthArr = '';
		
		var monthsArr = calendarData["months"][lang];
		for (var mnt = 0; mnt < monthsArr.length; mnt++)
		{
			monthArr +="<option value='"+mnt+"'>"+monthsArr[mnt]+"</option>";
		}
		$(".js-selectMonth").append(monthArr);
		
		$(".js-sltBoxHour ul").remove();
		$(".js-sltBoxMin ul").remove();
		$(".js-sltBoxSec ul").remove();
		var hourArr = '';
		hourArr = '<ul class="js-hourSlt">';
		for (var hr = 0; hr < 24; hr++)
		{
			hourArr +="<li name='"+hr+"'>"+hr+"</li>";
		}
		hourArr += '</ul>';
		$(".js-sltBoxHour").append(hourArr);
		
		var minArr = '';
		var secArr = '';
		minArr = '<ul class="js-minSlt">';
		secArr = '<ul class="js-secSlt">';
		for (var ms = 0; ms < 60; ms++)
		{
			minArr +="<li name='"+ms+"'>"+ms+"</li>";
			secArr +="<li name='"+ms+"'>"+ms+"</li>";
		}
		minArr += '</ul>';
		secArr += '</ul>';
		$(".js-sltBoxMin").append(minArr);
		$(".js-sltBoxSec").append(secArr);
		
		fun_setAllSelect();
	}
	
	//写入该日期选择控件
	var fun_calendarDraw = function()
	{
		fun_closeCalender();
		var canlendarArr = '';
		
		canlendarArr += '<div class="calender js-calender">';
		
		canlendarArr += '<i class="calender__close js-calClose"></i>';
		
		
		canlendarArr += '<div class="calender__head">';
		
		canlendarArr += '<div class="calender__opt">';
		canlendarArr += '<i class="calender__opt--but prev_year js-goOptBut" tfg="1"></i>';
		canlendarArr += '<i class="calender__opt--but prev_month js-goOptBut" tfg="3"></i>';
		canlendarArr += '</div>';
		
		canlendarArr += '<div class="calender__select">';
		canlendarArr += '<select class="calender__select--box select_year js-selectYear"><option>2016</option></select>';
		canlendarArr += '<span class="calender__select--name">年</span>';
		canlendarArr += '<select class="calender__select--box select_month js-selectMonth"><option>12</option></select>';
		canlendarArr += '<span class="calender__select--name">月</span>';
		canlendarArr += '</div>';
		
		canlendarArr += '<div class="calender__opt">';
		canlendarArr += '<i class="calender__opt--but next_month js-goOptBut" tfg="4"></i>';
		canlendarArr += '<i class="calender__opt--but next_year js-goOptBut" tfg="2"></i>';
		canlendarArr += '</div>';
		
		canlendarArr += '</div>';
		
		
		canlendarArr += '<div class="calender-con">';
		
		canlendarArr += '<div class="calender__week">';
		canlendarArr += '<ul class="calender__week--list js-weekList">';
		canlendarArr += '<li>SUN<br>周日</li>';
		canlendarArr += '<li>MON<br>周一</li>';
		canlendarArr += '<li>TUE<br>周二</li>';
		canlendarArr += '<li>WED<br>周三</li>';
		canlendarArr += '<li>THU<br>周四</li>';
		canlendarArr += '<li>FRI<br>周五</li>';
		canlendarArr += '<li>SAT<br>周六</li>';
		canlendarArr += '</ul>';
		canlendarArr += '</div>';
		
		
		canlendarArr += '<div class="calender__day">';
		canlendarArr += '<ul class="calender__day--list js-dayList">';
		canlendarArr += '</ul>';
		canlendarArr += '</div>';
		
		
		canlendarArr += '<div class="calender__time js-timeBox">';
		
		canlendarArr += '<div class="calender__time--list js-hourBox">';
		canlendarArr += '<div class="calender__time--list-con js-eSltBox js-sltBoxHour">';
		canlendarArr += '<input type="text" maxlength="2" mval="23" class="calender__time--input js-selectHour" />';
		canlendarArr += '<i class="calender__time--drop drop_down js-drop"></i>';
		canlendarArr += '</div>';
		canlendarArr += '<span class="calender__time--name">时</span>';
		canlendarArr += '</div>';
		
		canlendarArr += '<div class="calender__time--list js-minBox">';
		canlendarArr += '<div class="calender__time--list-con js-eSltBox js-sltBoxMin">';
		canlendarArr += '<input type="text" maxlength="2" mval="59" class="calender__time--input js-selectMin" />';
		canlendarArr += '<i class="calender__time--drop drop_down js-drop"></i>';
		canlendarArr += '</div>';
		canlendarArr += '<span class="calender__time--name">分</span>';
		canlendarArr += '</div>';
		
		canlendarArr += '<div class="calender__time--list js-secBox">';
		canlendarArr += '<div class="calender__time--list-con js-eSltBox js-sltBoxSec">';
		canlendarArr += '<input type="text" maxlength="2" mval="59" class="calender__time--input js-selectSec" />';
		canlendarArr += '<i class="calender__time--drop drop_down js-drop"></i>';
		canlendarArr += '</div>';
		canlendarArr += '<span class="calender__time--name">秒</span>';
		canlendarArr += '</div>';
		
		canlendarArr += '<div class="calender__time--list js-noonBox">';
		canlendarArr += '<select class="calender__time--select select_noon js-selectNoon"><option value="上午">上午</option><option value="下午">下午</option></select>';
		canlendarArr += '</div>';
		
		canlendarArr += '</div>';
			
			
		canlendarArr += '<div class="calender__act">';
		canlendarArr += '<i class="calender__act--but js-cancelDate">清空</i>';
		canlendarArr += '<i class="calender__act--but js-setNowTime">今天</i>';
		canlendarArr += '<i class="calender__act--but js-showCheckTime">确定</i>';
		canlendarArr += '</div>';
		
		canlendarArr += '</div>';
		
		canlendarArr += '</div>';
		
		$("body").append(canlendarArr);
		
		if(type == '1')
		{
			$(".js-hourBox").show();
			$(".js-minBox").show();
			$(".js-secBox").show();
		}
		
		if(type == '2')
		{
			$(".js-hourBox").show();
			$(".js-minBox").show();
		}
		
		if(type == '3')
		{
			$(".js-hourBox").show();
		}
		
		if(type == '4')
		{
			$(".js-noonBox").show();
		}
		
		fun_bind();
		/*绑定年、月、时、分、秒*/
		fun_initAllSelect();
		/*绑定日数据*/
		fun_fillDate();
		
		var lessHeight = $(".js-calender").outerHeight() - offsetBottom;
		
		if(lessHeight > 0)
		{
			$(".js-calender").offset({'top':offsetTop-lessHeight,'left':offsetLeft});
		}
		else
		{
			$(".js-calender").offset({'top':offsetTop,'left':offsetLeft});
		}
		
	}

	//初始化日期控件 -- 判断是否有初始化值
	var fun_calendar = function() 
	{
		tVal = $(target).val();
		if(tVal != '')
		{
			fun_spitDate(tVal,type);
		}
		fun_calendarDraw();
	}
	
	//绑定时间控件
	fun_calendar();
}






