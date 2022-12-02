$(document).ready(function () {

	if ($(window).width() > 1456) {
		// PC버전일때 draggable 실행
		console.log('a')
		$('.main-layer-popup').draggable();
	}

	// 메인 레이어팝업 (오늘 하루 보지 않기 체크된 팝업 히든 처리)
	$('.main-layer-popup').each(function () {
		var pop = $(this);
		if (popupGetCookie($(this).attr("id"))) { // '오늘 하루 보지 않기 체크'를 했다면
			pop.hide();
		} else {
			pop.show();
		}
	});

	// main_page_navi scroll
	// $(".main_page_navi > li > a").on("click", function () {
	// 	var headerHeight = $("header").outerHeight(); // 헤더 높이 구하기. outerHeight() 사용할 것
	// 	var href = $(this).attr("href"); // 버튼의 링크 구하기
	// 	var target = $(href == "#" || href == "" ? "body" : href); // 링크대상 DOM 구하기
	// 	var position = target.offset().top - headerHeight; // 링크대상 DOM의 height위치 구하기

	// 	$(".main_page_navi > li > a").removeClass("active");
	// 	$(this).addClass("active");

	// 	$("html, body").animate({
	// 		// 에니메이션 효과를 넣어서 그 DOM으로 이동시키기
	// 		scrollTop: position
	// 	}, 600, "swing");
	// });

	// function navOn() {
	// 	// 1. 현재 scrollTop() 값을 가져오기 위해 변수에 넣는다.
	// 	var nowTop = $(window).scrollTop();

	// 	// 2. 각 섹션의 offset().top 값을 가져온다.
	// 	// 2-1. 고정된 header가 있는 경우 header의 높이 만큼 뺀다.
	// 	var sec1_offset = $('#sec01').offset().top - 152;
	// 	var sec2_offset = $('#sec02').offset().top - 152;
	// 	var sec3_offset = $('#sec03').offset().top - 152;
	// 	var sec4_offset = $('#sec04').offset().top - 152;
	// 	var sec5_offset = $('#sec05').offset().top - 152;

	// 	// 3. class를 초기화 시킨다.
	// 	$('.main_page_navi > li > a').removeClass('active');

	// 	// 4. 현재 scrollTop()의 값이 각 섹션의 범위에 있으면 class를 추가한다.
	// 	if (nowTop >= 0 && nowTop < sec2_offset) {
	// 		$('.main_page_navi > li').eq(0).find('>a').addClass('active');
	// 	} else if (nowTop >= sec2_offset && nowTop < sec3_offset) {
	// 		$('.main_page_navi > li').eq(1).find('>a').addClass('active');
	// 	} else if (nowTop >= sec3_offset && nowTop < sec4_offset) {
	// 		$('.main_page_navi > li').eq(2).find('>a').addClass('active');
	// 	} else if (nowTop >= sec4_offset && nowTop < sec5_offset) {
	// 		$('.main_page_navi > li').eq(3).find('>a').addClass('active');
	// 	} else if (nowTop >= sec5_offset) {
	// 		$('.main_page_navi > li').eq(4).find('>a').addClass('active');
	// 	}
	// };

	var $menu = $('.main_page_navi > li'),
		$contents = $('.sec01, .sec02, .sec03, .sec04, .sec05'),
		$doc = $('html, body');

	$menu.on('click', 'a', function (e) {
		var $target = $(this).parent(),
			idx = $target.index(),
			section = $contents.eq(idx),
			offsetTop = (section.offset().top) - ($("header").outerHeight());
		$doc.stop().animate({
			scrollTop: offsetTop
		}, 600);
		return false;
	});

	$(window).scroll(function () {
		// 4. scroll function을 넣어 scroll을 트리거로 이벤트를 발생시킨다.
		//navOn();
		var scltop = $(window).scrollTop();
		$.each($contents, function (idx, item) {
			var $target = $contents.eq(idx),
				i = $target.index(),
				targetTop = ($target.offset().top) - $("header").outerHeight();

			if (targetTop <= scltop) {
				$menu.find('>a').removeClass('active');
				$menu.eq(idx).find('>a').addClass('active');
			}
		})
	});

	// Main Visual Slide
	var mainVisualSwiper = new Swiper(".main_slide", {
		slidesPerView: 1,
		loop: true,
		loopAdditionalSlides: 1,
		navigation: {
			nextEl: ".main_slide .swiper-button-next",
			prevEl: ".main_slide .swiper-button-prev",
		}
	});

	// 소식 Slide
	// 텝 활성화
	var tabActive1 = $(".sec02 .tab_nav > li > .active").attr("data-tab");
	$(".sec02 .tab_wrap .tab_box").hide();
	$(".sec02 .tab_wrap #" + tabActive1).show();

	$(".sec02 .tab_nav > li > .tab_btn").on("click", function () {
		var dataId = $(this).attr("data-tab");
		$(".sec02 .tab_nav > li >.tab_btn").removeClass("active");
		$(this).addClass("active");
		$(".sec02 .tab_wrap .tab_box").hide();
		$(".sec02 .tab_wrap #" + dataId).show();
	})

	var tabBox1 = new Swiper(".sec02 .tab_box", {
		slidesPerView: 4,
		spaceBetween: 30,
		autoplay: {
			delay: 2500, // 시간 설정          
			disableOnInteraction: false, // false-스와이프 후 자동 재생        
		},
		breakpoints: {
			// when window width is >= 480px
			1440: {
				slidesPerView: "auto",
				//slidesPerGroup: 1,
				slidesOffsetBefore: 10,
				spaceBetween: 20
			}
		},
		loop: false,
		//loopAdditionalSlides: 1,
		observer: true,
		observeParents: true,
		pagination: {
			el: '.tab_box .swiper-pagination',
			clickable: true,
			type: 'bullets'
		},
		navigation: {
			nextEl: ".tab_box .btn_next",
			prevEl: ".tab_box .btn_prev",
		}
	});

	$('.sec02 .tab_box .btn_pause').click(function () {
		$('.tab_box .btn_pause').hide();
		$('.tab_box .btn_play').show();
		$.each(tabBox1, function (index, item) {
			tabBox1[index].autoplay.stop();
		});
		//tabBox1.autoplay.stop();
	});

	$('.sec02 .tab_box .btn_play').click(function () {
		$('.tab_box .btn_play').hide();
		$('.tab_box .btn_pause').show();
		$.each(tabBox1, function (index, item) {
			tabBox1[index].autoplay.start();
		});
		//tabBox1.autoplay.start();
	});

	// 사업소개 navgation
	// 텝 활성화
	var tabActive1 = $(".sec03 .tab_nav > li > .active").attr("data-tab");
	$(".sec03 .tab_wrap .tab_box").hide();
	$(".sec03 .tab_wrap #" + tabActive1).show();

	$(".sec03 .tab_nav > li > .tab_btn").on("click", function () {
		var dataId = $(this).attr("data-tab");
		$(".sec03 .tab_nav > li >.tab_btn").removeClass("active");
		$(this).addClass("active");
		if (!($(".sec03 .tab_wrap #" + dataId).is(':visible'))) {
			$(".sec03 .tab_wrap .tab_box").hide();
			$(".sec03 .tab_wrap #" + dataId).fadeIn();
		}
	})

	var tabNav = new Swiper(".sec03 .tab_nav_wrap", {
		freeMode: true,
		slidesPerView: "auto",
		slidesOffsetBefore: 10
	});

	var mql = window.matchMedia("all and (min-width: 1457px)");
	var mySwiper;
	mql.addListener(function () {
		initSwiper();
	});

	function initSwiper() {
		if (mql.matches) {
			if (tabNav) {
				tabNav.destroy();
			}
		} else {
			tabNav = new Swiper(".sec03 .tab_nav_wrap", {
				freeMode: true,
				slidesPerView: "auto",
				slidesOffsetBefore: 10
			});
		}
	}
	initSwiper();

	// 팝업존
	var popupzone = new Swiper(".popup_wrap", {
		slidesPerView: 1,
		loop: true,
		loopAdditionalSlides: 1,
		autoplay: {
			delay: 2500, // 시간 설정          
			disableOnInteraction: false, // false-스와이프 후 자동 재생        
		},
		navigation: {
			nextEl: ".popup_wrap .btn_next",
			prevEl: ".popup_wrap .btn_prev",
		}
	});

	$('.popup_wrap .btn_pause').click(function () {
		$('.popup_wrap .btn_pause').hide();
		$('.popup_wrap .btn_play').show();
		popupzone.autoplay.stop();
	});

	$('.popup_wrap .btn_play').click(function () {
		$('.popup_wrap .btn_play').hide();
		$('.popup_wrap .btn_pause').show();
		popupzone.autoplay.start();
	});

	// 정기간행물 및 홍보영상
	var publication = new Swiper(".publication_wrap", {
		slidesPerView: 1,
		centeredSlides: true,
		roundLengths: true,
		spaceBetween: 120,
		loop: true,
		loopAdditionalSlides: 1,
		navigation: {
			prevEl: ".publication_wrap .swiper-button-prev",
			nextEl: ".publication_wrap .swiper-button-next",
		},
		breakpoints: {
			// when window width is >= 480px
			1440: {
				spaceBetween: 121,
			}
		},
	});
})

// 리사이즈 했을 경우
$(window).resize(function () {
	if (this.resizeTO) {
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function () {
		$(this).trigger('resizeEnd');
	}, 100);
});

// 리사이즈가 끝났을 경우
$(window).on("resizeEnd", function () {
	if ($(this).width() < 1456) {
		$('.main-layer-popup').draggable('destroy');
	} else {
		$('.main-layer-popup').draggable();
	}
});

// 레이어팝업 (오늘 하루 보이지 않기)
function PopupCloseDay(winName) {
	var id = $(winName).parents('.main-layer-popup').attr('id');
	mainPopupSetCookie(id, "done", 1);
	$('#' + id).hide();
}

// 레이어 팝업 닫기
function closePopup(obj) {
	$(obj).parents('.main-layer-popup').hide();
}

// 레이어 팝업 쿠키 찾기
function popupGetCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

// 레이어 팝업 쿠키 생성
function mainPopupSetCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
	if (todayDate > new Date()) {
		expiredays = expiredays - 1;
	}
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}