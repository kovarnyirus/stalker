"use strict";

/* Functions */
function leadZero(n) {
  return (n < 10 ? '0' : '') + n;
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function equalHeight(group) {
  if (jQuery(window).width() > '768') {
    var tallest = 0;
    jQuery(group).each(function () {
      var thisHeight = jQuery(this).css('height', '').outerHeight();
      if (thisHeight > tallest) {
        tallest = thisHeight;
      }
    });
    jQuery(group).css('height', tallest);
  } else {
    jQuery(group).css('height', '');
  }
}

jQuery(window).on('load', function () {
  jQuery('body').addClass('loaded');

  jQuery(window).trigger('resize').trigger('scroll');

  setTimeout(function () {
    jQuery(window).trigger('resize').trigger('scroll');
  }, 700)
});

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function number_format(number, decimals, dec_point, thousands_sep) {
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    toFixedFix = function (n, prec) {
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      var k = Math.pow(10, prec);
      return Math.round(n * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

jQuery(document).on('click', 'a[href="#"]', function (e) {
  e.preventDefault();
});

/* Check Catalog Style */

if (jQuery('.catalog-view-swich').length > 0) {
  if (getCookie('catalog_type') == 'grid') {
    jQuery('.catalog-view-swich .catalog-t-grid').addClass('active').siblings().removeClass('active');
    jQuery('.catalog-row-h').hide();
    jQuery('.catalog-items').removeClass('in-row');
  } else {
    jQuery('.catalog-view-swich .catalog-t-row').addClass('active').siblings().removeClass('active');
    jQuery('.catalog-row-h').show();
    jQuery('.catalog-items').addClass('in-row');
  }
}

jQuery(document).ready(function () {

  jQuery('.scrollbar-inner').scrollbar();

  /* Resize Events */

  jQuery(window).on('load resize', function () {
    var window_height = jQuery(window).height();

    jQuery('.full-height').css('height', window_height);

    jQuery('.main-container').css('min-height', window_height - jQuery('.site-header').outerHeight(true) - jQuery('.site-footer').outerHeight())

    jQuery('.map-block #map').each(function() {
      jQuery(this).css('margin-right', -(jQuery(window).width()-jQuery(this).parents('.container').outerWidth()))
    });
  });

  /* Scroll Events */

  jQuery(window).on('load scroll', function () {
    var scroll_top = jQuery(window).scrollTop(),
      window_height = jQuery(window).height();

    if (scroll_top > 30) {
      jQuery('.site-header').addClass('fixed');
    } else {
      jQuery('.site-header').removeClass('fixed');
    }
  });

  /* Focus on Input */

  jQuery('.input-row input.style1, .input-row textarea.style1').on('focusin', function () {
    jQuery(this).parents('.input-row').addClass('focus');
  }).on('focusout', function () {
    if (!jQuery(this).val()) {
      jQuery(this).parents('.input-row').removeClass('focus').addClass('focusout').delay(450).queue(function (next) {
        jQuery(this).removeClass('focusout');
        next();
      });
    }
  }).each(function () {
    if (jQuery(this).val()) {
      jQuery(this).parents('.input-row').addClass('focus');
    }
  });

  /* Focus on Search */

  jQuery('.search-form .input').on('focusin', function () {
    jQuery(this).parent().addClass('focus');
  }).on('focusout', function () {
    if (!jQuery(this).val()) {
      jQuery(this).parent().removeClass('focus');
    }
  }).each(function () {
    if (jQuery(this).val()) {
      jQuery(this).parent().addClass('focus');
    }
  });

  /* Input Field */

  jQuery('.upload-input:not(.active) [type="file"]').on('change', function () {
    var file_name = jQuery(this).val().split(/\\|\//).pop();
    jQuery(this).parents('.upload-input').addClass('active').find('.v span').text(file_name);
  });

  jQuery('.upload-input .v').on('click', function (e) {
    e.preventDefault();
    jQuery(this).parents('.upload-input').removeClass('active').find('.v span').text('');
    jQuery(this).parents('.upload-input').find('[type="file"]').val();
  });

  /* Select2 */

  jQuery('select.style1').select2({
    minimumResultsForSearch: -1
  });

  /* Click Events */

  jQuery('body').on('click', '.popup-block .close, .popup-block .popup-overlay',function () {
    jQuery(this).parents('.popup-block').removeClass('show-popup');
  });

  jQuery('body').on('click','.city-select', function () {
    jQuery('.select-city-popup').addClass('show-popup')
  });

  jQuery('body').on('click','.archive-order-table > .flex-table-body > .flex-table-row', function () {
    jQuery(this).toggleClass('active').next('.order-details-table').slideToggle();
    jQuery(this).siblings().removeClass('active').next('.order-details-table').slideUp()
  });

  jQuery('body').on('click','.feedback-request .question .top', function () {
    jQuery(this).parents('.feedback-request').toggleClass('active').find('.drop-block').slideToggle();
  });

  jQuery('body').on('click', '.filter-menu > li > a', function (e) {
    e.preventDefault();

    jQuery(this).parent().toggleClass('active').children('.sub-menu').slideToggle();
  });

  jQuery('.catalog-filter .row-item:not(.active) .drop-block').hide();

  jQuery(document).on('click', '.catalog-filter .row-item .title', function (e) {
    e.preventDefault();

    if(jQuery(this).parent().hasClass('active')) {
      jQuery(this).parent().children('.drop-block').slideUp();
    } else {
      jQuery(this).parent().children('.drop-block').slideDown();
    }

    jQuery(this).parent().toggleClass('active');
  });

  jQuery('.catalog-items:not(.in-row) .catalog-item, .catalog-carousel .catalog-item').on('mouseenter', function () {
    jQuery(this).find('.price-details').stop().slideDown();
  }).on('mouseleave', function() {
    jQuery(this).find('.price-details').stop().slideUp();
  });

  jQuery('.catalog-items.in-row .price-block').on('mouseenter', function () {
    jQuery(this).parents('.catalog-item').find('.price-details').addClass('show-this');
  }).on('mouseleave', function() {
    jQuery(this).parents('.catalog-item').find('.price-details').removeClass('show-this');
  });

  jQuery('body').on('click','.catalog-view-swich > div', function () {
    if (jQuery(this).hasClass('active')) return false;

    jQuery(this).addClass('active').siblings().removeClass('active');
    if (jQuery(this).hasClass('catalog-t-grid')) {
      jQuery('.catalog-row-h').slideUp();
      jQuery('.catalog-items').addClass('loaded').delay(400).queue(function (next) {
        jQuery(this).removeClass('in-row loaded');
        next();
      });
      setCookie('catalog_type', 'grid', {
        path: '/'
      });
    } else {
      jQuery('.catalog-items').addClass('loaded').delay(400).queue(function (next) {
        jQuery(this).addClass('in-row').removeClass('loaded');
        jQuery('.catalog-row-h').slideDown();
        next();
      });
      setCookie('catalog_type', 'row', {
        path: '/'
      });
    }
  });

  jQuery('.mh-navigation').on('click', '.menu-item-has-children > a', function(e) {
    e.preventDefault();
    jQuery(this).parent().toggleClass('active').children('.sub-menu').slideToggle();
  });

  jQuery('.mobile-header .nav-butter, .mobile-header .mh-categs').on('click', function() {

    jQuery('.mobile-header .nav-butter, .mobile-header .mh-categs').toggleClass('active');
    jQuery('.mh-side').toggleClass('active');
  });

  jQuery('.open-filter, .cf-mob-h .close').on('click', function() {
    jQuery('.catalog-filter').toggleClass('active');
  });

  /* Load Animations */

  function animations() {
    jQuery('.animate').each(function () {
      var animation = jQuery(this).attr('data-animation');

      var top = jQuery(document).scrollTop() + jQuery(window).height();
      var pos_top = jQuery(this).offset().top;
      if (top > pos_top) {
        jQuery(this).addClass('animated ' + animation);
      }
    });
  }

  jQuery(window).on('load scroll', function () {
    animations();
  });

  /* Price Range Slider */

  jQuery('.price-filter-block').each(function () {
    var $this = jQuery(this),
      $range_slider = $this.find('.range-slider'),
      $from_input = $this.find('.input.from'),
      $to_input = $this.find('.input.to');

    $range_slider.ionRangeSlider({
      type: 'double',
      skin: 'round',
      hide_min_max: true,
      hide_from_to: true,
      onChange: function (e) {
        $from_input.val(e.from);
        $to_input.val(e.to);
      }
    });

    let $range_slider_js = $range_slider.data('ionRangeSlider');

    $from_input.on('keyup', function () {
      var val = jQuery(this).val();
      $range_slider_js.update({
        from: val
      });
    }).on('change', function () {
      var val = jQuery(this).val();

      if (val < $range_slider.data('min')) {
        jQuery(this).val($range_slider.data('min'));
      } else if (val > $range_slider.data('max')) {
        jQuery(this).val($range_slider.data('max'));
      }
    });

    $to_input.on('keyup', function () {
      var val = jQuery(this).val();
      $range_slider_js.update({
        to: val
      });
    }).on('change', function () {
      var val = jQuery(this).val();

      if (val < $range_slider.data('min')) {
        jQuery(this).val($range_slider.data('min'));
      } else if (val > $range_slider.data('max')) {
        jQuery(this).val($range_slider.data('max'));
      }
    });
  });

  /* Sliders & Carousels */

  /* Brand Navigation */

  var $brand_nav_swiper = new Swiper(jQuery('.brand-navigation .swiper-container'), {
    freeMode: true,
    slidesPerView: 'auto',
    grabCursor: true,
  });

  /* Slider */

  var $slider = jQuery('.slider-block'),
  $slider_swiper = new Swiper($slider, {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: $slider.find('.swiper-pagination'),
      clickable: true,
    },
    /* autoplay: {
      delay: 5000,
    }, */
    speed: 700
  });

  /* Sale Carousel */

  jQuery('.sale-carousel').each(function() {
    var $sale_carousel = jQuery(this),
    $sale_carousel_swiper = new Swiper($sale_carousel.find('.swiper-container'), {
      loop: true,
      spaceBetween: 30,
      /*autoplay: {
        delay: 5000,
      },*/
      watchSlidesVisibility: true,
      loopAdditionalSlides: 2,
      navigation: {
        nextEl: $sale_carousel.find('.next'),
        prevEl: $sale_carousel.find('.prev'),
      },
      breakpointsInverse: true,
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        576: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
      }
    });
  });

  /* Brand Carousel */

  jQuery('.brands-carousel').each(function() {
    var $brand_carousel = jQuery(this),
    $brand_carousel_swiper = new Swiper($brand_carousel.find('.swiper-container'), {
      loop: true,
      spaceBetween: 25,
      /*autoplay: {
        delay: 5000,
      },*/
      watchSlidesVisibility: true,
      loopAdditionalSlides: 2,
      navigation: {
        nextEl: $brand_carousel.find('.next'),
        prevEl: $brand_carousel.find('.prev'),
      },
      breakpointsInverse: true,
      breakpoints: {
        0: {
          slidesPerView: 2
        },
        576: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 4
        },
        980: {
          slidesPerView: 5
        },
        1200: {
          slidesPerView: 6
        },
      }
    });
  });

  /* Tabs */

  var $tabs_block = jQuery('.tabs-block');

  var $tabs_head = new Swiper($tabs_block.find('.tabs-head'), {
    slidesPerView: 'auto',
    watchSlidesVisibility: true,
    //allowTouchMove: false,
    initialSlide: $initialIndex ? $initialIndex: 0,
  });

  var $tabs_body = new Swiper($tabs_block.find('.tabs-body'), {
    allowTouchMove: false,
    autoHeight: true,
    initialSlide: $initialIndex ? $initialIndex: 0,
    thumbs: {
      swiper: $tabs_head
    }
  });


    var $about_slider = jQuery('.about-slider');

    var $about_slider_swiper = new Swiper($about_slider.find('.swiper-container'), {
        loop: true,
        slidesPerView: 1,
        navigation: {
            nextEl: $about_slider.find('.next'),
            prevEl: $about_slider.find('.prev'),
        },
        speed: 700
    });


  /* Product Image Slider */

  var $product_images = jQuery('.product-images');

  var $pi_thumbs = new Swiper($product_images.find('.pi-thumbs .swiper-container'), {
    slidesPerView: 3,
    spaceBetween: 5,
    watchSlidesVisibility: true,
    allowSlideNext: false,
    navigation: {
      nextEl: $product_images.find('.next'),
      prevEl: $product_images.find('.prev'),
    },
  });

  var $pi_slider = new Swiper($product_images.find('.pi-slider .swiper-container'), {
    effect: 'fade',
    thumbs: {
      swiper: $pi_thumbs
    },
    pagination: {
      el: $product_images.find('.pagination'),
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      768: {
        //effect: 'slide',
      }
    }
  });

  /* Catalog Carousel */

  jQuery('.catalog-carousel').each(function() {
    var $catalog_carousel = jQuery(this),
    $catalog_carousel_swiper = new Swiper($catalog_carousel, {
      loop: true,
      spaceBetween: 5,
      watchSlidesVisibility: true,
      loopAdditionalSlides: 2,
      navigation: {
        nextEl: $catalog_carousel.find('.next'),
        prevEl: $catalog_carousel.find('.prev'),
      },
      breakpointsInverse: true,
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        576: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        980: {
          slidesPerView: 4
        },
        1200: {
          slidesPerView: 5
        },
      }
    });
  });

  /* Map */

  if(jQuery('#map').length > 0) {
    function initialize() {
      var myLatlng = new google.maps.LatLng(55.89122, 37.420746);
      var mapOptions = {
        zoom: 16,
        center: myLatlng,
        disableDefaultUI: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var myLatLng = new google.maps.LatLng(55.89122, 37.420746);
      var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
      google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
      });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
  }

  // Tabs
    $('.tabs__caption').slick({
        dots: false,
        arrows: false,
        infinite: false,
        loop: false,
        speed: 450,
        slidesToShow: 1,
        variableWidth: true,
        rows: 0,
        responsive: [
            {
                breakpoint: 99999,
                settings: 'unslick'
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function tabscostume(tab) {
        $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('.' + tab).find('.' + tab + '__item').hide().removeClass('active')
                .eq($(this).index()).fadeIn().addClass('active');
        });
    };
    tabscostume('tabs');



    // phone mask

    $("input[type='tel']").attr("pattern", "[+]7[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask({
        mask: '+7(999)999-99-99'
    });
});
