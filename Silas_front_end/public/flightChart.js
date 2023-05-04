var discData = [
  {name: "Driver", speed: 12, glide: 5, turn: -1, fade: 3, stability: 2, color: "blue"},
  {name: "Midrange", speed: 5, glide: 4, turn: 0, fade: 2, stability: 2, color: "green"},
  {name: "Putter", speed: 2, glide: 3, turn: 0, fade: 1, stability: 1, color: "red"}
];

// Function to draw chart
function drawChart(data) {
  console.log(data);
  var container = d3.select("#flight-chart");

  // Remove any existing chart
  container.selectAll("*").remove();

  // Calculate SVG dimensions based on viewport size
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var svg = container.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("margin", "auto");

  // Update scales to use relative values based on SVG dimensions
 // Update scales to use stability and speed properties
 var xAxis = d3.scaleLinear()
 .domain([7, -4])
 .range([0, svgWidth * 0.8]);

var yAxis = d3.scaleLinear()
 .domain([0, 15])
 .range([svgHeight * 0.8, 0]);

var xAxisGroup = svg.append("g")
 .attr("transform", "translate(" + svgWidth * 0.1 + "," + (svgHeight * 0.9) + ")")
 .call(d3.axisBottom(xAxis).tickFormat(d => d.toFixed(1))); // add tick formatting

var yAxisGroup = svg.append("g")
 .attr("transform", "translate(" + svgWidth * 0.1 + "," + svgHeight * 0.1 + ")")
 .call(d3.axisLeft(yAxis).tickValues(d3.range(0, 16, 1)));

// Draw grid lines
svg.selectAll(".horizontal-line")
 .data(yAxisGroup.selectAll(".tick").data())
 .enter()
 .append("line")
 .attr("class", "horizontal-line")
 .attr("x1", svgWidth * 0.1)
 .attr("y1", function(d){ return yAxis(d) + svgHeight * 0.1; }) // add svgHeight * 0.1 to account for y-axis position
 .attr("x2", svgWidth * 0.9)
 .attr("y2", function(d){ return yAxis(d) + svgHeight * 0.1; }); // add svgHeight * 0.1 to account for y-axis position


svg.selectAll(".vertical-line")
 .data(xAxis.ticks())
 .enter()
 .append("line")
 .attr("class", "vertical-line")
 .attr("x1", function(d){ return xAxis(d) + svgWidth * 0.1; })
 .attr("y1", svgHeight * 0.1)
 .attr("x2", function(d){ return xAxis(d) + svgWidth * 0.1; })
 .attr("y2", svgHeight * 0.9);

 const handleMouseover = (event, d) => {
  d3.select(event.currentTarget).attr("r", 10);
  var tooltip = svg.append("g")
    .attr("id", "tooltip-" + d.name.replace(/\s+/g, ''));
    
  // Get the width of the text
  const textWidth = tooltip.append("text")
    .style("font-size", "12px")
    .style("fill", "white")
    .text(d.name + " - Speed: " + d.speed + ", Glide: " + d.glide + ", Turn: " + parseInt(d.turn) + ", Fade: " + parseInt(d.fade))
    .node().getComputedTextLength();
    
  tooltip.append("rect")
    .attr("x", (xAxis(d.stability) + 55).toString())
    .attr("y", (yAxis(d.speed) + 45 -15).toString())
    .attr("width", textWidth + 10) // Set the width of the rect to be the width of the text plus 10
    .attr("height", "20")
    .attr("fill", "black")
    .attr("opacity", "0.8")
    .insert("text", ":first-child");
    
  tooltip.append("text")
    .attr("x", (xAxis(d.stability) + 60).toString())
    .attr("y", (yAxis(d.speed) + 45).toString())
    .text(d.name + " - Speed: " + d.speed + ", Glide: " + d.glide + ", Turn: " + parseInt(d.turn) + ", Fade: " + parseInt(d.fade))
    .style("font-size", "12px")
    .style("fill", "white");
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
  .attr("cx", function(d) { return xAxis(d.stability) + svgWidth * 0.1; })
  .attr("cy", function(d) { return yAxis(d.speed) + svgHeight * 0.1; })
  .attr("r", 5)
  .attr("fill", function(d){return d.color; })
  .attr("stroke", "whitesmoke") // Add a black border around the circle
  .attr("stroke-width", "1px") // Set the width of the border to 1 pixel
  .on("mouseover", handleMouseover)
  .on("mouseout", handleMouseout);

      

  // Add labels
  svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Disc Flight Chart");

  svg.append("text")
    .attr("x", svgWidth/2) // center horizontally
    .attr("y", svgHeight * .99) // position below x-axis
    .attr("text-anchor", "middle")
    .text("Stability");

    svg.append("text")
    .attr("x", -svgHeight/2) // center vertically
    .attr("y", svgWidth * 0.1) // position left of y-axis
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-50, 0) rotate(-90)") // move text left by 50 pixels and rotate
    .text("Speed");
  


  // Add event listener to re-render chart on window resize
  window.addEventListener('resize', function() {
    drawChart(data);
  });
 }


