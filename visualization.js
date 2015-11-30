var w = 600;
var h = 400;
var paddingRight = 5;
var paddingLeft = 50;
var paddingBottom = 35;
var xLabelPadding = 0;
var pcPadding = 0.005;

var yLabelX = 5;
var yLabelY = h/2 - 60;

var genera = ["A","B","C","D","E","F","G","H","I","J"];

colors = ["rgba(166,206,227,",
	"rgba(31,120,180,",
	"rgba(178,223,138,",
	"rgba(51,160,44,",
	"rgba(251,154,153,",
	"rgba(227,26,28,",
	"rgba(253,191,111,",
	"rgba(255,127,0,",
	"rgba(202,178,214,",
	"rgba(106,61,154,"]

d3.select("#plotDiv1")
	.append("svg")
	.attr("width",w)
	.attr("height",h);
	
d3.select("#plotDiv2")
	.append("svg")
	.attr("width",w)
	.attr("height",h);

d3.csv("fakedata.csv", function(data) {
	var dataset = data;

	//Build plot 1 (seed volume vs. diaspore area)
	svScale = d3.scale.linear()
		.domain([0,d3.max(dataset,function(d){return Number(d["sv"])})])
		.range([paddingLeft,w-paddingRight]);
	dAreaScale = d3.scale.linear()
		.domain([d3.max(dataset,function(d){return Number(d["d_area"])}),0])
		.range([paddingBottom,h-paddingBottom]);
	var xAxisPlotOne = d3.svg.axis()
	  .scale(svScale)
	  .orient("bottom");
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
	var yAxisPlotOne = d3.svg.axis()
	  .scale(dAreaScale)
	  .orient("left");
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
	pcOneScale = d3.scale.linear()
		.domain([d3.min(dataset,function(d){return Number(d["pc1"])})-pcPadding,d3.max(dataset,function(d){return Number(d["pc1"])})+pcPadding])
		.range([paddingLeft,w-paddingRight]);
	pcTwoScale = d3.scale.linear()
		.domain([d3.max(dataset,function(d){return Number(d["pc2"])})+pcPadding,d3.min(dataset,function(d){return Number(d["pc2"])})-pcPadding])
		.range([paddingBottom,h-paddingBottom]);
	var xAxisPCOnePlotTwo = d3.svg.axis()
	  .scale(svScale)
	  .orient("bottom");
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
	var yAxisPCTwoPlotTwo = d3.svg.axis()
	  .scale(dAreaScale)
	  .orient("left");
	d3.select("#plotDiv2")
		.select("svg")
		.append("g")
		.attr("class","axis")
		.attr("transform", "translate(" + paddingLeft + ",0)")
		.call(yAxisPCTwoPlotTwo);
	d3.select("#plotDiv2")
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
		.text("PC 2");
	
	writeHeadings();	
	writeNamesAll(dataset);
	drawCircles(dataset);
	highlightCircle();
	highlightGenus();
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
					return colors[i] + "0.3)";
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
					return colors[i] + "0.3)";
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
			corrPointPlotOne.transition().attr("r","12");
			corrPointPlotTwo.transition().attr("r","12");
	});
	d3.select("#speciesList")
		.selectAll("p")
		.on("mouseout",function(){
			corrPointPlotOne.transition().attr("r","5").style("fill",colorOfSelect);
			corrPointPlotTwo.transition().attr("r","5").style("fill",colorOfSelect);
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
							return colors[i] + "0.7)";
						}
					}
			});
			plotTwoPoints
				.transition()
				.attr("r","7")
				.style("fill",function(){
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.7)";
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
							return colors[i] + "0.3)";
						}
					}
			});
			plotTwoPoints
				.transition()
				.attr("r","5")
				.style("fill",function(){
					for (i = 0; i < genera.length; i++){ 
						if (genusID == genera[i]){
							return colors[i] + "0.3)";
						}
					}
			});
		});
}