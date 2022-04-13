;
(function ($) {
    $(function () {

        //page theme indicator
        if ($('.main-content-wrap').hasClass('black_theme'))
            $('body').addClass('theme_black');
        else if ($('.main-content-wrap').hasClass('white_theme'))
            $('body').addClass('theme_white');
        else if ($('.main-content-wrap').hasClass('red_theme'))
            $('body').addClass('theme_red');
        else if ($('.main-content-wrap').hasClass('black_n_white_theme'))
            $('body').addClass('theme_white_n_black');

        //sticky header
        if ($(window).width() > 767) {
            var $header = $("header"),
                $clone = $header.before($header.clone().addClass("sticky-header")),
                $fixedHeader = $('.sticky-header'),
                $headerHeight = $fixedHeader.outerHeight() + 5,
                lastPos = 0;

            $(window).on("scroll", function () {
                var fromTop = $(window).scrollTop();

                if (fromTop > $headerHeight * 10) {
                    $fixedHeader.css({
                        "-webkit-transform": "translate(0, 0)",
                        "-moz-transform": "translate(0, 0)",
                        "-ms-transform": "translate(0, 0)",
                        transform: "translate(0, 0)"
                    });

                    if (fromTop > lastPos) {
                        $fixedHeader.css({
                            "-webkit-transform": "translate(0, -100%)",
                            "-moz-transform": "translate(0, -100%)",
                            "-ms-transform": "translate(0, -100%)",
                            transform: "translate(0, -100%)"
                        });
                    }
                    lastPos = fromTop;


                } else {
                    $fixedHeader.css({
                        "-webkit-transform": "translate(0, -100%)",
                        "-moz-transform": "translate(0, -100%)",
                        "-ms-transform": "translate(0, -100%)",
                        transform: "translate(0, -100%)"
                    });
                }
            });

        }


        // Begin input common focus and blur for value.
        var input = $('input:text, input:password,input[type="email"],input[type="tel"],input[type="number"],input[type="search"], textarea');

        function inputValueRemover() {
            $(input).focus(function () {
                if (this.value == this.defaultValue) {
                    this.value = '';
                }
            }).blur(function () {
                if (!this.value) {
                    this.value = this.defaultValue;
                    $(this).parent().removeClass('active');
                } else {
                    $(this).parent().addClass('active');
                }
            });
        }

        function inputPlaceholderRemover() {
            $(input).each(function () {
                var inputText = $(this).attr('placeholder');
                $(this).focus(function () {
                    if ($(this).val().length === 0) {
                        $(this).attr('placeholder', '');
                    }
                }).blur(function () {
                    if ($(this).val().length === 0) {
                        $(this).attr('placeholder', inputText);
                        $(this).parent().removeClass('active');
                    } else if ($(this).val().length > 0) {
                        $(this).parent().addClass('active');
                    }
                });
            });
        }
        if ($(input).length) {
            inputValueRemover();
        }
        if ($(input).attr('placeholder')) {
            inputPlaceholderRemover();
        }
        // End input common focus and blur for value.



        //sticky-footer
        function stickyFooter(selector) {
            var getFooterHeight = $(selector).parents('body').find('footer').outerHeight();

            function stickyfun(selector) {
                if (selector.length && $(window).width() > 767) {
                    $(selector).parents('html').addClass('sticky');
                    $(selector).parents('html').find('.main-wrap').css({
                        'padding-bottom': getFooterHeight
                    });
                }
            }
            stickyfun(selector);
            $(window).resize(function () {
                var footerHeight = $('.sticky').find('footer').outerHeight();
                $('.sticky').find('.main-wrap').css({
                    'padding-bottom': footerHeight
                });
            });
        }

        //call like this
        //stickyFooter('.main-wrap');

        // phone navigation
        $('.js-nav-bar').on('click', function () {
            if ($(this).hasClass('toggle-nav-bar')) {
                $('body').toggleClass('navOpen');
            }
            $('.js-shutter').slideToggle();
        });

        function menuActiveState() {
            var $line = $('.nav-marker'),
                $nav = $('.main-nav'),
                timerNav,
                animLine = function ($target) {
                    var offsetConteneur = $nav.offset().left,
                        largeur = $target.outerWidth(),
                        posX1 = $target.offset().left - offsetConteneur,
                        posX2 = $target.offset().left + largeur - offsetConteneur;
                     TweenMax.to($line, 2, {css:{left: posX1}, ease:Power4.easeOut});
                };

            if ($('nav ul').length) {
                setTimeout(
                    function () {
                        animLine($nav.find('.current-menu-item'));
                    }, 500
                );
                $nav.find('a').mouseenter(function (event) {
                        clearTimeout(timerNav);
                        animLine($(this));
                    })
                    .mouseleave(function (event) {
                        timerNav = setTimeout(function () {
                            animLine($nav.find('.current-menu-item'));
                        }, 100);
                    });
            }

        }
        
        menuActiveState();
        
        $('.roll-up-initial').each(function(){
            var initial_transition = 0.03;
            $(this).find('> span').each(function(i){
                $(this).css({
                    '-webkit-transition-delay' : i * initial_transition+"s",
                    '-moz-transition-delay' : i * initial_transition+"s",
                    'transition-delay' : i * initial_transition+"s",
                });
            });
        });
        
        $('.play-icon').on('click', function(){
            $(this).toggleClass('played');
        });
        
        
        $('.has-work-column').each(function(){
            $(this).find('> .work-item:nth-child(-n+2)').wrapAll('<div class="work-column has-two-column" />');
            $(this).find(' > .work-item:nth-child(2)').wrap('<div class="work-column" />');
        });
        
/*

function positionCircle(e, media, circle) {
  var rect = media.getBoundingClientRect();
  var relX = e.pageX - rect.left;
  var relY = e.pageY  - rect.top - window.scrollY;
  TweenMax.to(circle, 0.15, { x: relX, y: relY });
}

*/
        
      /*Array.prototype.forEach.call(document.querySelectorAll('.mosuecontroller'), function (media) {
          var circle = document.querySelectorAll("." + media.getAttribute('data-circle'));
          TweenMax.set(circle, {
              scale: 0,
              xPercent: -50,
              yPercent: -50
          });

          $(this).on("pointerenter", function (e) {
              TweenMax.to(circle, 0.3, {
                  scale: 1,
                  opacity: 1
              });
              positionCircle(e, media, circle);
          });
           $(this).on("pointerleave", function (e) {
              TweenMax.to(circle, 0.3, {
                  scale: 0,
                  opacity: 0
              });
              positionCircle(e, media, circle);
          });
           $(this).on("mousemove", function (e) {
              positionCircle(e, media, circle);
          });

      });*/

    /*$('.mosuecontroller').each(function(){
        var circle = $(this).find('.mosuePointer');
        TweenMax.set(circle, {
              scale: 0,
              xPercent: -50,
              yPercent: -50
          });
        
        $(this).on('mouseenter', function(e){
            var media = $(this);
             TweenMax.to(circle, 0.3, {
                  scale: 1,
                  opacity: 1
              });
              positionCircle(e, media, circle);
        }).on('mouseleave', function(e){
            var media = $(this);
            TweenMax.to(circle, 0.3, {
                  scale: 0,
                  opacity: 0
              });
              positionCircle(e, media, circle);
        })
        $(this).on("mousemove", function (e) {
            var media = $(this);
            positionCircle(e, media, circle);
          });
     
    })
        
      function positionCircle(e, media, circle) {
          var rect = media;
          var relX = e.pageX - rect.offset.left;
          var relY = e.pageY - rect.offset.top - window.scrollY;
          TweenMax.to(circle, 0.15, {
              x: relX,
              y: relY
          });
      }*/   
        
        
        
        $('.js-playTrigger').on('click', function(e){
            e.preventDefault();
            if($(this).text() === 'Play')
                $(this).text('Pause');
            else if($(this).text('Pause'))
                $(this).text('Play');
        })

        
        if ($(".animate").length) {
            var $animation_elements = $('.animate'),
                $window = $(window);
            function check_if_in_view() {
                var window_height = $window.height(),
                    window_top_position = $window.scrollTop(),
                    window_bottom_position = (window_top_position + window_height);

                $.each($animation_elements, function () {
                    var $element = $(this),
                        element_height = $element.outerHeight(),
                        element_top_position = $element.offset().top,
                        element_bottom_position = (element_top_position + element_height);
                    //check to see if this current container is within viewport
                    if (element_top_position <= window_bottom_position) {
                        $element.addClass('in-view');
                    } else {
                        $element.removeClass('in-view');
                    }
                });
            }

            $window.on('scroll resize', check_if_in_view);
            $window.trigger('scroll');
        }
        
        if($(".service-section").length){
            $(window).scroll(function() {
               var hT = $('.service-section').offset().top,
                   hH = $('.service-section').outerHeight(),
                   wH = $(window).height(),
                   wS = $(this).scrollTop();
                   if (wS > (hT+hH-wH)){

                   }
            });
        }
        
        /*var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        });*/
        
         var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable:true,
            }
        });
        
        swiper.on('slideChangeTransitionEnd', function () {
            var getIndex = swiper.realIndex,
                slideCaption = $('.swiper-section .swiper-slide').eq(getIndex).find('.slide-caption').html();
            $('.swiper-pagination-content').html(slideCaption);
        }); 
        
        // Bubble cursor pointer 
        $('.category-item').each(function () {
            $(this).mouseenter(function () {
                $('body').addClass('start-event');
                $('body').mousemove(function (e) {
                    var cursor = $('#cursor'),
                        ancho = cursor.width(),
                        alto = cursor.height(),
                        W = ancho / 2,
                        H = alto / 2,
                        Y = (e.pageY - W),
                        X = (e.pageX - H);
                    
                    cursor.css({
                        'top': Y + 'px',
                        'left': X + 'px'
                    });
                });
            });
            $(this).mouseleave(function () {
                $('body').removeClass('start-event');
            });
        });
        
        /*if($(".grid").length){
            $('.grid').masonry({
              itemSelector: '.grid-item',
              columnWidth: 160
            });
        }*/
        

    }) // End ready function.




})(jQuery)