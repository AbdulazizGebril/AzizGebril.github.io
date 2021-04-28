google.charts.load('current', {'packages':['corechart', 'geochart']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
    drawSheetName('Refugee_Destination', 'SELECT A,B', refugeedestinationResponseHandler);
    
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


function refugeedestinationResponseHandler(response){
    checkError(response);
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    var options = {
        title: "Refugee Destinations",
        legend: 'none',
        bars: 'horizontal',
        vAxis: {title: 'Country'},
        hAxis: {title: 'Refugee Hosted'},
        colors: ['red']
    };

   
    var chart = new google.visualization.BarChart(document.getElementById('refugee_destination'));
    chart.draw(data, options);
}