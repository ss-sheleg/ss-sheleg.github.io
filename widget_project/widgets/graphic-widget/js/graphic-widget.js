

jQuery(document).ready(function () {

    var graphicWidgetData = [621.62, 618.57, 622.28, 624.68, 622.94, 624.25, 621.85, 623.81, 620.98, 618.15, 622.51, 619.46, 622.08, 618.81, 622.74, 626.01, 624.05, 624.49, 621.44 , 628.72, 630.68, 629.16, 627.86, 628.29, 629.38, 632.87, 631.78, 633.3, 632.21, 634.39];
    var barGraphData = [11, 11, 48, 59, 22, 9, 21, 16, 14, 12, 11, 23, 20, 16, 13, 11, 9, 15, 14, 16, 20, 18, 10, 15, 12, 22, 26, 30, 24, 18];
    var AAPLData = [15, 19, 28, 34, 16, 30, 20, 6, 10];
    var minOfGraphicWidgetData = 0;
    var graphicWidgetYDelta = 0;
    var MaxMinDiffOfGraphicWidgetData = 0;
    var graphicWidgetHeight = $("#graphic-widget-line-diagram").height() - 5;
    var graphicWidgetWidth = $("#graphic-widget-line-diagram").width();


    function findMinAndMaxOfData (data) {
        var min = 1000000;
        var max = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i] > max) {
                max = data[i];
            }
            if (data[i] < min) {
                min = data[i]
            }
        }
        return [max, min, (max - min)];
    }



    function findAveradgeChange (data) {
        var dx = 0;
        var lastItem = data[0];
        for (var i = 1; i < data.length; i++) {
            if (Math.abs(data[i] - lastItem) > dx) {
                dx = Math.abs(data[i] - lastItem);
            }
            lastItem = data[i];
        }
        return dx;
    }

    console.log(findAveradgeChange (barGraphData));

    function getRandomArbitary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function changeBarGraphData (data) {
        var newData = data;
        newData.shift();
        newData.push(Math.round(getRandomArbitary(0, 65)));
        return newData
    }

    function changeGraphicWidgetData (data) {
        var averadge = findAveradgeChange (data);
        var increase = Math.random();
        var change =  getRandomArbitary(0, averadge);
        var newData = data;
        var lastElem = newData[data.length - 1];
        newData.shift();
        var newElem = 0;
        if (increase > 0.5) {
            newElem = lastElem + change;
        } else {
            newElem = lastElem - change;
        }
        newData.push(newElem);
        return newData;
    }
    function updateGraphicWidgetData() {
        minOfGraphicWidgetData = findMinAndMaxOfData (graphicWidgetData)[1];
        MaxMinDiffOfGraphicWidgetData = findMinAndMaxOfData (graphicWidgetData)[2];
        graphicWidgetYDelta = graphicWidgetHeight/MaxMinDiffOfGraphicWidgetData;
    }

    function updategraphicWidgetContent () {
        var item1 = graphicWidgetData[graphicWidgetData.length - 1];
        var item2 = graphicWidgetData[graphicWidgetData.length - 2];
        var text1 = item1.toFixed(2);
        var text2 = (item1 - item2).toFixed(2);
        var text3 = ((item1 - item2) / (item2 / 100)).toFixed(3) + "%";
        if ((item1 - item2) > 0) {
            text2 = "+" + text2;
        }
        if ((item1 - item2) < 0 ) {
            $(".triangle-up").css({"border-top": "8px solid #ffffff", "border-bottom": ""});
        } else {
            $(".triangle-up").css({"border-bottom": "8px solid #ffffff", "border-top": ""});
        }
        $(".graphic-widget-line-diagram-indication-text1").text(graphicWidgetData[graphicWidgetData.length - 1].toFixed(2));
        $(".graphic-widget-line-diagram-indication-text2").text(text2 + " (" + text3 + ")")
    }
    
    updateGraphicWidgetData();
    updategraphicWidgetContent ();

    function makeGraphicWidgetDiagramPath (data, min, delta) {
        var x = 0;
        var d = "";
        for (var i = 0; i < data.length; i++) {
            if (i == 0) {
                d += "M ";
            } else {
                d += "L ";
            }
            var y = graphicWidgetHeight - (data[i] - min) * delta;
            d += x + "," + y + " ";
            x += graphicWidgetWidth/30;
        }
        return d
    }

    function drawGraphicWidgetLineDiagram () {
        $("#graphic-widget-line-diagram-path").attr({
            d: makeGraphicWidgetDiagramPath(graphicWidgetData, minOfGraphicWidgetData, graphicWidgetYDelta),
            "stroke": "#fff",
            "stroke-width": "3px",
            "fill": "none"
        })
    }

    function changeGraphic (graph, elem) {
        graph.replaceWith(elem);
    }

    function drawLineBarGraph(x, y1, y2, color, width) {
        var line = "x1='"+ x + "' y1='" + y1 + "' x2='" + x + "' y2='" + y2 + "'";
        var path =  "<line " + line + " stroke='" + color + "' stroke-width='" + width + "'/>";
        return path
    }

    function drawGraphicWidgetBarGraph (data) {
        var res = "";
        var x = 4;
        for (var i = 0; i < data.length; i++) {
            var y2 = 70 - data[i];
            res += drawLineBarGraph(x, 70, y2, "#3d9e68", 5);
            x += 9.4
        }
        return res
    }

    function drawGraphicWidgetAAPLChart(data) {
        res = "";
        x = 5;
        for (var i = 0; i < data.length; i++) {
            var y2 = 40 - data[i];
            var color = 0;
            if (i < 6) {
                color = "#e55f3b";
            } else {
                color = "#4daf7b";
            }
            res += drawLineBarGraph(x, 40, y2, color, 9);
            res += drawLineBarGraph(x, y2, 0, "#f6f0ec", 9);
            x += 14
        }
        return res

    }

    function makeGraphicWidgetBarGraph () {
        return '<svg width="283" height="70" id="graphic-widget-bar-graph">' + drawGraphicWidgetBarGraph (barGraphData) + '</svg>';
    }

    function makeGraphicWidgetAAPLChart () {
        return '<svg width="124" height="40" id="graphic-widget-my-chart">' + drawGraphicWidgetAAPLChart(AAPLData)  + '</svg>';
    }
    $(".graphic-widget-bar-graph-wrapper").append(makeGraphicWidgetBarGraph ());
    $(".graphic-widget-bar-chart").append(makeGraphicWidgetAAPLChart ());

    function graphicWidgetTimeUpdate () {
        var dt = new Date();
        var hours = dt.getHours();
        var minutes = dt.getMinutes();
        var time = "Today ";
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours > 12) {
            time += hours - 12 + ":" + minutes + " pm";
        } else {
            time += hours + ":" + minutes + " am";
        }
        $(".graphic-widget-date-time-indication").text(time);
    }

    makeGraphicWidgetBarGraph ();
    makeGraphicWidgetAAPLChart ();
    drawGraphicWidgetLineDiagram ();
    graphicWidgetTimeUpdate ();

    setInterval (function () {
        graphicWidgetTimeUpdate();
        graphicWidgetData = changeGraphicWidgetData(graphicWidgetData);
        barGraphData = changeBarGraphData(barGraphData);
        updateGraphicWidgetData();
        updategraphicWidgetContent ();
        drawGraphicWidgetLineDiagram ();
        changeGraphic ($("#graphic-widget-bar-graph"), makeGraphicWidgetBarGraph ());
    },10000);
    
});