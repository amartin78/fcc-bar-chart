

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
		.attr('class', 'center')
		.text('United States GDP');


	const width = 950;
	const height = 500;
	const padding = 100;

	const xScale = d3.scaleLinear()
						.domain([1945, d3.max(dataset, (d) => parseInt(d[0]) + 0.75)])
						.range([padding, width - padding]);
	const yScale = d3.scaleLinear()
						.domain([0, d3.max(dataset, (d) => d[1])])
						.range([height - padding, padding]);

	const xAxis = d3.axisBottom(xScale)
					.tickValues([1950, 1955, 1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 
								 2005, 2010, 2015])
					.tickSize(10)
					


	const yAxis = d3.axisRight(yScale)
					.tickSize(width - 2 * padding)
					.tickFormat(function(d) {
						return d;
					});

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
		.attr('transform', 'translate(' + padding +', 0)')
		.call(yAxis)
		.call(y => y.select('.domain')
					.remove())
		.call(g => g.selectAll('.tick:not(:first-of-type) line')
				.attr('stroke-opacity', 0.5)
				.attr('stroke-dasharray', '2'))
		.call(g => g.selectAll('.tick text')
				.attr('x', (d) => {
					return d > 9000 ? -40 : d > 0 ? -35 : -18;
				})
				.attr('dy', 3));

	
	svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('fill', 'teal')
		.attr('data-date', (d) => d[0])
		.attr('data-gdp', (d) => d[1])
		.attr('x', (d, i) => i * 2.73 + padding)
		.attr('y', (d) => {
			return height - padding - (d[1]/58);
		})
		.attr('width', 2.4)
		.attr('height', (d) => d[1]/58);

}
	

