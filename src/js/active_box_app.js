/**
 * Created by siarheisheleh on 10/6/16.
 */

/* adaptive_navbar */
function nav_bar_adaptive() {
    var x = document.getElementById("adaptive");
    if (x.className == "acive_box_app_header_navigation_bar") {
        x.className += " acive_box_app_header_adaptive_bar";
    } else {
        x.className = "acive_box_app_header_navigation_bar";
    }
}

/* fancybox */
$(document).ready(function fancybox() {
    $("a.fancyimage").fancybox({
        "padding": 0,
        "imageScale": false,
        "zoomOpacity": false,
        "zoomSpeedIn": 1000,
        "zoomSpeedOut": 1000,
        "zoomSpeedChange": 1000,
        "frameWidth": 1000,
        "frameHeight": 1000,
        "overlayShow": true,
        "overlayOpacity": 0.8,
        "hideOnContentClick": false,
        "centerOnScroll": false,
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

/* photo_effect */
$(document).ready(function photo_effect() {
    // handle the mouseenter functionality
    $(".acive_box_app_portfolio_image").mouseenter(function () {
        $(this).addClass("hover");
    })
    // handle the mouseleave functionality
        .mouseleave(function () {
            $(this).removeClass("hover");
        });
});
