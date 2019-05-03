var JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJX
	LazyFunction: function () {
		// Для лэзи загрузки 

		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top - lazyImage.parentElement.clientHeight * 2) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight * 2) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.src = lazyImage.dataset.src;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});


		// лэзи 
		document.addEventListener("DOMContentLoaded", function () {
			let lazyImages = [].slice.call(document.querySelectorAll(".lazy-bg"));
			let active = false;

			const lazyLoad = function () {
				if (active === false) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach(function (lazyImage) {
							if (((lazyImage.getBoundingClientRect().top - lazyImage.parentElement.clientHeight) <= window.innerHeight && (lazyImage.getBoundingClientRect().bottom + lazyImage.parentElement.clientHeight) >= 0) && getComputedStyle(lazyImage).display !== "none") {
								lazyImage.parentElement.style.backgroundImage = 'url(' + lazyImage.dataset.src + ')';
								lazyImage.src = lazyImage.dataset.src;
								// lazyImage.srcset = lazyImage.dataset.srcset;
								lazyImage.classList.remove("lazy");

								lazyImages = lazyImages.filter(function (image) {
									return image !== lazyImage;
								});

								if (lazyImages.length === 0) {
									document.removeEventListener("scroll", lazyLoad);
									window.removeEventListener("resize", lazyLoad);
									window.removeEventListener("orientationchange", lazyLoad);
									window.addEventListener("DOMContentLoaded", lazyLoad);
								}
							}
						});

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoad);
			window.addEventListener("resize", lazyLoad);
			window.addEventListener("orientationchange", lazyLoad);
			window.addEventListener("DOMContentLoaded", lazyLoad);
		});

	},



	magnificPopupCall: function () {
		$('.popup-with-move-anim').magnificPopup({
			type: 'inline',

			fixedContentPos: true,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,

			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			tClose: 'Закрыть (Esc)',
		});

		// / modal window

		// modal галерея
		$(".gal").each(function () {

			$(this).find("a").magnificPopup({
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				tClose: 'Закрыть (Esc)',
				image: {
					verticalFit: true,
					// titleSrc: function(item) {
					//   return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
					// }
				},
				gallery: {
					enabled: true
				}
			});
		})
		// /modal галерея
	},

	mobileMenu: function () {
		// закрыть/открыть мобильное меню
		var toggMnu = $(".toggle-menu-mobile--js").click(function () {

			$(".toggle-menu-mobile--js").toggleClass("on");
			// $("body").toggleClass("fixed");
			$(".menu-mobile--js").toggleClass("active");
			$("body, html").toggleClass("fixed");
			return false;
		});
		$('.menu-mobile--js ul li a').on('click', function () {
			$(".menu-mobile--js .toggle-mnu").click();
		});
		$(document).mouseup(function (e) {
			var container = $(".menu-mobile--js.active");
			if (container.has(e.target).length === 0) {
				$(".toggle-menu-mobile--js").removeClass("on");
				// $("body").toggleClass("fixed");
				$(".menu-mobile--js").removeClass("active");
				$("body, html").removeClass("fixed");
			}
		});
		// закрыть меню при горизонтальном свайпе
		$('.menu-mobile--js.active').swipe({
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'left') {
					$(".toggle-menu-mobile--js").removeClass("on");
					$(".menu-mobile--js.active").removeClass("active");
					$("body, html").removeClass("fixed");
				}
				if (direction == 'right') {
					$(".toggle-menu-mobile--js").removeClass("on");
					$(".menu-mobile--js.active").removeClass("active");
					$("body, html").removeClass("fixed");
				}
			},
			triggerOnTouchEnd: false,
		});
	},


	// табы  . 
	tabscostume: function (tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active')
				.find('.tabs__slider--js, .tabs__slider--1js').slick('refresh');
			JSCCommon.magnificPopupCall();

		});
	},




	inlineSVG: function () {
		//Replace all SVG images with inline SVG
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			$.get(imgURL, function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}


				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

		});
	},

	CustomInputFile: function CustomInputFile() {
		var file = $(".add-file input[type=file]");
		file.change(function () {
			var filename = $(this).val().replace(/.*\\/, "");
			var name = $(".add-file__filename  ");
			name.text(filename);

		});
	},

	CustomYoutubeBlock: function () {
		$(".pretty-embed__bg").each(function () {
			// загрузка фона видео
			$(this).css("background-image", 'url(http://img.youtube.com/vi/' + $(this).data("src") + '/0.jpg)')
			// включение видео при клике по блоку
			$(this).click(function () {
				$(this).removeClass("on").next()
					.attr("src", 'https://www.youtube.com/embed/' + $(this).data("src") + '?autoplay=1').addClass("on");
			})
		})

	},

	inputMask: function () {
		// mask for input
		$('input[type="tel"]').attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask("+7(999)999-99-99");
	}

};

JSCCommon.LazyFunction();
/***/

jQuery(document).ready(function ($) {

	// для свг
	svg4everybody({});
	// Custom JS

	// вызов magnificPopupCall
	JSCCommon.magnificPopupCall();

	JSCCommon.tabscostume('tabs');

	JSCCommon.mobileMenu();

	JSCCommon.inputMask();

	JSCCommon.inlineSVG();

	JSCCommon.CustomInputFile();

	JSCCommon.CustomYoutubeBlock();




	var url = document.location.href;
	$.each($(".top-nav__nav a "), function () {

		if (this.href == url) {
			if ($(this).hasClass("top-nav__link") == true) {

				$(this).addClass('top-nav__link-active');
			}
			if ($(this).hasClass("footer__link") == true) {

				$(this).addClass('footer__link-active');
			}

		};

	});


	// / закрыть меню при горизонтальном свайпе
	// /закрыть/открыть мобильное меню

	function heightses() {

		var w = $(window).width();

		// $(".main-wrapper").css("margin-bottom", $('footer').height())
		// $(".otz__item .text-wrap ").height('auto').equalHeights();
		//


		// скрывает моб меню

		var topH = $("header ").innerHeight();

		$(window).scroll(function () {
			if ($(this).scrollTop() > topH) {
				$('.top-nav  ').addClass('fixed');
			} else {
				$('.top-nav  ').removeClass('fixed');
			}
		});
		// конец добавил
	}

	if (window.matchMedia("(min-width: 992px)").matches) {

		$(".toggle-menu-mobile--js").removeClass("on");
		// $("body").removeClass("fixed");
		$(".menu-mobile--js").removeClass("active");
		$("body").removeClass("fixed");
	}


	$(window).resize(function () {
		heightses();

	});
	$(window).on("load", function () {
		heightses();

	})

	heightses();



	// листалка по стр
	// $(" .top-nav a").click(function () {
	//        var elementClick = $(this).attr("href");
	//        var destination = $(elementClick).offset().top;

	//            $('html, body').animate({ scrollTop: destination }, 1100);

	//        return false;
	//    });







	var icon = '<svg id="SVGDoc" width="20" height="38" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:avocode="https://avocode.com/" viewBox="0 0 20 38"><defs><path d="M1312.25357,3273.60693c-0.25768,0.26173 -0.57974,0.39302 -0.93393,0.39302c-0.35429,0 -0.67635,-0.13129 -0.93403,-0.39302c-0.51527,-0.52431 -0.51527,-1.37614 0,-1.90017l16.42485,-16.70732l-16.42485,-16.70703c-0.51527,-0.52402 -0.51527,-1.37614 0,-1.90017c0.51537,-0.52402 1.35269,-0.52402 1.86796,0l17.35868,17.65711c0.51537,0.52431 0.51537,1.37585 0,1.90017z" id="Path-0"/></defs><desc>Generated with Avocode.</desc><g transform="matrix(1,0,0,1,-1310,-3236)"><g><title>Forma 1</title><use xlink:href="#Path-0" fill="#000000" fill-opacity="1"/></g></g></svg>';

	var arrl2 = (' <div class="r">' + icon),
		arrr2 = (' <div class="l">' + icon);
	// карусель
	$('.tabs__slider--js').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		speed: 600,
		infinite: false,
		arrows: true,
		prevArrow: arrr2,
		nextArrow: arrl2,
		responsive: [


			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});


	$('.tabs__slider--1js').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 600,
		infinite: true,
		arrows: true,
		prevArrow: arrr2,
		nextArrow: arrl2,

	});

	$('.card-head__slider-color--js').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		dots: false,
		speed: 600,
		infinite: true,
		arrows: true,
		prevArrow: arrr2,
		nextArrow: arrl2,
		responsive: [


			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4
				}
			}
		]
	});



	// $('.tabs__slider--js').slick('refresh');

	$('.tabs__slider--js, .tabs__slider--1js')
		.on('lazyLoaded', function (event, slick, image, imageSource) {
			image.parent().css('background-image', 'url(' + image.attr('src') + ')');
		});
	// slider
	// var swiper4 = new Swiper('.color-slider', {
	// 	// slidesPerView: 5,
	// 	slidesPerView: 'auto',
	// 	watchOverflow: true,
	// 	spaceBetween: 0,
	// 	freeMode: true,
	// 	watchOverflow: true,
	// 	slidesPerGroup: 3,

	// 	// centeredSlides: true,
	// 	loop: true,
	// 	loopFillGroupWithBlank: true,
	// 	touchRatio: 0.2,
	// 	slideToClickedSlide: true,
	// 	freeModeMomentum: true,
	// 	navigation: {
	// 		nextEl: '.swiper-button-next',
	// 		prevEl: '.swiper-button-prev',
	// 	},

	// });
	// modal window


	// form
	$("form").submit(function () { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: 'action.php', //Change
			data: th.serialize()
		}).success(function () {
			$.magnificPopup.close();
			$.magnificPopup.open({
				items: {
					src: '#thanks', // can be a HTML string, jQuery object, or CSS selector
					type: 'inline'
				}
			})
			// window.location.replace("/thanks.html");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
				// $.magnificPopup.close();
			}, 4000);
		});
		return false;
	});
	// /form



	// / mask for input





	// кастомный инпут файл


	// или
	// $(".dropzone").dropzone({
	//  url: "/file/post",
	//  addRemoveLinks: true,
	//      acceptedFiles: 'image/*',
	//      uploadMultiple: true,
	//   });




	// $(".wow-wrap").each(function () {
	// var wowAnim = $(this).find(".s-dop__col," +
	//                 ".s-pick__col," +
	//                 ".s-condition__col");
	// wowAnim.each(function(i){

	// wowAnim.eq(i).attr("data-wow-delay", i*.1*2 + "s");

	//    var wow = new WOW({ mobile: false });
	//         wow.init();

	// });
	// });

	$('.readmore-js').readmore({
		speed: 175,
		collapsedHeight: 75,
		moreLink: '<a href="#" class="text-secondary">Подробнее</a>',
		lessLink: '<a href="#" class="text-secondary">Скрыть</a>',
		afterToggle: function (trigger, element, expanded) {
			if (!expanded) { // The "Close" link was clicked
				$('html, body').animate({
					scrollTop: element.offset().top
				}, {
					duration: 100
				});
			}
		}
	});


	// $('[data-city]').popover({
	// 	template: '<div class="popover" role="tooltip"> <h3 class="popover-title"></h3><div class="popover-content"></div></div>'
	// })

	// // всплывашка в карте 
	// var bBox = svg1.getBBox();
	$('[data-toggle="popover"]').each(function () {
		var th = $(this); 
		var index =	th.index();
		th.addClass("map-div--" + index);
		// th.data("div") = "map-div--" + index;
		$(".mark-wrap").append('<div class="map-div map-div--' + index + '"></div>');
		$("div.map-div--" + index)
		// .attr({
		// 	'style': 'transform: translate3d(' + th.position().left + 'px, ' + th.position().top + 'px, 0)'
		// })
		.css({
			'top': ((th.position().top  - $(".mark-wrap").position().top     ) ),
			'left': ((th.position().left  - $(".mark-wrap").position().left  )), 
		})
		// console.log(w, h);
		th.popover({
			template: '<div class="popover popover-map" role="tooltip"><div class="popover-body"></div></div>',

			container: '.map-block',
			// placement: 'auto',
			// trigger: 'hover',
		});
		th.on('shown.bs.popover', function () {
			$(".popover-body").html('<div class="popover-head row">\
				<div class="popover-title col">' + th.data("city") + '</div>\
				<div class="popover-img col-auto">\
					<a href="' + th.data("href") + '"><img class="res-i" src="' + th.data("img") + '"/></div></a>\
				</div>\
				<div class="popover-text text-center">' + th.data("count") + '</div>');
			th.addClass('active').siblings().removeClass('active').popover('hide');
			$("div.map-div--" + index).addClass('active');
		})
		
		th.on('hide.bs.popover', function () {
			th.removeClass('active');
			$("div.map-div--" + index).removeClass('active');
		})
	 


		$("body").on('click', '.popover-close', function () {
			th.popover('hide');

		})
	})
	// / всплывашка в карте 
	function DoRotate(d) {
    $(".poleChudes__aniumante-block").css({
        transform: 'rotate(' + d + 'deg)'
    });
}

	$(".poleChudes__baraban-img ").click(function(){
		// DoRotate(100);
		$(".poleChudes__aniumante-block").addClass("poleChudes__aniumante-block--active");
	})
});