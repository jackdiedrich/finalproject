//Replace "irisdata.csv" with "fileName.csv" where finalName.csv is the name of you file within the folder containing visualization.js
var fileName = "irisdata.csv";
//Specify which column, by name, contains your categories or groups by replacing "species"
var groupsColumn = "species";
//Specify which column, by name, contains the names of your samples by replacing "name"
//If each individual sample does not have a name, make sure namesColumn is set equal to "none"
var namesColumn = "none";
//This visualization is unable to put non-numerical data on a plot. Therefore, enter any 
//column names that contain non-numerical data into this array in quotes and separated by commas.
//(e.g. ["stringColumnOne","stringColumnTwo"]
var nonNumberHeaders = [];

//Set parameters for plots and plot padding.
var w = 750;
var h = 400;
var paddingRight = 10;
var paddingLeft = 100;
var paddingBottom = 20;
var labelsHeadPadding = 40;

//Instantiate vars for column names and group names.
var headers;
var groups = [];
var namesArray = [];

//Set up color palettes for datasets containing different numbers of categories.
colorsOne = ["rgba(141,160,203,"];
colorsTwo = ["rgba(252,141,98,",
	"rgba(141,160,203,"];
colorsThree = ["rgba(102,194,165,",
	"rgba(252,141,98,",
	"rgba(141,160,203,"];
colorsFour = ["rgba(102,194,165,",
	"rgba(252,141,98,",
	"rgba(141,160,203,",
	"rgba(231,138,195,"];
colorsTen = ["rgba(141,211,199,",
	"rgba(120,120,179,",
	"rgba(190,186,218,",
	"rgba(251,128,114,",
	"rgba(128,177,211,",
	"rgba(253,180,98,",
	"rgba(179,222,105,",
	"rgba(252,205,229,",
	"rgba(217,217,217,",
	"rgba(188,128,189,"];
var colors = [];
colorPallettes = [colorsOne,colorsTwo,colorsThree,colorsFour,colorsTen];

d3.select("#plotDiv1")
	.append("svg")
	.attr("width",w)
	.attr("height",h);
d3.select("#plotDiv2")
	.append("svg")
	.attr("width",w)
	.attr("height",h);

d3.csv(fileName, function(data) {
	var dataset = data;
	headers = d3.keys(data[0]);
	for (i = 0; i < headers.length; i++){
		if (headers[i] == namesColumn){
			headers.splice(i,1);
		}
	}
	for (i = 0; i < headers.length; i++){
		if (headers[i] == groupsColumn){
			headers.splice(i,1);
		}
	}
	for (i = 0; i < nonNumberHeaders.length; i++){
		for (n = 0; n < headers.length; n++){
			if (headers[n] == nonNumberHeaders[i]){
				headers.splice(n,1);
			}
		}
	}
	var groupNames = [];
	for (i = 0; i < dataset.length; i++){
		groupNames.push(dataset[i][groupsColumn]);
	}
	groups = d3.set(groupNames).values();
	if (namesColumn == "none"){
		for (i = 0; i < dataset.length; i++){
			namesArray.push(i);
		}
	}
	if (groups.length == 1){
		colors = colorPallettes[0];
	}
	else if (groups.length == 2){
		colors = colorPallettes[1];
	}
	else if (groups.length == 3){
		colors = colorPallettes[2];
	}
	else if (groups.length == 4){
		colors = colorPallettes[3];
	}
	else if (groups.length == 10){
		colors = colorPallettes[4];
	}
	else if (groups.length > 10){
		var num = 60/ 10;
		for(i = 0; i < 60; i++){
			m = i;
			if (m > 9){
				var round = Math.floor(m/10);
				m = (m - round*10);
			}
			colors.push(colorsTen[m]);
		}
	}
	xScales = [];
	yScales = [];
	xAxes = [];
	yAxes = [];
	for (i = 0; i < headers.length; i++){
		var xScale = d3.scale.linear()
			.domain([d3.min(dataset,function(d){return Number(d[headers[i]])}),d3.max(dataset,function(d){return Number(d[headers[i]])})])
			.range([paddingLeft,w-paddingRight]);
		xScales.push(xScale);
		yScale = d3.scale.linear()
			.domain([d3.max(dataset,function(d){return Number(d[headers[i]])}),d3.min(dataset,function(d){return Number(d[headers[i]])})])
			.range([paddingBottom,h-paddingBottom]);
		yScales.push(yScale);
		var xAxis = d3.svg.axis()
		  .scale(xScales[i])
		  .orient("bottom")
		  .ticks(10);
		xAxes.push(xAxis);
		var yAxis = d3.svg.axis()
		  .scale(yScales[i])
		  .orient("left")
		  .ticks(10);
		yAxes.push(yAxis);
	}
	d3.select("#plotDiv1")
		.select("svg")
		.append("g")
		.attr("class","xAxis")
		.attr("transform", "translate(0," + (h - paddingBottom) + ")")
		.call(xAxes[0]);
	d3.select("#plotDiv1")
		.select("svg")
		.append("g")
		.attr("class","yAxis")
		.attr("transform", "translate(" + paddingLeft + ",0)")
		.call(yAxes[1]);
	d3.select("#plotDiv2")
		.select("svg")
		.append("g")
		.attr("class","xAxis")
		.attr("transform", "translate(0," + (h - paddingBottom) + ")")
		.call(xAxes[2]);
	d3.select("#plotDiv2")
		.select("svg")
		.append("g")
		.attr("class","yAxis")
		.attr("transform", "translate(" + paddingLeft + ",0)")
		.call(yAxes[3]);
	var svgXLabelWidth = (80+headers.length*(w/10))+30;
	d3.select("#XLabels1").append("svg").attr("width",function(){
		if (svgXLabelWidth > w){ return svgXLabelWidth; }
		else { return w; }
	}).attr("height","24px");
	d3.select("#XLabels2").append("svg").attr("width",function(){
		if (svgXLabelWidth > w){ return svgXLabelWidth; }
		else { return w; }
	}).attr("height","24px");
	writeVariableLabels("#plotDiv1","#XLabels1");
	writeVariableLabels("#plotDiv2","#XLabels2");
	writeHeadings();	
	writeNamesAll(dataset);
	drawCircles(dataset);
	highlightCircle();
	highlightGenus();
	highlightText();
	changeAxes("#plotDiv1","#XLabels1");
	changeAxes("#plotDiv2","#XLabels2");
});
function writeVariableLabels(plotDiv,xLabDiv){
	//Write labels.
	d3.select(xLabDiv)
			.select("svg")
			.append("text")
			.attr("class","labelsHead")
			.attr("x",function(){
				return ((w-paddingRight)/2);
			})
			.attr("y",function(){
				return 9;
			})
			.text(function(){
				return "X Axis";
			});
	d3.select(plotDiv)
			.select("svg")
			.append("text")
			.attr("class","labelsHead")
			.attr("x",function(){
				return 0;
			})
			.attr("y",function(){
				return labelsHeadPadding;
			})
			.text(function(){
				return "Y Axis";
			});		
	for (i = 0; i < headers.length; i++){	
		d3.select(xLabDiv)
			.select("svg")
			.append("text")
			.attr("class","Xlabels")
			.attr("id",function(){
				return headers[i];
			})
			.attr("x",function(){
				if (headers.length > 10){
					return 80+i*(w/10);
				}
				else {
					return 80+i*((w)/headers.length);
				}
			})
			.attr("y",function(){
				return 22;
			})
			.text(function(){
				return headers[i];
			});
	}
	for (i = 0; i < headers.length; i++){	
		d3.select(plotDiv)
			.select("svg")
			.append("text")
			.attr("class","Ylabels")
			.attr("id",function(){
				return headers[i];
			})
			.attr("x",function(){
				return 0;
			})
			.attr("y",function(){
				return labelsHeadPadding+15 + i*((h-labelsHeadPadding)/headers.length);
			})
			.text(function(){
				return headers[i];
			});
	}
	//Bold currently selected variables in plot 1.
	d3.select("#XLabels1")
		.selectAll(".Xlabels")
		.filter(function(){
			if (d3.select(this).attr("id") == headers[0]) {
				return this;
			}
		})
		.style("fill","rgba(0,0,0,1)");
	d3.select("#plotDiv1")
		.selectAll(".Ylabels")
		.filter(function(){
			if (d3.select(this).attr("id") == headers[1]) {
				return this;
			}
		})
		.style("fill","rgba(0,0,0,1)");
	//Bold currently selected variables in plot 2.
	d3.select("#XLabels2")
		.selectAll(".Xlabels")
		.filter(function(){
			if (d3.select(this).attr("id") == headers[2]) {
				return this;
			}
		})
		.style("fill","rgba(0,0,0,1)");
	d3.select("#plotDiv2")
		.selectAll(".Ylabels")
		.filter(function(){
			if (d3.select(this).attr("id") == headers[3]) {
				return this;
			}
		})
		.style("fill","rgba(0,0,0,1)");
}
function writeHeadings(){
	d3.select("#speciesList")
		.selectAll("h3")
		.data(groups)
		.enter()
		.append("h3")
		.attr("id",function(d){
			return d;
		})
		.append("span")
		.attr("class","header")
		.attr("id",function(d){
			return d;
		})
		.text(function(d){
			return d;
		});
}
function writeNamesAll(dataset){
	for (i = 0; i < groups.length; i++){ 
		writeNames(dataset,groups[i]);
	}
}
function writeNames(dataset,header){
	d3.select("#speciesList")
		.select("#"+header)
		.selectAll("p")
		.data(dataset)
		.enter()
		.append("p")
		.attr("class","name")
		.attr("id",function(d,i){
			if (namesColumn == "none"){
				return namesArray[i];
			}
			else {return d[namesColumn];}
		})
		.text(function(){
			return " - ";
		})
		.append("span")
		.attr("id",function(d,i){
			if (namesColumn == "none"){
				return namesArray[i];
			}
			else {return d[namesColumn];}
		})
		.text(function(d,i){
			if (namesColumn == "none"){
				return namesArray[i];
			}
			else {return d[namesColumn];}
		});
	d3.select("#speciesList")
		.select("#"+header)
		.selectAll("p")
		.filter(function(d){
			if (d[groupsColumn] != header){
				return this;
			}
		})
		.remove();
}
function drawCircles(dataset){
	d3.select("#plotDiv1")
		.select("svg")
		.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("id",function(d,i){
			if (namesColumn == "none"){
				return namesArray[i];
			}
			else {return d[namesColumn];}
		})
		.attr("class",function(d){
			return d[groupsColumn];
		})
		.attr("r",5)
		.attr("cx",function(d){
			return xScales[0](d[headers[0]]);
		})
		.attr("cy",function(d){
			return yScales[1](d[headers[1]]);
		})
		.attr("fill",function(d){
			for (i = 0; i < groups.length; i++) 
				if (d[groupsColumn] == groups[i]){ return colors[i] + "0.6)"; }
			});
	d3.select("#plotDiv2")
		.select("svg")
		.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("id",function(d,i){
			if (namesColumn == "none"){
				return namesArray[i];
			}
			else {return d[namesColumn];}
		})
		.attr("class",function(d){
			return d[groupsColumn];
		})
		.attr("r",5)
		.attr("cx",function(d){
			return xScales[2](d[headers[2]]);
		})
		.attr("cy",function(d){
			return yScales[3](d[headers[3]]);
		})
		.attr("fill",function(d){
			for (i = 0; i < 20; i++) 
				if (d[groupsColumn] == groups[i]){ return colors[i] + "0.6)"; }
			});		
}
function highlightCircle(){
	var colorOfSelect;
	var id;
	d3.select("#speciesList")
		.selectAll("span")
		.on("mouseover",function(){
			
			id = d3.select(this).attr("id");
			d3.select(this).transition().style("font-weight","bold");

			corrPointPlotOne = d3.select("#plotDiv1")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("id") == id){
						return this;
					}
				});
			corrPointPlotTwo = d3.select("#plotDiv2")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("id") == id){
						return this;
					}
				});
			colorOfSelect = corrPointPlotOne.style("fill");
			corrPointPlotOne.transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){
							return colors[i] + "0.9)";
						}
					}
			});
			corrPointPlotTwo.transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){
							return colors[i] + "0.9)";
						}
					}
			});
	});
	d3.select("#speciesList")
		.selectAll("span")
		.on("mouseout",function(){
			d3.select(this).transition().style("font-weight","normal");
			corrPointPlotOne.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){
							return colors[i] + "0.6)";
						}
					}
			});
			corrPointPlotTwo.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){
							return colors[i] + "0.6)";
						}
					}
			});
	});
}
function highlightText(){
	var id;
	var corrText;
	var toolTip;
	d3.select("#plotDiv1")
		.selectAll("circle")
		.on("mouseover",function(){
			d3.select(this).transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (d3.select(this).attr("class") == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
			id = d3.select(this).attr("id");
			tipX = Number(d3.select(this).attr("cx")) + 10;
			tipY = Number(d3.select(this).attr("cy")) + 10;
			toolTip = d3.select("#plotDiv1").select("svg").append("text").attr("class","toolTip").attr("x",tipX).attr("y",tipY).text(id);
			corrText = d3.select("#speciesList")
				.selectAll("span")
				.filter(function(){
					if (d3.select(this).attr("id") == id){ return this; }
				});
			corrPointPlotTwo = d3.select("#plotDiv2")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("id") == id){
						return this;
					}
				});
			corrPointPlotTwo.transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotTwo.attr("class") == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
			corrText.transition().style("font-weight","bold").style("font-size","15px");
		});
	d3.select("#plotDiv1")
		.selectAll("circle")
		.on("mouseout",function(){
			toolTip.remove();
			d3.select(this).transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (d3.select(this).attr("class") == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
			corrText.transition().style("font-weight","normal").style("font-size","10px");
			corrPointPlotTwo.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (d3.select(this).attr("class") == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
		});
	d3.select("#plotDiv2")
		.selectAll("circle")
		.on("mouseover",function(){
			d3.select(this).transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (d3.select(this).attr("class") == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
			id = d3.select(this).attr("id");
			tipX = Number(d3.select(this).attr("cx")) + 10;
			tipY = Number(d3.select(this).attr("cy")) + 10;
			toolTip = d3.select("#plotDiv2").select("svg").append("text").attr("class","toolTip").attr("x",tipX).attr("y",tipY).text(id);
			corrText = d3.select("#speciesList")
			.selectAll("span")
			.filter(function(){
				if (d3.select(this).attr("id") == id){ return this; }
			});
			corrPointPlotOne = d3.select("#plotDiv1")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("id") == id){ return this; }
				});
			corrPointPlotOne.transition().attr("r","12").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
			corrText.transition().style("font-weight","bold").style("font-size","15px");
		});
	d3.select("#plotDiv2")
		.selectAll("circle")
		.on("mouseout",function(){
			toolTip.remove();
			d3.select(this).transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (d3.select(this).attr("class") == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
			corrPointPlotOne.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < groups.length; i++){ 
						if (corrPointPlotOne.attr("class") == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
			corrText.transition().style("font-weight","normal").style("font-size","10px");
		});
}
function highlightGenus(){
	var groupID;
	d3.select("#speciesList")
		.selectAll("span.header")
		.on("mouseover",function(){
			groupID = d3.select(this).attr("id");
			plotOnePoints = d3.select("#plotDiv1")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("class") == groupID){ return this; }
				});
			plotOnePoints
				.transition()
				.attr("r","7")
				.style("fill",function(){
					for (i = 0; i < groups.length; i++){ 
						if (groupID == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
			plotTwoPoints = d3.select("#plotDiv2")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("class") == groupID){ return this; }
				});
			plotTwoPoints
				.transition()
				.attr("r","7")
				.style("fill",function(){
					for (i = 0; i < groups.length; i++){ 
						if (groupID == groups[i]){ return colors[i] + "0.9)"; }
					}
			});
		});
	d3.select("#speciesList")
		.selectAll("span.header")
		.on("mouseout",function(){
			plotOnePoints
				.transition()
				.attr("r","5")
				.style("fill",function(){
					for (i = 0; i < groups.length; i++){ 
						if (groupID == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
			plotTwoPoints
				.transition()
				.attr("r","5")
				.style("fill",function(){
					for (i = 0; i < groups.length; i++){ 
						if (groupID == groups[i]){ return colors[i] + "0.6)"; }
					}
			});
		});
}
function changeAxes(plotDiv,xLab){
	d3.select(xLab).selectAll(".Xlabels").on("click",function(){
		d3.select(xLab).selectAll(".Xlabels").style("fill","rgba(0,0,0,0.4)");
		d3.select(this).style("fill","rgba(0,0,0,1)");
		for (i = 0; i < headers.length; i++){
			if (headers[i] == d3.select(this).attr("id")){
				d3.select(plotDiv).select(".xAxis").transition().duration(1500).call(xAxes[i])
				d3.select(plotDiv).selectAll("circle").transition().duration(1500)
					.attr("cx", function(d) {
						return xScales[i](d[headers[i]]);
			   });
			}
		}
	});
	d3.select(plotDiv).selectAll(".Ylabels").on("click",function(){
		d3.select(plotDiv).selectAll(".Ylabels").style("fill","rgba(0,0,0,0.4)");
		d3.select(this).style("fill","rgba(0,0,0,1)");
		for (i = 0; i < headers.length; i++){
			if (headers[i] == d3.select(this).attr("id")){
				d3.select(plotDiv).select(".yAxis").transition().duration(1500).call(yAxes[i])
				d3.select(plotDiv).selectAll("circle").transition().duration(1500)
					.attr("cy", function(d) {
						return yScales[i](d[headers[i]]);
			   });
			}
		}
	});
}
