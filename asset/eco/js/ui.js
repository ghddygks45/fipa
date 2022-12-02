// 반응형 체크
var mql = window.matchMedia("all and (min-width: 1457px)");
mql.addListener(function () {
	deviceCheck();
});

// 디바이스 체크
function deviceCheck() {
	if (mql.matches) {
		$("html").removeClass("mobile").addClass("desktop");
	} else {
		var varUA = navigator.userAgent.toLowerCase();
		if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
			$("html").removeClass("desktop").addClass("mobile ios-device");
		} else {
			$("html").removeClass("desktop").addClass("mobile");
		}
	}
}
deviceCheck();

// 테이블 가로스크롤 안내
var infoScroll = [];
infoScroll += ("<div class='info-scroll'><span>양 옆으로 스크롤하여<br>내용을 확인하실 수 있습니다.");

$(function () {
	// desktop gnb
	var max_h = 0;
	$(".desktop .header .depth_wrap").each(function () {
		var h = parseInt($(this).css("height"));
		if (max_h < h) {
			max_h = h;
		}
	});

	$(".desktop .header .depth_wrap").each(function () {
		$(this).css({
			height: max_h
		});
	});

	$(document).on("mouseenter focusin", ".desktop .gnb > .depth1 > li > a", function () {
		$(".desktop .gnb > .depth1 > li > a").removeClass("active");
		$(".desktop .header").addClass("open");
		$(".bg_gnb").remove();
		$(".header").prepend("<div class='bg_gnb'></div>");
		$(".bg_gnb").css("height", max_h);
		$(this).addClass("active");
		$(".desktop .gnb > .depth1 > li > .depth_wrap").show();

		//------- 개발 진행 시 삭제
		$(".desktop .header .depth_wrap").each(function () {
			var h = parseInt($(this).css("height"));
			if (max_h < h) {
				max_h = h;
			}
		});

		$(".desktop .header .depth_wrap").each(function () {
			$(this).css({
				height: max_h
			});
		});
		//------- 개발 진행 시 삭제
	});

	$(document).on("mouseenter", ".desktop .gnb > .depth1 > li > .depth_wrap", function () {
		$(".desktop .gnb > .depth1 > li > a").removeClass("active");
		$(this).prev().addClass("active");
		$(".desktop .gnb > .depth1 > li > .depth_wrap").show();
	});

	$(document).on("mouseleave", ".desktop .gnb", function () {
		$(".bg_gnb").remove();
		$(".desktop .header").removeClass("open");
		$(".desktop .gnb > .depth1 > li > a").removeClass("active");
		$(".desktop .gnb > .depth1 > li > .depth_wrap").hide();
	});

	// mobile gnb
	$(document).on("click", ".mobile .header .btn_menu_m", function () {
		$(".mobile .header .gnb_wrap").addClass("open");
		$(".mobile .header .depth1 > li > a").removeClass("active");
		$(".mobile .header .depth1 > li:first-child > a").addClass("active");
		$(".mobile .header .depth1 > li:first-child > .depth_wrap").show();
	});

	$(document).on("click", ".mobile .header .gnb_wrap.open .gnb_top .btn_close", function () {
		$(".mobile .header .gnb_wrap").removeClass("open");
		$(".mobile .header .depth1 > li > a").removeClass("active");
	});

	$(document).on("click", ".mobile .header .gnb>.depth1>li>a", function () {
		$(this).addClass("active").parent().siblings().find(">a").removeClass("active");
		$(this).parent().siblings().find(">.depth_wrap").hide();
		$(this).siblings().show();
		$('#gnb').scrollTop(0);
		return false;
	});

	$(".mobile .header .gnb > .depth1 > li > .depth_wrap > .depth2 > li").each(function () {
		if ($(this).children().length == 2) {
			$(this).find(">a").addClass("open");
		}
	});

	$(document).on("click", ".mobile .header .gnb .depth2 .open", function () {
		$(this).removeClass("open");
		$(this).addClass("active");
		return false;
	});

	$(document).on("click", ".mobile .header .gnb .depth2 .active", function () {
		$(this).removeClass("active");
		$(this).addClass("open");
		return false;
	});

	// lnb
	/*
	$(".lnb > ul > li").each(function () {
		if ($(this).children().length == 2) {
			$(this).find(">a").addClass("open");
		}
	});
	*/

	//sns share
	$(document).on("click", ".unit_button .btn_share", function () {
		$(this).toggleClass('close');
		if ($(this).hasClass("close")) {
			$(this).find(">span").text("공유하기 닫기");
		} else {
			$(this).find(">span").text("공유하기 열기");
		}
	});

	//faq
	$(document).on("click", ".q_box", function () {
		$(this).toggleClass('active');
	});

	$(document).ready(function () {
		$("table").each(function () {
			if ($(this).width() > $(this).parent(".table").width()) {
				if ($(window).width() < 1297) {
					if ($("html").attr("lang") == "ko") {
						$(this).parent(".table").prepend(infoScroll);
					}
				}
			}
		})

		$(".m_srcoll").each(function () {
			if ($(this).width() > $(this).parent(".chart_wrap").width()) {
				if ($(window).width() < 1297) {
					if ($("html").attr("lang") == "ko") {
						$(this).parent(".chart_wrap").prepend(infoScroll);
					}
				}
			}
		})

		// 모바일로 접속했는지 체크
		var filter = "win16|win32|win64|mac|macintel";
		if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
			// 모바일에서 가로 스크롤이 있는 테이블
			$(document).on("touchstart", ".info-scroll", function () {
				$(this).fadeOut();
			})
		} else {
			$(document).on("click", ".info-scroll", function () {
				$(this).fadeOut();
			})
		}
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
		if ($(this).width() < 1297) {
			// mobile
			// gnb
			$(".header").removeClass("open");
			$(".mobile .header .gnb > .depth1 > li > .depth_wrap > .depth2 > li").each(function () {
				if ($(this).children().length == 2) {
					$(this).find(">a").addClass("open");
				}
			});

		} else {
			// pc
			// gnb
			$(".header").removeClass("open");
			$(".header .header_cont .inner .gnb_wrap .gnb .depth1 > li > a").removeClass("active");
			$(".header .gnb .depth_wrap").removeAttr("style");
			$(".header .gnb_wrap").removeClass("open");
			$(".header .depth2 a").removeAttr("class");

			var max_h = 0;
			$(".desktop .header .depth_wrap").each(function () {
				var h = parseInt($(this).css("height"));
				if (max_h < h) {
					max_h = h;
				}
			});

			$(".desktop .header .depth_wrap").each(function () {
				$(this).css({
					height: max_h
				});
			});
			// sns share
			$(".unit_button .btn_share").removeClass("close");
		}

		$("table").each(function () {
			if ($(this).width() > $(this).parent(".table").width()) {
				if ($(window).width() < 1297) {
					if (!$(this).parent(".table").find(".info-scroll").length) {
						if ($("html").attr("lang") == "ko") {
							$(this).parent(".table").prepend(infoScroll);
						}
					}
				} else {
					$(this).parent(".table").find(".info-scroll").remove();
				}
			} else {
				$(this).parent(".table").find(".info-scroll").remove();
			}
		})

		$(".m_scroll").each(function () {
			if ($(this).width() > $(this).parent(".chart_wrap").width()) {
				if ($(window).width() < 1297) {
					if (!$(this).parent(".chart_wrap").find(".info-scroll").length) {
						if ($("html").attr("lang") == "ko") {
							$(this).parent(".chart_wrap").prepend(infoScroll);
						}
					}
				} else {
					$(this).parent(".chart_wrap").find(".info-scroll").remove();
				}
			} else {
				$(this).parent(".chart_wrap").find(".info-scroll").remove();
			}
		})

		// 헤더 공지사항 슬라이드
		// 개발 시 "setTimeout" 제거
		setTimeout(function () {
			notice_slide = new Swiper(".notice_slide", {
				direction: "vertical",
				slidesPerView: 1,
				autoplay: {
					delay: 3000,
				},
			})
		}, 300)

	})

	// datepicker
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년',
		showOn: "button",
		buttonImageOnly: false,
		buttonText: "달력",
		showOn: "both"
	});
	$(".datepicker").datepicker();

});

function noticeSlide() {
	notice_slide = new Swiper(".notice_slide", {
		direction: "vertical",
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3000,
		},
	})
}

function noticeSliderStop(obj) {
	$(obj).hide().next().css('display', 'inline-block');
	notice_slide.autoplay.stop();
	$('.notice_slide .btn_play').attr("tabindex", -1).focus();
}

function noticeSliderPlay(obj) {
	$(obj).hide().prev().css('display', 'inline-block');
	notice_slide.autoplay.start();
	$('.notice_slide .btn_stop').attr("tabindex", -1).focus();
}

// 레이어팝업
function fn_open_popup(id, e) {
	$(e).attr('data-wa-btn', 'focus');
	$(".layer_popup_box[data-popup=" + id + "]").show();
	$(".layer_popup_box[data-popup=" + id + "]").attr('tabindex', '0').focus();
}

function fn_hide_popup(id) {
	$(".layer_popup_box[data-popup=" + id + "]").hide();
	$("[data-wa-btn='focus']").focus();
	$("[data-wa-btn='focus']").removeAttr('data-wa-btn');
}

// 서브페이지 현재 메뉴 활성화
function currentPage(dep1, dep2) {
	$(".lnb>ul>li").eq(dep1 - 1).find(">a").removeClass("open").addClass("active");
	if (dep2) {
		$(".lnb>ul>li").eq(dep1 - 1).find(">a").removeClass("open").addClass("active open");
		$(".lnb>ul>li").eq(dep1 - 1).find(">ul>li").eq(dep2 - 1).find(">a").addClass("active");
	}
}

// 컨텐츠 영역 이미지 캡처 다운로드
function contentCapture() {
	loader('on', '이미지 파일 생성 중입니다.');
	window.setTimeout(function () {
		html2canvas(document.getElementById('container'), {
			scrollY: (window.pageYOffset * -1)
		}).then(function (canvas) {
			loader('off');
			if (navigator.msSaveBlob) {
				var blob = canvas.msToBlob();
				return navigator.msSaveBlob(blob, $('.content > .tit_area > h3').text() + '.jpg');
			} else {
				var link = document.createElement('a');
				link.href = canvas.toDataURL("image/jpeg");
				link.download = $('.content > .tit_area > h3').text() + '.jpg';
				link.click();
			}
		});
	}, 2000);
}

// 컨텐츠 영역 PDF 다운로드
function contentPdf() {
	loader('on', 'PDF 생성 중입니다.');
	window.setTimeout(function () {
		html2canvas(document.getElementById('container'), {
			scrollY: (window.pageYOffset * -1)
		}).then(function (canvas) {
			var imgData = canvas.toDataURL('image/jpeg');
			var imgWidth = 210;
			var pageHeight = imgWidth * 1.414;
			var imgHeight = canvas.height * imgWidth / canvas.width;
			var heightLeft = imgHeight;
			var doc = new jsPDF('p', 'mm');
			var position = 0;

			doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;

			while (heightLeft >= 20) {
				position = heightLeft - imgHeight;
				doc.addPage();
				doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
			}

			doc.save($('.content > .tit_area > h3').text() + '.pdf');
			loader('off');
		});
	}, 2000);
}

function loader(mode, msg) {
	if (mode == 'on') {
		//$(window).scrollTop(0);
		$('body').append('<div class="loader"><div class="spin"></div><div class="id-msg">' + msg + '</div></div>');
	} else {
		$('.loader').remove();
	}
}

// url 복사
function url_copy() {
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	url = window.document.location.href;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	alert("URL이 복사되었습니다.")
}

// zoomin, zoomout, zoomreset
var nowZoom = 100;

function zoomOut() { //화면크기축소
	nowZoom = nowZoom - 10;

	if (nowZoom <= 70) nowZoom = 70; //화면크기 최대 축소율 70% 
	zooms();
}

function zoomIn() { //화면크기확대
	nowZoom = nowZoom + 20;

	if (nowZoom >= 200) nowZoom = 200; //화면크기 최대 확대율 200%
	zooms();
}

function zoomReset() { //원래 화면크기로 되돌아가기
	nowZoom = 100;
	zooms();
}

function zooms() {
	document.body.style.zoom = nowZoom + '%';

	if (nowZoom == 70) {
		alert("더 이상 축소할 수 없습니다."); //화면 축소율이 70% 이하일 경우 경고창
	}

	if (nowZoom == 200) {
		alert("더 이상 확대할 수 없습니다."); //화면 확대율이 200% 이상일 경우 경고창
	}
}