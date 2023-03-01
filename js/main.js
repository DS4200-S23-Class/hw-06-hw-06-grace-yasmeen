// Javascript for hw-06


//create frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 450;
const MARGINS = {left:50, right:50, top:50, bottom:50};

//scale
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#vis1")
				  .append("svg")
				  .attr("height", FRAME_HEIGHT)
				  .attr("width", FRAME_WIDTH)
				  .attr("id", "frame");

const FRAME2 = d3.select("#vis2")
				  .append("svg")
				  .attr("height", FRAME_HEIGHT)
				  .attr("width", FRAME_WIDTH)
				  .attr("id", "frame");


const FRAME3 = d3.select("#vis3")
				  .append("svg")
				  .attr("height", FRAME_HEIGHT)
				  .attr("width", FRAME_WIDTH)
				  .attr("id", "frame");


// function build_interactive_scatter_one() {
	function plots(){
	d3.csv("data/iris.csv").then((data) => {

	// find the max X
	const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

	// find the max Y
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Length); });


	//domain and range
	const X_SCALE1 = d3.scaleLinear()
					.domain([0, (MAX_X + 1)])
					.range([0, VIS_WIDTH]);
	const Y_SCALE1 = d3.scaleLinear()
					.domain([(MAX_Y + 1) ,0])
					.range([0, VIS_HEIGHT]);


	// const color = d3.scaleOrdinal()
  //   .domain(["setosa", "versicolor", "virginica" ])
  //   .range([ "#440154ff", "#21908dff", "#fde725ff"])


	// let points1 = FRAME1.selectAll("points")
    let points1 = FRAME1.append("g")
    	.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => {return (X_SCALE1(d.Sepal_Length) + MARGINS.left)})
				.attr("cy", (d) => {return (Y_SCALE1(d.Petal_Length) + MARGINS.top)})
				.attr("r", 5)
				// .attr("class", "point")
				.attr("class", (d) => { return d.Species});
				// .style("fill", (d) => { return (d.Species)});


	// Add x-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE1).ticks(7))
			.attr("font-size", '20px')
		
	// Add y-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE1).ticks(14))
			.attr("font-size", '20px');

//});
// }


// function build_interactive_scatter_two() 
// {

	// d3.csv("data/iris.csv").then
	// ((data) => 
	// {

	// find the max X
	const MAX_X2 = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
	// find the max Y
	const MAX_Y2 = d3.max(data, (d) => { return parseInt(d.Petal_Width); });



	//domain and range
	const X_SCALE2 = d3.scaleLinear()
					.domain([0, (MAX_X + 1)])
					.range([0, VIS_WIDTH]);
	const Y_SCALE2 = d3.scaleLinear()
					.domain([(MAX_Y + 1) ,0])
					.range([0, VIS_HEIGHT]);


	// const color = d3.scaleOrdinal()
  //   .domain(["setosa", "versicolor", "virginica" ])
  //   .range([ "#440154ff", "#21908dff", "#fde725ff"])


	let points2 = FRAME2.append("g")
			.selectAll("point")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => {return (X_SCALE2(d.Sepal_Width) + MARGINS.left);})
				.attr("cy", (d) => {return (Y_SCALE2(d.Petal_Width) + MARGINS.bottom);})
				.attr("r", 5)
				.attr("class", (d) => { return d.Species});
				// .style("fill", (d) => { return color(d.Species)})
				// .style("opacity", 0.5);


	// Add x-axis to vis1
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE2).ticks(10))
			.attr("font-size", '20px');
		
	// Add y-axis to vis1
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE2).ticks(15))
			.attr("font-size", '20px');

	// add brushing
	FRAME2.call(d3.brush()
	  		.extent( [ [0,0], [VIS_WIDTH,VIS_HEIGHT] ])
	  		.on("start brush", updateChart));


// });
// }


//BAR PLOT//
// function build_interactive_bar_three() {
	const X_SCALE3 = d3.scaleBand()
											.domain(data.map(function(d){ return d.Species; }))
											.range([0, VIS_WIDTH]).padding(.4);
	const Y_SCALE3 = d3.scaleLinear()
										.domain([0,60])
										.range([VIS_HEIGHT, 0]);

	// add bars
	let bars = FRAME3.append("g")
			.selectAll("bar")
			.data(data)
			.enter()
			.append("rect")
				.attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left)})
				.attr("y", (d) => { return (Y_SCALE3(50) + MARGINS.top)})
				.attr("width", X_SCALE3.bandwidth())
				.attr("height", (d) => {return (VIS_HEIGHT - Y_SCALE3(50));})
				.attr("class", (d) => {return d.Species});

	// add x-axis to vis3
	FRAME3.append("g")
	.attr("transform", "translate(" + MARGINS.left + ","
		+ (VIS_HEIGHT + MARGINS.top) + ")")
	.call(d3.axisBottom(X_SCALE3).ticks(10))
		.attr("font-size", '20px')
		
	// Add y-axis to vis3
	FRAME3.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.top) + ")")
		.call(d3.axisLeft(Y_SCALE3).ticks(10))
			.attr("font-size", '20px');
	// }



	 // when brushing is performed
	 function updateChart(event)
	 {
	 	extent = event.selection;
	 	points1.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width) + MARGINS.top)})
	 	points2.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width) + MARGINS.top)})
	 	bars.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width) + MARGINS.top)})
	 }


});

};

	 // A function that return TRUE or FALSE according if a dot is in the selection or not
  	function isBrushed(brush_coords, cx, cy) {
       	var x0 = brush_coords[0][0],
           x1 = brush_coords[1][0],
           y0 = brush_coords[0][1],
           y1 = brush_coords[1][1];
      	return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  }
  plots();

// var xValues = ["Setosa", "Versicolor", "Virginica"];
// var yValues = [50, 50, 50];
// var barColors = [ "#440154ff", "#21908dff", "#fde725ff"];

// new Chart("vis3", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   },
//   options:{
//   	legend: {display: false}
//   }
// });

// build_interactive_scatter_one();
// build_interactive_scatter_two();
// build_interactive_bar_three();









