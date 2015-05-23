// start slingin' some d3 here.
var gameEnemies = [];
var Enemy = function() {
    this.x = randCoord();
    this.y = randCoord();
};
var boxWidth = 800;
var boxHeight = 800;

var drag = d3.behavior.drag()
             .on('dragstart', function() { circle.style('fill', 'red'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'black'); });

var circle = d3.select('.board').selectAll('.player')
                .data([{ x: (boxWidth / 2), y: (boxHeight / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'player')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black');



var randCoord=function(){
    return Math.floor(Math.random()*800);
  }

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
var updateEnemyPosition = function() {
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

//Collision
//Input: Array of enemies and player Output: boolean
//Edge case: enemies colliding
//fn
  //iterate through enemy array
    //check distance between current enemy and player
    // if distance is less than enemy radius + player radius
      //return true
  //return false
var distance = function(x1, y1, x2, y2) {
  var xCalculation = x1 - x2;
  var yCalculation = y1 - y2;
  return Math.sqrt(xCalculation*xCalculation + yCalculation*yCalculation);
}
var checkCollision= function(){
  var _enemies=d3.selectAll('.enemy');
  var _player= d3.selectAll('.player');
  var playerX = _player.attr('x');
  var playerY = _player.attr('y');
  _enemies.each(function() {
    var enemyX = d3.select(this).attr('x');
    var enemyY = d3.select(this).attr('y');
    if(distance(enemyX,enemyY,playerX,playerY)<200){
      var temp= d3.select('body').selectAll('.collisionCount').text();
      d3.select('body').selectAll('.collisionCount').text(parseInt(temp)+1);
      return true;
    }
  });
}

var testCollision= function(){
  var _enemies=d3.select('.board').selectAll('.enemy')[0];
  var _player= d3.selectAll('.player');
  // console.log(_enemies.attr('y'));
  // console.log(_player.attr('cy'));
}

createEnemies(10);
addEnemies();
setInterval(updateEnemyPosition, 1000);
setInterval(checkCollision, 100);
