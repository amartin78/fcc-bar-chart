d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
	.then(result => {
		dataset = result['data'];
		chart(dataset);
	});

function date(d) {
	let t = d.split('-');

	return new Date(t[0], t[1], t[2]);
}


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
						.domain([ d3.min(dataset, (d) => date(d[0])),
								  d3.max(dataset, (d) => date(d[0])) ])
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

	svg.append('text')
	   .attr('transform', 'rotate(-90)')
	   .attr('x', -325)
	   .attr('y', 40)
	   .text('Gross Domestic Product');

	let tooltip = d3.select('body')
		.append('div')
		.attr('id', 'tooltip')
		.style('position', 'absolute')
		.style('z-index', '10')
		.style('visibility', 'hidden')
		.style('background-color', 'wheat')
		.style('padding', '0.8rem')
	
	svg.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
			.attr('class', 'bar')
			.attr('fill', 'teal')
			.style('position', 'relative')
			.attr('data-date', (d) => d[0])
			.attr('data-gdp', (d) => d[1])
			.attr('x', (d) => {
				x = xScale(new Date(d[0].replace(/-/g,',')));
				return x;
			})
			.attr('y', (d) => {
				return yScale(d[1]);
			})
			.attr('width', 2.6)
			.attr('height', (d) => {
				return height - padding - yScale(d[1]);
			})
			.on('mouseover', (d) => {
				tooltip.attr('data-date', d[0])
				tooltip.style('visibility', 'visible')

				let quarter = d[0].substr(5,2);
				switch(quarter) {
					case '04':
						quarter = '2';
						break;
					case '07':
						quarter =  '3';
						break;
					case '10':
						quarter = '4';
						break;
					default:
						quarter = '1';
				}
				let amount = new Intl.NumberFormat("en-US", {style:'currency', currency:'USD', 
													minimumFractionDigits: 1});
				
				tooltip.html( d[0].substr(0,4) + ' Q' + quarter + '<br>' + amount.format(d[1]) + ' Billion' )
						.style('right', width - xScale(new Date(d[0].replace(/-/g,','))) - 25)
						.style('top', 460)
			})
			.on('mouseout', (d) => {
				tooltip.style('visibility', 'hidden');
			});

}

	

