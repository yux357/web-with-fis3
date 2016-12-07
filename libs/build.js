({
    appDir: "../",
    baseUrl: "./",
    dir: "../../dev-r-build",
    optimize: "none",
    inlineText: true,
    // findNestedDependencies: true,
    paths: {

        "jqueryMod": "libs/jquery.min.js",
        "common_mod": "libs/common.js",
        "data_mod": "libs/data.js",
        "error_mod": "libs/error.js",
        "store_mod": "libs/store_json2.min.js",
        "head_mod": "component/head/head.js",
        "foot_mod": "component/foot/foot.js",
        "plugins_mod": "component/plugins/plugins.js",
        "tinyscrollbar_mod": "libs/tinyscrollbar.js",
        "popup_mod": "component/popup/popup.js",
        "pagination_mod": "component/pagination/pagination.js",
        "calendar_mod": "component/calendar/calendar.js",
        "rangePlugins_mod": "libs/jquery.range.js",
        "mzoom_mod": "libs/magiczoomplus.js",
        "index_main": "js/index.js",
        "index_mod": "js/index_mod.js"
    },
   shim : {
        'mzoom_mod':{
              deps:[],
              exports: 'mzoom_mod'
        }
        ,'store_mod':{
              deps:[],
              exports: 'store_mod'
        }
        ,'rangePlugins_mod' : ['jquery'] 
        ,'tinyscrollbar_mod' : ['jquery']
    },
    modules: [
        {
            name : 'index_main'
        }
        
    ],
    fileExclusionRegExp: /^(r|build)\.js|.*\.ness$/,  //过滤，匹配到的文件将不会被输出到输出目录去 
})
