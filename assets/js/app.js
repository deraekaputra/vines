(function($) {

	"use strict";

	var $html = $("html");

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    var global_functions = {
    	init: function() {
    		var self = this;
            
            self.header();
            self.accordion();
            self.swiper();
            self.menuMobile();
            self.formValidation();
            self.tabs();
            self.productZoom();
            self.selectFilter();
            self.sweetAlerts();
            self.paymentCountdown();
        },

        header: function() {
            //search
            var drinks = [
                {
                    value: 'Beer',
                    data: 'BR'
                },
                {
                    value: 'Wine',
                    data: 'WN0'
                },
                {
                    value: 'Dessert Wine',
                    data: 'WN1'
                },
                {
                    value: 'Ice Wine',
                    data: 'WN2'
                },
                {
                    value: 'Spirit',
                    data: 'SP'
                }
            ];
            $('#search').on('focus', function(event) {
                event.preventDefault();
                event.stopPropagation();
                $('.header__right').toggleClass('header__right--is-expand');
                $('.search-form').toggleClass('search-form--is-expand');
            });
            $('#search').autocomplete({
                lookup: drinks
            });

            //user
            // $('.nav-header-user').mouseover(function(){
            //     $(".nav-header-user-box").addClass("user-info-box--show");
            // })
            // $('.nav-header-user').mouseout(function(){
            //     $(".nav-header-user-box").removeClass("user-info-box--show");
            // })
            $('.nav-header-user a.oval').click(function(event){
                event.preventDefault();
                event.stopPropagation();
                $(this).siblings('.nav-header-user-box').toggleClass('user-info-box--show');
            });

            $(document).on('click', function(event) {
                if (!$(event.target).closest('.nav-header-user-box').length) {
                    $('.nav-header-user-box').removeClass('user-info-box--show');
                }
                if (!$(event.target).closest('.header__right').length) {
                    $('.header__right').removeClass('header__right--is-expand');
                    $('.search-form').removeClass('search-form--is-expand');
                }
            });
            $(document).on('keydown', function(event) {
                var dropdown;
                var event = event || $(window).event;
                dropdown = $('.nav-header-user-box');
                if (event.keyCode === 27) {
                    dropdown.removeClass('user-info-box--show');
                }
            });

            //cart
            $('.nav-header-cart').click(function(){
                $(".cart-detail").addClass("cart-detail--show");
                $(".cart-overlay").addClass("overlay--show");
                $("body").addClass("no-scroll");
            })
            $('.cart-overlay').click(function(){
                $(".cart-detail").removeClass("cart-detail--show");
                $(".cart-overlay").removeClass("overlay--show");
                $("body").removeClass("no-scroll");
            })
            $('.cart-detail__close').click(function(){
                $(".cart-detail").removeClass("cart-detail--show");
                $(".cart-overlay").removeClass("overlay--show");
                $("body").removeClass("no-scroll");
            });
        },

        tabs: function() {
            $('ul.tabs li').click(function(){
                var tab_id = $(this).attr('data-tab');
        
                $('ul.tabs li').removeClass('current');
                $('.tab-content').removeClass('current-tc');
        
                $(this).addClass('current');
                $("#"+tab_id).addClass('current-tc');
            })
        },

        formValidation: function() {
            // -- https://jqueryvalidation.org/
            //Contact Us
            $("#contactUsFormForm").validate({
                rules: {
                    cu_namalengkap: {
                        required: true
                    },
                    cu_email: {
                        required: true,
                        email: true
                    },
                    cu_subject: {
                        required: true
                    },
                    cu_pesan: {
                        required: true
                    }
                },
                submitHandler: function (form) {
                    return true;
                }
            });
        
        },

        accordion: function() {
            $('.menu-mobile .toggle').click(function(e) {
                e.preventDefault();
            
              var $this = $(this);
            
              if ($this.next().hasClass('show')) {
                $this.removeClass('show');
                $this.next().removeClass('show');
                $this.next().slideUp(350);
              } else {
                $this.parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(350);
                $this.parent().parent().find('li .toggle').removeClass('show');
                $this.toggleClass('show');
                $this.next().toggleClass('show');
                $this.next().slideToggle(350);
              }
            });
            $('.accordion .toggle').click(function(e) {
              e.preventDefault();
          
                var $this = $(this);
            
                if ($this.next().hasClass('show')) {
                $this.removeClass('show');
                $this.next().removeClass('show');
                $this.next().slideUp(350);
                } else {
                $this.parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(350);
                $this.parent().parent().find('li .toggle').removeClass('show');
                $this.toggleClass('show');
                $this.next().toggleClass('show');
                $this.next().slideToggle(350);
                }
            });
        },

        swiper: function() {
            // Hero
            var swiper = new Swiper('#hero .swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '#hero .swiper-pagination',
                },
                navigation: {
                  nextEl: '#hero .swiper-button-next',
                  prevEl: '#hero .swiper-button-prev',
                }
            });

            // Special Slider
            var swiper = new Swiper('.special-slider .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 25,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            // Main Category
            var swiper = new Swiper('.main-slider .swiper-container', {
                slidesPerView: 4,
                spaceBetween: 25,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            // Mix Slider
            var swiper = new Swiper('.mix-slider .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 25,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 15,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            // News Slider
            var swiper = new Swiper('#newsSlider .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 25,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '#newsSlider .swiper-pagination',
                },
                navigation: {
                  nextEl: '#newsSlider .swiper-button-next',
                  prevEl: '#newsSlider .swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            // Event Slider
            var swiper = new Swiper('#eventSlider .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 25,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '#eventSlider .swiper-pagination',
                },
                navigation: {
                  nextEl: '#eventSlider .swiper-button-next',
                  prevEl: '#eventSlider .swiper-button-prev',
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    375: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                }
            });

            // Product Detail
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 8,
                slidesPerView: 4,
                //loop: true,
                freeMode: true,
                //loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 8,
                //loop:true,
                //loopedSlides: 5, //looped slides should be the same
                thumbs: {
                    swiper: galleryThumbs
                },
            });
        },

        menuMobile: function() {
            $('.menu-burger').click(function(e) {
                $(this).toggleClass("menu-burger--active");
                $(".header").toggleClass("menu-active");
                $("main").toggleClass("menu-active");
                $(".footer").toggleClass("menu-active");
                $(".menu-mobile").toggleClass("menu-active");
            });
        },

        productZoom: function() {
            $('#productImage').zoom();
        },

        selectFilter: function() {
            $('#productCategorySelect').select2();
            $('#productSubcategorySelect').select2();
            $('#productCountrySelect').select2();
            $('#productSizeSelect').select2();
            $('#productABVSelect').select2();
            $('#productPriceSelect').select2();
        },

        sweetAlerts: function() {
            $(window).mouseleave(function(event) {
                if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
                    function showAlert() {
                        Swal.fire({
                            title: "Aww, snap!",
                            text: "Are you gonna leave the store?",
                            type: "warning",
                            confirmButtonColor: "#762e2e",
                            confirmButtonText: "Nope, I'm staying here!",
                        }).then((result) => {
                            if (result.value) {
                                Swal.fire({
                                    title: "Great!",
                                    text: "So glad to see you again!",
                                    type: "success",
                                    confirmButtonColor: "#b39f66",
                                });
                            }
                        });
                    }

                    setTimeout(function() {
                        showAlert();
                    }, 30000);
                }
            });
        },

        paymentCountdown: function() {
            var countDownDate = new Date("May 14, 2019 24:00:00").getTime();

            if ($("#paymentCountdown").length <= 1) {
                var x = setInterval(function() {

                    var now = new Date().getTime();
                    
                    var distance = countDownDate - now;
                    
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    
                    $("#paymentCountdown").html(hours + "h " + minutes + "m " + seconds + "s ");
                    
                    if (distance < 0) {
                        clearInterval(x);
                        $("#paymentCountdown").html("EXPIRED");
                    }

                }, 1000);
            }
        }

    };

    $(document).ready(function() {
        global_functions.init();
    });

})(jQuery);
