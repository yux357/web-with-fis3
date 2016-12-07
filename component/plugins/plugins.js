
define(['jquery','common_mod','data_mod'],function($,com,aData)
{
	var plugins;
	plugins = {
		thisWebUrl : function(){
			var protocolFlag = ('http:' == document.location.protocol ? false : true);
			if(protocolFlag)
			{
				return aData.webHttpsUrl;
			}
			else
			{
				return aData.webUrl;
			}
		},
		selectWidget : function(){
			/*
			$("body").find(".js-selectlist").bind("DOMSubtreeModified DOMNodeInserted DOMNodeRemoved DOMNodeRemovedFromDocument DOMNodeInsertedIntoDocument DOMAttrModified DOMCharacterDataModified",
				function(e)
				{
					var offsetTop = $(this).offset().top;
					var offsetBottom = $("body").outerHeight() - offsetTop;
		           	
		           	var lessHeight = $(this).outerHeight() - offsetBottom;
		
					if(lessHeight > 0)
					{
						$(this).offset({'top':offsetTop-lessHeight,'bottom':''});
					}
				}
			);
			*/
			$("body").on("click",".js-selectbox",function(event)
			{
				var _selectWidget = $(this);
				if(com.browserCheck.isIE7())
				{
					$(this).parents(".plugins-select").css("z-index","100");
				}
				
				event.stopPropagation();
				_selectWidget.next(".js-selectlist").show(0,function()
				{
					_selectWidget.addClass("plugins-select--has");
					$(this).parent().on("click",".js-selectlist li",function(event)
					//$(this).children("li").click(function(event)
					{
						if($(this).parent().prev(".js-selectbox").is("input"))
						{
							$(this).parent().prev(".js-selectbox").val($(this).text())
							.attr("data-value",$(this).attr("data-value"));
						}
						else
						{
							$(this).parent().prev(".js-selectbox").text($(this).text())
							.attr("data-value",$(this).attr("data-value"));
						}
						event.stopPropagation();
						_selectWidget.next(".js-selectlist").hide(0);
						_selectWidget.removeClass("plugins-select--has");
						if(com.browserCheck.isIE7())
						{
							_selectWidget.parents(".plugins-select").css("z-index","0");
						}
					})
					
					$(document).one("click",function () 
					{
						_selectWidget.next(".js-selectlist").hide(); 
						_selectWidget.removeClass("plugins-select--has");
						if(com.browserCheck.isIE7())
						{
							_selectWidget.parents(".plugins-select").css("z-index","0");
						}
					});

					$(".js-selectbox").one("click",function () 
					{
						_selectWidget.next(".js-selectlist").hide(); 
						_selectWidget.removeClass("plugins-select--has");
						if(com.browserCheck.isIE7())
						{
							_selectWidget.parents(".plugins-select").css("z-index","0");
						}
					});

					if(com.browserCheck.isIE6())
					{
						$(this).children("li").hover(function()
						{
							$(this).addClass("select");
							$(this).siblings("li").removeClass("select");
						})
					}
				});
				
				
				var offsetTop = _selectWidget.next(".js-selectlist").offset().top;
				var offsetBottom = $("body").outerHeight() - offsetTop;
	           	
	           	var lessHeight = _selectWidget.next(".js-selectlist").outerHeight() - offsetBottom;
	
				if(lessHeight > 0)
				{
					_selectWidget.next(".js-selectlist").offset({'top':offsetTop-lessHeight,'bottom':''});
				}
	           	
			})
		},
		radioWidget : function(){
			$("body").on("click",".js-radiolabel",function()
			{
				var _name = $(this).attr("name");
				if($(this).hasClass("plugins-radio--off"))
				{
					// $("label[name='" + _name + "']")
					// .addClass("plugins-radio--off").removeClass("plugins-radio--on");
					// $(this).addClass("plugins-radio--on").removeClass("plugins-radio--off");
					// $("label[name='" + _name + "']").prev("input").removeAttr("checked");
					// $(this).prev("input").attr("checked", true);
					$("input[name='" + _name + "']").next("label")
					.addClass("plugins-radio--off").removeClass("plugins-radio--on");
					$(this).addClass("plugins-radio--on").removeClass("plugins-radio--off");
					$("input[name='" + _name + "']").removeAttr("checked");
					$(this).prev("input").attr("checked", true);
				}	
				return false;
			});
			$("body").on("click",".js-radiominilabel",function()
			{
				var _name = $(this).attr("name");
				if($(this).hasClass("plugins-miniradio--off"))
				{
					// $("input[name='" + _name + "']").next("label")
					// .addClass("plugins-miniradio--off").removeClass("plugins-miniradio--on");
					// $(this).addClass("plugins-miniradio--on").removeClass("plugins-miniradio--off");
					// $("input[name='" + _name + "']").removeAttr("checked");
					// $(this).prev("input").attr("checked", true);
					$("label[name='" + _name + "']")
					.addClass("plugins-miniradio--off").removeClass("plugins-miniradio--on");
					$(this).addClass("plugins-miniradio--on").removeClass("plugins-miniradio--off");
					$("label[name='" + _name + "']").prev("input").removeAttr("checked");
					$(this).prev("input").attr("checked", true);
					// $("input[name='" + _name + "']").next("label")
					// .addClass("plugins-miniradio--off").removeClass("plugins-miniradio--on");
					// $(this).addClass("plugins-miniradio--on").removeClass("plugins-miniradio--off");
					// $("input[name='" + _name + "']").removeAttr("checked");
					// $(this).prev("input").attr("checked", true);
				}	
				return false;
			});
		},
		checkBoxWidget : function(fn){
			$("body").on("click",".js-checklabel",function(event)
			{
				event.stopPropagation();
				if($(this).hasClass("plugins-checkbox--on"))
				{
					$(this).removeClass("plugins-checkbox--on").addClass("plugins-checkbox--off");
					$(this).prev("input").removeAttr("checked");
				}
				else
				{
					$(this).addClass("plugins-checkbox--on").removeClass("plugins-checkbox--off");
					$(this).prev("input").attr("checked", true);
				}	
			});
			$("body").on("click",".js-checkminilabel",function(event)
			{
				event.stopPropagation();
				if($(this).hasClass("plugins-minicheckbox--on"))
				{
					$(this).removeClass("plugins-minicheckbox--on").addClass("plugins-minicheckbox--off");
					$(this).prev("input").removeAttr("checked");
				}
				else
				{
					$(this).addClass("plugins-minicheckbox--on").removeClass("plugins-minicheckbox--off");
					$(this).prev("input").attr("checked", true);
				}	
			});
		},
		checkAll : function (targetItem,checkboxName)
		{
			targetItem.on("click",function(event)
			{
				if($(this).hasClass("plugins-checkbox--on"))
				{
					$('input[type=\'checkbox\'][name=\'' + checkboxName + '\']').each(function() 
					{
						$(this).next("label").removeClass("plugins-checkbox--on").addClass("plugins-checkbox--off");
						$(this).removeAttr("checked");
					});
				}
				else
				{
					$('input[type=\'checkbox\'][name=\'' + checkboxName + '\']').each(function() 
					{
						$(this).next("label").addClass("plugins-checkbox--on").removeClass("plugins-checkbox--off");
						$(this).attr("checked", true);
					});
				}	
			})	
			$('input[type=\'checkbox\'][name=\'' + checkboxName + '\']').each(function()
			{
				$(this).next("label").on("click",function(){
					if($(this).hasClass("plugins-checkbox--on"))
					{
						targetItem.removeClass("plugins-checkbox--on").addClass("plugins-checkbox--off");
						targetItem.prev("input").removeAttr("checked");
					}
					else
					{
						var inputItem = $('input[type=\'checkbox\'][name=\'' + checkboxName + '\']');
						var inputChecked = $('input[type=\'checkbox\'][name=\'' + checkboxName + '\']:checked');
	
						if(inputItem.length - 1 == inputChecked.length)
						{
							targetItem.removeClass("plugins-checkbox--off").addClass("plugins-checkbox--on");
							targetItem.prev("input").attr("checked", true);
						}
					}
				})
			})
		},
		/**
		* flag : 1--只显示省；2--只显示市；3--只显示区；4--不显示省；
		*/
		nameforAddr : function(area,flag,type)
		{
			var areaNm = '';
			if(!com.isillegal(area))
			{
				$.ajax({
					type: "get",
					async: false,
					url: plugins.thisWebUrl() + "/component/plugins/area/allArea.js",
					dataType: "json",
					success: function (data) {
						area.provinceName = area.provinceId ? data.province[area.provinceId] : '';
						area.cityName = area.cityId ? data.city[area.provinceId][area.cityId] : '';
						area.districtName = area.districtId ? data.county[area.cityId][area.districtId] : '';
						var thisValueArr = [];
						if(flag == '1')
						{
							thisValueArr = $.grep([area.provinceName],function(n,i){ return n != ''; });
						}
						else if(flag == '2')
						{
							thisValueArr = $.grep([area.cityName],function(n,i){ return n != ''; });
						}
						else if(flag == '3')
						{
							thisValueArr = $.grep([area.districtName],function(n,i){ return n != ''; });
						}
						else if(flag == '4')
						{
							thisValueArr = $.grep([area.cityName,area.districtName],function(n,i){ return n != ''; });
						}
						else
						{
							thisValueArr = $.grep([area.provinceName,area.cityName,area.districtName],function(n,i){ return n != ''; });
						}
						
						if(typeof type != 'undefined')
						{
							areaNm = thisValueArr.join(type);
						}
						else
						{
							areaNm =  thisValueArr.join('-');
						}
						
						return areaNm;
					},
					error: function (err) {
						return false;
					}
				});
			}	
			else
			{
				return false;
			}
			
			return areaNm;
		},
		area : function()
		{				
			window.plugins_area_id = 0;
			window.plugins_area_lock = [];

			var browserCheck = 
			{
				isIE : function ()
				{
				   return ("ActiveXObject" in window);
				},
				isIE6 : function () 
				{
					// ie6是不支持window.XMLHttpRequest的
					return this.isIE() && !window.XMLHttpRequest;
				},
				isIE7 : function () 
				{
					//只有IE8+才支持document.documentMode
					return this.isIE() && navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g,"")=="MSIE7.0";
				},
				isIE8 : function ()
				{
					// alert(!-[1,])//->IE678返回NaN 所以!NaN为true 标准浏览器返回-1 所以!-1为false
					return this.isIE() &&!-[1,]&&document.documentMode;
				}
			}

			if($("input[type='plugins_area']").length > 0)
			{
				$("input[type='plugins_area']").each(function()
				{
					window.plugins_area_id ++;
					
					if(browserCheck.isIE7 || browserCheck.isIE6)
					{
						$(this).addClass("plugins_area-input");
					}

					$(this).attr("readonly","readonly");

					if(typeof $(this).data().provinceId != 'undefined' || 
						typeof $(this).data().cityId != 'undefined' ||
						typeof $(this).data().countyId != 'undefined')
					{
						var thisInput = $(this);
						var area = {};
						area.provinceId = $(this).data().provinceId || '';
						area.cityId = $(this).data().cityId || '';
						area.countyId = $(this).data().countyId || '';

						$.ajax({
							type: "get",
							async: false,
							url: plugins.thisWebUrl() + "/component/plugins/area/allArea.js",
							dataType: "json",
							success: function (data) {
								area.provinceName = area.provinceId == '' ? '' : data.province[area.provinceId];
								area.cityName = area.cityId == '' ? '' : data.city[area.provinceId][area.cityId];
								area.countyName = area.countyId == '' ? '' : data.county[area.cityId][area.countyId];
								area.areaId = window.plugins_area_id;

								var thisValueArr = $.grep([area.provinceName,area.cityName,area.countyName],function(n,i){ return n != ''; });

								thisInput.val(thisValueArr.join('-')).data(area);
							},
							error: function (err) {
								
							}
						});
					}
					
					$(this).attr("data-area-id",window.plugins_area_id);	
				})
			}
			

			$("body").on("click","input[type='plugins_area']",function()
			{
				var area = {};
				area.id = $(this).attr("data-area-id");

				$.each(window.plugins_area_lock,function(s,lock)
				{
					if(lock)
					{
						window.plugins_area_lock[s] = false;
					}
				})

				//window.plugins_area_lock[area.id] = false;		

				area._getJson = function()
				{
					$.ajax({
						type: "get",
						async: false,
						url: plugins.thisWebUrl() + "/component/plugins/area/queryAllProvinces.js",
						dataType: "json",
						success: function (data) {
							area._province = data.province;
							window.plugins_area_province =  area._province;
						},
						error: function (err) {
							
						}
					});

					$.ajax({
						type: "get",
						async: false,
						url: plugins.thisWebUrl() + "/component/plugins/area/queryCities.js",
						dataType: "json",
						success: function (data) {
							area._city = data.cities;

							area.cityArr = {};

							area.hotCity = '<div class="plugins-area-list js-arealist" data-tab="1">'
							+  '<ul class="plugins-area-list-normal">';

							$.each(area._city,function(s,a)
							{
								if(a.hotCity)
								{
									area.hotCity += '<li class="js-hotcity" data-province="' + a.provinceId + '" data-city="' + a.id + '">'
									+ '<a class="plugins-area-list__text">'
									+ '<i class="plugins-area-list__text--left"></i>'
									+ '<span class="plugins-area-list__text--center js-name">' + a.name + '</span>'
									+ '<i class="plugins-area-list__text--right"></i></a></li>';
								}

								if(typeof area.cityArr['province' + a.provinceId] == 'undefined')
								{
									area.cityArr['province' + a.provinceId] = [];
									area.cityArr['province' + a.provinceId].push(area._city[s]);
								}
								else
								{
									area.cityArr['province' + a.provinceId].push(area._city[s]);
								}	  
							})

							area.hotCity += '</ul></div>';

							window.plugins_area_hotCity = area.hotCity;
							window.plugins_area_cityArr =  area.cityArr; 
						},
						error: function (err) {
							
						}
					});

					$.ajax({
						type: "get",
						async: false,
						url: plugins.thisWebUrl() + "/component/plugins/area/queryAllAreas.js",
						dataType: "json",
						success: function (data) {
							area._county = data.areas;

							area.countyArr = {};

							$.each(area._county,function(s,a)
							{
								if(typeof area.countyArr['city' + a.cityId] == 'undefined')
								{
									area.countyArr['city' + a.cityId] = [];
									area.countyArr['city' + a.cityId].push(area._county[s]);
								}
								else
								{
									area.countyArr['city' + a.cityId].push(area._county[s]);
								}	  
							})

							window.plugins_area_countyArr =  area.countyArr; 
						},
						error: function (err) {
							
						}
					});
				}

				area._position = function(aid)
				{
					var dom = $("input[type='plugins_area'][data-area-id='" + aid + "']");
					var position = {};
					position.top = dom.offset().top;
					position.left = dom.offset().left;
					position.height = dom.height();
					position.width = dom.width();
					return position;
				}

				area._showArea = function()
				{
					area.province = ' <div class="plugins-area-list js-arealist" style="display:block" data-tab="2">'

					$.each(window.plugins_area_province,function(l,p)
					{
						area.province += '<div class="plugins-area-list-province">'
						+ '<p class="plugins-area-list-lettersort">' + l + '</p><ul class="plugins-area-list-letter">';

						$.each(p,function(s,a)
						{
							if(a.provinceName == '海外')
							{
								return true;
							}
							area.province += '<li class="js-province"  data-province="' + a.id + '"><a class="plugins-area-list__text">'
							+ '<i class="plugins-area-list__text--left"></i>'
							+ '<span class="plugins-area-list__text--center js-name">' + a.provinceName + '</span>'
							+ '<i class="plugins-area-list__text--right"></i>'
							+ '</a></li>'
						})

						area.province += '</ul></div>';
					})	

					area.province += '</div>';

					area.hotCity = window.plugins_area_hotCity;

					area.position = area._position(area.id);

					area.areaList = '<div class="plugins-area" data-area-id="' + area.id + '"><div class="plugins-area-tab">'
					+ ' <ul class="plugins-area-tablist js-tablist"><li data-tab="1">'
					+ '<p class="plugins-area-tablist__text">常用</p><i class="plugins-area-tablist__cutline"></i></li>'
					+ '<li class="choose" data-tab="2"><p class="plugins-area-tablist__text">省</p><i class="plugins-area-tablist__cutline"></i></li>'
					+ '<li data-tab="3" class="disabled"><p class="plugins-area-tablist__text">市</p><i class="plugins-area-tablist__cutline"></i></li>'
					+ '<li data-tab="4" class="disabled"><p class="plugins-area-tablist__text">区县</p></li></ul></div>'
					+ area.hotCity
					+ area.province 
					+ '<div class="plugins-area-list js-arealist" data-tab="3"></div>'
					+ '<div class="plugins-area-list js-arealist" data-tab="4"></div>'
					+ '</div>';	

					$("body").append(area.areaList);
					$(".plugins-area[data-area-id='" + area.id + "']").css({
						"top" : area.position.top + area.position.height + 3,
						"left" : area.position.left
					})

					if(browserCheck.isIE7() || browserCheck.isIE6())
					{
						$(".plugins-area-list-letter,.plugins-area-list-normal").css("width","10000px");
						$(".js-arealist").show();
						$(".js-hotcity,.js-province").each(function(){
							$(this).css("width",$(this).outerWidth());
						})
						$(".plugins-area-list-letter,.plugins-area-list-normal").removeAttr("style");
						$(".js-arealist").hide();
						$(".js-arealist[data-tab='2']").show();
					}

					if(typeof window.plugins_area_lock[area.id] == 'undefined')
					{
						window.plugins_area_lock[area.id] = false;
					}
				}


				
				if($(".plugins-area[data-area-id='" + area.id + "']").length == 0)
				{
					if(typeof window.plugins_area_province == "undefined" || 
						typeof window.plugins_area_cityArr == "undefined" ||
						typeof   window.plugins_area_countyArr == "undefined")
					{
						area._getJson();
					}

					area._showArea();
				}
				else
				{
					area.position = area._position(area.id);

					$(".plugins-area[data-area-id='" + area.id + "']").css({
						"top" : area.position.top + area.position.height + 3,
						"left" : area.position.left
					}).show();
				}
			})

			$("html").click(function(event){				
				if(!$(event.target).is("input[type='plugins_area']"))
				{
					$.each(window.plugins_area_lock,function(s,lock)
					{
						if(!lock)
						{
							$(".plugins-area[data-area-id='" + s + "']").hide();
						}
					})
				}
				else{
					var areaId = $(event.target).data('areaId');
					$.each(window.plugins_area_lock,function(s,lock)
					{
						if(!lock && s != areaId)
						{
							$(".plugins-area[data-area-id='" + s + "']").hide();
						}
					})
				}
			});

			$("body").on("mouseover",".plugins-area",function()
			{
				var area = {};
				area.id = $(this).attr("data-area-id");

				window.plugins_area_lock[area.id] = true;
			})

			$("body").on("mouseout",".plugins-area",function()
			{
				var area = {};
				area.id = $(this).attr("data-area-id");
				
				window.plugins_area_lock[area.id] = false;
			})

			$("body").on("click",".js-tablist li",function()
			{
				if($(this).hasClass("disabled"))
				{

				}
				else
				{
					var tabId = $(this).attr("data-tab");
					var pDom = $(this).parents(".plugins-area");

					$(this).addClass("choose").siblings("li[data-tab]").removeClass("choose");

					pDom.find(".js-arealist[data-tab='" + tabId + "']").show().siblings(".js-arealist[data-tab]").hide();
				}		
			})

			$("body").on("click",".js-province",function()
			{
				var pDom = $(this).parents(".plugins-area");
				var province = {};
				province.areaId = $(this).parents(".plugins-area").attr("data-area-id");
				province.provinceId = $(this).attr('data-province');
				province.provinceName = $(this).find(".js-name").text();

				$("input[type='plugins_area'][data-area-id='" + province.areaId + "']")
				.val(province.provinceName).removeData().data(province);

				pDom.find(".js-province,.js-hotcity").removeClass("choose");
				$(this).addClass("choose");

				pDom.find(".js-tablist li[data-tab=3]").removeClass("disabled");

				var cityList = '<ul class="plugins-area-list-normal">'
				$.each(window.plugins_area_cityArr['province' + province.provinceId],function(s,a)
				{
					cityList += '<li class="js-city" '
					+ 'data-province="' + a.provinceId + '" data-city="' + a.id + '" >'
					+ '<a class="plugins-area-list__text"><i class="plugins-area-list__text--left"></i>'
					+ '<span class="plugins-area-list__text--center js-name">' + a.name + '</span>'
					+ '<i class="plugins-area-list__text--right"></i></a></li>'
				})
				cityList += '</ul>';	

				pDom.find(".js-arealist[data-tab=3]").empty().append(cityList);

				pDom.find(".js-tablist li[data-tab=3]").trigger("click");

				if(browserCheck.isIE7() || browserCheck.isIE6())
				{
					$(".js-arealist[data-tab=3] .plugins-area-list-normal").css("width","10000px");
			
					$(".js-city").each(function(){
						$(this).css("width",$(this).outerWidth());
					})

					$(".js-arealist[data-tab=3] .plugins-area-list-normal").removeAttr("style");
				}
			});

			$("body").on("click",".js-hotcity,.js-city",function(event)
			{
				var pDom = $(this).parents(".plugins-area");
				var hotCity = {};
				hotCity.areaId = $(this).parents(".plugins-area").attr("data-area-id");
				hotCity.provinceId = $(this).attr('data-province');
				hotCity.cityId = $(this).attr('data-city');
				$.each(window.plugins_area_province,function(l,p)
				{
					$.each(p,function(s,a)
					{
						if(hotCity.provinceId == a.id)
						{
							hotCity.provinceName = a.provinceName;
							return false;
						}
					})
				})	
				hotCity.cityName = $(this).find(".js-name").text();

				$("input[type='plugins_area'][data-area-id='" + hotCity.areaId + "']")
				.val(hotCity.provinceName + '-' + hotCity.cityName).removeData().data(hotCity);

				$(this).addClass("choose").siblings("li").removeClass("choose");
				pDom.find(".js-province[data-province='" + hotCity.provinceId + "']").addClass("choose")
				pDom.find(".js-province[data-province!='" + hotCity.provinceId + "']").removeClass("choose");

				pDom.find(".js-tablist li[data-tab=3]").removeClass("disabled");
				pDom.find(".js-tablist li[data-tab=4]").removeClass("disabled");

				if($(event.currentTarget).hasClass("js-hotcity"))
				{
					var cityList = '<ul class="plugins-area-list-normal">'
					+ '<li class="js-city choose" data-province="' + hotCity.provinceId + '" data-city="' + hotCity.cityId + '">'
					+ '<a class="plugins-area-list__text"><i class="plugins-area-list__text--left"></i>'
					+ '<span class="plugins-area-list__text--center js-name">' + hotCity.cityName + '</span>'
					+ '<i class="plugins-area-list__text--right"></i></a></li></ul>';

					pDom.find(".js-arealist[data-tab=3]").empty().append(cityList);
				}
				else
				{
					if($(".js-hotcity[data-city='" + hotCity.cityId + "']").length == 0)
					{
						pDom.find(".js-hotcity").removeClass("choose");
					}
					else
					{
						pDom.find(".js-hotcity[data-city='" + hotCity.cityId + "']").addClass("choose").siblings("li").removeClass("choose");
					}	
				}		

				var countyList = '<ul class="plugins-area-list-normal">'
				$.each(window.plugins_area_countyArr['city' + hotCity.cityId],function(s,a)
				{
					countyList += '<li class="js-county" '
					+ 'data-province="' + a.provinceId + '" data-city="' + a.cityId + '" data-county="' + a.id + '">'
					+ '<a class="plugins-area-list__text"><i class="plugins-area-list__text--left"></i>'
					+ '<span class="plugins-area-list__text--center js-name">' + a.areaName + '</span>'
					+ '<i class="plugins-area-list__text--right"></i></a></li>'
				})
				countyList += '</ul>';	

				pDom.find(".js-arealist[data-tab=4]").empty().append(countyList);

				pDom.find(".js-tablist li[data-tab=4]").trigger("click");

				if(browserCheck.isIE7() || browserCheck.isIE6())
				{
					$(".js-arealist[data-tab=4] .plugins-area-list-normal").css("width","10000px");
			
					$(".js-county").each(function(){
						$(this).css("width",$(this).outerWidth());
					})

					$(".js-arealist[data-tab=4] .plugins-area-list-normal").removeAttr("style");
				}
			});

			$("body").on("click",".js-county",function(event)
			{
				var pDom = $(this).parents(".plugins-area");
				var county = {};
				county.areaId = $(this).parents(".plugins-area").attr("data-area-id");
				county.provinceId = $(this).attr('data-province');
				county.cityId = $(this).attr('data-city');
				county.countyId = $(this).attr('data-county');

				$.each(window.plugins_area_province,function(l,p)
				{
					$.each(p,function(s,a)
					{
						if(county.provinceId == a.id)
						{
							county.provinceName = a.provinceName;
							return false;
						}
					})
				})	

				$.each(window.plugins_area_cityArr['province' + county.provinceId],function(s,a)
				{
					if(county.cityId == a.id)
					{
						county.cityName = a.name;
						return false;
					}
				})	

				county.countyName = $(this).find(".js-name").text();

				$("input[type='plugins_area'][data-area-id='" + county.areaId + "']")
				.val(county.provinceName + '-' + county.cityName + '-' + county.countyName).removeData().data(county);

				$(this).addClass("choose").siblings("li").removeClass("choose");

				$(".plugins-area[data-area-id='" + county.areaId + "']").hide();
			});
		}
	}
	return plugins;
})


