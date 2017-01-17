$(document).ready(function () {
    // Header Scroll
    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

    // Waypoints
    $('.work').waypoint(function () {
        $('.work').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.download').waypoint(function () {
        $('.download .btn').addClass('animated tada');
    }, {
        offset: '75%'
    });

    // Fancybox
    $('.work-box').fancybox({});

    // Flexslider
    $('.flexslider').flexslider({
        animation: "fade",
        directionNav: false,
    });

    // Page Scroll
    var sections = $('section')
    nav = $('nav[role="navigation"]');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        sections.each(function () {
            var top = $(this).offset().top - 76
            bottom = top + $(this).outerHeight();
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });
    nav.find('a').on('click', function () {
        var $el = $(this)
        id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - 75
        }, 500);
        return false;
    });

    // Mobile Navigation
    $('.nav-toggle').on('click', function () {
        $(this).toggleClass('close-nav');
        nav.toggleClass('open');
        return false;
    });
    nav.find('a').on('click', function () {
        $('.nav-toggle').toggleClass('close-nav');
        nav.toggleClass('open');
    });
});

/* owl_slider */
$(document).ready(function owl_slider() {
    $("#owl-example").owlCarousel({
        // Most important owl features
        items: 1,
        itemsCustom: false,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        singleItem: false,
        itemsScaleUp: false,

        //Basic Speeds
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1000,

        //Autoplay
        autoPlay: true,
        stopOnHover: true,

        // Navigation
        navigation: false,
        navigationText: ["prev", "next"],
        rewindNav: true,
        scrollPerPage: false,

        //Pagination
        pagination: true,
        paginationNumbers: false,
        direction: 'rtl',

        // Responsive
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: window,

        // CSS Styles
        baseClass: "owl-carousel",
        theme: "owl-theme",

        //Lazy load
        lazyLoad: false,
        lazyFollow: true,
        lazyEffect: "fade",

        //Auto height
        autoHeight: false,

        //JSON
        jsonPath: false,
        jsonSuccess: false,

        //Mouse Events
        dragBeforeAnimFinish: true,
        mouseDrag: true,
        touchDrag: true,

        //Transitions
        transitionStyle: false,

        // Other
        addClassActive: false,

        //Callbacks
        beforeUpdate: false,
        afterUpdate: false,
        beforeInit: false,
        afterInit: false,
        beforeMove: false,
        afterMove: false,
        afterAction: false,
        startDragging: false,
        afterLazyLoad: false
    });
});

window.onload = function () {

    $('#slider-technology').lemmonSlider({
        infinite: true
    });

    $('#slider-partners').lemmonSlider({
        infinite: true
    });
    $(".slide-btn").click(function (e) {
        e.preventDefault();
        $('a[data-carousel="' + $(this).attr("data-type") + '"]').trigger('click');
    });
    $(".show-more").click(function (e) {
        $(".show-more").hide();
        $(".hide-text").show();
    });

    $('#slides').slidesjs({
        width: 600,
        height: 300,
        slideSpeed: 600,
        play: {
            auto: true,
            interval: 3000
        },
        callback: {
            loaded: function () {
                $('.slidesjs-pagination, .slidesjs-navigation').hide(0);

            },
            start: function (number) {
                number -= 1;
                $('a[data-item="' + number + '"]').removeClass("active");
                var def = true;
                var $slide;
                for (var i = 0; i < 5; i++) {
                    $slide = $('a[data-item="' + i + '"]');
                    if ($slide.hasClass("active")) {
                        def = false;
                        return;
                    }
                }
                if (def) {
                    if (number === 4) {
                        number = 0;
                    } else {
                        number += 1;
                    }
                    $('a[data-item="' + number + '"]').addClass("active");
                }
            }
        }
    });

    $(".custom-item").click(function (e) {
        e.preventDefault();
        var item = $(this).data("item");
        $('a[data-item="' + item + '"]').addClass("active");
        $('a[data-slidesjs-item="' + item + '"]').trigger('click');
    });

    var $popup = $('.popup-overlay');

    $('.image-portfolio').click(function (e) {
        e.preventDefault();
        var company = $(this).data("company");
        var $compName = $(".comp-name");
        var $compLogo = $(".company-logo");
        $compLogo.html("<img src='img/screen-" + company + ".jpg'/>");
        switch (company) {
            default:
                console.log("incorrect company name!");
        }
        $popup.css('display', 'block');
    });

    $popup.click(function (event) {
        e = event || window.event;
        if (e.target == this) {
            $($popup).css('display', 'none');
        }
    });
    $('.popup-close').click(function (e) {
        e.preventDefault();
        $popup.css('display', 'none');
    })
}