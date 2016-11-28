

jQuery(document).ready(function () {

    var emailsToSend = [];

    var lenghtOfSpan = {1: 250, 2: 123, 3:80, 4:58, 5:45, 6:36, 7:30, 8:25, 9:22, 10:19};
    var emailColors = {1: "#5e90af", 2: "#4daf7b", 3: "#e15432", 4: "#ebc85e", 5: "#4cd3be"};

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function addEmail (email, num) {
        var color = num % 5;
        if (color == 0) {
            color = 5;
        }
        $(".contact-form-widget-text-section-emails").append("<span style='background-color:" + emailColors[color] + "'>" + email + "</span>")
    }

    function changeWidthOfEmails() {
        var num = $(".contact-form-widget-text-section-emails > *").length;
        $(".contact-form-widget-text-section-emails span").css({"width": + lenghtOfSpan[num] + "px"});
    }

    function addValidComment (text) {
        $(".contact-form-widget-text-section-valide-comment").text(text);
        $(".contact-form-widget-text-section-valide-comment").fadeIn(500);
        var timerId = setTimeout(function(){
            $(".contact-form-widget-text-section-valide-comment").fadeOut(500);
        },2000)
    }

    function addSendMessage (text) {
        $(".contact-form-widget-send-message").text(text);
        $(".contact-form-widget-send-message").fadeIn(500);
        var timerId = setTimeout(function(){
            $(".contact-form-widget-send-message").fadeOut(500);
        },2000)
    }

    $(".contact-form-widget-text-section-contacts-form-add-button").click(function () {
        if($(this).attr("data-active") == "false" && $(".contact-form-widget-text-section-emails").has("span")) {
            $(".contact-form-widget-text-section-emails").fadeOut(500);
            $(".contact-form-widget-text-section-contacts-form-add-button").css({"color": "#b1a599"});
            $(".contact-form-widget-text-section-contacts-form").attr("placeholder", "Add mail");
            $(this).attr("data-active", "true");
        } else {
            var email = $(".contact-form-widget-text-section-contacts-form").val();
            if (isValidEmailAddress(email) && ($.inArray(email, emailsToSend)) == -1) {
                emailsToSend.push(email);
                addEmail (email,emailsToSend.length);
                changeWidthOfEmails();
                $(".contact-form-widget-text-section-contacts-form").val("");
                $(".contact-form-widget-text-section-contacts-form-add-button").css({"color": "#ede3dd"});
                $(".contact-form-widget-text-section-contacts-form-add-button").attr("data-active", "false");
                $(".contact-form-widget-text-section-contacts-form").attr("placeholder", "");
                $(".contact-form-widget-text-section-emails").fadeIn(500);
            } else {
                var text = "This email is not valid or has already been in contact list";
                addValidComment (text);

            }
        }
    });

    $(".contact-form-widget-send-section-button").click(function() {
        var subject = $(".contact-form-widget-text-section-subject-form").val();
        var message = $(".contact-form-widget-text-section-message-form").val();
        if (emailsToSend.length != 0 && subject !== "" && message !== "") {
            if ($("#copycheckbox").prop("checked")) {
                var text = "Your mail was sent and copy was saved"
            } else {
                var text = "Your mail was sent"
            }
            addSendMessage(text);
            $(".contact-form-widget-text-section-contacts-form").val("");
            $("#text-section-subject-form").val("");
            $(".contact-form-widget-text-section-message-form").val("");
            $(".contact-form-widget-text-section-contacts-form").attr("placeholder", "Add mail");
            $(".contact-form-widget-text-section-contacts-form-add-button").attr("data-active", "true");
            $(".contact-form-widget-text-section-contacts-form-add-button").css({"color": "#ede3dd"});
            emailsToSend = [];
            $(".contact-form-widget-text-section-emails").fadeOut(5);
            $(".contact-form-widget-text-section-emails").empty();

        }else {
            if (subject == "") {
                $("#text-section-subject-form").css({"border":"1px solid red", "color": "red"});
                $("#text-section-subject-form").val("This fild is requared");
                var timerId1 = setTimeout(function(){
                    $("#text-section-subject-form").css({"border":"1px solid #e5d4c2", "color":""});
                    $("#text-section-subject-form").val("");
                },2000)
            }
            if (emailsToSend.length == 0) {
                $(".contact-form-widget-text-section-contacts-form").css({"border":"1px solid red", "color": "red"});
                $(".contact-form-widget-text-section-contacts-form").val("This fild is requared");
                var timerId2 = setTimeout(function(){
                    $(".contact-form-widget-text-section-contacts-form").css({"border":"1px solid #e5d4c2", "color":""});
                    $(".contact-form-widget-text-section-contacts-form").val("");
                },2000)
            }
            if (message == "") {
                $(".contact-form-widget-text-section-message-form").css({"border":"1px solid red", "color": "red"});
                $(".contact-form-widget-text-section-message-form").val("This fild is requared");
                var timerId3 = setTimeout(function(){
                    $(".contact-form-widget-text-section-message-form").css({"border":"1px solid #e5d4c2", "color":""});
                    $(".contact-form-widget-text-section-message-form").val("");
                },2000)
            }
        }
    });
});