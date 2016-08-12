$(function() {
	// 图片预加载.
	var obj = {
		arr: ["img/bg.jpg", "img/FullSizeRender.jpg"],
		loaded: loadeds
	}
	var index = 0;

	function load(obj) {
		for(var i = 0; i < obj.arr.length; i++) {
			var img = new Image();
			img.src = obj.arr[i];
			img.onload = function() {
				index++;
				if(index == obj.arr.length) {
					obj.loaded();
				}
			}
		}
	}
	load(obj);

	function loadeds() {
		$(".img").css("background",'url("img/FullSizeRender.jpg")');
		$(".img").css("backgroundSize",'cover');
		$(".img").css("-moz-backgroundSize",'cover');
		$(".introduce-content").css("right",$(".introduce-content").width()/2)

		var height = $(window).height();
		$(".introduce-content").css("height",height*.8)
		
		$(".welcom-word").css({
			marginTop: height / 2 - $(".welcom-word").height() / 2,
			opacity: "1"
		})
		$(".load").remove()
		$(".welcome").css({
			background: "url(img/bg.jpg) no-repeat center center",
			backgroundSize: "cover",
		})
		$(".mask").addClass("animate");
		$(".show").height(height * 5);
		$("section").height(height);
		var top = 0;
		//处理浏览器滚轮兼容
		function MouseWheel(ele, fun) {
			var agent = window.navigator.userAgent;
			if(agent.indexOf("Firefox") != -1) {
				ele.addEventListener("DOMMouseScroll", wheel);
			} else {
				ele.onmousewheel = wheel;
			}

			function wheel(ev) {
				var down = false;
				if(ev.detail > 0 || ev.wheelDelta < 0) {
					down = true;
				}

				fun(down, ele, ev);
				return false;
			}
		}
		MouseWheel($(".show")[0], fun);
		var swit = true;
		function fun(bol) {
			if(swit) {
				if(bol) {
					//向下滚.
					$(".mask").css("-webkit-animation", "dis 0.8s ease forwards");
					$(".welcom-word").fadeOut()
					$(".nav").animate({
						top: 0
					}, {
						easing: "easeOutBounce",
						duration: 800
					})
					if(Math.abs($(".show")[0].offsetTop) >= height * 4) {
						$(".show").css("top", -height * 4)
					} else {
						top -= height;
						$(".show").animate({
							top: top
						}, 800)
					}
					swit = !swit;
					setTimeout(function() {
						swit = !swit;
					}, 800)

				} else {
					//向上滚
					if(Math.abs($(".show")[0].offsetTop) <= height) {
						$(".mask").css("-webkit-animation", "_dis 2s ease forwards");
						$(".welcom-word").fadeIn();
						$(".nav").animate({
							top: -55
						}, 800)
						top = 0;
						$(".show").animate({
							top: 0
						}, 800)
					} else {
						top += height;
						$(".show").animate({
							top: top
						}, 800)
					}
					swit = !swit;
					setTimeout(function() {
						swit = !swit;
					}, 800)

				}
			}
		}
		//logo图标刷新页面.
		$(".logo").click(function() {
			window.location.reload()
		})
		$(".logo")[0].addEventListener("touchstart", function() {
			window.location.reload()
		})

		//锚点单页面跳转.
		$('.list li').click(function() {
			$('.show').animate({
				top: -($(this).index() + 1) * $("section").height()
			}, 500, function() {
				top = $(".show")[0].offsetTop;
			});
		});
		//侧边栏
		$(".icon-menu").click(function() {
			$(".sliderbar").animate({
				right: 0
			}, {
				easing: "easeOutBounce",
				duration: 800
			})
		})
		$(".icon-menu").on("touchstart", function(e) {
			e.cancelBubble = true;
			$(".sliderbar").animate({
				right: 0
			}, {
				easing: "easeOutSine",
				duration: 800
			})
		})

		//关闭侧边栏
		$(".back").click(function() {
			$(".sliderbar").animate({
				right: "-3em"
			}, 500)
		})
		$(".back").on("touchstart", function(e) {
			e.preventDefault();
			e.cancelBubble = true;
			$(".sliderbar").animate({
				right: "-3em"
			}, 500)
		})

		//侧边栏锚点跳转
		$(".slider-list li").click(function() {
			$(".show").animate({
				top: -$(this).index() * $("section").height()
			}, 500, function() {
				top = $(".show")[0].offsetTop;
			})
		})
		$(".slider-list li").on("touchstart", function() {
			$(".show").animate({
				top: -$(this).index() * $("section").height()
			}, 500, function() {
				top = $(".show")[0].offsetTop;
			})
		})

		//移动端滚屏事件.
		$("body")[0].addEventListener("touchstart", function(e) {
			e.preventDefault();
		})
		var touchbol = true;
		touch.on($(".show"), "swipe", function(e) {
			e.preventDefault();
			if(touchbol) {
				if(e.direction == "down") {
					touchbol = false;
					if(Math.abs($(".show")[0].offsetTop) <= height) {
						$(".mask").css("-webkit-animation", "_dis 2s ease forwards");
						$(".welcom-word").fadeIn();
						$(".nav").animate({
							top: -55
						}, 800)
						top = 0;
						$(".show").animate({
							top: 0
						}, 800, function() {
							touchbol = true;
						})
					} else {
						top += height;
						$(".show").animate({
							top: top
						}, 800, function() {
							touchbol = true;
						})
					}
				}
			}
			if(e.direction == "up") {
				if(touchbol) {
					touchbol = false;
					$(".mask").css("-webkit-animation", "dis 0.8s ease forwards");
					$(".welcom-word").fadeOut()
					$(".nav").animate({
						top: 0
					}, {
						easing: "easeOutBounce",
						duration: 800
					}, function() {
						touchbol = true;
					})
					if(Math.abs($(".show")[0].offsetTop) >= height * 4) {
						$(".show").css("top", -height * 4)
						touchbol = true;
					} else {
						top -= height;
						$(".show").animate({
							top: top
						}, 800, function() {
							touchbol = true;
						})
					}
				}
			}
		})
	}
})