
init();

var dropdown = d3.select("#zipSelector");

dropdown.on("change", function() {
    var zipSel = [];
    selected = d3.select(this).selectAll("option:checked").each(function() {zipSel.push(this.value)});
    var zipString = `${zipSel[0]}`;
    for (let i=1; i<zipSel.length; i++) {
        zipString += `, ${zipSel[i]}`
        if (i % 7 == 0) {
            zipString += "<br>";
        }
    };
    dropdownChange(zipSel, zipString);
}); 

function init() {
    d3.json("static/Resources/yelp_atl_restaurants.json").then(function (
      restData
    ) {
      var zips = [...new Set(Object.values(restData.postal_code))];
      zips.sort(function (a, b) {
        return a - b;
      });

      zips.forEach((zipCode) => {
        dropdown.append("option").text(zipCode).property("value", zipCode);
      });

      dropdownChange([30002], "30002");
      createAllBar();
    });
};

function dropdownChange(zipSel, zipString) {
    d3.json("static/Resources/categories.json").then(function (categories) {
      var typesBase = Object.values(categories.Category);

      //get restaurants info from json file
      d3.json("static/Resources/yelp_atl_restaurants.json").then(function (restData) {
        var countsBase = [];

        for (let i = 0; i < typesBase.length; i++) {
          countsBase[i] = 0;
        }

        var catList = Object.entries(restData.categories);
        var zipList = Object.entries(restData.postal_code);

        for (let j = 0; j < catList.length; j++) {
            for (let k=0; k<zipSel.length; k++) {
                if (zipSel[k] == (zipList[j][1])) { //(zipList[j][1] == zip) {
                    for (let i = 0; i < typesBase.length; i++) {
                        if (catList[j][1].split(", ").includes(typesBase[i])) {
                            countsBase[i] += 1;
                        }
                    }
                }
            }
        }

        var types = [];
        var counts = [];
        j = 0;

        for (let i = 0; i < typesBase.length; i++) {
          if (countsBase[i] != 0) {
            types[j] = typesBase[i];
            counts[j] = countsBase[i];
            j += 1;
          }
        }

        makeDotPlot(zipString, types, counts);
        makeBar(zipString, types, counts);
      });
    }); 
};

function makeDotPlot(zipString, types, counts) {
    var trace1 = {
    type: 'scatter',
    x: counts,
    y: types,
    mode: 'markers',
    name: 'Cuisine Type Count',
    marker: {
        color: 'rgba(111, 34, 50, 1)',
        line: {
        color: 'rgba(111, 34, 50, 1)',
        width: 1,
        },
        symbol: 'circle',
        size: 16
    }};

    var data = [trace1];

    var layout = {
    title: `Cuisine Type Count for Atlanta Zip Code<br> ${zipString}`,
    font: {
        color: 'rgba(195,7,63,1)',
        family: 'Patrick Hand',
        size: 16
    },
    xaxis: {
        showgrid: false,
        showline: true,
        linecolor: 'rgb(102, 102, 102)',
        tickfont: {
            font: {
                color: 'rgb(102, 102, 102)'
            }
        },
        autotick: true,
        ticks: 'outside',
        tickcolor: 'rgb(102, 102, 102)'
    },
    margin: {
        l: 140,
        r: 40,
        b: 50,
        t: 80
    },
    width: 700,
    height: 900,
    paper_bgcolor: 'rgb(254, 247, 234)',
    plot_bgcolor: 'rgb(254, 247, 234)',
    hovermode: 'closest'
    };

    Plotly.newPlot('dot-plot', data, layout);
};

function makeBar(zipString, types, counts) {

    var barList = [];

    for (let i=0; i<types.length; i++) {
        barList.push({"name": types[i], "count": counts[i]});
    };

    barList.sort(function(a,b) {
        if (a.count < b.count) {
            return -1;
        } else if (a.count == b.count) {
            if (a.name < b.name) {
                return 1;
            } else {
                return -1;
            };
        } else {
            return 1;
        };
    });

    barList.reverse();
    var topTypes=[];
    var topCounts=[];

    for (let i=0; i<10; i++) {
        topTypes[i] = barList[i].name;
        topCounts[i] = barList[i].count;
    };
    
    topTypes.reverse();
    topCounts.reverse();

    var data = [{
        type: 'bar',
        x: topCounts,
        y: topTypes,
        name: 'Top 10 Cuisines',
        orientation: 'h',
        marker: {
            color: 'rgba(111, 34, 50,1)',
            width: 1
        }
    }];

    var layout = {
        title: `Top 10 Cuisines for Atlanta Zip Code<br> ${zipString}`,
        font: {
            color: 'rgba(195,7,63,1)',
            family: 'Patrick Hand',
            size: 16
        },
        xaxis: {
            showgrid: false,
            showline: true,
            linecolor: 'rgb(102, 102, 102)',
            tickfont: {
                font: {
                    color: 'rgb(102, 102, 102)'
                }
            },
            autotick: true,
            ticks: 'outside',
            tickcolor: 'rgb(102, 102, 102)'
        },
        margin: {
            l: 140,
            r: 40,
            b: 50,
            t: 80
        },
        width: 500,
        height: 900,
        paper_bgcolor: 'rgb(254, 247, 234)',
        plot_bgcolor: 'rgb(254, 247, 234)',
        hovermode: 'closest'
    };
      
    Plotly.newPlot('bar', data, layout);
};

function createAllBar() {
    d3.json("static/Resources/categories.json").then(function (categories) {
        var types = Object.values(categories.Category);
  
        //get restaurants info from json file
        d3.json("static/Resources/yelp_atl_restaurants.json").then(function (restData) {
          var counts = [];
  
          for (let i = 0; i < types.length; i++) {
            counts[i] = 0;
          }
  
          var catList = Object.entries(restData.categories);
          var zipList = Object.entries(restData.postal_code);
  
        for (let j = 0; j < catList.length; j++) {
            for (let i = 0; i < types.length; i++) {
                if (catList[j][1].split(", ").includes(types[i])) {
                    counts[i] += 1;
                }
            }
        }

          var barList = [];

          for (let i=0; i<types.length; i++) {
              barList.push({"name": types[i], "count": counts[i]});
          };
      
          barList.sort(function(a,b) {
              if (a.count < b.count) {
                  return -1;
              } else if (a.count == b.count) {
                  if (a.name < b.name) {
                      return 1;
                  } else {
                      return -1;
                  };
              } else {
                  return 1;
              };
          });
      
          barList.reverse();

        for (let i=0; i<barList.length; i++) {
            types[i] = barList[i].name;
            counts[i] = barList[i].count;
        };
      
          var data = [{
              type: 'bar',
              x: types,
              y: counts,
              name: 'All ATL Cuisines',
              marker: {
                  color: 'rgba(111, 34, 50,1)',
                  width: 1
              }
          }];
      
          var layout = {
              title: "Cuisine Type Count for Atlanta",
              font: {
                  color: 'rgba(195,7,63,1)',
                  family: 'Patrick Hand',
                  size: 16
              },
              xaxis: {
                  showgrid: false,
                  showline: true,
                  linecolor: 'rgb(102, 102, 102)',
                  tickfont: {
                      font: {
                          color: 'rgb(102, 102, 102)'
                      }
                  },
                  autotick: true,
                  ticks: 'outside',
                  tickcolor: 'rgb(102, 102, 102)'
              },
              margin: {
                  l: 25,
                  r: 10,
                  b: 150,
                  t: 50
              },
              width: 1260,
              height: 600,
              paper_bgcolor: 'rgb(254, 247, 234)',
              plot_bgcolor: 'rgb(254, 247, 234)',
              hovermode: 'closest'
          };
            
          Plotly.newPlot('all-bar', data, layout);
        });
    }); 
};