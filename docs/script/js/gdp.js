var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#gdp-chart").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv('./Data/GDP_per_capita.csv', function(data){
        return {
            country = d.Country,
            ninty= d["1990"],
            nintyfive= d["1995"],
            twenty= d["2000"],
            twentyfive= d["2005"],
            twentyten= d["2010"],
            twentyfifteen= d["2015"],
            twentytwenty= d["2020"]
            
          };
        })

        console.log(data);
        

        
    


    