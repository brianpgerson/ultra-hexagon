var CenterShape = require('./centerShape');
var Background = require('./background');
var SpaceMan = require('./spaceman');
var Wall = require('./wall');

var WIDTH = 800;
var HEIGHT = 600;

function Game(){
  this.time;
  this.centerRadius = 70;
  this.playerRadius = 90;
  this.sides = 6;
  this.walls = [];
  this.backgroundShape = new Background({
    sides: this.sides,
    width: WIDTH,
    height: HEIGHT,
    radius: 600,
    colors: ["white", "lightblue"]
  });
  this.centerShape = new CenterShape({
    sides: this.sides,
    width: WIDTH,
    height: HEIGHT,
    radius: this.centerRadius,
    colors: ["white", "purple"]
  });
  this.spaceMan = new SpaceMan({
    width: WIDTH,
    height: HEIGHT,
    radius: this.playerRadius,
    size: 10,
    color: 'purple',
    sides: this.sides
  });
  this.rotation =  (1 * (Math.PI / 180));
  this.bindKeyListeners();
}

Game.prototype.bindKeyListeners = function () {
  document.addEventListener("keydown", function(e){
    if (e.keyCode === 38) {
      this.sides += 1;
      if (this.sides > 10){
        this.sides = 10;
      }
      this.returnUpdatedObjects();
    } else if (e.keyCode === 40) {
      this.sides -= 1;
      if (this.sides < 3) {
        this.sides = 3;
      }
      this.returnUpdatedObjects();
    } else if (e.keyCode === 39) {
      this.spaceMan.leftDown = true;
    } else if (e.keyCode === 37) {
      this.spaceMan.rightDown = true;
    }
  }.bind(this));

  document.addEventListener("keyup", function(e){
    if (e.keyCode === 39) {
      this.spaceMan.leftDown = false;
    } else if (e.keyCode === 37) {
      this.spaceMan.rightDown = false;
    }
  }.bind(this));
};

Game.prototype.returnUpdatedObjects = function () {
  this.backgroundShape.sides = this.sides;
  this.centerShape.sides = this.sides;
  this.spaceMan.sides = this.sides;
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.save();
  ctx.translate(400, 300);
  ctx.rotate(this.rotation);
  this.backgroundShape.drawBackground(ctx);
  this.walls.forEach(function(wall){wall.draw(ctx);});
  this.spaceMan.drawSelf(ctx);
  this.centerShape.drawCenterShape(ctx);
  ctx.restore();
  this.rotation += (1 * (Math.PI / 180));
};

Game.prototype.handleWalls = function (wall, index) {
  if (wall.distance < this.centerRadius) {
    this.walls.splice(index, 1);
  } else {
    wall.move();
  }
};

Game.prototype.addWalls = function () {
  this.lastTime;
  if (this.time < 1000) {
    var interval = 500;
  } else if (1000 < this.time && this.time < 3000) {
    interval = 250;
  } else {
    interval = 100;
  }
  if (this.time % interval === 0 && this.time !== this.lastTime) {
    this.lastTime = this.time;
		var maxNewWalls = 0;
		if ( this.time < 500 ) {
      maxNewWalls = 2;
    } else if (this.time < 1000) {
      maxNewWalls = 3;
    } else if (this.time < 3000) {
      maxNewWalls = 4;
    } else {
      maxNewWalls = this.sides - 1;
    }

    var newWalls = Math.min(this.sides - 1, maxNewWalls);
    var toAdd = [];
    for (var i = 0; i < newWalls; i++){
      toAdd.push(
        new Wall({
          section: Math.floor(1 + (Math.random() * (this.sides))),
          sides: this.sides,
          color: "purple"
          })
        );
      }
    this.walls = this.walls.concat(toAdd);
    }

};

Game.prototype.step = function (time) {
  this.time = time;
  this.spaceMan.move();

  this.addWalls();
  this.walls.forEach(function(wall, index){
    this.handleWalls(wall, index);
  }.bind(this));

  var wallsToCheck = this.getRelevantWalls();
  this.checkForCollision(wallsToCheck);
};


Game.prototype.checkForCollision = function (walls) {
  walls.forEach(function(wall){
    if (this.playerRadius + 36 < wall.distance &&
        wall.distance < this.playerRadius + 42 &&
        wall.section === this.spaceMan.currentSection) {
      alert(wall.section);
      this.spaceMan.alive = false;
    }
  }.bind(this));
};

Game.prototype.getRelevantWalls = function () {
  var currentSection = this.spaceMan.currentSection;
  var relevantWalls = this.walls.filter(function(wall) {
    return wall.section === currentSection;
  });
  return relevantWalls;
};

module.exports = Game;
