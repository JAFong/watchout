// start slingin' some d3 here.
var gameEnemies = [];
var Enemy = function() {
    this.x = randCoord();
    this.y = randCoord();
};
var boxWidth = 800;
var boxHeight = 800;
var keyHandler = {
  left: false,
  up: false,
  right: false,
  down: false
}
d3.select('body').on('keydown',function(event){
  //37 left
  if(d3.event.keyCode === 37){
    keyHandler.left=true;
  }
  //38 up
  if(d3.event.keyCode === 38){
   keyHandler.up=true;
  }
  //39 right
  if(d3.event.keyCode === 39){
    keyHandler.right=true;
  }
  //40 down
  if(d3.event.keyCode === 40){
    keyHandler.down=true;
  }

 });
d3.select('body').on('keyup',function(event){
  //37 left
  if(d3.event.keyCode === 37){
    keyHandler.left=false;
  }
  //38 up
  if(d3.event.keyCode === 38){
   keyHandler.up=false;
  }
  //39 right
  if(d3.event.keyCode === 39){
    keyHandler.right=false;
  }
  //40 down
  if(d3.event.keyCode === 40){
    keyHandler.down=false;
  }

 });
var keyCheck=function(){
  if(keyHandler.left){
    d3.select('.player').attr('x', function(d) {return d.x -= 10;});
  }
  if(keyHandler.up){
    d3.select('.player').attr('y', function(d) {return d.y -= 10;});
  }
  if(keyHandler.right){
    d3.select('.player').attr('x', function(d) {return d.x += 10;});
  }
  if(keyHandler.down){
    d3.select('.player').attr('y', function(d) {return d.y += 10;});
  }
};
var player = d3.select('.board').selectAll('.player')
                .data([{ x: (boxWidth / 2), y: (boxHeight / 2)}])
                .enter()
                .append('svg:image')
                .attr('class', 'player')
                .attr('x', function(d) { return d.x; })
                .attr('y', function(d) { return d.y; })
                .attr('height', function(d) { return 75; })
                .attr('width', function(d) { return 75; })
                .attr('xlink:href', "dancingcowboydone2.gif")
                // .call(keyPress);


var randCoord=function(){
    return Math.floor(Math.random()*800);
  }

var createEnemies= function(n){
  for (var i = 0; i < n; i++) {
    gameEnemies.push(new Enemy());
  }
}

var addEnemies = function(){
  d3.select('.board').selectAll('.enemy').data(gameEnemies)
  .enter().append('image')
  .attr('id', 'image')
  .attr('xlink:href', "o_cow.png")
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
  });
}
var updateEnemyArray = function() {
  // Iterate through enemy array
    // run an update on each enemy
}
var updateEnemyPosition = function() {
  d3.select('.board').selectAll('.enemy').data(gameEnemies)
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
  var scoreBoard = d3.select('body').selectAll('.scoreCount').text()
  score++;
  d3.select('body').selectAll('.scoreCount').text(score);
  if(score>highScore){
    highScore=score;
    d3.select('body').selectAll('.highScoreCount').text(highScore);
  }
  _enemies.each(function() {
    var enemyX = d3.select(this).attr('x');
    var enemyY = d3.select(this).attr('y');
    if(distance(enemyX,enemyY,playerX,playerY)<50){
      var temp= d3.select('body').selectAll('.collisionCount').text();
      d3.select('body').selectAll('.collisionCount').text(parseInt(temp)+1);
      // debugger;
      score=0;
      d3.select('body').selectAll('.scoreCount').text(score);
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
var highScore = 0;
var score =0;
createEnemies(20);
addEnemies();
setInterval(updateEnemyPosition, 1000);
setInterval(checkCollision, 50);
setInterval(keyCheck, 10);
