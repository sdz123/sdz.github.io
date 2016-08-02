$(function() {
	// 图片预加载.
	var obj = {
		arr: ["img/bg.jpg"],
		loaded: loadeds
	}
	load(obj);

	function load(obj) {
		for(var i = 0; i < obj.arr.length; i++) {
			var img = new Image();
			img.src = obj.arr[i];
			img.onload = function() {
				obj.loaded();
			}
		}
	}

	function loadeds() {
		var height = $(window).height();

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
				if(ev.detail > 0) {
					down = true;
				}
				if(ev.wheelDelta < 0) {
					down = true;
				}
				fun(down, ele, ev);
				return false;
			}
		}
		MouseWheel($(".show")[0], fun);
		var top = null;
		var swit = true;

		function fun(bol) {
			if(swit) {
				if(bol) {
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
					if(Math.abs($(".show")[0].offsetTop) <= height) {
						$(".mask").css("-webkit-animation", "_dis 2s ease forwards")
						$(".welcom-word").fadeIn()
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

		$('a').click(function() {
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top
			}, 500);
			return false;
		});

	}
})