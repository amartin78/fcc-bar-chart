
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
	.then(result => {
		dataset = result['data'];
		chart(dataset);
	});


function chart(dataset) {

	d3.select('body')
		.append('h1')
		.attr('id', 'title')
		.attr('class', 'center')
		.text('United States GDP');

	const width = 1000;
	const height = 511.46;
	const padding = 100;

	const xScale = d3.scaleTime()
						.domain([new Date(1947,1,1), new Date(2015,7,1)])
						.range([padding, width - padding]);
	const yScale = d3.scaleLinear()
						.domain([0, d3.max(dataset, (d) => d[1])])
						.range([height - padding, padding]);

	const xAxis = d3.axisBottom(xScale)
					.tickFormat(function(d) {
						return d.getFullYear();
					});
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
					return d > 9000 ? -35 : d > 0 ? -30 : -13;
				})
				.attr('dy', 3));


	let tooltip = d3.select('body')
		.append('div')
		.attr('id', 'tooltip')
		.style('position', 'absolute')
		.style('z-index', '10')
		.style('visibility', 'hidden')
		.style('background-color', 'wheat')
		.text('my tooltip')		
	
	svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('fill', 'teal')
		.attr('data-date', (d) => d[0])
		.attr('data-gdp', (d) => d[1])
		.attr('x', (d) => {
			x = xScale(new Date(d[0].replace(/-/g,',')));
			return x;
		})
		.attr('y', (d) => {
			return height - padding - (d[1]/58);
		})
		.attr('width', 2.6)
		.attr('height', (d) => {
			return d[1]/58
		})
		.on('mouseover', (d) => {
			tooltip.attr('data-date', d[0])
			tooltip.text(d[0] + '\n' + d[1] + ' Billion');
			return tooltip.style('visibility', 'visible');
		})
		.on('mouseout', (d) => {
			return tooltip.style('visibility', 'hidden');
		})


}
	

