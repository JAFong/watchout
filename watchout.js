// start slingin' some d3 here.
var gameEnemies = [];
var Enemy = function() {
    this.x = randCoord();
    this.y = randCoord();
};
var boxWidth = 1000;
var boxHeight = 800;

var drag = d3.behavior.drag()
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'black'); });

var circle = d3.select('.board').selectAll('.draggableCircle')
                .data([{ x: (boxWidth / 2), y: (boxHeight / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');



var randCoord=function(){
    return Math.floor(Math.random()*1000);
  };

var createEnemies= function(n){
  for (var i = 0; i < n; i++) {
    gameEnemies.push(new Enemy());
  }
}

var addEnemies = function(){
  d3.select('.board').selectAll('image').data(gameEnemies)
  .enter().append('image')
  .attr('id', 'image')
  .attr('xlink:href', "asteroid.png")
  .attr('width', 100+"px")
  .attr('height', 100+"px")
  .attr('class', 'enemy')
  .attr('opacity', 0)
  .transition()
  .duration(1000)
  .attr('opacity', 1)
  .attr('x',function(d){
    return d.x;
  })
  .attr('y', function(d){
    return d.y;
  })
}
var updateEnemyArray = function() {
  // Iterate through enemy array
    // run an update on each enemy
}
var update = function() {
  d3.select('.board').selectAll('image').data(gameEnemies)
  .transition()
  .duration(1000)
  .attr('x',function(d){
    return randCoord();
  })
  .attr('y',function(d){
    return randCoord();
  });
};
createEnemies(10);
addEnemies();
setInterval(update, 1000);
