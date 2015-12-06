var w = 600;
var h = 400;
var paddingRight = 5;
var paddingLeft = 50;
var paddingLeftPlotTwo = 60;
var paddingBottom = 35;
var xLabelPadding = 0;
var pcPadding = 0.005;

var yLabelX = 5;
var yLabelY = h/2 - 60;
var yLabelYOne = h/2 - 90;
var yLabelYTwo = h/2 - 50;

var genera = [];

var yAxisPCTwoPlotTwo;

colors = ["rgba(141,211,199,",
	"rgba(120,120,179,",
	"rgba(190,186,218,",
	"rgba(251,128,114,",
	"rgba(128,177,211,",
	"rgba(253,180,98,",
	"rgba(179,222,105,",
	"rgba(252,205,229,",
	"rgba(217,217,217,",
	"rgba(188,128,189,"]

d3.select("#plotDiv1")
	.append("svg")
	.attr("width",w)
	.attr("height",h);
	
d3.select("#plotDiv2")
	.append("svg")
	.attr("width",w)
	.attr("height",h);
	
d3.select("#selector")
	.append("p")
	.attr("id","winged")
	.text("winged");

d3.csv("fakedata.csv", function(data) {
	var dataset = data;
	
	var generaNames = [];
	for (i = 0; i < dataset.length; i++){
		generaNames.push(dataset[i]["genus"]);
	}
	genera = d3.set(generaNames).values();
	
	//Build plot 1 (seed volume vs. diaspore area)
		//Write sv scale and set up x-axis.
		svScale = d3.scale.log()
			.domain([d3.min(dataset,function(d){return Number(d["sv"])}),d3.max(dataset,function(d){return Number(d["sv"])})])
			.range([paddingLeft,w-paddingRight]);
		var xAxisPlotOne = d3.svg.axis()
		  .scale(svScale)
		  .orient("bottom")
		  .ticks(10,"d");
		d3.select("#plotDiv1")
			.select("svg")
			.append("g")
			.attr("class","axis")
			.attr("transform", "translate(0," + (h - paddingBottom) + ")")
			.call(xAxisPlotOne);
		d3.select("#plotDiv1")
			.select("svg")
			.append("text")
			.attr("class","axisLabel")
			.attr("x",function(){
				return w/2 - 50;
			})
			.attr("y",function(){
				return h - xLabelPadding;
			})
			.text("Seed Volume (mm^3)");
		//Write dArea scale and set up y-axis.
		dAreaScale = d3.scale.log()
			.domain([d3.max(dataset,function(d){return Number(d["d_area"])}),d3.min(dataset,function(d){return Number(d["d_area"])})])
			.range([paddingBottom,h-paddingBottom]);
		var yAxisPlotOne = d3.svg.axis()
		  .scale(dAreaScale)
		  .orient("left")
		  .ticks(10,"d");
		d3.select("#plotDiv1")
			.select("svg")
			.append("g")
			.attr("class","axis")
			.attr("transform", "translate(" + paddingLeft + ",0)")
			.call(yAxisPlotOne);
		d3.select("#plotDiv1")
			.select("svg")
			.append("text")
			.attr("class","axisLabel")
			.attr("x",function(){
				return yLabelX;
			})
			.attr("y",function(){
				return yLabelY;
			})
			.attr("transform","rotate(90 "+yLabelX+" "+yLabelY+")")
			.text("Diaspore Area (cm^2)");
		
	//Build plot 2 (pc1 vs. pc2)
	
		//Write pcOne scale and set up x-axis.
		pcOneScale = d3.scale.linear()
			.domain([d3.min(dataset,function(d){return Number(d["pc1"])})-pcPadding,d3.max(dataset,function(d){return Number(d["pc1"])})+pcPadding])
			.range([paddingLeft,w-paddingRight]);
		var xAxisPCOnePlotTwo = d3.svg.axis()
		  .scale(pcOneScale)
		  .orient("bottom")
		  .ticks(6);
		d3.select("#plotDiv2")
			.select("svg")
			.append("g")
			.attr("class","axis")
			.attr("transform", "translate(0," + (h - paddingBottom) + ")")
			.call(xAxisPCOnePlotTwo);
		d3.select("#plotDiv2")
			.select("svg")
			.append("text")
			.attr("class","axisLabel")
			.attr("x",function(){
				return w/2 - 50;
			})
			.attr("y",function(){
				return h - xLabelPadding;
			})
			.text("PC 1");
		
		//Write pcTwo scale and set up y-axis.
		pcTwoScale = d3.scale.linear()
			.domain([d3.max(dataset,function(d){return Number(d["pc2"])})+pcPadding,d3.min(dataset,function(d){return Number(d["pc2"])})-pcPadding])
			.range([paddingBottom,h-paddingBottom]);
		yAxisPCTwoPlotTwo = d3.svg.axis()
		  .scale(pcTwoScale)
		  .orient("left")
		  .ticks(4);
		d3.select("#plotDiv2")
			.select("svg")
			.append("g")
			.attr("class","axis")
			.attr("transform", "translate(" + paddingLeft + ",0)")
			.call(yAxisPCTwoPlotTwo);
		var plotTwoYAxisPC = d3.select("#plotDiv2")
			.select("svg")
			.append("text")
			.attr("class","axisLabel")
			.attr("x",function(){
				return yLabelX;
			})
			.attr("y",function(){
				return yLabelYOne;
			})
			.attr("transform","rotate(90 "+yLabelX+" "+yLabelYOne+")")
			.attr("id","pcTwoLabel")
			.text("PC 2");
		var plotTwoYAxisPC = d3.select("#plotDiv2")
			.select("svg")
			.append("text")
			.attr("class","axisLabel")
			.attr("x",function(){
				return yLabelX;
			})
			.attr("y",function(){
				return yLabelYTwo;
			})
			.attr("transform","rotate(90 "+yLabelX+" "+yLabelYTwo+")")
			.attr("id","ScaleYLabel")
			.text("Poem Scale Length/Width")
			.style("fill","rgba(0,0,0,0.3)");
	
	writeHeadings();	
	writeNamesAll(dataset);
	drawCircles(dataset);
	highlightCircle();
	highlightGenus();
	removeWinged();
	changeYPlotTwo();
});

function writeHeadings(){
	d3.select("#speciesList")
		.selectAll("h3")
		.data(genera)
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
	for (i = 0; i < genera.length; i++){ 
		writeNames(dataset,genera[i]);
	}
}
function writeNames(dataset,header){
	d3.select("#speciesList")
		.select("#"+header)
		.selectAll("p")
		.data(dataset)
		.enter()
		.append("p")
		.attr("class","speciesP")
		.attr("id",function(d){
			return d.taxon;
		})
		.text(function(d){
			return d.taxon;
		});
	d3.select("#speciesList")
		.select("#"+header)
		.selectAll("p")
		.filter(function(d){
			if (d.genus != header){
				return this;
			}
		})
		.remove();
}
function drawCircles(dataset){
	//Plot 1
	d3.select("#plotDiv1")
		.select("svg")
		.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("id",function(d){
			return d.taxon;
		})
		.attr("class",function(d){
			return d.genus;
		})
		.attr("r",5)
		.attr("cx",function(d){
			return svScale(d.sv);
		})
		.attr("cy",function(d){
			return dAreaScale(d.d_area);
		})
		.attr("fill",function(d){
			for (i = 0; i < genera.length; i++) 
				if (d.genus == genera[i]){
					return colors[i] + "0.6)";
				}
			});
			
	//Plot 2
	d3.select("#plotDiv2")
		.select("svg")
		.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("id",function(d){
			return d.taxon;
		})
		.attr("class",function(d){
			return d.genus;
		})
		.attr("r",5)
		.attr("cx",function(d){
			return pcOneScale(d.pc1);
		})
		.attr("cy",function(d){
			return pcTwoScale(d.pc2);
		})
		.attr("fill",function(d){
			for (i = 0; i < genera.length; i++) 
				if (d.genus == genera[i]){
					return colors[i] + "0.6)";
				}
			});
}
function highlightCircle(){
	var colorOfSelect;
	var id;
	d3.select("#speciesList")
		.selectAll("p")
		.on("mouseover",function(){
			
			id = d3.select(this).attr("id");

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
				for (i = 0; i < genera.length; i++){ 
						if (corrPointPlotOne.attr("class") == genera[i]){
							return colors[i] + "0.9)";
						}
					}
			});
			corrPointPlotTwo.transition().attr("r","12").style("fill",function(){
				for (i = 0; i < genera.length; i++){ 
						if (corrPointPlotOne.attr("class") == genera[i]){
							return colors[i] + "0.9)";
						}
					}
			});
	});
	d3.select("#speciesList")
		.selectAll("p")
		.on("mouseout",function(){
			corrPointPlotOne.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < genera.length; i++){ 
						if (corrPointPlotOne.attr("class") == genera[i]){
							return colors[i] + "0.6)";
						}
					}
			});
			corrPointPlotTwo.transition().attr("r","5").style("fill",function(){
				for (i = 0; i < genera.length; i++){ 
						if (corrPointPlotOne.attr("class") == genera[i]){
							return colors[i] + "0.6)";
						}
					}
			});
	});
}
function highlightGenus(){
	var genusID;
	d3.select("#speciesList")
		.selectAll("span.header")
		.on("mouseover",function(){
			genusID = d3.select(this).attr("id");
			plotOnePoints = d3.select("#plotDiv1")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("class") == genusID){
						return this;
					}
				});
			plotTwoPoints = d3.select("#plotDiv2")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("class") == genusID){
						return this;
					}
				});
			plotOnePoints
				.transition()
				.attr("r","7")
				.style("fill",function(){
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.9)";
						}
					}
			});
			plotTwoPoints
				.transition()
				.attr("r","7")
				.style("fill",function(){
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.9)";
						}
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
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.6)";
						}
					}
			});
			plotTwoPoints
				.transition()
				.attr("r","5")
				.style("fill",function(){
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.6)";
						}
					}
			});
		});
}
function removeWinged(){
	d3.select("#selector").select("#winged").on("click",function(){
		if (d3.select(this).style("text-decoration") == "line-through"){
			d3.select(this).style("color","rgba(0,0,0,1)");
			d3.select(this).style("text-decoration","none");
			d3.select("#speciesList").selectAll("p").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("color","rgba(0,0,0,1)").style("text-decoration","none");
			d3.select("#plotDiv1").selectAll("circle").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("display","block");
			d3.select("#plotDiv2").selectAll("circle").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("display","block");
		}
		else {
			d3.select(this).style("color","rgba(0,0,0,0.3)");
			d3.select(this).style("text-decoration","line-through");
			//Grey-out non-w in species list.
			d3.select("#speciesList").selectAll("p").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("color","rgba(0,0,0,0.3)").style("text-decoration","line-through");
			d3.select("#plotDiv1").selectAll("circle").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("display","none");
			d3.select("#plotDiv2").selectAll("circle").filter(function(d){
				if (d.w == "0"){
					return this
				};
			}).style("display","none");
		}
	});

}
function changeYPlotTwo(){
	d3.select("#plotDiv2").select("#pcTwoLabel").on("click",function(){
		console.log("click");
		d3.select(this).style("fill","rgba(0,0,0,0.3)");
		d3.select("#ScaleYLabel").style("fill","rgba(0,0,0,1)");
	});
}