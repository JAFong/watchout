// start slingin' some d3 here.

d3.select('.board').append('image')
  .attr('id', 'image')
  .attr('xlink:href', "asteroid.png")
  .attr('width', 100+"px")
  .attr('height', 100+"px");
// d3.select('.board').selectAll('circle')
//   .data([1]).enter().append('circle')
//   .attr('r', 50)
//   .attr('cx', 50+"%")
//   .attr('cy', 50+"%")
  // .attr('fill', 'url('#image')')
