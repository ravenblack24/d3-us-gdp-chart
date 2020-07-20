document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
       const dataset = JSON.parse(req.responseText);
        const dTest = dataset.data;

      // const datasetTest = { "data": [
      //   [
      //     "1945-01-01",
      //     100
      //   ],
      //   [
      //     "1950-04-01",
      //     150
      //   ],
      //   [
      //     "1955-07-01",
      //     50
      //   ],
      //   [
      //     "1960-10-01",
      //     200
      //   ],
      //   [
      //     "1965-01-01",
      //     300
      //   ]
      // ]}

      // const dTest = datasetTest.data;
      
      const xMax = new Date(d3.max(dTest, (item) => item[0]));
      const xMin = new Date(d3.min(dTest, (item) => item[0]));

      console.log(xMin, xMax)

      const yMax = d3.max(dTest, (item) => item[1]);
      const yMin = d3.min(dTest, (item) => item[1]);
    
      const w = 830;
      const h = 450;
      const padding = 40;

      /* Scaling data to fit svg chart */

      var xScale = d3.scaleTime()
                      .domain([xMin, xMax])
                      .range([padding, w-padding]);

      var yScale = d3.scaleLinear()
                      .domain([yMin, yMax])
                      .range([h-padding, padding]);
  
      const svg = d3.select(".chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h)
                 .attr("class", "chart__svg");
   
      
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
        .attr("fill", "navy")
        .attr("class", "bar");


      /* Graph axes */ 
      const xAxis = d3.axisBottom(xScale);              
      const yAxis = d3.axisLeft(yScale);

      svg.append("g")
        .attr("id", "xAxis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .attr("fill", "black")
        .call(xAxis);
      
      svg.append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate("+padding+", 0)")
        .attr("fill", "black")
        .call(yAxis);
      
    }
  });
  
  