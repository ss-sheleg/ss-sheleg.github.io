/**
 * Created by themark on 21.08.2016.
 */

jQuery(document).ready(function () {
    var Nick = {"first-name": ["Nikolai", "Nikolay","Николай"], "last-name":["Zuenok","Зуенок"]};
    var Mark = {"first-name": ["Andrei", "Andrew", "Андрей", "Andrey"], "last-name": ["Markovich","Маркович"]};
    var Vlada = {"first-name": ["Vlada", "Влада"], "last-name": ["Vasilevich", "Василевич"]};
    var Serg = {"first-name": ["Sergei","Sergey", "Сергей"], "last-name": ["Sheleg", "Шелег"]};
    var Roma = {"first-name": ["Roman", "Роман"], "last-name": ["Polikarpov","Поликарпов"]};
    var Tim = {"first-name": ["Timofei", "Timofey", "Тимофей"], "last-name": ["Zhidovich", "Жидович"]};
    var ourTeam = {"nick":Nick,"mark":Mark,"serg":Serg,"vlada":Vlada,"tim":Tim,"roman":Roma};

    var numbers = {1: "First", 2: "Second", 3: "Third", 4: "Fourth", 5: "Fifth", 6: "Sixth"};
    var teammates = {};
    var step = 1;


    function checkTeammate (firstName, lastName) {
        for (var teammate in ourTeam) {
            for (var i = 0; i < ourTeam[teammate]["last-name"].length; i++) {
                if (lastName.toLowerCase() == ourTeam[teammate]["last-name"][i].toLowerCase()) {
                    for (var j = 0; j < ourTeam[teammate]["first-name"].length; j++) {
                        if (firstName.toLowerCase() == ourTeam[teammate]["first-name"][j].toLowerCase()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };

    function makeGameResults() {
        var res = "";
        var len = 0;
        for (var key in teammates) {
            len += 1;
        }
        for (var i = 1; i <= len; i++) {
            var firstName = teammates[i]["first-name"];
            var lastName = teammates[i]["last-name"];
            if (checkTeammate (firstName, lastName)) {
                res += "<li style='color: #4daf7b'>" + firstName + " " + lastName + " - You are right!</li>";
            } else {
                res += "<li style='color: #e7643f'>" + firstName + " " + lastName + " - Sorry, this guy is not our teammate</li>";
            }

        }
        console.log("hello");
        return "<ol>" + res + "</ol>";
    }


    $(".button-next").click(function () {
        if ($(this).hasClass("button-end")){
            var firstName = $("#first-name-input").val();
            var lastName = $("#last-name-input").val();
            teammates[step] = {"first-name": firstName, "last-name": lastName};
            $("fieldset").fadeOut (500, function () {
                $(".button-next").removeClass("button-end");
                $(".team-game-results").prepend(makeGameResults());
                $(".team-game-results").slideDown(500);
            });            
        } else  {
            var firstName = $("#first-name-input").val();
            var lastName = $("#last-name-input").val();
            teammates[step] = {"first-name": firstName, "last-name": lastName};
            step += 1;
            var newLegend = "<legend>" + numbers[step] + " teammate:</legend>";
            $("fieldset").fadeOut (500, function () {

                $("fieldset legend").replaceWith(newLegend);
                if (step == 6) {
                    $("button.button-next").text("End");
                    $("button.button-next").addClass("button-end");
                }
                $("#first-name-input").val("");
                $("#last-name-input").val("");
                $("fieldset").fadeIn(500);
            });
        }
    });

    $(".button-again").click(function () {
        teammates = {};
        step = 1;
        var newLegend = "<legend>" + numbers[step] + " teammate:</legend>";
        $(".team-game-results").slideUp(500, function () {
            $("fieldset legend").replaceWith(newLegend);
            $("button.button-next").text("Next");
            $("#first-name-input").val("");
            $("#last-name-input").val("");
            $(".team-game-results ol").remove();
            $("fieldset").fadeIn (500);
        });
    });
    
    
});
