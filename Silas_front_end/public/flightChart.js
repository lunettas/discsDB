// Function to draw chart
function drawChart(data) {
  console.log(data);
   var container = d3.select("#flight-chart");

  // Remove any existing chart
  container.selectAll("*").remove();

  // Select SVG element
  var svg = d3.select("#flight-chart").append("svg")
    .attr("width", 500)
    .attr("height", 400);

  // Draw axes
  var xAxis = d3.scaleLinear()
    .domain([-4, 6]) // Update x-axis domain
    .range([400, 0]);

  var yAxis = d3.scaleLinear()
    .domain([0, 14]) // Update y-axis domain
    .range([350, 50]);

  var xAxisGroup = svg.append("g")
    .attr("transform", "translate(50, 350)")
    .call(d3.axisBottom(xAxis));

  var yAxisGroup = svg.append("g")
    .attr("transform", "translate(50, 0)") // Change y-axis transform
    .call(d3.axisLeft(yAxis));

  // Draw grid lines
  svg.selectAll(".horizontal-line")
    .data(yAxis.ticks())
    .enter()
    .append("line")
    .attr("class", "horizontal-line")
    .attr("x1", 50)
    .attr("y1", function(d){ return yAxis(d); })
    .attr("x2", 450)
    .attr("y2", function(d){ return yAxis(d); });

  svg.selectAll(".vertical-line")
    .data(xAxis.ticks())
    .enter()
    .append("line")
    .attr("class", "vertical-line")
    .attr("x1", function(d){ return xAxis(d) + 50; })
    .attr("y1", 50)
    .attr("x2", function(d){ return xAxis(d) + 50; })
    .attr("y2", 350);

    const handleMouseover = (event, d) => {
      d3.select(event.currentTarget).attr("r", 10);
      svg.append("text")
        .attr("id", "tooltip-" + d.name.replace(/\s+/g, ''))
        .attr("x", (xAxis(d.turn + d.fade) + 50).toString())
        .attr("y", (yAxis(d.speed) - 10).toString())
        .text(d.name + " - Speed: " + d.speed + ", Glide: " + d.glide + ", Turn: " + parseInt(d.turn) + ", Fade: " + parseInt(d.fade))
        .style("font-size", "12px");
      console.log(d.name + " - Speed: " + d.speed + ", Glide: " + d.glide + ", Turn: " + parseInt(d.turn) + ", Fade: " + parseInt(d.fade));
    }
    const handleMouseout = (event, d) => {
      d3.select(event.currentTarget).attr("r", 5);
      svg.select("#tooltip-" + d.name.replace(/\s+/g, '')).remove();
    }
    
    var discs = svg.selectAll(".disc")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "disc");
    
    discs.append("circle")
      .attr("cx", function(d) { return xAxis(d.turn + d.fade) + 50; })
      .attr("cy", function(d) { return yAxis(d.speed); })
      .attr("r", 5)
      .attr("fill", function(d){return d.color; })
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout);
      

  // Add labels
  svg.append("text")
    .attr("x", 250)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Disc Flight Chart");

  svg.append("text")
    .attr("x", 250)
    .attr("y", 380)
    .attr("text-anchor", "middle")
    .text("Stability");

  svg.append("text")
    .attr("x", -200)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Speed");

 }


