// Function to draw chart
export function drawChart(data) {
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
  // Draw data points
  var points = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xAxis(d.turn + d.fade) + 50; })
    .attr("cy", function(d) { return yAxis(d.speed); }) // Update y-coordinate calculation
    .attr("r", 5)
    .attr("fill", "white");

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

  // Add legend
  var legend = svg.append("g")
    .attr("transform", "translate(350, 50)");

  legend.append("circle")
    .attr("cx", 10)
    .attr("cy", 10)
    .attr("r", 5)
    .attr("fill", "blue");

  legend.append("text")
    .attr("x", 20)
    .attr("y", 14)
    .text("Discs");

}
var discData = [
  {name: "Driver", speed: 12, glide: 5, turn: -1, fade: 3},
  {name: "Midrange", speed: 5, glide: 4, turn: 0, fade: 2},
  {name: "Putter", speed: 2, glide: 3, turn: 0, fade: 1}
];
fetch('/api/discs')
  .then(response => response.json())
  .then(data => {
    // Format data into discs
    const discs = data.map(d => {
      return {
        name: d.Mold,
        speed: d.Speed,
        glide: d.Glide,
        turn: parseFloat(d.Turn),
        fade: parseFloat(d.Fade)
      };
    });

    // Generate chart using discs
    drawChart(discs);
  })
  .catch(error => console.error(error));
drawChart(discData);