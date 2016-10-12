/**
 * Created by siarheisheleh on 10/12/16.
 */

function get_color() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    document.getElementById('button_move').style.background = color;
}