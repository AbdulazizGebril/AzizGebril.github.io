// Reference: https://github.com/kjschmidt913/data-visualization
// Code tweaked to fit the project's visualisation

// Data for years 1990, 1995, 2000, 2005, 2010, 2015 and 2020
// Data found in Immigration_Region.csv

var twenty20Data = [{
    title: "Sub-Saharan Africa",
    value: 22221538,
    all: 280598105

},
{
    title: "Northern Africa and Western Asia",
    value: 49767746,
    all: 280598105

},
{
    title: "Central and Southern Asia",
    value: 19427576,
    all: 280598105

},
{
    title: "Eastern and South-Eastern Asia",
    value: 19591106,
    all: 280598105

},
{
    title: "Latin America and the Caribbean",
    value: 14794623,
    all: 280598105

},
{
    title: "Oceania",
    value: 313069,
    all: 280598105

},
{
    title: "Australia and New Zealand",
    value: 9067584,
    all: 280598105

},
{
    title: "Europe and Northern America",
    value: 145414863,
    all: 280598105

}
];

//2010
var twenty10Data = [{
title: "Sub-Saharan Africa",
value: 15854637,
all: 220983187


},
{
title: "Northern Africa and Western Asia",
value: 32638434,
all: 220983187


},
{
title: "Central and Southern Asia",
value: 19676783,
all: 220983187


},
{
title: "Eastern and South-Eastern Asia",
value: 15760463,
all: 220983187


},
{
title: "Latin America and the Caribbean",
value: 8326588,
all: 220983187


},
{
title: "Oceania",
value: 298175,
all: 220983187


},
{
title: "Australia and New Zealand",
value: 6830423,
all: 280598105

},
{
title: "Europe and Northern America",
value: 121597684,
all: 280598105

}
];

var twentyData = [{
title: "Sub-Saharan Africa",
value: 13151229,
all: 173230585



},
{
title: "Northern Africa and Western Asia",
value: 20321397,
all: 173230585



},
{
title: "Central and Southern Asia",
value: 20139825,
all: 173230585



},
{
title: "Eastern and South-Eastern Asia",
value: 10506212,
all: 173230585



},
{
title: "Latin America and the Caribbean",
value: 6539738,
all: 173230585



},
{
title: "Oceania",
value: 296618,
all: 173230585



},
{
title: "Australia and New Zealand",
value: 5065063,
all: 173230585


},
{
title: "Europe and Northern America",
value: 97210503,
all: 173230585


}
];

var nintyData = [{
title: "Sub-Saharan Africa",
value: 13286341,
all: 152986157



},
{
title: "Northern Africa and Western Asia",
value: 17608769,
all: 152986157



},
{
title: "Central and Southern Asia",
value: 26168623,
all: 152986157



},
{
title: "Eastern and South-Eastern Asia",
value: 6835882,
all: 152986157



},
{
title: "Latin America and the Caribbean",
value: 7135971,
all: 152986157



},
{
title: "Oceania",
value: 258678,
all: 152986157



},
{
title: "Australia and New Zealand",
value: 4473260,
all: 152986157


},
{
title: "Europe and Northern America",
value: 77218633,
all: 152986157


}
];

// Setting width, height , Radius& width of Dount
var width = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var donutWidth = 100;
// Setting colours to be used in chart (8 colours for 8 Regions)
var color = d3.scaleOrdinal()
.range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#8c564b", "#7f7f7f", "#bcbd22", "#17becf"]);

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
.data(pie(twenty20Data))
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

function change(data) {
var pie = d3.pie()
    .value(function (d) {
        return d.value;
    }).sort(null)(data);

var width = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var donutWidth = 100;

path = d3.select("#donut")
    .selectAll("path")
    .data(pie); // Compute the new angles
var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);
path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

// changing data with coressponding button selcetion as shown in home.HTML
d3.select("button#ninty")
.on("click", function () {
    change(nintyData);
})

d3.select("button#twenty")
.on("click", function () {
    change(twentyData);
})

d3.select("button#twentytwenty")
.on("click", function () {
    change(twenty20Data);
})
d3.select("button#twentyten")
.on("click", function () {
    change(twenty10Data);
})