

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
					.then(data => {
						dataset = data['data'];
						chart(dataset);
					});





function chart(dataset) {

	console.log(dataset);

	d3.select('body')
	.append('h1')
	.attr('id', 'title')
	.attr('class', 'box center')
	.text('United States GDP');


	const width = 500;
	const height = 500;

	const xScale = d3.scaleLinear()
						.domain([0, 200])
						.range([0, 200]);
	const yScale = d3.scaleLinear()
						.domain([0, 200])
						.range([0, 200]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const svg = d3.select('body')
					.append('svg')
					.attr('width', width)
					.attr('height', height);
				
	svg.append('g')
		.attr('id', 'x-axis')
		.attr('transform', 'translate(0, 1)')
		.call(xAxis);

	svg.append('g')
		.attr('id', 'y-axis')
		.attr('transform', 'translate(0, -10)')
		.call(yAxis);

	svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.attr('class', 'bar')

}
	

