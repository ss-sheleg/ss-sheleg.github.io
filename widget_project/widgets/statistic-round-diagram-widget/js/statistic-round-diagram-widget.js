/**
 * Created by themark on 14.08.2016.
 */

jQuery(document).ready(function () {

    // default variables
    var MAX_DATA = 200;
    var AUDIO_COLOR = "#4daf7b";
    var VIDEO_COLOR = "#e6623d";
    var PHOTO_COLOR = "#ebc85e";
    var REST_COLOR = "#f4ede7";
    var DAYS = 30;
    var HEIGHT = 250;
    var AUDIO_FILE_SPACE = 10;
    var VIDEO_FILE_SPACE = 150;
    var PHOTO_FILE_SPACE = 7;

    var AUDIO_FILES = 10552;
    var VIDEO_FILES = 353;
    var PHOTO_FILES = 1520;
    // -------------------------------------

    // global variables (sorry for that!)
    var currentAudioColor = 0;
    var currentVideoColor = 0;
    var currentPhotoColor = 0;

    var currentAudioFiles = 0;
    var currentVideoFiles = 0;
    var currentPhotoFiles = 0;

    var dataFiles = 0;
    var dataColors = 0;

    var audioSpace = 0;
    var videoSpace = 0;
    var photoSpace = 0;

    var totalSpace = 0;
    var totalFiles = 0;
    var dataSpace = 0;
    // ----------------------------------------------------

    setDefaultSettings ();

    function updateData () {
        dataFiles = {audio: currentAudioFiles, video: currentVideoFiles, photo: currentPhotoFiles, rest: ""};
        audioSpace = Math.round(dataFiles["audio"] * AUDIO_FILE_SPACE / 1024);
        videoSpace = Math.round(dataFiles["video"] * VIDEO_FILE_SPACE / 1024);
        photoSpace = Math.round(dataFiles["photo"] * PHOTO_FILE_SPACE / 1024);
        totalSpace = audioSpace + videoSpace + photoSpace;
        totalFiles = dataFiles['audio'] + dataFiles['video'] + dataFiles['photo'];
        dataSpace = {audio: audioSpace, video: videoSpace, photo: photoSpace, rest: MAX_DATA - totalSpace};
        dataColors = {audio: currentAudioColor, video: currentVideoColor, photo: currentPhotoColor, rest: REST_COLOR};
        monthReportData = makeMonthReportData(dataSpace, DAYS);
        $(".statistic-round-diagram-widget-diagram-space").text(totalSpace + " Gb");
        $(".statistic-round-diagram-widget-diagram-files").text(totalFiles + " files");
        $(".statistic-round-diagram-widget-diagram-files").css({"color": "#8e8071"});
    }

    updateData ();

    function setDefaultSettings () {
        currentAudioColor = AUDIO_COLOR;
        currentVideoColor = VIDEO_COLOR;
        currentPhotoColor = PHOTO_COLOR;

        currentAudioFiles = AUDIO_FILES;
        currentVideoFiles = VIDEO_FILES;
        currentPhotoFiles = PHOTO_FILES;
    }
    // ------------------------------------------------

    // helper functions for Linear Graphic

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // random load data to make linear graphic
    function makeMonthReportData(data, days) {
        var result = {};
        var centerAudio = data["audio"]/days;
        var centerVideo = data["video"]/days;
        var centerPhoto = data["photo"]/days;
        var dataAudio = 0;
        var dataVideo = 0;
        var dataPhoto = 0;
        var dxAudio = 0;
        var dxVideo = 0;
        var dxPhoto = 0;
        for (var i = 1; i <= days; i++) {
            var dayAudio = getRandomInRange(0, centerAudio+dxAudio);
            dxAudio = centerAudio - dayAudio;
            var dayVideo = getRandomInRange(0, centerVideo+dxVideo);
            dxVideo = centerVideo - dayVideo;
            var dayPhoto = getRandomInRange(0, centerPhoto+dxPhoto);
            dxPhoto = centerPhoto - dayPhoto;
            result[i] = {audio: dayAudio, video: dayVideo, photo: dayPhoto};
            dataAudio += dayAudio;
            dataVideo += dayVideo;
            dataPhoto += dayPhoto;
        }
        var restAudio = (data["audio"] - dataAudio) / days;
        var restVideo = (data["video"] - dataVideo) / days;
        var restPhoto = (data["photo"] - dataPhoto) / days;
        for(var i = 1; i <= days; i++) {
            if (result[i]["audio"] + restAudio < centerAudio) {
                result[i]["audio"] += restAudio;
            }
            if (result[i]["video"] + restVideo < centerVideo) {
                result[i]["video"] += restVideo;
            }
            if (result[i]["photo"] + restPhoto < centerPhoto) {
                result[i]["photo"] += restPhoto;
            }
        }
        return result;
    }
    // -----------------------------------------------------

    var filesInPixel = 2 * MAX_DATA / DAYS / HEIGHT;
    var monthReportData = makeMonthReportData(dataSpace, DAYS);

    function findY(files) {
        return (files / filesInPixel);
    }

    // one day line
    function drawLine(dayData, x) {
        var height = HEIGHT;
        var ya = height - findY(dayData["audio"]);
        var yv = ya - findY(dayData["video"]) - 1;
        var yp = yv - findY(dayData["photo"]) - 2;
        var audioLine = "x1='"+ x + "' y1='" + height + "' x2='" + x + "' y2='" + ya + "'";
        var videoLine = "x1='"+ x + "' y1='" + (ya - 1) + "' x2='" + x + "' y2='" + yv + "'";
        var photoLine = "x1='"+ x + "' y1='" + (yv - 1) + "' x2='" + x + "' y2='" + yp + "'";
        var restLine =  "x1='"+ x + "' y1='" + (yp - 1) + "' x2='" + x + "' y2='5'";
        var audioPath =  "<line " + audioLine + " stroke='" + currentAudioColor + "' stroke-width='9'/>";
        var videoPath =  "<line " + videoLine + " stroke='" + currentVideoColor + "' stroke-width= '9'/>";
        var photoPath =  "<line " + photoLine + " stroke='" + currentPhotoColor + "' stroke-width='9'/>";
        var restPath =  "<line " + restLine + " stroke='" + REST_COLOR + "' stroke-width='9'/>";
        return "<g>" + audioPath + videoPath + photoPath + restPath + "</g>"
    }

    function drawHorisontalLine() {
        var quarter = "<line x1='0' y1='" + HEIGHT/4 + "' x2='300' y2='" + HEIGHT/4 + "' stroke='#777' stroke-width='0.5'/>";
        var half = "<line x1='0' y1='" + HEIGHT/2 + "' x2='300' y2='" + HEIGHT/2 + "' stroke='#777' stroke-width='0.5'/>";
        var threequarters = "<line x1='0' y1='" + HEIGHT*3/4 + "' x2='300' y2='" + HEIGHT*3/4 + "' stroke='#777' stroke-width='0.5'/>";
        return "<g>" + quarter + half + threequarters +"</g>"
    }

    function drawLinearGraphic (data, days) {
        var result = "";
        var x = 5;
        for (var i = 1; i <= days; i++) {
            var group = drawLine(data[i], x);
            x += 10;
            result += group;
        }
        return result
    }

    function makeLinearGraphic () {
        return '<svg width="300" height="250" class="month-report" id="linear-diagram">' + drawLinearGraphic(monthReportData, DAYS) + drawHorisontalLine() + '</svg>';
    }

    // add linear diagram in DOM
    $(".statistic-round-diagram-widget-content").append(makeLinearGraphic ());
    $(".line-quarter").text((MAX_DATA / DAYS / 2).toFixed(2) + "Gb");
    $(".line-half").text((MAX_DATA / DAYS).toFixed(2) + "Gb");
    $(".line-three-quarter").text((MAX_DATA / DAYS * 3 / 2).toFixed(2) + "Gb");


    function changeLinearGraphic (elem) {
        $("#linear-diagram").replaceWith(elem);
    }
    // -----------------------------------------------------------------

    // helper functions for duognut diagram
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x, y, radius, startAngle, endAngle){

        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    function findAngle(data, maxData) {
        return Math.round(360 * data / maxData);
    }

    function findPersent(data, maxData) {
        return Math.round(data / maxData * 100);
    }
    // ------------------------------------------------------

    var audioArcAngle = findAngle(audioSpace, MAX_DATA);
    var videoArcangle = findAngle(videoSpace, MAX_DATA);
    var photoArcAngle = findAngle(photoSpace, MAX_DATA);

    var audioPersent = findPersent(audioSpace, MAX_DATA);
    var videoPersent = findPersent(videoSpace, MAX_DATA);
    var photoPersent = findPersent(photoSpace, MAX_DATA);

    // add persentage of data and color border
    $(".statistic-round-diagram-widget-data-audio span").text(audioPersent + "%");
    $(".statistic-round-diagram-widget-data-video span").text(videoPersent + "%");
    $(".statistic-round-diagram-widget-data-photo span").text(photoPersent + "%");

    $(".statistic-round-diagram-widget-data-audio").css({"border-top": "4px solid " + currentAudioColor});
    $(".statistic-round-diagram-widget-data-video").css({"border-top": "4px solid " + currentVideoColor});
    $(".statistic-round-diagram-widget-data-photo").css({"border-top": "4px solid " + currentPhotoColor});


    // change data text in the dougnut diagram and change colors of data on hover

    $("#dougnut-diagram path").hover(function () {
        var pathId = this.id.split("-")[0];
        $(".statistic-round-diagram-widget-diagram-space").text(dataSpace[pathId] + " Gb");
        $(this).animate({"stroke-width": "+=7"}, 300);
        if (pathId == "rest") {
            $(".statistic-round-diagram-widget-diagram-files").text("rest space");
            $(".statistic-round-diagram-widget-diagram-files").css({"color": "#8e8071"});
        } else {
            $(".statistic-round-diagram-widget-diagram-files").text(dataFiles[pathId] + " files");
            $(".statistic-round-diagram-widget-diagram-files").css("color",dataColors[pathId]);
        }
    }, function () {
        $(".statistic-round-diagram-widget-diagram-space").text(totalSpace + " Gb");
        $(".statistic-round-diagram-widget-diagram-files").text(totalFiles + " files");
        $(".statistic-round-diagram-widget-diagram-files").css({"color": "#8e8071"});
        $(this).animate({"stroke-width": "-=7"}, 300);
    });
    // ---------------------------------------------------

    // draw dougnut diagrm

    $("#audio-arc").attr({
        d: describeArc(117 , 117, 85, 0, audioArcAngle),
        stroke: AUDIO_COLOR
    });
    $("#video-arc").attr({
        d: describeArc(117, 117, 85, audioArcAngle + 1, audioArcAngle + videoArcangle),
        stroke: VIDEO_COLOR
    });
    $("#photo-arc").attr({
        d: describeArc(117, 117, 85, audioArcAngle + videoArcangle + 1, audioArcAngle + videoArcangle + photoArcAngle),
        stroke: PHOTO_COLOR
    });
    $("#rest-arc").attr({
        d: describeArc(117, 117, 85, audioArcAngle + videoArcangle + photoArcAngle + 1, 360),
        stroke: REST_COLOR
    });
    // --------------------------------------------------

    // change dougnut diagram

    function changeDougnut() {
        audioArcAngle = findAngle(audioSpace, MAX_DATA);
        videoArcangle = findAngle(videoSpace, MAX_DATA);
        photoArcAngle = findAngle(photoSpace, MAX_DATA);

        audioPersent = findPersent(audioSpace, MAX_DATA);
        videoPersent = findPersent(videoSpace, MAX_DATA);
        photoPersent = findPersent(photoSpace, MAX_DATA);

        $(".statistic-round-diagram-widget-data-audio span").text(audioPersent + "%");
        $(".statistic-round-diagram-widget-data-video span").text(videoPersent + "%");
        $(".statistic-round-diagram-widget-data-photo span").text(photoPersent + "%");

        $("#audio-arc").attr({
            d: describeArc(117 , 117, 85, 0, audioArcAngle)
        });
        $("#video-arc").attr({
            d: describeArc(117, 117, 85, audioArcAngle + 1, audioArcAngle + videoArcangle)
        });
        $("#photo-arc").attr({
            d: describeArc(117, 117, 85, audioArcAngle + videoArcangle + 1, audioArcAngle + videoArcangle + photoArcAngle)
        });
        $("#rest-arc").attr({
            d: describeArc(117, 117, 85, audioArcAngle + videoArcangle + photoArcAngle + 1, 360)
        });
        $("#linear-diagram").replaceWith(makeLinearGraphic ());
    }
    // ------------------------------------------------------

    // switch between diagram stats and month report

    $(".statistic-round-diagram-widget-title").click(function(){
        if ($(this).attr("data-active") == "false") {
            $(this).css({"background-color": "#fff", "color": "#8e8071"});
            $(this).attr("data-active", "true");
            if ($(this).hasClass("statistic-round-diagram-widget-title-left")) {
                $(".statistic-round-diagram-widget-title-right").css({"background-color": "transparent", "color": "#fff"});
                $(".month-report").fadeOut(500);
                if ($(".statistic-round-diagram-widget-footer-share").attr("data-active") == "true") {
                    $(".statistic-round-diagram-widget-color-change").fadeOut(500);
                    $(".statistic-round-diagram-widget-footer-share").attr("data-active", "false");
                }
                if ($(".statistic-round-diagram-widget-footer-upload").attr("data-active") == "true") {
                    $(".statistic-round-diagram-widget-data-change").fadeOut(500);
                    $(".statistic-round-diagram-widget-footer-upload").attr("data-active", "false");
                }
                $(".diagram-stats").delay(500).fadeIn(500);
                $(".statistic-round-diagram-widget-title-right").attr("data-active", "false");
            } else {
                $(".statistic-round-diagram-widget-title-left").css({"background-color": "transparent", "color": "#fff"});
                $(".diagram-stats").fadeOut(500);
                if ($(".statistic-round-diagram-widget-footer-share").attr("data-active") == "true") {
                    $(".statistic-round-diagram-widget-color-change").fadeOut(500);
                    $(".statistic-round-diagram-widget-footer-share").attr("data-active", "false");
                }
                if ($(".statistic-round-diagram-widget-footer-upload").attr("data-active") == "true") {
                    $(".statistic-round-diagram-widget-data-change").fadeOut(500);
                    $(".statistic-round-diagram-widget-footer-upload").attr("data-active", "false");
                }
                $(".month-report").delay(500).fadeIn(500);
                $(".statistic-round-diagram-widget-title-left").attr("data-active", "false");
            }
        }
    });

    // change colors on diagrams

    function changeDiagramColors() {
        $(".statistic-round-diagram-widget-data-audio").css({"border-top": "4px solid " + currentAudioColor});
        $(".statistic-round-diagram-widget-data-video").css({"border-top": "4px solid " + currentVideoColor});
        $(".statistic-round-diagram-widget-data-photo").css({"border-top": "4px solid " + currentPhotoColor});
        $("#audio-arc").attr({
            stroke: currentAudioColor
        });
        $("#video-arc").attr({
            stroke: currentVideoColor
        });
        $("#photo-arc").attr({
            stroke: currentPhotoColor
        });
        dataColors = {audio: currentAudioColor, video: currentVideoColor, photo: currentPhotoColor, rest: REST_COLOR};
        $("#linear-diagram").replaceWith(makeLinearGraphic ());
    }
    // --------------------------------------------------

    // input color plugin instances

    $('.audio-color').ColorPicker({
        color: currentAudioColor,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('.audio-color').css('backgroundColor', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            currentAudioColor = "#" + hex;
    }
    });

    $('.video-color').ColorPicker({
        color: currentVideoColor,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('.video-color').css('backgroundColor', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            currentVideoColor = "#" + hex;
        }
    });

    $('.photo-color').ColorPicker({
        color: currentPhotoColor,
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            $('.photo-color').css('backgroundColor', '#' + hex);
        },
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            currentPhotoColor = "#" + hex;
        }
    });
    // -------------------------------------------------------

    // change color button
    
    $(".audio-color").css({"background-color": currentAudioColor});
    $(".video-color").css({"background-color": currentVideoColor});
    $(".photo-color").css({"background-color": currentPhotoColor});


    var changeFooterShareActive = false;
    $(".statistic-round-diagram-widget-footer-share").click(function () {
        if (changeFooterShareActive) {
            return;
        }
        changeFooterShareActive = true;
        if ($(this).attr("data-active") == "false") {
            $(".statistic-round-diagram-widget-content > ").fadeOut(700);
            $(".statistic-round-diagram-widget-color-change").fadeIn(1000, function () {
                changeFooterShareActive = false;
            });
            if ($(".statistic-round-diagram-widget-footer-upload").attr("data-active") == "true") {
                $(".statistic-round-diagram-widget-footer-upload").css({"background-color": ""});
                $(".statistic-round-diagram-widget-footer-upload").attr("data-active", "false");
            }
            $(this).css({"background-color": "#64584c"});
            $(this).attr("data-active", "true");
        } else {
            changeDiagramColors();
            $(".statistic-round-diagram-widget-content > ").fadeIn(1000, function () {
                changeFooterShareActive = false;
            });
            $(".statistic-round-diagram-widget-color-change").css({"display": "none"});
            $(".statistic-round-diagram-widget-data-change").css({"display": "none"});
            if ($(".statistic-round-diagram-widget-title-left").attr("data-active") == "true") {
                $(".month-report").css({"display": "none"});
            } else {
                $(".diagram-stats").css({"display": "none"});
            }
            $(this).css({"background-color": ""});
            $(this).attr("data-active", "false");
        }
    });
    // ------------------------------------------------------

    // submit button on change color block

    var submitButtonActive = false;
    
    $(".color-picker-block-submit-button").click(function () {
        if (submitButtonActive) {
            return;
        }
        submitButtonActive = true;
        changeDiagramColors();
        $(".statistic-round-diagram-widget-content > ").fadeIn(1000, function () {
            submitButtonActive = false;
        });
        $(".statistic-round-diagram-widget-color-change").css({"display": "none"});
        $(".statistic-round-diagram-widget-data-change").css({"display": "none"});
        if ($(".statistic-round-diagram-widget-title-left").attr("data-active") == "true") {
            $(".month-report").css({"display": "none"});
        } else {
            $(".diagram-stats").css({"display": "none"});
        }
        $(".statistic-round-diagram-widget-footer-share").css({"background-color": ""});
        $(".statistic-round-diagram-widget-footer-share").attr("data-active", "false");
    });
    // ---------------------------------------------------------------


    // helper functions for change data block
    function findMaxData (fileSpace) {
        var rest = MAX_DATA - totalSpace;
        var filesMax = Math.round(rest * 1024 / fileSpace);
        return filesMax
    }

    function changeMaxFiles () {
        $(".statistic-round-diagram-widget-data-change-audio-max").text(" - you can add " + findMaxData(AUDIO_FILE_SPACE) + " files");
        $(".statistic-round-diagram-widget-data-change-video-max").text(" - you can add " + findMaxData(VIDEO_FILE_SPACE) + " files");
        $(".statistic-round-diagram-widget-data-change-photo-max").text(" - you can add " + findMaxData(PHOTO_FILE_SPACE) + " files");
    }

    // change number of files
    changeMaxFiles ();
    // ----------------------------------------------------------

    // jquery ui spinner instances
    $("#audio-spinner").spinner({
        min: 0,
        stop: function(event, ui) {
            currentAudioFiles = ($(this).spinner("value"));
            updateData ();
            $("#video-spinner").spinner({max: currentVideoFiles + findMaxData(VIDEO_FILE_SPACE)});
            $("#photo-spinner").spinner({max: currentPhotoFiles + findMaxData(PHOTO_FILE_SPACE)});
            changeMaxFiles ();
        }
    });

    $("#audio-spinner").spinner( "value", currentAudioFiles);
    $("#audio-spinner").spinner({max: currentAudioFiles + findMaxData(AUDIO_FILE_SPACE)});

    $("#video-spinner").spinner({
        min: 0,
        stop: function(event, ui) {
            currentVideoFiles = ($(this).spinner("value"));
            updateData ();
            $("#audio-spinner").spinner({max: currentAudioFiles + findMaxData(AUDIO_FILE_SPACE)});
            $("#photo-spinner").spinner({max: currentPhotoFiles + findMaxData(PHOTO_FILE_SPACE)});
            changeMaxFiles ();
        }
    });
    $("#video-spinner").spinner( "value", currentVideoFiles);
    $("#video-spinner").spinner({max: currentVideoFiles + findMaxData(VIDEO_FILE_SPACE)});

    $("#photo-spinner").spinner({
        min: 0,
        stop: function(event, ui) {
            currentPhotoFiles = ($(this).spinner("value"));
            updateData ();
            $("#video-spinner").spinner({max: currentVideoFiles + findMaxData(VIDEO_FILE_SPACE)});
            $("#audio-spinner").spinner({max: currentAudioFiles + findMaxData(AUDIO_FILE_SPACE)});
            changeMaxFiles ();
        }
    });
    $("#photo-spinner").spinner( "value", currentPhotoFiles);
    $("#photo-spinner").spinner({max: currentPhotoFiles + findMaxData(PHOTO_FILE_SPACE)});
    // ------------------------------------------------------------

    // change data button

    var changeFooterUploadActive = false;
    $(".statistic-round-diagram-widget-footer-upload").click(function () {
        if (changeFooterUploadActive) {
            return;
        }
        changeFooterUploadActive = true;
        if ($(this).attr("data-active") == "false") {
            $(".statistic-round-diagram-widget-content > ").fadeOut(700);
            $(".statistic-round-diagram-widget-data-change").fadeIn(1000, function () {
                changeFooterUploadActive = false;
            });
            if ($(".statistic-round-diagram-widget-footer-share").attr("data-active") == "true") {
                $(".statistic-round-diagram-widget-footer-share").css({"background-color": ""});
                $(".statistic-round-diagram-widget-footer-share").attr("data-active", "false");
            }
            $(this).css({"background-color": "#64584c"});
            $(this).attr("data-active", "true");
        } else {
            $(".statistic-round-diagram-widget-content > ").fadeIn(1000, function () {
                changeFooterUploadActive = false;
            });
            $(".statistic-round-diagram-widget-color-change").css({"display": "none"});
            $(".statistic-round-diagram-widget-data-change").css({"display": "none"});
            if ($(".statistic-round-diagram-widget-title-left").attr("data-active") == "true") {
                $(".month-report").css({"display": "none"});
            } else {
                $(".diagram-stats").css({"display": "none"});
            }
            $(this).css({"background-color": ""});
            $(this).attr("data-active", "false");
        }
    });
    // ---------------------------------------------------------

    // submit button of change data block

    var submitButtonActive = false;
    $(".data-change-block-submit-button").click(function () {
        if (submitButtonActive) {
            return;
        }
        submitButtonActive = true;
        changeDougnut();
        $(".statistic-round-diagram-widget-content > ").fadeIn(1000, function () {
            submitButtonActive = false;
        });
        $(".statistic-round-diagram-widget-color-change").css({"display": "none"});
        $(".statistic-round-diagram-widget-data-change").css({"display": "none"});
        if ($(".statistic-round-diagram-widget-title-left").attr("data-active") == "true") {
            $(".month-report").css({"display": "none"});
        } else {
            $(".diagram-stats").css({"display": "none"});
        }
        $(".statistic-round-diagram-widget-footer-upload").css({"background-color": ""});
        $(".statistic-round-diagram-widget-footer-upload").attr("data-active", "false");
    });
    // -------------------------------------------------------------------

    // restore default options

    var changeFooterBackUpActive = false;

    $(".statistic-round-diagram-widget-footer-back-up").click(function () {
        if (changeFooterBackUpActive) {
            return;
        }
        changeFooterBackUpActive = true;

        if ($(".statistic-round-diagram-widget-footer-share").attr("data-active") == "true") {
            $(".statistic-round-diagram-widget-footer-share").css({"background-color": ""});
            $(".statistic-round-diagram-widget-footer-share").attr("data-active", "false");
        }
        if ($(".statistic-round-diagram-widget-footer-upload").attr("data-active") == "true") {
            $(".statistic-round-diagram-widget-footer-upload").css({"background-color": ""});
            $(".statistic-round-diagram-widget-footer-supload").attr("data-active", "false");
        }
        setDefaultSettings ();
        updateData ();
        changeDiagramColors();
        changeDougnut();
        $(".statistic-round-diagram-widget-content > ").fadeIn(1000, function () {
            changeFooterUploadActive = false;
        });
        $(".statistic-round-diagram-widget-color-change").css({"display": "none"});
        $(".statistic-round-diagram-widget-data-change").css({"display": "none"});
        if ($(".statistic-round-diagram-widget-title-left").attr("data-active") == "true") {
            $(".month-report").css({"display": "none"});
        } else {
            $(".diagram-stats").css({"display": "none"});
        }
    });
});



