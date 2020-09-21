(function($) {
	"use strict";

/*------------------------------------------------------------------
[Table of contents]


beautypress custom function
menu fixed function 
email patern
prelaoder
beautypress portfolio grid
another beautypress portfolio grid 4 items
beautypress popular service grid
image comperasion
Date Picker
welcome section slider
welcome section slider version 2
testimonial slider
simple image slider
team slider
sync slider
video pop up
image pop up
Ajaxchimp init
Booking form init
Booking form select field focus
numeric number counter init
counter up appear init
back to top
button with mouse pointer
button pulse effect
contact form init
instagram feeds
beautypress accordion add class
beautypress hover add class
mouse over and add class remove class
flicker gallery
hover 3d init for tilt
mega menu
ScrollMagic
parallax bg
social tigger icon
input number increase
meun scroll and add class
snazzy maps 1
snazzy maps 2

-------------------------------------------------------------------*/


/*=============================================================
				beautypress custom function
=========================================================================*/
function beautypress_function() {
	var header_height = $('.header-height-calc-minus.beautypress-header-section'),
		welcome_container = $('.welcome-height-calc-minus .beautypress-welcome-container'),
		window_height = $(window).height(),
		height_minus = window_height - header_height.height(),
		comming_soon = $('.beautypress-comming-soon-content'),
		owl_prev = $('.beautypress-welcome-slider .owl-nav .owl-prev'),
		owl_next = $('.beautypress-welcome-slider .owl-nav .owl-next'),
		header_height_calc = (header_height.height()) / 2,
		welcome_wrapers = $('.beautypress-welcome-wraper');

		welcome_wrapers.css('margin-top', header_height.height());

		owl_prev.css('top', 'calc(50% + ' +header_height_calc+'px)');
		owl_next.css('top', 'calc(50% + ' +header_height_calc+'px)');
	

		if (window_height >= 600) {
			comming_soon.css('height', window_height);	
		} else {
			comming_soon.css('height', '600px');
		}

		if (window_height >= 600) {
			welcome_container.css('height', window_height);
		} else {
			welcome_container.css('height', '600');
		}
}

//  email patern 
function email_pattern(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	return regex.test(email);
}

// menu fixed function 
function muneFixed() {

	var scroll = $(document).scrollTop(),
		this_item = $('.navbar-fixed'),
		headerHeight = this_item.outerHeight(),
		headerAnimation = $('.menu-skew'),
		classList = ['off-canvas', 'fixed', 'swingInX', 'swingOutX'];

		// console.log(classList);

		$(window).scroll(function() {

			var scrolled = $(document).scrollTop();

			if (scrolled > headerHeight) {
				this_item.addClass(classList[0]);
			} else {
				this_item.removeClass(classList[0]);
			}

			if (scrolled > scroll || headerAnimation.hasClass(classList[2][3])) {
				this_item.removeClass(classList[1]);
				headerAnimation.removeClass(classList[2]);
				headerAnimation.addClass(classList[3]);
			} else {
				this_item.addClass(classList[1]);
				headerAnimation.addClass(classList[2]);
				headerAnimation.removeClass(classList[3]);
			}
			scroll = $(document).scrollTop();
		});
}

// menu fixed anim class function 
function menuFixedAnimClass() {

	var scroll = $(document).scrollTop(),
		this_item = $('.navbar-fixed'),
		headerHeight = this_item.outerHeight(),
		headerAnimation = $('.menu-skew'),
		classList = ['off-canvas', 'fixed', 'swingInX', 'swingOutX'];

		// console.log(classList);

		function animationClassAdd() {

			if (this_item.hasClass(classList[0][1]) || headerAnimation.hasClass(classList[2][3])) {
				this_item.addClass(classList[0]);
				this_item.removeClass(classList[1]);
				headerAnimation.removeClass(classList[2]);
				headerAnimation.addClass(classList[3]);
			} else {
				this_item.removeClass(classList[0]);
				this_item.addClass(classList[1]);
				headerAnimation.addClass(classList[2]);
				headerAnimation.removeClass(classList[3]);
			}
		}

		$(window).on('load', function() {
			animationClassAdd();
		});

		$(window).on('resize', function() {
			animationClassAdd();
		});
}


$(window).on('load', function() {
	// Beautypress custom function init
	beautypress_function();

	// menu fixed
	muneFixed();

	// menu fixed anim class function 
	menuFixedAnimClass();

/*=============================================================
			prelaoder
=========================================================================*/

$('#preloader-cancel-btn').on('click', function (e) {
	e.preventDefault();
	$("#preloader").addClass('loaded');
})
setTimeout(function() {
	$("#preloader").addClass('loaded');
}, 500);

/*=============================================================
			beautypress portfolio grid
=========================================================================*/
if ($('.beautypress-photo-gallery-grid').length > 0) {
	var $container = $('.beautypress-photo-gallery-grid'),
		colWidth = function() {
			var w = $container.width(),
				columnNum = 1,
				columnWidth = 0;
			if (w > 1200) {
				columnNum = 3;
			} else if (w > 900) {
				columnNum = 3;
			} else if (w > 600) {
				columnNum = 3;
			} else if (w > 450) {
				columnNum = 2;
			} else if (w > 385) {
				columnNum = 1;
			}
			columnWidth = Math.floor(w / columnNum);
			$container.find('.beautypress-photo-gallery-grid-item').each(function() {
				var $item = $(this),
					multiplier_w = $item.attr('class').match(/beautypress-photo-gallery-grid-item-w(\d)/),
					multiplier_h = $item.attr('class').match(/beautypress-photo-gallery-grid-item-h(\d)/),
					width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
					height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
				$item.css({
					width: width
					//height: height
				});
			});
			return columnWidth;
		},
		isotope = function() {
			$container.isotope({
				resizable: false,
				itemSelector: '.beautypress-photo-gallery-grid-item',
				masonry: {
					columnWidth: colWidth(),
					gutterWidth: 3
				}
			});
		};
	isotope();
	$(window).on('resize', isotope);
	var $optionSets = $('.beautypress-portfolio-nav .option-set'),
		$optionLinks = $optionSets.find('a');
	$optionLinks.on('click', function() {
		var $this = $(this);
		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[key] = value;
		if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
			// changes in layout modes need extra logic
			changeLayoutMode($this, options)
		} else {
			// creativewise, apply new options
			$container.isotope(options);
		}
		return false;
	});
}

/*=============================================================
			another beautypress portfolio grid 4 items
=========================================================================*/
if ($('.beautypress-photo-gallery-grid-v3').length > 0) {
	var $container = $('.beautypress-photo-gallery-grid-v3'),
		colWidth = function() {
			var w = $container.width(),
				columnNum = 1,
				columnWidth = 0;
			if (w > 1200) {
				columnNum = 4;
			} else if (w > 900) {
				columnNum = 4;
			} else if (w > 600) {
				columnNum = 2;
			} else if (w > 450) {
				columnNum = 2;
			} else if (w > 385) {
				columnNum = 1;
			}
			columnWidth = Math.floor(w / columnNum);
			$container.find('.beautypress-photo-gallery-grid-item-v3').each(function() {
				var $item = $(this),
					multiplier_w = $item.attr('class').match(/beautypress-photo-gallery-grid-item-v3-w(\d)/),
					multiplier_h = $item.attr('class').match(/beautypress-photo-gallery-grid-item-v3-h(\d)/),
					width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
					height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
				$item.css({
					width: width
					//height: height
				});
			});
			return columnWidth;
		},
		isotope = function() {
			$container.isotope({
				resizable: false,
				itemSelector: '.beautypress-photo-gallery-grid-item-v3',
				masonry: {
					columnWidth: colWidth(),
					gutterWidth: 3
				}
			});
		};
	isotope();
	$(window).on('resize', isotope);
	var $optionSets = $('.beautypress-portfolio-nav .option-set'),
		$optionLinks = $optionSets.find('a');
	$optionLinks.on('click', function() {
		var $this = $(this);
		var $optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[key] = value;
		if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
			// changes in layout modes need extra logic
			changeLayoutMode($this, options)
		} else {
			// creativewise, apply new options
			$container.isotope(options);
		}
		return false;
	});
}

/*=============================================================
			beautypress popular service grid
=========================================================================*/
if ($('.beautypress-popular-service-grid').length > 0) {
	var $container = $('.beautypress-popular-service-grid'),
		colWidth = function() {
			var w = $container.width(),
				columnNum = 1,
				columnWidth = 0;
			if (w > 1200) {
				columnNum = 3;
			} else if (w > 900) {
				columnNum = 3;
			} else if (w > 600) {
				columnNum = 3;
			} else if (w > 450) {
				columnNum = 2;
			} else if (w > 385) {
				columnNum = 1;
			}
			columnWidth = Math.floor(w / columnNum);
			$container.find('.beautypress-popular-service-grid-item').each(function() {
				var $item = $(this),
					multiplier_w = $item.attr('class').match(/beautypress-popular-service-grid-item-w(\d)/),
					multiplier_h = $item.attr('class').match(/beautypress-popular-service-grid-item-h(\d)/),
					width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
					height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
				$item.css({
					width: width
					//height: height
				});
			});
			return columnWidth;
		},
		isotope = function() {
			$container.isotope({
				resizable: false,
				itemSelector: '.beautypress-popular-service-grid-item',
				masonry: {
					columnWidth: colWidth(),
					gutterWidth: 3
				}
			});
		};
	isotope();
	$(window).on('resize', isotope);
}

/*=============================================================
				image comperasion
=========================================================================*/

if ($('.beautypress-before-after').length > 0) {
	$('.beautypress-before-after').twentytwenty({
		no_overlay: true ,
		move_slider_on_hover: false ,
		move_with_handle_only: true, 
		click_to_move: false ,
	});
}

}); // end on.load event

$(document).ready(function() {


$(document).on('click', '#color_red', function(event) {
	event.preventDefault();
	/* Act on the event */

 	var colors = ['red','green'],
 		colorVar = ['--color-purple','--color-cyan','--color-pink','--color-chocolate'];

	document.documentElement.style.setProperty(colorVar[0], colors[0]);
	document.documentElement.style.setProperty(colorVar[1], colors[0]);
	document.documentElement.style.setProperty(colorVar[2], colors[1]);
	document.documentElement.style.setProperty(colorVar[3], colors[1]);

	$(this).after('<div class="color_code"><em>'+ colors[0] +'</em>,<em>'+ colors[1] +'</em></div>');

	if ($(this).children().find('color_code')) {
		$('.color_code').show();
		$(this).parent().children('color_code').hide();
	} else {
		$('.color_code').hide();
		$(this).parent().children('color_code').show();
	}
});

$(document).on('click', '#color_green', function(event) {
	event.preventDefault();
	/* Act on the event */

 	var colors = ['blue','purple'],
 		colorVar = ['--color-purple','--color-cyan','--color-pink','--color-chocolate'];

	document.documentElement.style.setProperty(colorVar[0], colors[0]);
	document.documentElement.style.setProperty(colorVar[1], colors[0]);
	document.documentElement.style.setProperty(colorVar[2], colors[1]);
	document.documentElement.style.setProperty(colorVar[3], colors[1]);

	$(this).after('<div class="color_code"><em>'+ colors[0] +'</em>,<em>'+ colors[1] +'</em></div>');

	if ($(this).children().find('color_code')) {
		$('.color_code').show();
		$(this).parent().children('color_code').hide();
	} else {
		$('.color_code').hide();
		$(this).parent().children('color_code').show();
	}
});

// Beautypress custom function init
beautypress_function();

// menu fixed anim class function 
menuFixedAnimClass();

/*=============================================================
				Date Picker
=========================================================================*/
if ($('.datepicker').length > 0) {
	$('.datepicker').datepicker().on('changeDate', function() {
		$(this).datepicker('hide');
	});
}

/*=============================================================
				welcome section slider
=========================================================================*/

if ($('.beautypress-welcome-slider').length > 0) {
	var owl1 = $(".beautypress-welcome-slider");
	owl1.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: false,
		nav: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		navText: 
			[ '<i class="xsicon icon-left-arrow"></i>',
			'<i class="xsicon icon-right-arrow"></i>'],
	});
}

/*=============================================================
				welcome section slider version 2
=========================================================================*/

if ($('.beautypress-welcome-slider-v2').length > 0) {
	var owl2 = $(".beautypress-welcome-slider-v2");
	owl2.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: false,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
	});

	$("#prev").on('click', function() {
		owl2.trigger('prev.owl.carousel');
	});

	$("#next").on('click', function() {
		owl2.trigger('next.owl.carousel');
	});
}

/*=============================================================
				testimonial slider
=========================================================================*/

if ($('.beautypress-testimonial-slider').length > 0) {
	var owl3 = $(".beautypress-testimonial-slider");
	owl3.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
	});
}

/*=============================================================
				simple image slider
=========================================================================*/

if ($('.beautypress-image-slider').length > 0) {
	var owl4 = $(".beautypress-image-slider");
	owl4.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: true,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
	});
}

/*=============================================================
				simple image slider
=========================================================================*/

if ($('.beautypress-client-slider').length > 0) {
	var owl5 = $(".beautypress-client-slider");
	owl5.owlCarousel({
		items: 6,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: false,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		responsive : {
		// breakpoint from 0 up
		0 : {
			items: 1,
		},
		// breakpoint from 480 up
		480 : {
			items: 2,
		},
		// breakpoint from 768 up
		768 : {
			items: 6,
		}
	}
	});

	$("#prev1").on('click', function() {
		owl5.trigger('prev.owl.carousel');
	});

	$("#next1").on('click', function() {
		owl5.trigger('next.owl.carousel');
	});
}

/*=============================================================
				team slider
=========================================================================*/

if ($('.beautypress-team-slider').length > 0) {
	var owl6 = $(".beautypress-team-slider");
	owl6.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: false,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
	});
}

/*=============================================================
				sync slider
=========================================================================*/

if (($('.beautypress-sync-slider-preview').length > 0) && ($('.beautypress-sync-slider-thumb').length > 0)) {
	var sync1 = $(".beautypress-sync-slider-preview"),
		sync2 = $(".beautypress-sync-slider-thumb"),
		slidesPerPage = 3,
		syncedSecondary = true;

	sync1.owlCarousel({
		items: 1,
		slideSpeed: 2000,
		nav: true,
		autoplay: true,
		dots: true,
		loop: true,
		responsiveRefreshRate: 200,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
	}).on('changed.owl.carousel', syncPosition);

	sync2
		.on('initialized.owl.carousel', function() {
			sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items: slidesPerPage,
			dots: true,
			nav: false,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			responsiveRefreshRate: 100
		}).on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;

		//if you disable loop you have to comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - (el.item.count / 2) - .5);

		if (current < 0) {
			current = count;
		}
		if (current > count)  {
			current = 0;
		}

		//end block

		sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});
}


/*=============================================================
				video pop up
=========================================================================*/
if ($('.beautypress-video-popup').length > 0) {
	$('.beautypress-video-popup').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}
/*=============================================================
				image pop up
=========================================================================*/

if ($('.beautypress-image-popup').length > 0) {
	$('.beautypress-image-popup').magnificPopup({
		type: 'image',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = 'mfp-zoom-in';
			}
		},
		closeOnContentClick: true,
		midClick: true,
		gallery: {
			enabled: true,
		},
	});
}

/*=============================================================
				Ajaxchimp init
=========================================================================*/
if ($('.mc-form').length > 0) {
	$('.mc-form').ajaxChimp({
		url: 'https://facebook.us8.list-manage.com/subscribe/post?u=85f515a08b87483d03fee7755&amp;id=66389dc38b'
	});
}

/*=============================================================
				Booking form init
=========================================================================*/
if ($('#beautypress-booking-form').length > 0) {
	$("#beautypress-booking-form").on('submit', function() {
		$('#beautypress-form-msg').addClass('hidden');
		$('#beautypress-form-msg').removeClass('alert-success');
		$('#beautypress-form-msg').removeClass('alert-danger');

		$.ajax({
			type: "POST",
			url: "php/index.php",
			data: $("#beautypress-booking-form").serialize(),
			dataType: "json",
			success: function(data) {

				if ('success' == data.result) {
					$('#beautypress-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
					$('#beautypress-form-msg').html(data.msg[0]);
					$('#beautypress-booking-form')[0].reset();
				}

				if ('error' == data.result) {
					$('#beautypress-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
					$('#beautypress-form-msg').html(data.msg[0]);
				}

			}
		});

		return false;
	});
}

/*=============================================================
				Booking form select field focus
=========================================================================*/

$('#appointment-date ,#appointment-service, #appointment-time').on('focus', function() {
	$(this).parent().addClass('actives');
});
$('#appointment-date, #appointment-service, #appointment-time').on('blur', function() {
	$(this).parent().removeClass('actives');
});

/*=============================================================
				numeric number counter init
=========================================================================*/

var number_animate = $(".number-animate");

if (number_animate.length > 0) {
	number_animate.appear();
	$(document.body).on('appear', '.numeric-count', function() {
		number_animate.each(function() {
			$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
		});
	});
} // End exists

/*=============================================================
				counter up appear init
=========================================================================*/

var appear = $('.appear');
appear.appear();
$.fn.animateNumbers = function(stop, commas, duration, ease) {
	return this.each(function() {
		var $this = $(this);
		var start = parseInt($this.text().replace(/,/g, ""), 10);
		commas = (commas === undefined) ? true : commas;
		$({
			value: start
		}).animate({
			value: stop
		}, {
			duration: duration == undefined ? 500 : duration,
			easing: ease == undefined ? "swing" : ease,
			step: function() {
				$this.text(Math.floor(this.value));
				if (commas) {
					$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}
			},
			complete: function() {
				if (parseInt($this.text(), 10) !== stop) {
					$this.text(stop);
					if (commas) {
						$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
					}
				}
			}
		});
	});
};


/*=============================================================
				back to top
=========================================================================*/
if ($('.back-to-top').length > 0) {
	$('.back-to-top').on('click', function(event) {
		event.preventDefault();
		
		$('body, html').animate({
			scrollTop: 0
		}, 1000);
	});
}

/*=============================================================
				button with mouse pointer
=========================================================================*/
if ( $( '.xs-btn' ).length > 0 ) {
	$('.xs-btn' ).on( 'mouseenter', function ( e ) {

		var parentOffset = $( this ).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;

		if ( $( this ).find( 'span' ) ) {
			$( '.xs-btn span' ).css( {
				top: relY,
				left: relX,
			} );
		}
	} );
	$( '.xs-btn' ).on( 'mouseout', function ( e ) {

		var parentOffset = $( this ).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;

		if ( $( this ).find( 'span' ) ) {
			$( '.xs-btn span' ).css( {
				top: relY,
				left: relX,
			} );
		}
	} );
}

/*=============================================================
				button pulse effect
=========================================================================*/
$('.pulse-btn').hover(function(e) {
	e.preventDefault();

	var btns = $(this).addClass('active');

	setTimeout(function() {
		btns.removeClass('active');
	}, 500);
});

/*=============================================================
				contact form init
=========================================================================*/

if ($('#beautypress-contact').length > 0) {
	$('#beautypress-contact').on('submit', function(event) {

		event.preventDefault();

		var c_name = $('#c_name'),
			c_email = $('#c_email'),
			c_subject = $('#c_subject'),
			c_massage = $('#c_massage'),
			c_submit = $('#c_submit'),
			c_error = false;

			$('.c_error_massage , .beautypress_success_message , .beautypress_loader').hide().fadeOut(400);


			if (c_name.val() === '') {
				c_name.after('<p class="c_error_massage">'+ c_name.attr('placeholder') +' filed is not empty </p>').show().fadeIn(500);
				c_error = true;
				c_name.focus();
			}
			if (c_email.val() === '') {
				c_email.after('<p class="c_error_massage">'+ c_email.attr('placeholder') +' filed is not empty </p>').show().fadeIn(500);
				c_error = true;
				c_email.focus();
			} else if (!email_pattern(c_email.val().toLowerCase())) {
				c_email.after('<p class="c_error_massage">'+ c_email.attr('placeholder') +' filed is not vaild </p>').show().fadeIn(500);
				c_error = true;
				c_email.focus();
			}
			if (c_subject.val() === '') {
				c_subject.after('<p class="c_error_massage">'+ c_subject.attr('placeholder') +' filed is not empty </p>').show().fadeIn(500);
				c_error = true;
				c_subject.focus();
			}
			if (c_massage.val() === '') {
				c_massage.after('<p class="c_error_massage">'+ c_massage.attr('placeholder') +' filed is not empty </p>').show().fadeIn(500);
				c_error = true;
				c_massage.focus();
			}

			if (c_error === false) {
				c_submit.before().hide().fadeIn();
				$.ajax({
						type: "POST",
						url: "php/contact-form.php",
						data: {
						'c_name' : c_name.val(),
						'c_email' : c_email.val(),
						'c_subject' : c_subject.val(),
						'c_massage' : c_massage.val()
					},
					success: function(result){
						c_submit.after('<span class="beautypress_success_message">' + result + '</span>').hide().fadeIn();

						$(".beautypress_loader").fadeOut("normal", function() {
							$(this).remove();
						});

						$('#beautypress-contact')[0].reset();
					}
				});
			}
	});
}

/*=============================================================
				instagram feeds
=========================================================================*/

if ($('.beautypress-demoFeed').length > 0) {
	$.fn.spectragram.accessData = {
		accessToken: '1764162550.ba4c844.679392a432894982bf6a31ec20d8acb0',
		clientID: '289a98508b934dd49a68144b79209813'
	};
	$('.beautypress-demoFeed').spectragram('getUserFeed',{
		query: 'natgeo',
		max: 9,
		size: 'small',
	});
}

/*=============================================================
				beautypress accordion add class
=========================================================================*/

if ($('.beautypress-accordion .panel-heading').length > 0) {
	$('.beautypress-accordion .panel-heading').on('click', function(event) {
		event.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
}

/*=============================================================
				beautypress hover add class
=========================================================================*/

if ($('.beautypress-single-team-v3').length > 0) {
	$('.beautypress-single-team-v3').hover(function() {
		if ($('.beautypress-single-team-v3').hasClass('hover')) {
			$(this).removeClass('hover');
		}else {
			$('.beautypress-team-col-v3').children().removeClass('hover');
			$(this).addClass('hover');
		}
	});
}


/*=============================================================
				mouse over and add class remove class
=========================================================================*/

if ($('.beautypress-single-new-pricing.beautypress-pricing-footer').length > 0) {
	$('.beautypress-single-new-pricing.beautypress-pricing-footer').on('mouseover', function(){
		$(this).parent().addClass('active');
	}).on('mouseout', function(){
		$(this).parent().removeClass('active');
	});
}

/*=============================================================
				flicker gallery
=========================================================================*/

if ($('.beautypress-flickr').length > 0) {
	$('.beautypress-flickr').jflickrfeed({
		limit: 9,
		qstrings: { 
			id: '95098787@N06' 
		},
		itemTemplate: '<li>' + '<a rel="colorbox" href="{{image_b}}" title="{{title}}">' + '<img src="{{image_s}}" alt="{{title}}" />' + '</a>' + '</li>'
	});
}


/*=============================================================
				mega menu
=========================================================================*/

if ($('.beautypress-mega-menu').length > 0) {
	$('.beautypress-mega-menu').xs_nav({
		mobileBreakpoint: 992,
	});
}
if ($('.xs_nav_2').length > 0) {
	$('.xs_nav_2').xs_nav({
		mobileBreakpoint: 992,
	});
}
if ($('.xs-navigation-middle-menu').length > 0) {
	$('.xs-navigation-middle-menu').xs_nav({
		mobileBreakpoint: 992,
	});
}

/*=============================================================
				hover 3d init for tilt
=========================================================================*/

if ($('.beautypress-3d-project-card').length > 0) {
	$('.beautypress-3d-project-card').tilt({
		maxTilt:20,
		perspective: 700,
		easing: "cubic-bezier(.03,.98,.52,.99)",
		scale:1,
		speed: 500,
		transition: true,
	});
}

if ($('.beautypress-single-photo-gallery .beautypress-3d-project-card').length > 0) {
	$('.beautypress-single-photo-gallery .beautypress-3d-project-card').tilt({
		maxTilt:25,
		perspective: 700,
		easing: "cubic-bezier(.03,.98,.52,.99)",
		scale:1,
		speed: 400,
		transition: true,
	});
}

/*=============================================================
				ScrollMagic
=========================================================================*/

if ($('.beautypress-scoller-animation').length > 0) {
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({triggerElement: ".beautypress-scoller-animation"})
		.setVelocity(".scoller-image-1 img", {opacity: 1, bottom: "0"}, 800)
		.triggerHook("onEnter")
		.addTo(controller);

	new ScrollMagic.Scene({triggerElement: ".beautypress-scoller-animation"})
		.setVelocity(".scoller-image-2 img", {opacity: 1, top: "270"}, 1000)
		.triggerHook(0.7)
		.addTo(controller);
}

/*=============================================================
				parallax bg
=========================================================================*/

if ($('.parallax-bg').length > 0) {
	$('.parallax-bg').parallax();
}

/*=============================================================
				social tigger icon
=========================================================================*/

$('.tigger-icon').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */

	var this_item = $('.beautypress-social-tigger');

	if (this_item.hasClass('active')) {
		this_item.removeClass('active');
	} else {
		this_item.addClass('active');
	}

});

/*=============================================================
				input number increase
=========================================================================*/

var thiss = $('.beautypress_input_number');

	thiss.append('<span class="sub"><img src="img/minus-icon.png" alt="" /></span>');
	thiss.append('<span class="add"><img src="img/plus-icon.png" alt="" /></span>');

$('.beautypress_input_number').each(function() {
	
	var spinner = $(this),
		input = spinner.find('input[type="number"]'),
		add = spinner.find('.add'),
		sub = spinner.find('.sub');

		input.parent().on('click', '.sub', function(event) {
			event.preventDefault();
			/* Act on the event */
			if (input.val() > parseInt(input.attr('min')))
				input.val( function(i, oldval) { return --oldval; });

		});

		input.parent().on('click', '.add', function () {
			event.preventDefault();

			if (input.val() < parseInt(input.attr('max')))
				input.val( function(i, oldval) { return ++oldval; });
		});

});

});

$(window).on('scroll', function() {

/*=============================================================
				meun scroll and add class
=========================================================================*/

var w_height = $(window).height(),
	d_height = $(document).height(),
	h_calc = d_height - w_height;

	// console.log(h_calc);

var scrollTop = $(this).scrollTop();

if (scrollTop >= h_calc) {
	$('.beautypress-back-to-top-wraper.show-last-pos').addClass('active');
} else {
	$('.beautypress-back-to-top-wraper.show-last-pos').removeClass('active');
}

}); // END Scroll Function 

$(window).on('resize', function() {
	// Beautypress custom function init
	beautypress_function();
}); // End Resize

/*=============================================================
				snazzy maps 1
=========================================================================*/

if ($('#beautypress_maps').length > 0) {
	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);

		function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
			};

			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('beautypress_maps');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

			// Let's also add a marker while we're at it
			var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Beautypress'
		});
	}
}

/*=============================================================
				snazzy maps 2
=========================================================================*/

if ($("#beautypress_maps_2").length > 0) {
	// When the window has finished loading create our google map below
	google.maps.event.addDomListener(window, 'load', init);

		function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
			// How zoomed in you want the map to start at (always required)
			zoom: 11,
			scrollwheel: false,
			navigationControl: false,
			mapTypeControl: true,
			scaleControl: false,
			draggable: true,
			disableDefaultUI: true,

			// The latitude and longitude to center the map (always required)
			center: new google.maps.LatLng(40.6700, -73.9400), // New York

			// How you would like to style the map. 
			// This is where you would paste any style found on Snazzy Maps.
			styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"saturation":"-100"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40},{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"lightness":21}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#4d6059"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#4d6059"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#7f8d89"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#7f8d89"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#7f8d89"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#2b3638"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#2b3638"},{"lightness":17}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"geometry.stroke","stylers":[{"color":"#24282b"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels.icon","stylers":[{"visibility":"off"}]}]
			};

			// Get the HTML DOM element that will contain your map 
			// We are using a div with id="map" seen below in the <body>
			var mapElement = document.getElementById('beautypress_maps_2');

			// Create the Google Map using our element and options defined above
			var map = new google.maps.Map(mapElement, mapOptions);

		// Let's also add a marker while we're at it
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(40.6700, -73.9400),
			map: map,
			title: 'Beautypress!',
			icon: 'img/markar.png',
		});
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){ marker.setAnimation(null); }, 750);
	}
}

})(jQuery);