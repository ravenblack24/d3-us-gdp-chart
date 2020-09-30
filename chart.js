document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    // Make request to external dataset source
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onerror = () => {
          console.log("Error getting data");
    };
    req.send();
    req.onload = () => {
      const dataset = JSON.parse(req.responseText);
      drawChart(dataset);
    }
  });

  var drawChart = (dataset) => {
   
      const data = dataset.data;

      /* Get max and min values for year range */
      const xMax = new Date(d3.max(data, (item) => item[0]));
      const xMin = new Date(d3.min(data, (item) => item[0]));
      
      /* Get max value for gdp data range */
      const yMax = d3.max(data, (item) => item[1]);

      /* Specify dimensions for svg */
      const w = 830;
      const h = 450;
      const padding = 40;

      /* Scaling data to fit svg dimensions */
      const xScale = d3.scaleTime()
                      .domain([xMin, xMax])
                      .range([padding, w-padding]);

      const yScale = d3.scaleLinear()
                      .domain([0, yMax])
                      .range([h-padding, padding]);

      /* Define svg */
      const svg = d3.select(".chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h)
                 .attr("class", "chart__svg")
            

      /* Define tooltip */                 
      const tooltip = d3.select(".chart")
                      .append("div")
                      .attr("id", "tooltip")
                      .attr("style", "position: absolute; opacity: 0;")
                      .attr("class", "tooltip");

      /* Plot bars on chart and tooltip visibility */
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("data-date", (data) => data[0])
        .attr("data-gdp", (data) => data[1])
        .attr("x", (data) => xScale(new Date(data[0])))
        .attr("y", (data) => yScale(data[1]))
        .attr("width", w/data.length)
        .attr("height", (data) => (h - padding) - yScale(data[1]))
        .attr("fill", "#1C2541")
        .attr("class", "bar")
        .on("mouseover", function(h) {         
            tooltip
              .html(getFormattedDate(h[0]) + "<br />"+ getFormattedGDP(h[1]))  
              .style("left", (d3.mouse(this)[0]+60) + "px")     
              .style("top", (d3.mouse(this)[1]+80) + "px")
              .style("opacity", 1)
            .attr("data-date", h[0]) 
        })
        .on('mouseout', () => {
            tooltip
              .style("opacity", 0);
        })

      /* Graph axes */ 
      const xAxis = d3.axisBottom(xScale);              
      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .attr("fill", "#0B132B")
        .call(xAxis);
      
      svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate("+padding+", 0)")
        .attr("fill", "#0B132B")
        .call(yAxis);
  }

  /* Get formatted date for tooltip display */  
  const getFormattedDate = (date) => {
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth()+1
    let quarter = "Q";

    switch(month) {
        case 1:
          quarter += "1"
          break;
        case 4:
          quarter += "2"
          break;
        case 7:
          quarter += "3"
          break;
        case 10:
          quarter += "4"
          break;
        default:
          quarter += "Error!"
          break;
    }
    return `${year} ${quarter}`;
}

/* get formatted GDP value for tooltip display */
const getFormattedGDP = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) + " Billion";
} 