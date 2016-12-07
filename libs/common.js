define(
	['jquery']
	,function($)
	{
		/**
		*重写toFixed方法
		*解决浏览器toFixed()四舍五入不稳定的问题
		*/
		Number.prototype.toFixed=function (d) 
		{ 
			var s=this+""; 
			if(!d)d=0; 
			if(s.indexOf(".")==-1)s+="."; 
			s+=new Array(d+1).join("0"); 
			if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s))
			{
				var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
				if(a==d+2)
				{
					a=s.match(/\d/g); 
					if(parseInt(a[a.length-1])>4)
					{
						for(var i=a.length-2;i>=0;i--)
						{
							a[i]=parseInt(a[i])+1;
							if(a[i]==10)
							{
								a[i]=0;
								b=i!=1;
							}
							else break;
						}
					}
					s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

				}
				if(b)s=s.substr(1); 
				return (pm+s).replace(/\.$/,"");
			}
			return this+"";
		};
		/**
		 * 获取对象长度
		 * @param obj:目标对象 Object.size(obj)
		 */
		Object.size = function(obj) 
		{
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};
		/*indexOf兼容*/
		if(!Array.indexOf)
		{
		    Array.prototype.indexOf = function(obj)
		    {              
		        for(var i=0; i<this.length; i++)
		        {
		            if(this[i]==obj)
		            {
		                return i;
		            }
		        }
		        return -1;
		    }
		}
		var com;
		return com = {
			/**
			* 根据cookie名获取cookie值
			*/
			getCookie : function(objName) 
			{
				//获取指定名称的cookie的值
				var arr = document.cookie.match(new RegExp("(^| )"+objName+"=([^;]*)(;|$)"));
				if(arr != null) return unescape(arr[2]); return '';
			},
			/**
			* 根据cookie名删除该cookie
			*/
			delCookie : function(name) 
			{
				//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
				document.cookie = name+"=; expires="+(new Date(0)).toGMTString()+"; path=/";
			},
			/**
			* 设置cookie名称以及对应的值
			*/
			addCookie : function(objName,objValue)
			{
				var str = objName + "=" + escape(objValue)+"; path=/";
				
				document.cookie = str;
			},
			/*
			 * 获取网址路径中的文件名
			 */
			getPageName : function(website)
			{//var website = window.location.pathname;
				var pathnameArr = "";
				var pathname = "";
				var detailpg = "";
				var curpg = "";
				if( !com.isillegal(website) )
				{
					
					if(website.indexOf("?") > 0)
					{
						pathnameArr = website.split("?");
						pathname = pathnameArr[0];
					}
					else
					{
						pathnameArr = website;
						pathname = pathnameArr;
					}
					
					if(pathname.indexOf("/") > 0)
					{
						detailpg = pathname.split("/");
						curpg = detailpg[detailpg.length - 1];
					}
					else
					{
						detailpg = pathname;
						curpg = detailpg;
					}
				}
				
				return curpg;
			},
			/**
			* 获取当前页面的相对地址
			*/
			getPageUrl : function()
			{
				var thisUrlPage = com.curUrl.split("?")[0].split("/");
				var thisUrlLength = com.curUrl.split("?")[0].split("/").length;
				return thisUrlPage[thisUrlLength-1];
			},
			/**
			* 当下拉框的内容不能完全显示在可见区域范围内时，改变滚动条的位置
			*/
			setUlPosition : function(obj)
			{
				var thisOffsetT = $(obj).find("ul").offset().top;
				var thisOuterH = $(obj).find("ul").outerHeight();
				var windowH = $(window).height();
				var scrollT = $(document).scrollTop();
				if(windowH - (thisOffsetT + thisOuterH - scrollT) < 0)
				{
					$("body").scrollTop(scrollT + ((thisOffsetT + thisOuterH - scrollT) - windowH) + 20);
				}
			},
			/**
			 * json格式转换
			 */
			jsonChange : function(jsonData)
			{
				jsonData=eval('(' + jsonData + ')');
				return jsonData;
			},
			/**
			* 获取网页地址参数
			*/
			getQueryString : function(name) 
			{
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]); return null;
			},
			/**
			* 获取网页地址参数中文
			*/
			getQueryStr : function (name) 
			{
				  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				  var r = decodeURIComponent(window.location.search).substr(1).match(reg);
				  if (r != null) return unescape(r[2]); return null;
				  //encodeURIComponent(getQueryStr('name'));
			},
			/**
			 * 修改URL参数
			 * @param destiny:要修改的URL; param:obj类型 为参数和值得键值对 例{"a":"1","b":"2"} 若值为空则链接内会删除该参数
			 * @return 新的链接
			 */
			changeUrlPar : function (destiny, param) 
			{ 
				if(destiny.indexOf('#') >= 0)
				{
					destiny = destiny.substr(0,destiny.indexOf('#'));
				}

				$.each(param,function(key,value)
				{
					var pattern = key+'=([^&]*[&])'; 
					var otherPattern = key+'=([^&]*)';
					if(com.isillegal(value))
					{
						var replaceText = "";
					}
					else
					{
						var replaceText = key+'='+value+'&'; 
					}
					if (destiny.match(pattern)) 
					{ 
						var tmp = '/('+key+')=[^&]*[&]/'; 
						destiny = destiny.replace(eval(tmp) , replaceText); 
					} 
					else 
					{
						if(destiny.match(otherPattern))
						{
							var otherTmp = '/('+key+')=[^&]*/'; 
							destiny = destiny.replace(eval(otherTmp) , replaceText); 
						} 
						else
						{
							if (destiny.match('[\?]')) 
							{ 
								if(destiny.charAt(destiny.length-1) != '&')
								{
									destiny = destiny + '&' + replaceText; 
								}
								else
								{
									destiny = destiny + replaceText; 
								}
							} 
							else 
							{ 
								destiny = destiny + '?' + replaceText; 
							} 
						}
					} 
				})
				return destiny;
			} ,
			/**
			 * 通过数组的value查询key值
			 * @param arrName:一维数组
			 * @param arrValue:值 
			 * @return
			 */
			getKey : function(arrName, arrValue)
			{
				var arrKey = "";
				for(var key in arrName)
				{
					if (arrValue == arrName[key])
					{
						arrKey = key;
						break;
					}
						
				}
				return arrKey;
			},
			/**
			 * 通过数组value查询key值
			 * @param arrName:多维数组
			 * @param arrValue:值
			 * @return
			 */
			getKeySec : function(arrName, arrValue)
			{
				var arrKey = "";
				for(var key in arrName)
				{
					for(var i = 0;i < arrName[key].length; i++)
					{
						if (arrValue == arrName[key][i])
						{
							arrKey = key;
							break;
						}
					}
						
				}
				return arrKey;
			},
			/**
			* 克隆对象
			*/
			cloneObj : function(obj){
				var o;
				switch(typeof obj){
				case 'undefined': break;
				case 'string'   : o = obj + '';break;
				case 'number'   : o = obj - 0;break;
				case 'boolean'  : o = obj;break;
				case 'object'   :
					if(obj === null){
						o = null;
					}else{
						if(obj instanceof Array){
							o = [];
							for(var i = 0, len = obj.length; i < len; i++){
								o.push(com.cloneObj(obj[i]));
							}
						}else{
							o = {};
							for(var k in obj){
								o[k] = com.cloneObj(obj[k]);
							}
						}
					}
					break;
				default:		
					o = obj;break;
				}
				return o;	
			}, 
			/**
			 * 数据检测
			 */
			validate_required : function (obj,fn)
			{
				var rightFlag = 0;

				var tips = fn 
				// || function (content)
				// {
				// 	var d = artDialog({
				// 		title: '',
				// 		content: content,
				// 		fixed: true,
				// 		lock : true,
				// 		icon : 'warning'
				// 	});

				// 	d.show();
				// }

				if(obj.value.length == 0)
				{
					return false;
				}
				else
				{
					for(var i=0;i<obj.value.length;i++)
					{
						if (obj.value[i] == null||obj.value[i] == "")
					    {
					    	tips(obj.alerttxt[i]);
					    	break;
					    }
						else 
						{
							rightFlag++;
							continue;
						}
					}	
					if(rightFlag == obj.value.length)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
			}, 	
			/**
			* 去除字符串的最后一个符号
			*/
			substr : function(str)
			{
				if(str!=""){
					str = str.substring(0,str.length-1);
					return str;
				}
			},
			/**
			* 根据","拆分字符串
			*/
			stringSpit : function(str)
			{
				var strArr ={};
				if(str!=""){
				
					strArr = str.split(",");
					
					return strArr;
				}
			},
			/****
			 *	截取字符串（中英文皆可）
			 *  @param  str:字符串 len:要截取的长度
			 *	@return
			 */
			cutstr : function (str,len)  
			{  
			   var str_length = 0;  
			   var str_len = 0;  
			      str_cut = new String();  
			      str_len = str.length;  
			      for(var i = 0;i<str_len;i++)  
			     {  
			        a = str.charAt(i);  
			        str_length++;  
			        if(escape(a).length > 4)  
			        {  
			         //中文字符的长度经编码之后大于4  
			         str_length++;  
			         }  
			         str_cut = str_cut.concat(a);  
			         if(str_length>=len)  
			         {  
			         str_cut = str_cut.concat("");  
			         return str_cut;  
			         }  
			    }  
			    //如果给定字符串小于指定长度，则返回源字符串；  
			    if(str_length<len){  
			     return  str;  
			    }  
			},
			/****
			 *	判断字符串长度
			 *  @param  str字符串
			 *	@return
			 */
			getStrLength : function (str) 
			{
				var cArr = str.match(/[^\x00-\xff]/ig);
				return str.length + (cArr == null ? 0 : cArr.length);
			},
			/**
			* 判断值是否为空
			*/
			checkDataNull : function(baseIdArr)
			{
				for(var i = 0; i < baseIdArr.length; i++)
				{
					var iContent = "";
					var iObjName = "#" + baseIdArr[i];
					if($(iObjName).is("div"))
					{
						iContent = $(iObjName).html();
					}
					else if(($(iObjName).is("input")) || ($(iObjName).is("textarea")) || ($(iObjName).is("select")))
					{
						iContent = $(iObjName).val();
					}
					else
					{
						iContent = $(iObjName).html();
					}
					//if((iContent == "") || (iContent == null))
					if((iContent == ""))
					{
						return -1;
					}
				}
			},
			/**
			 * 判断变量是否为空
			 */
			isillegal : function(varInfo)
			{
				if (typeof(varInfo) == undefined || varInfo == null || varInfo == "" || varInfo == undefined)
				{
					return true;
				}
				else
				{
					return false;
				}
			},
			/**
			 * 判断对象是否为空
			 */
			isEmptyObj : function (obj) 
			{ 
			    for (var name in obj)  
			    { 
			        return false; 
			    } 
			    return true; 
			},
			/**
			* 判断只能为数字
			*/
			CheckInputInt : function (obj)
			{
				 if('' != obj.value.replace(/\d{1,}/,''))
				{
					obj.value = obj.value.match(/\d{1,}/) == null ? '' :obj.value.match(/\d{1,}/);
				}
			},
			/**
			 * 验证输入为数字
			 * @param 
			 * @return
			 */
			CheckInputIntFloat : function(oInput,num)
			{
				if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,''))
				{
					oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
				}
				if(num)
				{
					if(oInput.value.indexOf('.')>0)
					{
						if(oInput.value.split(".")[1].length > num)
						{
							oInput.value = (oInput.value-0).toFixed(num);
						}
					}
				}
				else
				{
					if(oInput.value.indexOf('.')>0)
					{
						if(oInput.value.split(".")[1].length > 4)
						{
							oInput.value = (oInput.value-0).toFixed(4);
						}
					}
				}
			},
			timetostr : function (datetime,num)
			{
				if (datetime == "0" ||　typeof(datetime) == undefined || datetime == null || datetime == "" || datetime == undefined)
				{
					return "";
				}
				var createTime = new Date(parseInt(datetime) * 1000);
				var year = createTime.getFullYear();
				var month = createTime.getMonth()+1;
				var day = createTime.getDate();
				if(parseInt(month) < 10)
					month = "0"+month;
				if(parseInt(day) < 10)
					day = "0"+day;
					
				var hours = createTime.getHours();
				var minutes = createTime.getMinutes();
				var seconds = createTime.getSeconds();
				
				if(parseInt(hours) < 10)
					hours = "0"+hours;
				if(parseInt(minutes) < 10)
					minutes = "0"+minutes;
				if(parseInt(seconds) < 10)
					seconds = "0"+seconds;
					
				var strTime = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
				
				if(num == 0)
				{
					strTime = year+"-"+month+"-"+day;
				}
				if(num == 1)
				{
					strTime = year+"-"+month+"-"+day+" "+hours+":"+minutes;
				}
				if(num == 2)
				{
					strTime = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
				}
				if(num == 3)
				{
					strTime = year+"-"+month+"-"+day+" "+hours+"时";
				}
				return strTime;
			},
			dateToUnix: function(datetime) {
				if (datetime == "0" ||　typeof(datetime) == undefined || datetime == null || datetime == "" || datetime == undefined)
				{
					return "";
				}
                var f = datetime.split(' ', 2);
				
                var d = (f[0] ? f[0] : '').split('-', 3);

                var t = (f[1] ? f[1] : '').split(':', 3);

                return (new Date(
                    parseInt(d[0], 10) || null,

                    (parseInt(d[1], 10) || 1) - 1,

                    parseInt(d[2], 10) || null,

                    parseInt(t[0], 10) || null,

                    parseInt(t[1], 10) || null,

                    parseInt(t[2], 10) || null

                    )).getTime() / 1000;
            },
			/**
			 * 页面强制按比例缩小
			 * @param name:图片name;size:缩放的大小
			 */
			reSizeImg : function(name,size)
			{
				var imgs = !!$("img[imgName='" + name + "']").size() && !isillegal($("img[imgName='" + name + "']")) ? $("img[imgName='" + name + "']"):$("img[name='" + name + "']");
				imgs.each(function() 
				{
					var newW,newH;
			        var w = $(this).width();
					var h = $(this).height();
					var scale = w/h;
					newW = scale > 1 ? size : size*scale;
					newH = scale > 1 ? size/scale : size;
					$(this).height(newH);
					$(this).width(newW);
			    });
			},
			/**
			 * 获取窗口大小
			 */
			getWindowSize : function ()
			{
				var obj = {};
				if (window.innerWidth)
				{
					obj.winWidth = window.innerWidth;
				}	
				else if ((document.body) && (document.body.clientWidth))
				{
					obj.winWidth = document.body.clientWidth;
				} 
				// 获取窗口高度
				if (window.innerHeight)
				{
					obj.winHeight = window.innerHeight;
				}
				
				else if ((document.body) && (document.body.clientHeight))
				{
					obj.winHeight = document.body.clientHeight;
				} 
				// 通过深入 Document 内部对 body 进行检测，获取窗口大小
				if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
				{
					obj.winHeight = document.documentElement.clientHeight;
					obj.winWidth = document.documentElement.clientWidth;
				}
				return obj;
			},
			/**
			 * 获取元素大小
			 */
			getDivSize : function (obj)
			{
				var item = {};
				item.width = obj.outerWidth(true);
				item.height = obj.outerHeight(true);
				return item;
			},
			/**
			 * 浮出层  floatingLayer(dom,{
			 *		   		"move" : movedomClass,
			 *				"cancel" : [canceldomClass1,canceldomClass2 ....]
			 *		   })
			 */
			floatingLayer : function (dom,opration)
			{
				var floating = {};
				floating.random = Math.random();

				floating.zIndex = 1000 + Number($(".plugins-floatinglayer").length)*2;

				floating.layer = ".plugins-floatinglayer[data-id='" + floating.random + "'] ";
				if(com.getType(opration) == 'string'){
					floating.movedom = ".plugins-floatinglayer[data-id='" + floating.random + "'] " +  opration;
					floating.cancel = '';
				}
				else
				{
					if(com.isillegal(opration.move))
					{
						floating.movedom = '';
					}
					else
					{
						floating.movedom = ".plugins-floatinglayer[data-id='" + floating.random + "'] " +  opration.move;

					}
					floating.cancelArr = [];
					$.each(opration.cancel,function(i,v){
						floating.cancelArr.push(".plugins-floatinglayer[data-id='" + floating.random + "'] " +  opration.cancel);
					})

					floating.cancel = floating.cancelArr.join(',');
				}

				if(opration.scroll == undefined || typeof opration.scroll == "undefined")
				{
					opration.scroll = true;
				}

				if(opration.scroll == undefined || typeof opration.scroll == "undefined")
				{
					opration.resize = true;
				}
		
		
				floating.boxDom = ".plugins-floatinglayer[data-id='" + floating.random + "'] .plugins-floatinglayer__box";

				if(!com.isillegal(floating.movedom))
				{
					$("body").on("mousemove",floating.movedom,function(e){
						floating._clientRect = com.moveMove($(this)[0],$(this).parents(".plugins-floatinglayer__box")[0]);
					});	
				}

				$("body").on("click",floating.cancel,function(e){
					$(this).parents(".plugins-floatinglayer").hide(0,function(){
						$(this).remove();
					});
				});

				floating.item = '<div class="plugins-floatinglayer" data-id="' + floating.random 
				+ '"><div class="plugins-floatinglayer__bg" style="z-index:' + floating.zIndex + '">'
				+ '</div><div class="plugins-floatinglayer__box" style="z-index:' + (Number(floating.zIndex) + 1) + '">' + dom + '</div></div>';

				$("body").append(floating.item);

				floating.wWidth = com.getWindowSize().winWidth;
				floating.wHeight = com.getWindowSize().winHeight;
				floating.scrollPosX = $(document).scrollLeft();
				floating.scrollPosY = $(document).scrollTop();
				floating.divItem = $(floating.boxDom).children().eq(0);
				floating.divWidth = opration.divWidth || com.getDivSize(floating.divItem).width;
				floating.divHeight = opration.divWidth || com.getDivSize(floating.divItem).height;
				
			
				$(floating.boxDom).css(
				{
					"left": (floating.wWidth-floating.divWidth)/2 + floating.scrollPosX,
					"top": (floating.wHeight-floating.divHeight)/2 + floating.scrollPosY
				})

				floating.clientTop = floating.divItem[0].getBoundingClientRect().top;
				floating.clientLeft = floating.divItem[0].getBoundingClientRect().left;

				if(opration.scroll){
					$(window).scroll(function()
					{
						if(!com.isEmptyObj(floating._clientRect))
						{
							if(floating.clientTop != floating._clientRect.top)
							{
								floating.clientTop = floating._clientRect.top;
							}
							if(floating.clientLeft != floating._clientRect.left)
							{
								floating.clientLeft = floating._clientRect.left;
							}
						}
						//console.log(floating._clientRect)
						var scrollPosY = $(document).scrollTop();
						var scrollPosX = $(document).scrollLeft();
						$(floating.boxDom).css({
							"left" : floating.clientLeft + scrollPosX,
							"top" : floating.clientTop + scrollPosY
						})

						com.floatingLayerFixed($(floating.boxDom))
					})
				}

				if(opration.resize){
					$(window).resize(function()
					{
						var wWidth = com.getWindowSize().winWidth;
						var wHeight = com.getWindowSize().winHeight;
						var scrollPosY = $(document).scrollTop();
						var scrollPosX = $(document).scrollLeft();
						$(floating.boxDom).css(
						{
							"left": (wWidth-floating.divWidth)/2 + scrollPosX,
							"top": (wHeight-floating.divHeight)/2 + scrollPosY
						})

						com.floatingLayerFixed($(floating.boxDom))
					})
				}
				
				$(floating.layer).css("visibility","visible");
			},
			/**
			 * 关闭浮出层
			 */
			floatingLayerClose : function (obj)
			{
				if(typeof obj == 'undefined')
				{
					$(".plugins-floatinglayer").hide(0,function()
					{
						$(this).remove();
					})				
				}
				else
				{
					$(obj).parents(".plugins-floatinglayer").hide(0,function()
					{
						$(this).remove();
					})					
				}
			},
			/**
			 * 重置位置
			 */
			floatingLayerFixed : function (obj)
			{
				var boxDom = $(obj).parents(".plugins-floatinglayer__box");
				var divItem = boxDom.children().eq(0);
				var wWidth = com.getWindowSize().winWidth;
				var wHeight = com.getWindowSize().winHeight;
				var scrollPosY = $(document).scrollTop();
				var scrollPosX = $(document).scrollLeft();
				boxDom.css(
					{
						"left": (wWidth-com.getDivSize(divItem).width)/2 + scrollPosX,
						"top": (wHeight-com.getDivSize(divItem).height)/2 + scrollPosY
					}
				)
			},
			/**
			 *移动div
			 */
			moveMove : function (obj,pObj)
			{
				var _move = false; //移动标记
				var _x, _y; //鼠标离控件左上角的相对位置
				$(obj).mousedown(function(e) {
					 _move = true;
					 _x = e.pageX - parseInt($(pObj).css("left"));
					 _y = e.pageY - parseInt($(pObj).css("top"));
					 //$(".alertBoxCon").fadeTo(20, 0.5); //点击后开始拖动并透明显示
				});
				 $(document).mousemove(function(e) {
					 if (_move) {
						 var x = e.pageX - _x; //移动时根据鼠标位置计算控件左上角的绝对位置
						var y = e.pageY - _y;
						 $(pObj).css({ top: y, left: x }); //控件新位置
					}
				 }).mouseup(function() {
					 _move = false;
					// $(".alertBoxCon").fadeTo("fast", 1); //松开鼠标后停止移动并恢复成不透明
				});
				var _clientRect = $(pObj)[0].getBoundingClientRect();
				return _clientRect;
			},
			/****
			 *	判断变量类型
			 *  @param o:变量
			 *	@return 返回变量的类型全称小写
			 *	例：
			 *	getType("abc"); //string 
			 *	getType(true); //boolean 
			 *	getType(123); //number 
			 *	getType([]); //array 
			 *	getType({}); //object 
			 *	getType(function(){}); //function 
			 *	getType(new Date); //date 
			 *	getType(new RegExp); //regexp 
			 *	getType(Math); //math 
			 *	getType(null); //null
			 */
			getType : function (o) 
			{
			  var _t; return ((_t = typeof(o)) == "object" ? Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
			},		
			/**
			 *浏览器版本
			 */
			"browserCheck" : 
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
			},
			/**
			 * 分页函数
			 */
			initPaping : function (cur,total,alltotal) 
			{

				var listStr = '';
				listStr = ".plugins-pagination__links";
				var curPage = cur || 1;
				var totalPage = total || 0;
				var searchFunName = 0;

				if(Number(alltotal) == 0)
				{
					$(listStr).parent().hide();
				}

				$(listStr).empty();
				var pageStr = "";
				pageStr += "<a href=\"javascript:gotoPage('pre','"+searchFunName+"');\"><span>&lt;</span></a>";
				if (totalPage <= 5) 
				{
					for ( var i = 0; i < totalPage; i++)
					{
						if (i == (curPage - 1)) 
						{
							pageStr = pageStr + "<a href=\"javascript:gotoPage('"+ (i + 1) + "','"+searchFunName+"');\" class='checkThis'><span>";
						}
						else 
						{
							pageStr = pageStr + "<a href=\"javascript:gotoPage('" + (i + 1) + "','"+searchFunName+"');\"><span>";
						}
						pageStr = pageStr + (i + 1);
						pageStr = pageStr + "</span></a>";
					}
				}
				else 
				{
					if (curPage - 2 > 1) 
					{
						if(curPage + 2 < totalPage)
						{
							pageStr = pageStr
									+ "<a href=\"javascript:gotoPage(1,'"+searchFunName+"');\"><span>1</span></a><span>...</span>";
							for ( var i = curPage - 1; i <= curPage+1; i++) 
							{
								if (i == curPage) 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\" class='checkThis'><span>";
								} 
								else 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\"><span>";
								}
								pageStr = pageStr + i;
								pageStr = pageStr + "</span></a>";
							}
							pageStr = pageStr
								+ "<span>...</span><a href=\"javascript:gotoPage("
								+ totalPage + ",'"+searchFunName+"');\"><span>" + totalPage + "</span></a>";
						}
						else
						{
							pageStr = pageStr
									+ "<a href=\"javascript:gotoPage(1,'"+searchFunName+"');\"><span>1</span></a><span>...</span>";
							for ( var i = curPage - 2; i <= totalPage; i++) 
							{
								if (i == curPage) 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\" class='checkThis'><span>";
								} 
								else 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\"><span>";
								}
								pageStr = pageStr + i;
								pageStr = pageStr + "</span></a>";
							}
						}
					}
					else 
					{
						if(curPage + 2 < totalPage)
						{
							for ( var i = 1; i <= 3; i++) 
							{
								if (i == curPage) 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\" class='checkThis'><span>";
								} 
								else 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\"><span>";
								}
								pageStr = pageStr + i;
								pageStr = pageStr + "</span></a>";
							}
							pageStr = pageStr
								+ "<span>...</span><a href=\"javascript:gotoPage("
								+ totalPage + ",'"+searchFunName+"');\"><span>" + totalPage + "</span></a>";
						}
						else
						{
							for ( var i = 1; i <= curPage; i++) 
							{
								if (i == curPage) 
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\" class='checkThis'><span>";
								} else
								{
									pageStr = pageStr + "<a href=\"javascript:gotoPage('"
											+ i + "','"+searchFunName+"');\"><span>";
								}
								pageStr = pageStr + i;
								pageStr = pageStr + "</span></a>";
							}
						}
					}

				}
				pageStr = pageStr + "<a  href=\"javascript:gotoPage('next','"+searchFunName+"')\"><span>&gt;</span></a>";
				
				$(listStr).append(pageStr);
				$(listStr).css('width',function()
				{
					var len = 0;

					$(this).children().each(function()
					{
						len += Number($(this).outerWidth(true,true)) 
					})

					return len + 1;
				})
				if(alltotal <= 0)
				{
					$(listStr).find("a").hide();
					$(listStr).find("#totalP").text("0");
				}
				/**
				* 跳转到指定分页
				*/
				window.curPage = 0;
				window.totalPage = 0;
				window.gotoPage = function (page) 
				{
					curPage = parseInt(curPage);
					totalPage = parseInt(totalPage);
					if (page == 'first') 
					{
						curPage = curPage - 1;
					}
					else if (page == 'pre')
					{
						if (curPage <= 1) 
						{
							return;
						} else 
						{
							curPage = curPage - 1;
						}
					} 
					else if (page == 'next') 
					{
						if (curPage >= totalPage) 
						{
							return;
						} 
						else 
						{
							curPage = curPage + 1;
						}
					}
					else if (page == 'last') 
					{
						curPage = totalPage;
					}
					else 
					{
						curPage = parseInt(page);
					}
					getList(curPage);
				}

				/**
				*分页页面跳转
				*/
				window.getList = function (curP)
				{
					window.location.href = com.changeUrlPar(window.location.href,
					{
						'page' :  curP
					});
				}
			},
			"curUrl" : window.location.href,//当前页面地址,
			"JPlaceHolder" : {   
				//检测    
				_check : function(){
					return 'placeholder' in document.createElement('input'); 
				},   
				//初始化  
				init : function(){      
					if(!this._check())
					{            
						this.fix();        
					}   
				},    
				//修复  
				fix : function(){        
					jQuery(':input[placeholder]').each(
						function(index, element) 
						{  
							if($(this).val() == "")
							{
								var self = $(this), 
								txt = self.attr('placeholder');          
								self.wrap(
									$('<div></div>').css(
										{
											position:'relative', 
											zoom:'1', 
											border:'none',
											background:'none',
											padding:'none', 
											margin:'none'
										}
									)
								);       
								var pos = self.position(), 
								h = self.outerHeight(true),
								paddingleft = self.css('padding-left');   
								lineHeight = self.css('line-height');     
								textIndent = self.css('text-indent');
								var holder = $('<span></span>').text(txt).css(
									{
										position:'absolute', 
										left:pos.left, 
										top:pos.top, 
										height:h, 
										lienHeight:h, 
										paddingLeft:paddingleft, 
										lineHeight:lineHeight, 
										textIndent:textIndent,
										color:'#d1d0d0'
									}
								).appendTo(self.parent());    
								self.focusin(
									function(e) 
									{     
										holder.hide();        
									}
								).focusout(
									function(e) 
									{       
										if(!self.val())
										{                 
											holder.show();             
										}        
									}
								);           
								holder.click(
									function(e) 
									{    
										holder.hide();            
										self.focus();       
									}
								); 
							}
						}
					);  
				}
			}
		}
	}
)


