

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
	.then(result => {
		dataset = result['data'];
		chart(dataset);
	});


function chart(dataset) {

	// dataset = dataset.filter(d => {
	// 	return (parseInt(d[0].substr(0,4)) % 5 === 0 && d[0][6] === '7');
	// });
	// console.log(dataset);

	d3.select('body')
	.append('h1')
	.attr('id', 'title')
	.attr('class', 'box center')
	.text('United States GDP');


	const width = 1100;
	const height = 500;
	const padding = 60;

	const xScale = d3.scaleLinear()
						.domain([0, d3.max(dataset, (d) => parseInt(d[0]))])
						.range([padding, width - padding]);
	const yScale = d3.scaleLinear()
						.domain([0, d3.max(dataset, (d) => d[1])])
						.range([height - padding, padding]);

	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	const svg = d3.select('body')
					.append('svg')
					.attr('width', width)
					.attr('height', height)
				
	svg.append('g')
		.attr('id', 'x-axis')
		.attr('transform', 'translate(0,' + (height - padding) + ')')
		.call(xAxis);

	svg.append('g')
		.attr('id', 'y-axis')
		.attr('transform', 'translate(60, 0)')
		.call(yAxis);

	svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('fill', 'teal')
		.attr('data-date', (d) => d[0])
		.attr('data-gdp', (d) => d[1])
		.attr('x', (d, i) => i * 3.8 + padding)
		.attr('y', (d) => {
			return height - padding - (d[1]/50);
		})
		.attr('width', 2.8)
		.attr('height', (d) => d[1]/50);

}
	

