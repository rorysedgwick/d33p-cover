// Horrible way of importing all CSV data on page load \\
var dataset04, dataset05, dataset06, dataset07, dataset08, dataset09,
dataset10, dataset11, dataset12, dataset13, dataset14;

var rendered = false;

// Store all CSV data in separate variables once loaded \\
d3.csv("./data/2008.csv", function(data) {
    dataset08 = data;
});

d3.csv("./data/2009.csv", function(data) {
  dataset09 = data;
});

d3.csv("./data/2010.csv", function(data) {
  dataset10 = data;
});

d3.csv("./data/2011.csv", function(data) {
  dataset11 = data;
});

d3.csv("./data/2014.csv", function(data) {
    dataset14 = data;
});

// On click trigger d3 render with appropriate data set \\
d3.select("#d2008")
  .on("click", function() {
    if (!rendered) {
      renderD3(dataset08);
      rendered = true;
    } else if (rendered) {
      reRenderD3(dataset08);
    }
  });

d3.select("#d2009")
  .on("click", function() {
    if (!rendered) {
      renderD3(dataset09);
      rendered = true;
    } else if (rendered) {
      reRenderD3(dataset09);
    }
  });

d3.select("#d2010")
  .on("click", function() {
    if (!rendered) {
      renderD3(dataset10);
      rendered = true;
    } else if (rendered) {
      reRenderD3(dataset10);
    }
  });

d3.select("#d2011")
  .on("click", function() {
    if (!rendered) {
      renderD3(dataset11);
      rendered = true;
    } else if (rendered) {
      reRenderD3(dataset11);
    }
  });

d3.select("#d2014")
  .on("click", (function() {
    if (!rendered) {
      renderD3(dataset14);
      rendered = true;
    } else if (rendered) {
      reRenderD3(dataset14);
    }
  }));
// // ------------------------- end terrible data importing method ------------------------- \\ \\

var noneReg       = new RegExp("no formal qualification", "i");
var studyingReg   = new RegExp("still study", "i");
var otherReg      = new RegExp("other", "i");
var gcseReg       = new RegExp("g(cs|sc)e\/o-level\/cse", "i");
var vocationalReg = new RegExp("Vocational", "i");
var aLevelReg     = new RegExp("a-level or equivalent", "i");
var bachelorsReg  = new RegExp("bachelor degree or equivalent", "i");
var mastersPhdReg = new RegExp("phd or equivalent", "i");

var w = 600;
var h = 400;
var padding = w / 10;

// Append svg element to page and store in variable \\
var svg = d3.select("body")
            .append("svg")
            .attr({
              width: w,
              height: h,
            });

function renderD3(dataset) {

var finalData = [
  { qual: "None",           qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "Still in study", qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "Other",          qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "GCSE",           qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "Vocational",     qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "A Level",        qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "Bachelors",      qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
  { qual: "Masters/PhD",    qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} }  ];

  var NaNCounter = 0;

  // Calculate qualification frequencies, relative percent and average incomes  \\
  calculateDataset = function() {
    var totalPeople = dataset.length;
    console.log("people", totalPeople);

    dataset.forEach(function(d) {
      if((d.qual.match(noneReg))) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[0].qualNum += 1;
          finalData[0].totalInc += d.fihhyr_a;
          finalData[0].avgInc = finalData[0].totalInc / finalData[0].qualNum;
          finalData[0].percent = finalData[0].qualNum / (totalPeople - NaNCounter) * 100;
        }
        else { console.log("something else happened?"); }
      }
      else if (d.qual.match(studyingReg)) {
        d.fihhyr_a = +d.fihhyr_a;
          if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[1].qualNum += 1;
          finalData[1].totalInc += d.fihhyr_a;
          finalData[1].avgInc = finalData[1].totalInc / finalData[1].qualNum;
          finalData[1].percent = finalData[1].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(otherReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[2].qualNum += 1;
          finalData[2].totalInc += d.fihhyr_a;
          finalData[2].avgInc = finalData[2].totalInc / finalData[2].qualNum;
          finalData[2].percent = finalData[2].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(gcseReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[3].qualNum += 1;
          finalData[3].totalInc += d.fihhyr_a;
          finalData[3].avgInc = finalData[3].totalInc / finalData[3].qualNum;
          finalData[3].percent = finalData[3].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(vocationalReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[4].qualNum += 1;
          finalData[4].totalInc += d.fihhyr_a;
          finalData[4].avgInc = finalData[4].totalInc / finalData[4].qualNum;
          finalData[4].percent = finalData[4].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(aLevelReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[5].qualNum += 1;
          finalData[5].totalInc += d.fihhyr_a;
          finalData[5].avgInc = finalData[5].totalInc / finalData[5].qualNum;
          finalData[5].percent = finalData[5].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(bachelorsReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[6].qualNum += 1;
          finalData[6].totalInc += d.fihhyr_a;
          finalData[6].avgInc = finalData[6].totalInc / finalData[6].qualNum;
          finalData[6].percent = finalData[6].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(mastersPhdReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[7].qualNum += 1;
          finalData[7].totalInc += d.fihhyr_a;
          finalData[7].avgInc = finalData[7].totalInc / finalData[7].qualNum;
          finalData[7].percent = (finalData[7].qualNum / (totalPeople - NaNCounter)) * 100;
        }
      } else {
        console.log("no match found", d.qual);
        NaNCounter += 1;
      }

    });
      console.log("NaN", NaNCounter);

  }();


  // Calculate average age of total dataset. Those giving stupid answers are removed from data being used for calculation \\
  averageAge = function() {
    var totalAge = 0;
    var idiots = [];
    dataset.forEach(function(d) {
      d.age = +d.age;
      if (isNaN(d.age)) {
        idiots.push(d);
        dataset.splice(dataset.indexOf(d), 1);
      } else {
        totalAge += d.age;
      }
    });

    var avgAge = totalAge / dataset.length;
    // console.log(avgAge);
  }();


  // LET THE D3 MADNESS BEGIN \\
  // ------------------------ //

  // Define scales for x and both y axes \\
  var xScale = d3.scale.ordinal()
                       .domain(d3.range(finalData.length))
                       .rangeRoundBands([padding, w - padding], 0.125);

  var yScaleQual = d3.scale.linear()
                           .domain([0, d3.max(finalData, function(d) { return d.percent; }) ])
                           .range([h- padding, padding]);

  var yScaleInc = d3.scale.linear()
                          .domain([0, d3.max(finalData, function(d) { return d.avgInc; }) ])
                          .range([h - padding, padding]);

  // Define axes themselves \\
  var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .ticks(0)
                    .tickFormat(function(d) { return; })
                    .orient("bottom");

  var yAxisLeft = d3.svg.axis()
                        .scale(yScaleQual)
                        .ticks(10)
                        .orient("left");

  var yAxisRight = d3.svg.axis()
                         .scale(yScaleInc)
                         .ticks(10)
                         .orient("right");


  // Append bar chart elements showing relative frequences of qualifications to page \\
  svg.selectAll("rect")
     .data(finalData)
     .enter()
     .append("rect")
     .attr({
        x: function(d, i) { return xScale(i); },
        y: function(d) { return (yScaleQual(d.percent)); },
        "width": function(d) { return xScale.rangeBand(); },
        "height": function(d) {return h - yScaleQual(d.percent) - padding; },
        "fill": "lightblue"
      });

  // Add text labels to bar chart elements \\
  svg.selectAll("text.qual")
     .data(finalData)
     .enter()
     .append("text")
     .text(function(d) { return d.qual; })
     .attr({
        "class": "qual",
        x: function(d, i) { return xScale(i); },
        y: h -padding,
        "font-size": "10px",
        "fill": "black",
        dy: "1.5em"
     });

  svg.selectAll("circle")
     .data(finalData)
     .enter()
     .append("circle")
     .attr({
      cx: function(d, i) { return xScale(i) + xScale.rangeBand() / 2; },
      cy: function (d) { return yScaleInc(d.avgInc); },
      r: function(d) { return h / 80; },
      "fill": "forestgreen"
     });


  // Add label to x axis \\
  svg.append("text")
     .attr({
      "class": "xLabel",
      "text-anchor":"middle",
      x: function() { return w / 2; },
      y: function() { return h - (padding / 2); },
      "stroke-width": "0.5px",
      "fill": "black"
     })
     .text("Highest qualification achieved");

  // Add label to left y axsis \\
  svg.append("text")
     .attr({
      "class": "yLabelLeft",
      "transform": "rotate(-90)",
      x: 0 - (h / 2),
      y: 0 + (padding / 3),
      "fill": "black",
     })
     .style("text-anchor", "middle")
     .text("Percent achieving each qualification");

  // Add label to right y axis \\
  svg.append("text")
     .attr({
      "class": "yLabelRight",
      "transform": "rotate(+90)",
      x: h / 2,
      y: 0 - (w - padding / 6),
      "fill": "forestgreen",
     })
     .style("text-anchor", "middle")
     .text("Average income per qualification, £GBP");

  // Add title to graph \\
  svg.append("text")
     .attr({
      "class": "graphTitle",
      x: (w - padding) / 2,
      y: 0 + (padding / 2),
      "font-size": "18px"
     })
     .style("text-anchor", "middle")
     .text("Average income for people holding various qualifications");


  // Append x and both y axes to page \\
  svg.append("g")
     .attr({
       "class": "x axis",
       "transform": "translate(0, " + (h - padding) + ")",
       "stroke": "lightblue",
       "stroke-width": "0.5px"
     })
     .call(xAxis);

  svg.append("g")
     .attr({
      "class": "yl axis",
      "transform": "translate(" + (padding) + ", 0)",
      "stroke": "lightblue",
      "stroke-width": "0.5px"
     })
     .call(yAxisLeft);

  svg.append("g")
     .attr({
      "class": "yr axis",
      "transform": "translate(" + (w - (padding)) + ", 0)",
      "stroke-width": "0.5px",
      "stroke": "forestgreen"
     })
     .call(yAxisRight);
  }

function reRenderD3(dataset) {

  var finalData = [
    { qual: "None",           qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "Still in study", qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "Other",          qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "GCSE",           qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "Vocational",     qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "A Level",        qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "Bachelors",      qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} },
    { qual: "Masters/PhD",    qualNum: 0, percent: 0, totalInc: 0, avgInc: 0, gender: {male: 0, female: 0} }  ];

  var NaNCounter = 0;

  // Calculate qualification frequencies, relative percent and average incomes  \\
  calculateDataset = function() {
    var totalPeople = dataset.length;
    console.log("people", totalPeople);

    dataset.forEach(function(d) {
      if((d.qual.match(noneReg))) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[0].qualNum += 1;
          finalData[0].totalInc += d.fihhyr_a;
          finalData[0].avgInc = finalData[0].totalInc / finalData[0].qualNum;
          finalData[0].percent = finalData[0].qualNum / (totalPeople - NaNCounter) * 100;
        }
        else { console.log("something else happened?"); }
      }
      else if (d.qual.match(studyingReg)) {
        d.fihhyr_a = +d.fihhyr_a;
          if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[1].qualNum += 1;
          finalData[1].totalInc += d.fihhyr_a;
          finalData[1].avgInc = finalData[1].totalInc / finalData[1].qualNum;
          finalData[1].percent = finalData[1].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(otherReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[2].qualNum += 1;
          finalData[2].totalInc += d.fihhyr_a;
          finalData[2].avgInc = finalData[2].totalInc / finalData[2].qualNum;
          finalData[2].percent = finalData[2].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(gcseReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[3].qualNum += 1;
          finalData[3].totalInc += d.fihhyr_a;
          finalData[3].avgInc = finalData[3].totalInc / finalData[3].qualNum;
          finalData[3].percent = finalData[3].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(vocationalReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[4].qualNum += 1;
          finalData[4].totalInc += d.fihhyr_a;
          finalData[4].avgInc = finalData[4].totalInc / finalData[4].qualNum;
          finalData[4].percent = finalData[4].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(aLevelReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[5].qualNum += 1;
          finalData[5].totalInc += d.fihhyr_a;
          finalData[5].avgInc = finalData[5].totalInc / finalData[5].qualNum;
          finalData[5].percent = finalData[5].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(bachelorsReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[6].qualNum += 1;
          finalData[6].totalInc += d.fihhyr_a;
          finalData[6].avgInc = finalData[6].totalInc / finalData[6].qualNum;
          finalData[6].percent = finalData[6].qualNum / (totalPeople - NaNCounter) * 100;
        }
      }
      else if (d.qual.match(mastersPhdReg)) {
        d.fihhyr_a = +d.fihhyr_a;
        if (isNaN(d.fihhyr_a)) {
          NaNCounter += 1;
        } else if(!isNaN(d.fihhyr_a)) {
          finalData[7].qualNum += 1;
          finalData[7].totalInc += d.fihhyr_a;
          finalData[7].avgInc = finalData[7].totalInc / finalData[7].qualNum;
          finalData[7].percent = (finalData[7].qualNum / (totalPeople - NaNCounter)) * 100;
        }
      } else {
        console.log("no match found", d.qual);
      }

    });
      console.log("data", finalData);
      console.log("NaN", NaNCounter);

  }();


  // LET THE D3 MADNESS BEGIN AGAIN \\
  // ------------------------------ //

  // Define scales for x and both y axes \\
  var xScale = d3.scale.ordinal()
                       .domain(d3.range(finalData.length))
                       .rangeRoundBands([padding, w - padding], 0.125);

  var yScaleQual = d3.scale.linear()
                           .domain([0, d3.max(finalData, function(d) { return d.percent; }) ])
                           .range([h- padding, padding]);

  var yScaleInc = d3.scale.linear()
                          .domain([0, d3.max(finalData, function(d) { return d.avgInc; }) ])
                          .range([h - padding, padding]);

 var xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(0)
            .tickFormat(function(d) { return; })
            .orient("bottom");

  var yAxisLeft = d3.svg.axis()
                        .scale(yScaleQual)
                        .ticks(10)
                        .orient("left");

  var yAxisRight = d3.svg.axis()
                         .scale(yScaleInc)
                         .ticks(10)
                         .orient("right");


  // Append bar chart elements showing relative frequences of qualifications to page \\
  svg.selectAll("rect")
     .data(finalData)
     .transition()
     .delay(function(d, i) { return i / finalData.length * 1000; })
     .attr({
        x: function(d, i) { return xScale(i); },
        y: function(d) { return (yScaleQual(d.percent)); },
        "width": function(d) { return xScale.rangeBand(); },
        "height": function(d) {return h - yScaleQual(d.percent) - padding; },
        "fill": "lightblue"
      });

  // Append updated circle elements to page showing average income \\
  svg.selectAll("circle")
     .data(finalData)
     .transition()
     .delay(function(d, i) { return i / finalData.length * 1000; })
     .attr({
        cy: function (d) { return yScaleInc(d.avgInc); },
        "fill": "forestgreen"
     });


  svg.select(".yl.axis")
      .transition()
      .duration(1000)
      .call(yAxisLeft);

  svg.select(".yr.axis")
     .transition()
     .duration(1000)
     .call(yAxisRight);
}
