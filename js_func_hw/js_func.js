/**
 * Created by siarheisheleh on 9/26/16.
 */

function show_numbers() {
    var up_line, down_line;

    for (i = 1; i <= 10; i++) {
        document.getElementById('func_side').innerHTML += i + '<br>';
    }
    for (i = 10; i >= 1; i--) {
        document.getElementById('func_side').innerHTML += i + '<br>';
    }
}

function show_ord_numbers() {
    for (i = 35; i <= 84; i++) {
        if (i % 2 == 0) {
            document.getElementById('func_side').innerHTML += i + '<br>';
        }
    }
}

function show_unord_numbers() {
    for (i = 61; i <= 143; i++) {
        if (i % 2 != 0) {
            document.getElementById('func_side').innerHTML += i + '<br>';
        }
    }
}

function mixed_show() {
    var symb_f, symb_l, bool;

    symb_f = +prompt('Enter first symbol', symb_f);
    symb_l = +prompt('Enter last symbol', symb_l);
    bool = confirm('True/False');

    if (typeof symb_f == 'number' && typeof symb_l == 'number' && typeof bool == 'boolean') {
        if (symb_f < symb_l) {
            if (bool == true) {
                for (i = symb_f; i <= symb_l; i++) {
                    if (i % 2 == 0) {
                        document.getElementById('func_side').innerHTML += i + '<br>';
                    }
                }
            } else {
                for (i = symb_f; i <= symb_l; i++) {
                    if (i % 2 != 0) {
                        document.getElementById('func_side').innerHTML += i + '<br>';
                    }
                }
            }
        }
        else {
            document.getElementById('func_side').innerHTML = 'Something wrong!';
        }
    } else {
        document.getElementById('func_side').innerHTML = 'Something wrong!';
    }
}

function draw_triangle() {
    var symbol, lines, answer;
    var str = '';

    symbol = prompt('What symbol U want?', symbol);
    lines = prompt('How many lines U want?', lines);
    answer = confirm('If U want triangle push OK, if U want square push CANCEL');

    if (symbol != '' || lines != '') {
        if (answer == true) {
            for (var i = 0; i < lines; i++) {
                str += symbol;
                document.getElementById('func_side').innerHTML += str + '<br>';
            }
        }
        else {
            for (i = 0; i < lines; i++) str += symbol;
            for (i = 0; i < lines; i++) document.getElementById('func_side').innerHTML += str + '<br>';
        }
    }
    else {
        document.getElementById('func_side').innerHTML = 'Symbol or line empty!';
    }
}


