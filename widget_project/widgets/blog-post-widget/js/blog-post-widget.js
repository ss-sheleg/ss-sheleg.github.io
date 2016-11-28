/**
 * Created by themark on 24.08.2016.
 */

jQuery(document).ready(function () {

    var views = 172;
    var comments = 34;
    var likes = 210;

    function makeComment (i, text) {
        if (typeof text == "undefined") {
            var com = "<article class='comments-area-comment-article'>" +
                "<h3 class='comments-area-comment-title'>Some user</h3>" +
                "<p class='comments-area-comment'>Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>" +
                "<span id='comments-like-icon" + i + "' class='icon-heart' data-active='false'>0</span></article>";
        } else {
            var com = "<article class='comments-area-comment-article'>" +
                "<h3 class='comments-area-comment-title'>Your nickname</h3>" +
                "<p class='comments-area-comment'>" + text + "</p>" +
                "<span id='comments-like-icon" + i + "' class='icon-heart'data-active='false'>0</span></article>";
        }
        return com;
    }

    function makeCommentArea(commentsNum) {
        var result = {};
        for (var i = 0; i < commentsNum; i++) {
            result[i] = makeComment (i);
        }
        return result;
    }

    var commentsData = makeCommentArea(comments);

    function addCommentsInDom (data) {
        $(".blog-post-widget-comments-block-comments-area").append(data);

    }

    function addCommentsDataInDom (data) {
        for (key in data) {
            addCommentsInDom (data[key]);
        }
    }

    addCommentsDataInDom (commentsData);

    // add numbers of views, comments, likes in DOM
    function updateNumbers () {
        $(".blog-post-widget-footer-views-number").text(views);
        $(".blog-post-widget-footer-comments-number").text(comments);
        $(".blog-post-widget-footer-likes-number").text(likes);
    }
    updateNumbers ();

    $(".blog-post-widget-footer-likes").click(function () {
        if ($(this).attr("data-active") == "false") {
            likes += 1;
            updateNumbers ();
            $(".blog-post-widget-footer-likes > *").css({"color": "#e86741", "opasity":"1"});
            $(this).attr("data-active", "true");
        } else {
            likes -= 1;
            updateNumbers ();
            $(".blog-post-widget-footer-likes > *").css({"color": "#8e8071", "opasity":".7"});
            $(this).attr("data-active", "false");
        }
    });

    // add comennt like

    $(document).on("click","[id^='comments-like-icon']",function () {
        if ($(this).attr("data-active") == "false") {
            var like = Number($(this).text()) + 1;
            $(this).text(like);
            $(this).css({"color": "#e86741", "opasity":"1"});
            $(this).attr("data-active", "true");
        } else {
            var like = Number($(this).text()) - 1;
            $(this).text(like);
            $(this).css({"color": "#8e8071", "opasity": ".7"});
            $(this).attr("data-active", "false");
        }
    });

    $(".blog-post-widget-comments-block-user-comment-add-button"). click(function () {
        var text = $("#blog-post-widget-comments-block-user-comment").val();
        if (text !== "") {
            var i = Object.keys(commentsData).length;
            var comment = makeComment (i, text);
            commentsData[i] = comment;
            addCommentsInDom (comment);
            $("#blog-post-widget-comments-block-user-comment").val("");
            $(".blog-post-widget-comments-block-comments-area").animate({ scrollTop: $(".blog-post-widget-comments-block-comments-area").prop("scrollHeight")}, 1000);
        }
    });


    var commentsActive = false;
    $(".blog-post-widget-footer-comments").click(function () {
        if (commentsActive) {
            return;
        }
        commentsActive = true;
        if ($(this).attr("data-active") == "false") {
            $(".blog-post-widget-header , .blog-post-widget-content").fadeOut(1000);
            $(".blog-post-widget-comments-block").fadeIn(1000, function() {
                commentsActive = false;
            });
            $(".blog-post-widget-footer-comments").attr("data-active", "true");
            $(".blog-post-widget-footer-comments").css({"background-color": "#e9e3df"});
        } else {
            $(".blog-post-widget-comments-block").fadeOut(1000);
            $(".blog-post-widget-header , .blog-post-widget-content").fadeIn(1000, function() {
                commentsActive = false;
            });
            $(".blog-post-widget-footer-comments").attr("data-active", "false");
            $(".blog-post-widget-footer-comments").css({"background-color": "#f6f1ed"});
        }
    });

    var timerId = setInterval(function() {
        if (views > 500) {
            clearInterval(timerId);
        } else {
            views += 1;
            $(".blog-post-widget-footer-views-number").text(views);
        }
    }, 5000);

});



