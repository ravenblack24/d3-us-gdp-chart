document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
       const dataset = JSON.parse(req.responseText);
        const dTest = dataset.data;

      /* Get max and min values for year range */
      const xMax = new Date(d3.max(dTest, (item) => item[0]));
      const xMin = new Date(d3.min(dTest, (item) => item[0]));
      
      /* Get max and min values for gdp data range */
      const yMax = d3.max(dTest, (item) => item[1]);
      const yMin = d3.min(dTest, (item) => item[1]);

      /* Specify dimensions for svg */
      const w = 830;
      const h = 450;
      const padding = 40;

      /* Scaling data to fit svg dimensions */
      var xScale = d3.scaleTime()
                      .domain([xMin, xMax])
                      .range([padding, w-padding]);

      var yScale = d3.scaleLinear()
                      .domain([yMin, yMax])
                      .range([h-padding, padding]);

      /* Define svg */
      const svg = d3.select(".chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h)
                 .attr("class", "chart__svg");

      /* Define tooltip */                 
      var tooltip = d3.select(".chart")
                      .append("div")
                      .attr("id", "tooltip")
                      .attr("style", "position: absolute; opacity: 0;")
                      .attr("class", "tooltip");

      /* Plot bars on chart and tooltip visibility */
      svg.selectAll("rect")
        .data(dTest)
        .enter()
        .append("rect")
        .attr("data-date", (dTest) => dTest[0])
        .attr("data-gdp", (dTest) => dTest[1])
        .attr("x", (dTest) => xScale(new Date(dTest[0])))
        .attr("y", (dTest) => yScale(dTest[1]))
        .attr("width", w/dTest.length)
        .attr("height", (dTest) => (h - padding) - yScale(dTest[1]))
        .attr("fill", "#1C2541")
        .attr("class", "bar")
        .on("mouseover", function(h) {         
          tooltip.html(getFormattedDate(h[0]) + "<br />"+ getFormattedGDP(h[1]))  
            .style("left", (d3.mouse(this)[0]+60) + "px")     
            .style("top", (d3.mouse(this)[1]+80) + "px")
            .style("opacity", 1)
            .attr("data-date", h[0]) 
        })
        .on('mouseout', () => {
          d3.select("#tooltip")
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
  
    }
  });
  
  