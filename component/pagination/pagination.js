define(
	[
		'jquery'
		,'common_mod'
	]
	,function($,com)
	{
		var pagination;
		
		pagination = {
			/*分页 obj{count,page,perpage,totalPage,pageText}*/
			init : function(pageInfo)
			{
				var count = Number(pageInfo.count);
				var page = Number(pageInfo.page);
				var perpage = Number(pageInfo.perpage);
				var totalPage = Number(pageInfo.totalPage);
				var pageFlag =  pageInfo.pageFlag || 'page';

				var _p = {};	

				_p.jump = function(_page)
				{
					var o = {};

					o[pageFlag] = _page;

					window.location.href = com.changeUrlPar(window.location.href,o);
				}

				$.fn.pasteEvents = function( delay ) {
				    if (delay == undefined)
				    {
				    	delay = 10;
				    } 
				    return $(this).each(function() {
				        var $el = $(this);
				        $el.on("paste", function() {
				            $el.trigger("prepaste");
				            setTimeout(function() { $el.trigger("postpaste"); }, delay);
				        });
				    });
				}

				// _p.pageStr = $([]);
				if(count === 0 || totalPage === 0){
					_p.pageouter = $([]);
				}
				else{
					_p.pageStr = $('<div></div>',{
						"class" : "pagination-buttons normal",
						"click" : function(){ 
							if(page == 1)
							{
								return false;
							}
							else
							{
								_p.jump(page - 1); 	
							}
						},
						"mouseenter" : function()
						{
							$(this).addClass("normal-hov");
						},
						"mouseleave" : function()
						{
							$(this).removeClass("normal-hov");
						},
						"html" : '<i class="left"></i><div class="fix"><p><i class="page-prev"></i></p></div><i class="right"></i>'
					})

					if(totalPage < 8)
			    	{
			    		for(var k=1;k<=totalPage;k++)
				    	{
				    		if(k === page)
			    			{
			    				_p.temp = $('<div></div>',{
			    					"class" : "pagination-buttons normal-choose",
			    					"click" : function(){ 
			    						_p.jump($(this).data("page")); 
			    					},
									"mouseenter" : function()
									{
										$(this).addClass("normal-hov");
									},
									"mouseleave" : function()
									{
										$(this).removeClass("normal-hov");
									},
			    					"html" : '<i class="left"></i><div class="fix"><p>' + k + '</p></div><i class="right"></i>'
			    				}).data("page",k);

			    				_p.pageStr = _p.pageStr.add(_p.temp);

			    				
			    			}
			    			else
			    			{
			    				_p.temp = $('<div></div>',{
			    					"class" : "pagination-buttons normal",
			    					"click" : function(){ 
			    						_p.jump($(this).data("page")); 
			    					},
									"mouseenter" : function()
									{
										$(this).addClass("normal-hov");
									},
									"mouseleave" : function()
									{
										$(this).removeClass("normal-hov");
									},
			    					"html" : '<i class="left"></i><div class="fix"><p>' + k + '</p></div><i class="right"></i>'
			    				}).data("page",k);

			    				_p.pageStr = _p.pageStr.add(_p.temp);
			    			}
				    	}	
			    	}
			    	else if(totalPage >= 8)
			    	{
			    		var startPage = page-2;
			    		var endPage = page+2;

			    		if(page === 4)
			    		{
			    			startPage = page-3;
			    		}
			    		else if(page === totalPage - 3)
			    		{
			    			endPage = page+3;
			    		}

		    			if(page > 4)
		    			{
		    				_p.temp = $('<div></div>',{
		    					"class" : "pagination-buttons normal",
		    					"click" : function(){ 
		    						_p.jump($(this).data("page")); 
		    					},
								"mouseenter" : function()
								{
									$(this).addClass("normal-hov");
								},
								"mouseleave" : function()
								{
									$(this).removeClass("normal-hov");
								},
		    					"html" : '<i class="left"></i><div class="fix"><p>1</p></div><i class="right"></i>'
		    				}).data("page",1);

		    				_p.pageStr = _p.pageStr.add(_p.temp.add(
		    					$("<span>...</span>")
		    				));

		    				// _p.pageStr += '<div class="pagination-buttons normal"><i class="left"></i>'
			    			// + '<div class="fix"><p>1</p></div><i class="right"></i></div><span>...</span>';
		    			}


			    		for(var k=startPage;k<=endPage;k++)
				    	{
				    		if(k > 0 && k <= totalPage)
				    		{
				    			if(k === page)
				    			{

				    				_p.temp = $('<div></div>',{
				    					"class" : "pagination-buttons normal-choose",
				    					"click" : function(){ 
				    						_p.jump($(this).data("page")); 
				    					},
										"mouseenter" : function()
										{
											$(this).addClass("normal-hov");
										},
										"mouseleave" : function()
										{
											$(this).removeClass("normal-hov");
										},
				    					"html" : '<i class="left"></i><div class="fix"><p>' + k + '</p></div><i class="right"></i>'
				    				}).data("page",k);

				    				_p.pageStr = _p.pageStr.add(_p.temp);

				    				// _p.pageStr += '<div class="pagination-buttons normal-choose"><i class="left"></i>'
				    				// + '<div class="fix"><p>' + k + '</p></div><i class="right"></i></div>';
				    			}
				    			else
				    			{
				    				_p.temp = $('<div></div>',{
				    					"class" : "pagination-buttons normal",
				    					"click" : function(){ 
				    						_p.jump($(this).data("page")); 
				    					},
										"mouseenter" : function()
										{
											$(this).addClass("normal-hov");
										},
										"mouseleave" : function()
										{
											$(this).removeClass("normal-hov");
										},
				    					"html" : '<i class="left"></i><div class="fix"><p>' + k + '</p></div><i class="right"></i>'
				    				}).data("page",k);

				    				_p.pageStr = _p.pageStr.add(_p.temp);

				    				// _p.pageStr += '<div class="pagination-buttons normal"><i class="left"></i>'
				    				// + '<div class="fix"><p>' + k + '</p></div><i class="right"></i></div>';
				    			}
				    			
				    		}
				    	}

				    	 if(page < totalPage - 3)
				    	 {

				    	 	_p.temp = $('<div></div>',{
		    					"class" : "pagination-buttons normal",
		    					"click" : function(){ 
		    						_p.jump($(this).data("page")); 
		    					},
								"mouseenter" : function()
								{
									$(this).addClass("normal-hov");
								},
								"mouseleave" : function()
								{
									$(this).removeClass("normal-hov");
								},
		    					"html" : '<i class="left"></i><div class="fix"><p>' + totalPage + '</p></div><i class="right"></i>'
		    				}).data("page",totalPage);

		    				_p.pageStr = _p.pageStr.add($("<span>...</span>").add(_p.temp));

				    	 // 	_p.pageStr += '<span>...</span><div class="pagination-buttons normal"><i class="left"></i>'
				    		// + '<div class="fix"><p>' + totalPage + '</p></div><i class="right"></i></div>';
				    	 }
			    	}

			    	_p.quickJump = $('<p><span>' + page + '/' + totalPage + '</span></p>');

			    	_p.pageStr = _p.pageStr.add($('<div></div>',{
						"class" : "pagination-buttons normal",
						"click" : function(){ 
							if(page == totalPage)
							{
								return false;
							}
							else
							{
								_p.jump(page + 1); 	
							}
						},
						"mouseenter" : function()
						{
							$(this).addClass("normal-hov");
						},
						"mouseleave" : function()
						{
							$(this).removeClass("normal-hov");
						},
						"html" : '<i class="left"></i><div class="fix"><p><i class="page-next"></i></p></div><i class="right"></i>'
					}));

			    	_p.pageList = $("<div></div>",{
						"class" : "pagination__page--list"
					}).append(_p.pageStr);

					_p.pageouter = $("<div></div>",{
						"class" : "pagination"
					}).append(
						$("<i></i>",{
							"class" : "pagination__topline"
						}).add(
							$("<div></div>",{
								"class" : "pagination__pageouter"
							})
							.append($("<div></div>",{
								"class" : "pagination__page"
							}).append(
									$([])
									.add(_p.pageList)
									.add(_p.quickJump)
								)
							)
						)
					)
				}
				
				
				return _p.pageouter;
			}
		}

		return pagination;
	}
)
