//Reference: https://bl.ocks.org/jrzief/70f1f8a5d066a286da3a1e699823470f
// Code tweaked to adjust the racing bar chart in Migration Destinations tab

// Defining SVG object
var svg = d3.select("#chart-area").append("svg")
      .attr("width", 1200)
      .attr("height", 600);
   
    
    var tickDuration = 2000;
    
    var top_n = 10;
    var height = 600;
    var width = 1200;
    
    const margin = {
      top: 80,
      right: 0,
      bottom: 5,
      left: 0.5
    };
  
    let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);
    
    // adding the text for different labels in the chart
    let title = svg.append('text')
     .attr('class', 'title')
     .attr('y', 24)
     
  
    let subTitle = svg.append("text")
     .attr("class", "subTitle")
     .attr("y", 55)
     .html("Immigration Volume");
   
    let caption = svg.append('text')
     .attr('class', 'caption')
     .attr('x', width)
     .attr('y', height-5)
     .style('text-anchor', 'end')
     
// Start year 1990
     let year = 1990;
    
    
    // import Destination_Racing.csv and make sure to deal with null values.
    // Define random colors for bars
    d3.csv('./Data/Destination_Racing.csv').then(function(data) {
    
       console.log(data);
      
       data.forEach(d => {
        d.value = +d.value,
        d.lastValue = +d.lastValue,
        d.value = isNaN(d.value) ? 0 : d.value,
        d.year = +d.year,
        d.colour = d3.hsl(Math.random()*320,0.85,0.55)
      });

     console.log(data);
    
     // filter data for the year, sort the based on number of Immigrants ("value") then pick the top 10 destinations
     let yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
      .sort((a,b) => b.value - a.value)
      .slice(0, top_n);
  
      yearSlice.forEach((d,i) => d.rank = i);
    
     console.log('yearSlice: ', yearSlice)
  
     // scaling and axis: use a dynamic X coordinate
     let x = d3.scaleLinear()
        .domain([0, d3.max(yearSlice, d => d.value)])
        .range([margin.left, width-margin.right-65]);
  
     let y = d3.scaleLinear()
        .domain([top_n, 0])
        .range([height-margin.bottom, margin.top]);
  
     let xAxis = d3.axisTop()
        .scale(x)
        .ticks(width > 500 ? 5:2)
        .tickSize(-(height-margin.top-margin.bottom))
        .tickFormat(d => d3.format(',')(d));
  
     svg.append('g')
       .attr('class', 'axis xAxis')
       .attr('transform', `translate(0, ${margin.top})`)
       .call(xAxis)
       .selectAll('.tick line')
       .classed('origin', d => d == 0);
  
    // bars: width set to the value function to the domain, 
    // height is fixed (only function to th barPadding)
     svg.selectAll('rect.bar')
        .data(yearSlice, d => d.Country)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', x(0)+1)
        .attr('width', d => x(d.value)-x(0)-1)
        .attr('y', d => y(d.rank)+5)
        .attr('height', y(1)-y(0)-barPadding)
        .style('fill', d => d.colour);
      
     // add country label to the bar    
     svg.selectAll('text.label')
        .data(yearSlice, d => d.Country)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.value)-8)
        .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1)
        .style('text-anchor', 'end')
        .html(d => d.Country);
    
    // add last value next to each bar    
    svg.selectAll('text.valueLabel')
      .data(yearSlice, d => d.Country)
      .enter()
      .append('text')
      .attr('class', 'valueLabel')
      .attr('x', d => x(d.value)+5)
      .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1)
      .text(d => d3.format(',.0f')(d.lastValue));
    
    // add year to the bottom right corner
    let yearText = svg.append('text')
      .attr('class', 'yearText')
      .attr('x', width-margin.right-150)
      .attr('y', height-25)
      .style('text-anchor', 'end')
      .html(~~year)
     

   // for each interval do:
   // calculate the yearSlice 
   // enter() --> add new bars and labels
   // transition() --> transition
   // exit() --> exit  
   let ticker = d3.interval(e => 
    {

      yearSlice = data.filter(d => d.year == year && !isNaN(d.value))
        .sort((a,b) => b.value - a.value)
        .slice(0,top_n);

      yearSlice.forEach((d,i) => d.rank = i);
     
      console.log('IntervalYear: ', yearSlice);

      x.domain([0, d3.max(yearSlice, d => d.value)]); 
     
      svg.select('.xAxis')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .call(xAxis);
    
       let bars = svg.selectAll('.bar').data(yearSlice, d => d.Country);
    
       bars
        .enter()
        .append('rect')
        .attr('class', d => `bar ${d.Country.replace(/\s/g,'_')}`)
        .attr('x', x(0)+1)
        .attr( 'width', d => x(d.value)-x(0)-1)
        .attr('y', d => y(top_n+1)+5)
        .attr('height', y(1)-y(0)-barPadding)
        .style('fill', d => d.colour)
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => y(d.rank)+5);
          
       bars
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value)-x(0)-1)
        .attr('y', d => y(d.rank)+5);
            
       bars
        .exit()
        .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('width', d => x(d.value)-x(0)-1)
          .attr('y', d => y(top_n+1)+5)
          .remove();

       let labels = svg.selectAll('.label')
          .data(yearSlice, d => d.Country);
     
       labels
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.value)-8)
        .attr('y', d => y(top_n+1)+5+((y(1)-y(0))/2))
        .style('text-anchor', 'end')
        .html(d => d.Country)    
        .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1);
             
    
   	   labels
          .transition()
          .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => x(d.value)-8)
            .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1);
     
       labels
          .exit()
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => x(d.value)-8)
            .attr('y', d => y(top_n+1)+5)
            .remove();
         

     
       let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.Country);
    
       valueLabels
          .enter()
          .append('text')
          .attr('class', 'valueLabel')
          .attr('x', d => x(d.value)+5)
          .attr('y', d => y(top_n+1)+5)
          .text(d => d3.format(',.0f')(d.lastValue))
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1);
       
       // use interpoltateRound to transition from last value to current value
       valueLabels
          .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('x', d => x(d.value)+5)
            .attr('y', d => y(d.rank)+5+((y(1)-y(0))/2)+1)
            .tween("text", function(d) {
               let i = d3.interpolateRound(d.lastValue, d.value);
               return function(t) {
                 this.textContent = d3.format(',')(i(t));
              };
            });
      
     
      valueLabels
        .exit()
        .transition()
          .duration(tickDuration)
          .ease(d3.easeLinear)
          .attr('x', d => x(d.value)+5)
          .attr('y', d => y(top_n+1)+5)
          .remove();

          yearText.html(~~year);
     
     if(year == 2020) ticker.stop();
     year = d3.format('.1f')((+year) + 5);
   },tickDuration);


   

 });




