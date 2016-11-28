/**
 * Created by themark on 17.08.2016.
 */

jQuery(document).ready(function () {

    function setBorderRadius(elem, slide) {
        if ($(elem).css("border-top-left-radius") == "5px") {
            if (slide == "up") {
                return {"border-bottom-left-radius": "5px"}
            }else {
                return {"border-bottom-left-radius": "0px"}
            }
        } else {
            if (slide == "up") {
                return {"border-bottom-right-radius": "5px"}
            }else {
                return {"border-bottom-right-radius": "0px"}
            }
        }
    };

    var active = false;

    $(".navigation-widget-menu-item").click(function() {

        if (active) {
            return;
        }

        active = true;
        if ($(this).attr("data-active") == "false") {
            if ($(".navigation-widget-menu-item[data-active='true']").length == 1) {
                var activeClass = $(".navigation-widget-menu-item[data-active='true']")[0];
                var borderBottomRadiusUp = setBorderRadius(activeClass, "up");
                $(activeClass).next("li").find(".navigation-widget-menu-dropbox").slideUp(1000, function() {
                    $(activeClass).css({"background-color": "#fff", "border-bottom": "none" });
                    $(activeClass).css(borderBottomRadiusUp);
                    active = false;
                });
                $(activeClass).attr("data-active", "false");
            }
            var borderBottomRadius = setBorderRadius($(this), "down");
            $(this).css(borderBottomRadius);
            $(this).css({"background-color": "#f8f3f0", "border-bottom": "3px solid #49a371"});
            if ($(this).hasClass("navigation-widget-menu-my-profile")) {
                $(".navigation-widget-sale-block").animate({"left": "220px"}, 870);
            } else {
                $(".navigation-widget-sale-block").animate({"left": "16px"}, 1100);
            }
            $(this).next("li").find(".navigation-widget-menu-dropbox").slideDown(1000, function () {
                active = false;
            });            
            $(this).attr("data-active", "true");
        } else {
            var thisClass = $(this);
            var borderBottomRadius = setBorderRadius($(this), "up");
            $(this).next("li").find(".navigation-widget-menu-dropbox").slideUp(1000, function() {
                $(thisClass).css(borderBottomRadius);
                $(thisClass).css({"border-bottom": "none"});
                active = false;
            });
            $(".navigation-widget-sale-block").animate({"left": "119px"}, 1000);
            $(this).css({"background-color": "#fff"});
            $(this).attr("data-active", "false");
        }
    });


    // animated background

    var colors1 = new Array(
        [238,134,153],
        [238,167,111],
        [177,141,85],
        [171,213,148],
        [144,241,205],
        [230,145,62]);

    var colors2 = new Array(
        [234,84,87],
        [214,107,203],
        [187,164,233],
        [122,205,240],
        [79,231,197],
        [219,231,121]);

    var colors3 = new Array(
        [122,203,219],
        [82,222,112],
        [233,209,79],
        [230,148,129],
        [246,148,231],
        [187,148,227]);

    var colors4 = new Array(
        [168,224,134],
        [236,161,106],
        [231,139,180],
        [198,159,221],
        [132,170,233],
        [107,222,175]);

    var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
    var colorIndices = [0,1,2,3];

//transition speed
    var gradientSpeed = 0.002;

    function updateGradient()
    {

        if ( $===undefined ) return;

        var c1_0_0 = colors1[colorIndices[0]];
        var c1_0_1 = colors1[colorIndices[1]];


        var c2_0_0 = colors2[colorIndices[0]];
        var c2_0_1 = colors2[colorIndices[1]];


        var c3_0_0 = colors3[colorIndices[0]];
        var c3_0_1 = colors3[colorIndices[1]];


        var c4_0_0 = colors4[colorIndices[0]];
        var c4_0_1 = colors4[colorIndices[1]];


        var istep = 1 - step;
        var r1 = Math.round(istep * c1_0_0[0] + step * c1_0_1[0]);
        var g1 = Math.round(istep * c1_0_0[1] + step * c1_0_1[1]);
        var b1 = Math.round(istep * c1_0_0[2] + step * c1_0_1[2]);
        var color1_1 = "rgba("+r1+","+g1+","+b1+",1)";
        var color1_2 = "rgba("+r1+","+g1+","+b1+",0)";

        var r2 = Math.round(istep * c2_0_0[0] + step * c2_0_1[0]);
        var g2 = Math.round(istep * c2_0_0[1] + step * c2_0_1[1]);
        var b2 = Math.round(istep * c2_0_0[2] + step * c2_0_1[2]);
        var color2_1 = "rgba("+r2+","+g2+","+b2+",1)";
        var color2_2 = "rgba("+r2+","+g2+","+b2+",0)";

        var r3 = Math.round(istep * c3_0_0[0] + step * c3_0_1[0]);
        var g3 = Math.round(istep * c3_0_0[1] + step * c3_0_1[1]);
        var b3 = Math.round(istep * c3_0_0[2] + step * c3_0_1[2]);
        var color3_1 = "rgba("+r3+","+g3+","+b3+",1)";
        var color3_2 = "rgba("+r3+","+g3+","+b3+",0)";

        var r4 = Math.round(istep * c4_0_0[0] + step * c4_0_1[0]);
        var g4 = Math.round(istep * c4_0_0[1] + step * c4_0_1[1]);
        var b4 = Math.round(istep * c4_0_0[2] + step * c4_0_1[2]);
        var color4_1 = "rgba("+r4+","+g4+","+b4+",1)";
        var color4_2 = "rgba("+r4+","+g4+","+b4+",0)";

        $('#gradient').css({
            background: "-webkit-linear-gradient(45deg,"+color1_1+" 0%, "+color1_2+" 70%), -webkit-linear-gradient(315deg,"+color2_1+" 0%, "+color2_2+" 70%), -webkit-linear-gradient(225deg,"+color3_1+" 0%, "+color3_2+" 70%), -webkit-linear-gradient(135deg,"+color4_1+" 0%, "+color4_2+" 70%)"}).css({
            background: "linear-gradient(45deg,"+color1_1+" 0%, "+color1_2+" 70%), linear-gradient(315deg,"+color2_1+" 0%, "+color2_2+" 70%), linear-gradient(225deg,"+color3_1+" 0%, "+color3_2+" 70%), linear-gradient(135deg,"+color4_1+" 0%, "+color4_2+" 70%)"});

        step += gradientSpeed;
        if ( step >= 1 )
        {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors1.length - 1))) % colors1.length;
            colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors1.length - 1))) % colors1.length;

        }
    }

    setInterval(updateGradient,20);

});



