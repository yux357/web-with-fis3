var _MOD_NAME = {
	/*公共MOD文件*/
	jqueryMod :  __uri('../libs/jquery.min.js')                             //jquery
	,common_mod : __uri('../libs/common.js')                                //基本函数库
	,data_mod : __uri('../libs/data.js')                                    //静态数据库
	,error_mod : __uri('../libs/error.js')                                    //错误码库
	,store_mod : __uri('../libs/store_json2.min.js')                        //本地存储库
	,head_mod : __uri('../component/head/head.js')                          //头部
	,foot_mod : __uri('../component/foot/foot.js')                          //脚部	

	,plugins_mod : __uri('../component/plugins/plugins.js')                 //扩展组件库
	,tinyscrollbar_mod : __uri('../libs/tinyscrollbar.js')                  //滚动条插件
	,popup_mod : __uri('../component/popup/popup.js')                       //弹出框
	,pagination_mod : __uri('../component/pagination/pagination.js')        //分页
	,calendar_mod : __uri('../component/calendar/calendar.js')              //日期组件
	,rangePlugins_mod : __uri('../libs/jquery.range.js')                    //拖动选择组件
	,mzoom_mod : __uri('../libs/magiczoomplus.js')                          //图片放大镜组件

	/*入口文件*/
	,index_main : __uri('../js/index.js')                                   //首页

	/*MOD文件*/
	,index_mod : __uri('../js/index_mod.js')                                //首页
}

var cutJs = function(s)
{
	return s.substring(0,s.length-3);
}

require.config(
{
	baseUrl : "/",
	paths: {
		/*公共MOD文件*/
		'jquery' : cutJs(_MOD_NAME.jqueryMod)                               //jquery
		,'common_mod' : cutJs(_MOD_NAME.common_mod)                         //基本函数库
		,'data_mod' : cutJs(_MOD_NAME.data_mod)                             //静态数据库
		,'error_mod' : cutJs(_MOD_NAME.error_mod)                           //错误码库
		,'store_mod' : cutJs(_MOD_NAME.store_mod)						    //本地存储库
		,'head_mod' : cutJs(_MOD_NAME.head_mod)                             //头部	
		,'foot_mod' : cutJs(_MOD_NAME.foot_mod)							    //脚部	

		,'plugins_mod' : cutJs(_MOD_NAME.plugins_mod)                       //扩展组件库
		,'tinyscrollbar_mod' : cutJs(_MOD_NAME.tinyscrollbar_mod)           //滚动条插件
		,'popup_mod' : cutJs(_MOD_NAME.popup_mod)                           //弹出框
		,'pagination_mod' : cutJs(_MOD_NAME.pagination_mod)                 //分页
		,'calendar_mod' : cutJs(_MOD_NAME.calendar_mod)                     //日期组件
		,'rangePlugins_mod' : cutJs(_MOD_NAME.rangePlugins_mod)             //拖动选择组件
		,'mzoom_mod' : cutJs(_MOD_NAME.mzoom_mod)							//图片放大镜组件

		/*入口文件*/
		,'index_main' : cutJs(_MOD_NAME.index_main)                         //首页	
		
		/*MOD文件*/
		,'index_mod' : cutJs(_MOD_NAME.index_mod)                           //首页
	},
	waitSeconds : 0,
	shim : {
		'mzoom_mod':{
			  deps:[],
			  exports: 'mzoom_mod'
		}
		,'store_mod':{
			  deps:[],
			  exports: 'store_mod'
		}
		,'bannerPlugins_mod' : ['jquery'] 
		,'rangePlugins_mod' : ['jquery'] 
		,'tinyscrollbar_mod' : ['jquery']
	}
});

