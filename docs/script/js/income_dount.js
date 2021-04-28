// Reference: https://github.com/kjschmidt913/data-visualization
// Code tweaked to fit the project's visualisation

// Data for 2020
// Data found in Income_Immigration.csv
var Data = [{
    title: "High-income countries",
    value: 181897756,
    all: 280025332
    
    
    
    },
    {
    title: " Upper-middle income countries",
    value: 57383443,
    all: 280025332
    
    
    
    },
    {
    title: "Lower-middle income countries",
    value: 28512090,
    all: 280025332
    
    
    
    },
    {
    title: "Low-income countries",
    value: 12232043,
    all: 280025332
    
    
    
    }
    
    ];
    // Setting width, height , Radius& width of Dount

    var width = 480;
    var height = 480;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 100;
    // Setting colours to be used in chart (4 colors for 4 income Regions)

    var color = d3.scaleOrdinal()
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]);
    
    // defining SVG 

    var svg = d3.select('#donut')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');
    
    // using d3.arc to generate an arc for the dount chart

    var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

    // d3.pie to take in data to create dount chart

    var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
    .sort(null);
    
    // defining size and spacing between chart legend

    var legendRectSize = 10;
    var legendSpacing = 7;
    
    // tip to reflect data once moving over different chart section, shape of tip is defined in styles.css under "dount-tip"

    var donutTip = d3.select("body").append("div")
    .attr("class", "donut-tip")
    .style("opacity", 0);
    
    // using svg.selectAll to find to find shape and fill with data

    var path = svg.selectAll('path')
    .data(pie(Data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.title);
    })
    .attr('transform', 'translate(0, 0)')
    // event when mouse hovers over and tip is shown with information

    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
        donutTip.transition()
            .duration(50)
            .style("opacity", 1);
        let num = (Math.round((d.value / d.data.all) * 100)).toString() + '%';
        donutTip.html(num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
    
    })
    // Transitioning when mouse hovers awya from chart

    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        donutTip.transition()
            .duration('50')
            .style("opacity", 0);
    });
    

    // defining dimensions of legend section and passing data

    var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 92;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });
    
// Neat circles next to legend with corresponding color

    legend.append('circle')
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.5rem');
    
// adding regions name to legend

    legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });