
define(['jquery','common_mod'],function($,com)
{
	var popup;
	popup = {
		hintCodeDlg : function(pobj)
		{
			var pobj = pobj;
			var mobile = !com.isillegal(pobj.mobile) ? pobj.mobile : '';
			var listStr = '';
			listStr += '<div class="pop-up-code js-codePopup">';
			listStr += '<div class="pop-up-code__cancel js-popCancel"></div>';
			listStr += '<div class="pop-up-code__head js-popHead">';
			listStr += '<div class="pop-up-code__head--tips">请输入验证码</div>';
			listStr += '</div>';
			listStr += '<div class="pop-up-code__content">';
			listStr += '<input class="pop-up-code__content--input js-imgcode" mobile="'+mobile+'" type="text" value="">';
			listStr += '<div class="pop-up-code__content--code">';
			listStr += '<img class="pop-up-code__content--code--img js-chkcode" src="http://www.ceccar.com.cn/json.php?mod=checkcode&amp;act=get" alt="">';
			listStr += '<i class="pop-up-code__content--code--i js-chagcode" title="换一张"></i>';								
			listStr += '</div>';
			listStr += '<div class="pop-up-code__content--msg js-imgCodeMsg"></div>';
			listStr += '</div>';
			listStr += '<div class="pop-up-code__button"><center>';
			listStr += '<input class="pop-up-code__button--confirm js-codeSubmit" type="button" value="确定"></center>';
			listStr += '</div>';
			
			listStr += '<div class="pop-up-code__botmode"></div>';
			listStr += '</div>';
			
			com.floatingLayer(listStr,
				{
					"move" : ".js-popHead",
					"cancel" : [".js-popCancel"]
				}
			);
			
		},
		/**
		 * 初始化操作弹出框
		 * pobj :  width -- 主体内容宽度  ; title -- 标题； htmlcontent -- 标题
		 */
		fun_optPopup : function(pobj)
		{
			var title = !com.isillegal(pobj.title) ? pobj.title : '';
			var width = !com.isillegal(pobj.width) ? parseInt(pobj.width) : '';
			var classname = !com.isillegal(pobj.classname) ? ' ' + pobj.classname : '';
			var classObj = !com.isillegal(pobj.classname) ? pobj.classname : 'js-popupBox';
			var htmlcontent = !com.isillegal(pobj.htmlcontent) ? pobj.htmlcontent : '';
			
			var popStr = '';
			
			popStr += '<div class="popup_opt_box js-showImgPop js-popupBox'+classname+'">';
			popStr += '<div class="popup_opt_box__head js-popupHead">';
			popStr += '<div class="popup_opt_box__head-l"></div>';
			popStr += '<div class="popup_opt_box__head-c js-popupWidth">';
			popStr += '<i class="popup_opt_box__head--title">'+title+'</i>';
			popStr += '<i class="popup_opt_box__head--close js-popupClose"></i>';
			popStr += '</div>';
			popStr += '<div class="popup_opt_box__head-r"></div>';
			popStr += '</div>';
			
			popStr += '<div class="popup_opt_box__con">';
			popStr += '<div class="popup_opt_box__con-l js-popupCHeight"></div>';
			//popStr += '<div class="popup_opt_box__con-c js-popupCHeight js-popupCWidth js-popupCBody">';
			popStr += '<div class="popup_opt_box__con-c js-popupCWidth js-popupCBody">';
			popStr += '<div class="popup_optb__con js-popupCFilled">';
			/*
			 * 弹出框中主体内容
			 * 根据 js-popupCFilled 宽度和高度 设置 js-popupWidth的宽度 以及  js-popupCHeight的高度
			 * js-popupBox 弹出框总宽度 = js-popupWidth 宽度 + 40
			*/
			
			popStr += htmlcontent;
			
			popStr += '</div>';
			popStr += '</div>';
			popStr += '<div class="popup_opt_box__con-r js-popupCHeight"></div>';
			popStr += '</div>';
			
			popStr += '<div class="popup_opt_box__foot">';
			popStr += '<div class="popup_opt_box__foot-l"></div>';
			popStr += '<div class="popup_opt_box__foot-c js-popupWidth"></div>';
			popStr += '<div class="popup_opt_box__foot-r"></div>';
			popStr += '</div>';
				
			popStr += '</div>';
			
			com.floatingLayer(popStr,
				{
					"move" : ".js-popupHead",
					"cancel" : [".js-popupClose"]
				}
			);
			
			var pObj = !com.isillegal(pobj.classname) ? $("."+pobj.classname) : $(".js-popupBox");
			
			if(!com.isillegal(width))
			{
				pObj.css("width",(width+40) + "px");
				pObj.find(".js-popupWidth").css("width",(width) + "px");
				pObj.find(".js-popupCWidth").css("width",(width+18) + "px");
			}
			
			var height = pObj.find(".js-popupCFilled").height();
           	pObj.find(".js-popupCHeight").css({"height":(height)+"px"});
           	com.floatingLayerFixed($("."+classObj));
			
			pObj.find(".js-popupCFilled").bind("DOMSubtreeModified DOMNodeInserted DOMNodeRemoved DOMNodeRemovedFromDocument DOMNodeInsertedIntoDocument DOMAttrModified DOMCharacterDataModified",
				function(e)
				{
		           	var height = pObj.find(".js-popupCFilled").height();
		           	pObj.find(".js-popupCHeight").css({"height":(height)+"px"});
		           	com.floatingLayerFixed($("."+classObj));
				}
			);
			
			return true;
		},
		/**
		 * 在当前窗口对象弹出提示信息
		 * hitnMsg:提示信息
		 */
		hintInfoDlg : function(hintMsg,thisUrl,jumpSet)
		{
			var hintInfoDlg = '';
			hintInfoDlg += '<div class="pop-up-alert">';
			hintInfoDlg += '<div class="pop-up-alert__cancel js-popCancel"></div>';
			hintInfoDlg += '<div class="pop-up-alert__head js-popHead">';
			hintInfoDlg += '<div class="pop-up-alert__headtips alert__headtipsNo">抱歉</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '<div class="pop-up-alert__content">';
			hintInfoDlg += '<div class="pop-up-alert__content--head alert__content--headNo"></div>';
			hintInfoDlg += '<div class="pop-up-alert__con">';
			hintInfoDlg += '<div class="pop-up-alert__con--text">'+hintMsg+'</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '<div class="pop-up-alert__button"><center>';
			hintInfoDlg += '<input class="pop-up-alert__button--confirm js-popSubmit" type="button" value="确定"></center>';
			hintInfoDlg += '</div>';
			
			hintInfoDlg += '<div class="pop-up-alert__botmode"></div>';
			hintInfoDlg += '</div>';
			
			com.floatingLayer(hintInfoDlg,
				{
					"move" : ".js-popHead",
					"cancel" : [".js-popCancel",".js-popSubmit"]
				}
			);
			$(".js-popCancel").bind("click",function()
			{
				//com.floatingLayerClose($(".js-popCancel"));
				if(!com.isillegal(thisUrl))
				{
					if(jumpSet)
					{
						popupObj.webJump(thisUrl);
					}
					else
					{
						window.location.href = thisUrl;
					}
					
				}
			});
			
			$(".js-popSubmit").bind("click",function()
			{
				//com.floatingLayerClose($(".js-popSubmit"));
				if(!com.isillegal(thisUrl))
				{
					if(jumpSet)
					{
						popupObj.webJump(thisUrl);
					}
					else
					{
						window.location.href = thisUrl;
					}
					
				}
			});
			
		},
		/**
		 * 在当前窗口对象弹出操作成功提示信息
		 * hitnMsg:提示信息
		 */
		hintSuccessDlg : function(hintMsg,thisUrl)
		{
			var hintInfoDlg = '';
			hintInfoDlg += '<div class="pop-up-alert">';
			hintInfoDlg += '<div class="pop-up-alert__cancel js-popCancel"></div>';
			hintInfoDlg += '<div class="pop-up-alert__head js-popHead">';
			hintInfoDlg += '<div class="pop-up-alert__headtips alert__headtipsYes">成功</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '<div class="pop-up-alert__content">';
			hintInfoDlg += '<div class="pop-up-alert__content--head alert__content--headYes"></div>';
			hintInfoDlg += '<div class="pop-up-alert__con">';
			hintInfoDlg += '<div class="pop-up-alert__con--text">'+hintMsg+'</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '</div>';
			hintInfoDlg += '<div class="pop-up-alert__button"><center>';
			hintInfoDlg += '<input class="pop-up-alert__button--confirm js-popSubmit" type="button" value="确定"></center>';
			hintInfoDlg += '</div>';
			
			hintInfoDlg += '<div class="pop-up-alert__botmode"></div>';
			hintInfoDlg += '</div>';
			
			com.floatingLayer(hintInfoDlg,
				{
					"move" : ".js-popHead",
					"cancel" : [".js-popCancel",".js-popSubmit"]
				}
			);
			$(".js-popCancel").bind("click",function()
			{
				//com.floatingLayerClose($(".js-popCancel"));
				if((thisUrl != "") && (thisUrl != undefined) && (thisUrl != null))
				{
					window.location.href = thisUrl;
				}
			});
			
			$(".js-popSubmit").bind("click",function()
			{
				//com.floatingLayerClose($(".js-popSubmit"));
				if((thisUrl != "") && (thisUrl != undefined) && (thisUrl != null))
				{
					window.location.href = thisUrl;
				}
			});
			
		}
	}
	return popup;
})


