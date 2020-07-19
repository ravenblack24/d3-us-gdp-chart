document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.send();
    req.onload = function() {
       const dataset = JSON.parse(req.responseText);
      const dTest = dataset.data;

    //   const datasetTest = { "data": [
    //     [
    //       "1945-01-01",
    //       100
    //     ],
    //     [
    //       "1950-04-01",
    //       150
    //     ],
    //     [
    //       "1955-07-01",
    //       50
    //     ],
    //     [
    //       "1960-10-01",
    //       200
    //     ],
    //     [
    //       "1965-01-01",
    //       300
    //     ]
    //   ]}

    //   const dTest = datasetTest.data;
      

      const max = d3.max(dTest, (item) => item[1]);
      const min = d3.min(dTest, (item) => item[1]);
    
      const w = 900;
      const h = 350;

      var xScale = d3.scaleLinear()
                        .domain([0, dTest.length])
                        .range(0, w);

                        console.log(dTest.length);

      var yScale = d3.scaleLinear()
                        .domain([0, max])
                        .range([0, h]);
  
      const body = d3.select(".chart")
                 .append("svg")
                 .attr("width", w)
                 .attr("height", h)
                 .attr("class", "chart__svg");
   
      
    body.selectAll("rect")
        .data(dTest)
        .enter()
        .append("rect")
        .attr("data-date", (dTest) => dTest[0])
        .attr("data-gdp", (dTest) => dTest[1])
        .attr("width", 2)
        .attr("height", (dTest) => yScale(dTest[1]))
        .attr("x", (dTest, i) =>  i*3)
        .attr("y", (dTest) => h -  yScale(dTest[1]))
        .attr("fill", "navy")
        .attr("class", "bar");

      
      
      
    }
  });
  
  