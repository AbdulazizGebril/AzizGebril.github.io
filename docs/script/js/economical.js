google.charts.load('current', {'packages':['corechart', 'geochart']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
    drawSheetName('GDP_Per_Capita_Destination', 'SELECT A,B,C,D,E,F,G,H', gdpdestinationResponseHandler);
    drawSheetName('GDP_Per_Capita_Origin', 'SELECT A,B,C,D,E,F,G,H', gdporiginResponseHandler);
    drawSheetName('Poverty_Destination', 'SELECT A,B,C,D,E,F,G,H', povertydestinationResponseHandler);
    drawSheetName('Poverty_Origin', 'SELECT A,B,C,D,E,F,G,H', povertyoriginResponseHandler);
    drawSheetName('Unemployment_Destination', 'SELECT A,B,C,D,E,F,G,H', unempdestinationResponseHandler);
    drawSheetName('Unemployment_Origin', 'SELECT A,B,C,D,E,F,G,H', unemporiginResponseHandler);
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler){
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/19eCLSeFKkEurETGa74kXsFWp0vK_MD91qtYpvvwAmKA/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString);
    
    query.send(responseHandler);
} //drawSheetName

function checkError(response){
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
} //checkError


//gdpdestinationResponseHandler, function to create column chart of GDP per Capita for Top destination countries
function gdpdestinationResponseHandler(response){
    checkError(response);
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});

    var options = {
        title: "GDP Per Capita bewteen 1990-2019 for top migration destinations ($)",
        vAxis: {title: 'GDP Per Capita ($)'},
        hAxis: {title: 'Country'}
        ,width:900
        ,height:500
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('gdp-chart'));
    chart.draw(data, options);
} 

//gdporiginResponseHandler, function to create column chart of GDP per Capita for Top migration origin countries
function gdporiginResponseHandler(response){
    checkError(response);
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});

    var options = {
        title: "GDP Per Capita bewteen 1990-2019 for top migration origins ($)",
        vAxis: {title: 'GDP Per Capita ($)'},
        hAxis: {title: 'Country'}
        ,width:900
        ,height:500
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('gdp-origin'));
    chart.draw(data, options);
}

//povertydestinationResponseHandler, function to create column chart of poverty rate for Top destination countries

    function povertydestinationResponseHandler(response){
        checkError(response);
        var data = response.getDataTable();
        data.sort({column: 6, desc: true});
    
        var options = {
            title: "Poverty rate (5.50$ a day) bewteen 1990-2019 for top migration destinations (% Population)",
            vAxis: {title: 'Population Percentage (%)'},
            hAxis: {title: 'Country'}
            ,width:900
            ,height:500
        };
    
        var chart = new google.visualization.ColumnChart(document.getElementById('poverty-destination'));
        chart.draw(data, options);
} 

//povertydestinationResponseHandler, function to create column chart of poverty rates for Top migration origin countries
function povertyoriginResponseHandler(response){
    checkError(response);
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});

    var options = {
        title: "Poverty rate (5.50$ a day) bewteen 1990-2019 for top migration origins (% Population)",
        vAxis: {title: 'Population Percentage (%)'},
        hAxis: {title: 'Country'}
        ,width:900
        ,height:500
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('poverty-origin'));
    chart.draw(data, options);
} 

//unempestinationResponseHandler, function to create column chart of unemployment rate for Top destination countries

function unempdestinationResponseHandler(response){
    checkError(response);
    var data = response.getDataTable();
    data.sort({column: 6, desc: true});

    var options = {
        title: "Unemployment rate bewteen 1990-2019 for top migration destinations",
        vAxis: {title: 'Percentage (%)'},
        hAxis: {title: 'Country'}
        ,width:900
        ,height:500
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('unemployment-destination'));
    chart.draw(data, options);
} 

//unempdestinationResponseHandler, function to create column chart of unemployment rates for Top migration origin countries

function unemporiginResponseHandler(response){
checkError(response);
var data = response.getDataTable();
data.sort({column: 6, desc: true});

var options = {
    title: "Unemployment rate bewteen 1990-2019 for top migration origins",
    vAxis: {title: 'Percentage (%)'},
    hAxis: {title: 'Country'}
    ,width:900
    ,height:500
};

var chart = new google.visualization.ColumnChart(document.getElementById('unemployment-origin'));
chart.draw(data, options);
} 




