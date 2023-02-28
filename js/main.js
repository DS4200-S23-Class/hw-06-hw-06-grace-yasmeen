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



function build_interactive_scatter_one() {

	d3.csv("data/iris.csv").then((data) => {

	// find the max X
	const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

	// find the max Y
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Length); });




	//domain and range
	const X_SCALE = d3.scaleLinear()
					.domain([0, (MAX_X + 1)])
					.range([0, VIS_WIDTH]);
	const Y_SCALE = d3.scaleLinear()
					.domain([(MAX_Y + 1) ,0])
					.range([0, VIS_HEIGHT]);


	const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])


	FRAME1.selectAll("points")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => {return X_SCALE(d.Sepal_Length) + MARGINS.left})
				.attr("cy", (d) => {return Y_SCALE(d.Petal_Length) + MARGINS.top})
				.attr("r", 5)
				.attr("class", "point")
				.style("fill", (d) => { return color(d.Species)});


	// Add x-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE).ticks(7))
			.attr("font-size", '20px')
		
	// Add y-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(8))
			.attr("font-size", '20px');


});
}


function build_interactive_scatter_two() {

	d3.csv("data/iris.csv").then((data) => {

	// find the max X
	const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Width); });
	// find the max Y
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Width); });



	//domain and range
	const X_SCALE = d3.scaleLinear()
					.domain([0, (MAX_X + 1)])
					.range([0, VIS_WIDTH]);
	const Y_SCALE = d3.scaleLinear()
					.domain([(MAX_Y + 1) ,0])
					.range([0, VIS_HEIGHT]);


	const color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"])


	FRAME2.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
				.attr("cx", (d) => {return X_SCALE(d.Sepal_Width) + MARGINS.left})
				.attr("cy", (d) => {return Y_SCALE(d.Petal_Width) + MARGINS.top})
				.attr("r", 5)
				.style("fill", (d) => { return color(d.Species)});


	// Add x-axis to vis1
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE).ticks(10))
			.attr("font-size", '20px')
		
	// Add y-axis to vis1
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(10))
			.attr("font-size", '20px');


});
}


// const xValues = ["Setosa", "Versicolor", "Virginica"];
// const yValues = [50, 50, 50];
// const barColors = [ "#440154ff", "#21908dff", "#fde725ff"];

// new Chart("vis3", {
//   type: "bar",
//   data: {
//     labels: xValues,
//     datasets: [{
//       backgroundColor: barColors,
//       data: yValues
//     }]
//   }
// });

build_interactive_scatter_one();
build_interactive_scatter_two();









