var CenterShape = require('./centerShape');
var Background = require('./background');
var SpaceMan = require('./spaceman');
var Wall = require('./wall');

var WIDTH = 800;
var HEIGHT = 600;

function Game(){
  this.mainColor = "#ee017b";
  this.centerRadius = 70;
  this.playerRadius = 90;
  this.globalSpeed = 0.1;
  this.sides = 6;
  this.rotation =  (this.globalSpeed * (Math.PI / 180));
  this.walls = [];
  this.backgroundShape = new Background({
    sides: this.sides,
    width: WIDTH,
    height: HEIGHT,
    radius: 600,
    colors: ["rgba(0,0,0,.8)", "rgba(6,16,68, .8)"]
  });
  this.centerShape = new CenterShape({
    sides: this.sides,
    width: WIDTH,
    height: HEIGHT,
    radius: this.centerRadius,
    colors: ["black", this.mainColor]
  });
  this.spaceMan = new SpaceMan({
    width: WIDTH,
    height: HEIGHT,
    radius: this.playerRadius,
    size: 10,
    color: this.mainColor,
    sides: this.sides
  });
}

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

Game.prototype.addWalls = function () {
  this.lastTime = 0;
  if (this.time < 1000) {
    var interval = 125;
  } else if (1000 < this.time && this.time < 4000) {
    interval = 100;
  } else {
    interval = 50;
  }
  if (this.time % interval === 0 && this.time !== this.lastTime) {
    this.lastTime = this.time;
		var maxNewWalls = 0;
		if ( this.time < 500 ) {
      maxNewWalls = 2;
    } else if (500 <= this.time && this.time < 1000 ) {
      maxNewWalls = 3;
    } else if (1000 <= this.time && this.time < 4000) {
      maxNewWalls = 4;
    } else {
      maxNewWalls = this.sides - 1;
    }

    var newWalls = Math.floor(1 + Math.random() * (maxNewWalls));
    var sections = [];
    while (sections.length < newWalls) {
      var newWallSection = Math.floor(1 + (Math.random() * (this.sides)));
      if (sections.indexOf(newWallSection) < 0) {
        sections.push(newWallSection);
      }
    }
    var toAdd = [];
    sections.forEach(function(secNum){
      toAdd.push(
        new Wall({
          section: secNum,
          sides: this.sides,
          color: this.mainColor,
          gspeed: this.globalSpeed
        })
      );
    }.bind(this));

    this.walls = this.walls.concat(toAdd);
    }

};

Game.prototype.handleWalls = function (wall, index) {
  // if (wall.distance < 590) {
  //   wall.distance = 589;
  // }
  if (wall.distance < this.centerRadius) {
    this.walls.splice(index, 1);
  } else {
    wall.move();
  }
};

Game.prototype.step = function(time) {
  this.time = time;
  this.spaceMan.move();

  this.addWalls();
  this.walls.forEach(function(wall, index){
    this.handleWalls(wall, index);
  }.bind(this));

  var wallsToCheck = this.getRelevantWalls();
  this.checkForCollision(wallsToCheck);
  this.globalSpeed += 0.1;
};


Game.prototype.checkForCollision = function(walls) {
  walls.forEach(function(wall){
    if (this.playerRadius + 36 < wall.distance &&
        wall.distance < this.playerRadius + 42 &&
        wall.section === this.spaceMan.currentSection) {
      alert(wall.section);
      this.spaceMan.alive = false;
    }
  }.bind(this));
};

Game.prototype.getRelevantWalls = function() {
  var currentSection = this.spaceMan.currentSection;
  var relevantWalls = this.walls.filter(function(wall) {
    return wall.section === currentSection;
  });
  return relevantWalls;
};

module.exports = Game;
