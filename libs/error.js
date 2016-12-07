define(['jquery','common_mod','data_mod','popup_mod'],
	function($,com,aData,popup)
	{
		var erroropt;
		return erroropt = {
			/**
			 * 网页跳转 
			 * jumphref:跳转地址
			 */
			webJump : function(jumphref)
			{
				if(jumphref == window.location.href || com.isillegal(jumphref))
				{
					return;
				}
				else
				{
					var pathnameArr = jumphref.split("?");
					var paramStr = pathnameArr[1];
					
					if(com.isillegal(paramStr))
					{
						window.location.href = jumphref+"?pre="+window.location.href;
					}
					else
					{
						window.location.href = jumphref+"&pre="+window.location.href;
					}
				}
			},
			/**
			 * 根据模块名称和错误码，获取错误提示信息
			 * modeName:模块名;act:操作说明;errno:错误码
			 */
			ErrInfoDlg : function(modeName, act, errno, jumpUrl)
			{
				var loginStateUrl = aData.webHttpsUrl + '/page/passpage/login.html';
				
				var regStateUrl = aData.webHttpsUrl + '/page/passpage/reg.html';
				
				var loginSaleStateUrl = aData.saleWebHttpsUrl + '/page/passpage/login.html';
				
				if(modeName == "user")
				{
					switch(errno)
					{
						case 0 : popup.hintSuccessDlg("正常 ");break;
						case 1 : erroropt.webJump(loginStateUrl);break;
						case 2 : popup.hintInfoDlg("");break;
						case 3 : popup.hintInfoDlg("",loginSaleStateUrl);break;
						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
				else if(modeName == "order")
				{
					switch(errno)
					{
						case 0:popup.hintSuccessDlg("正常 ");break;
						
						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
				else if(modeName === "caritem"){
					switch(errno)
					{
						case 0:popup.hintSuccessDlg("正常 ");break;

						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
				else if(modeName === "serviceorder")
				{
					switch(errno)
					{
						case 0:popup.hintSuccessDlg("正常 ");break;
						
						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
				else if(modeName === "carinformation")
				{
					switch(errno)
					{
						case 0:popup.hintSuccessDlg("正常 ");break;
						
						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
				else
				{
					switch(errno)
					{
						case 0:popup.hintSuccessDlg("正常 ");break;
						
						default:popup.hintInfoDlg("系统忙，请稍后再试");break;
					}
				}
			}
		}
	}
)


