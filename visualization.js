var w = 600;
var h = 400;
var paddingRight = 5;
var paddingLeft = 50;
var paddingBottom = 35;
var xLabelPadding = 0;

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

d3.csv("fakedata.csv", function(data) {
	var dataset = data;

	svScale = d3.scale.linear()
		.domain([0,d3.max(dataset,function(d){return Number(d["sv"])})])
		.range([paddingLeft,w-paddingRight]);
	dAreaScale = d3.scale.linear()
		.domain([d3.max(dataset,function(d){return Number(d["d_area"])}),0])
		.range([paddingBottom,h-paddingBottom]);
	
	var xAxis = d3.svg.axis()
	  .scale(svScale)
	  .orient("bottom");
	d3.select("#plotDiv1")
		.select("svg")
		.append("g")
		.attr("class","axis")
		.attr("transform", "translate(0," + (h - paddingBottom) + ")")
		.call(xAxis);
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
	var yAxis = d3.svg.axis()
	  .scale(dAreaScale)
	  .orient("left");
	d3.select("#plotDiv1")
		.select("svg")
		.append("g")
		.attr("class","axis")
		.attr("transform", "translate(" + paddingLeft + ",0)")
		.call(yAxis);
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
	writeNames(dataset,"A");
	writeNames(dataset,"B");
	writeNames(dataset,"C");
	writeNames(dataset,"D");
	writeNames(dataset,"E");
	writeNames(dataset,"F");
	writeNames(dataset,"G");
	writeNames(dataset,"H");
	writeNames(dataset,"I");
	writeNames(dataset,"J");
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
}
function highlightCircle(){
	var colorOfSelect;
	var id;
	d3.select("#speciesList")
		.selectAll("p")
		.on("mouseover",function(){
			
			id = d3.select(this).attr("id");

			corrPoint = d3.select("#plotDiv1")
				.selectAll("circle")
				.filter(function(){
					if (d3.select(this).attr("id") == id){
						return this;
					}
				});
			colorOfSelect = corrPoint.style("fill");
			corrPoint.transition().attr("r","12");

		});
		d3.select("#speciesList")
			.selectAll("p")
			.on("mouseout",function(){
				corrPoint.transition().attr("r","5").style("fill",colorOfSelect);
			});
}
function highlightGenus(){
	var genusID;
	d3.select("#speciesList")
		.selectAll("span.header")
		.on("mouseover",function(){
			genusID = d3.select(this).attr("id");
			d3.select("#plotDiv1")
			.selectAll("circle")
			.filter(function(){
				if (d3.select(this).attr("class") == genusID){
					return this;
				}
			})
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
			d3.select("#plotDiv1")
			.selectAll("circle")
			.filter(function(){
				if (d3.select(this).attr("class") == genusID){
					return this;
				}
			})
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