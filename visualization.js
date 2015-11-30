var w = 500;
var h = 500;
var paddingSides = 30;
var paddingBottom = 20;

d3.select("#plotDiv1")
	.append("svg")
	.attr("width",w)
	.attr("height",h);

d3.csv("fakedata.csv", function(data) {
	var dataset = data;

	svScale = d3.scale.linear()
		.domain([0,d3.max(dataset,function(d){return Number(d["sv"])})])
		.range([paddingSides,w-paddingSides]);
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
	var yAxis = d3.svg.axis()
	  .scale(dAreaScale)
	  .orient("left");
	d3.select("#plotDiv1")
		.select("svg")
		.append("g")
		.attr("class","axis")
		.attr("transform", "translate(" + paddingSides + ",0)")
		.call(yAxis);
	writeHeadings();	
	writeNamesAll(dataset);
	drawCircles(dataset);
	highlightCircle();
});

function writeHeadings(){
	var genera = ["A","B","C","D","E","F","G","H","I","J"]
	d3.select("#speciesList")
		.selectAll("h3")
		.data(genera)
		.enter()
		.append("h3")
		.attr("id",function(d){
			return d;
		})
		.text(function(d){
			return "Genus "+d;
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
			if (d.genus == "A"){
				return "rgba(166,206,227,0.3)";
			}
			else if (d.genus == "B"){
				return "rgba(31,120,180,0.3)";
			}
			else if (d.genus == "C"){
				return "rgba(178,223,138,0.3)";
			}
			else if (d.genus == "D"){
				return "rgba(51,160,44,0.3)";
			}
			else if (d.genus == "E"){
				return "rgba(251,154,153,0.3)";
			}
			else if (d.genus == "F"){
				return "rgba(227,26,28,0.3)";
			}
			else if (d.genus == "G"){
				return "rgba(253,191,111,0.3)";
			}
			else if (d.genus == "H"){
				return "rgba(255,127,0,0.3)";
			}
			else if (d.genus == "I"){
				return "rgba(202,178,214,0.3)";
			}
			else if (d.genus == "J"){
				return "rgba(106,61,154,0.3)";
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
			corrPoint.style("fill","rgba(0,0,0,1)");

		});
		d3.select("#speciesList")
			.selectAll("p")
			.on("mouseout",function(){
				corrPoint.style("fill",colorOfSelect);
			});
}
function highlightGenus(){
	
}