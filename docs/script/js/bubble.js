dataset = {
    "refunhcr": [{
            "Country": "Afghanistan",
            "refugee": 2729148

        },
        {
            "Country": "Burndi",
            "refugee": 382360

        },
        {
            "Country": "Centeral African Republic",
            "refugee": 609010
        },
        {
            "Country": "China",
            "refugee": 213220
        },
        {
            "Country": "Colombia",
            "refugee": 190322
        },
        {
            "Country": "Dem. Republic of Congo",
            "refugee": 822260
        },
        {
            "Country": "Eritrea",
            "refugee": 514389
        },
        {
            "Country": "Sri Lanka",
            "refugee": 143821

        },
        {
            "Country": "Iran",
            "refugee": 127956
        },
        {
            "Country": "Iraq",
            "refugee": 325485
        },
        {
            "Country": "Mali",
            "refugee": 165350
        },
        {
            "Country": "Myanmar",
            "refugee": 995164
        },
        {
            "Country": "Nigeria",
            "refugee": 348637
        },
        {
            "Country": "Pakistan",
            "refugee": 137332
        },
        {
            "Country": "Rwanda",
            "refugee": 246050
        },
        {
            "Country": "Somalia",
            "refugee": 910654
        },
        {
            "Country": "Viet Nam",
            "refugee": 316605
        },
        {
            "Country": "Sudan",
            "refugee": 771540
        },
        {
            "Country": "South Sudan",
            "refugee": 2278276
        },
        {
            "Country": "Syria",
            "refugee": 6596627
        },
        {
            "Country": "Venezula",
            "refugee": 3581926
        },
        {
            "Country": "Stateless",
            "refugee": 154899
        },
        {
            "Country": "Palestine",
            "refugee": 99548
        },
        {
            "Country": "Ethiopia",
            "refugee": 93518
        }

        
        
    ]
};

var diameter = 2000;
var color = d3.scaleOrdinal(d3.schemeCategory20b);

//edited the responsive bar code to apply to bubble chart
default_height = 1800;
default_ratio = diameter / default_height;

// Determine current size, which determines vars
function set_size() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // Check if height is limiting factor
    if (current_ratio > default_ratio) {
        diameter = 800;
        // Else width is limiting
    } else {
        diameter = 500;
    }
};
set_size();

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(.5);

var svg2 = d3.select("#bubble")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function (d) {
        return d.refugee;
    });


var node = svg2.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.refunhcr
    })
    .append("g")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '.8');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr('opacity', '1');
    })
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function (d) {
        return d.Country;
    });

node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function (d, i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.Country;
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function (d) {
        return d.data.refugee.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    })
    .attr("font-size", function (d) {
        return d.r / 5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");