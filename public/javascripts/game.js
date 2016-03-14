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
  this.globalSpeed = 0.5;
  this.rotationSpeed = 0;
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
  ctx.translate(WIDTH/2, HEIGHT/2);
  ctx.rotate(this.rotation);
  this.backgroundShape.drawBackground(ctx);
  this.walls.forEach(function(wall){wall.draw(ctx);});
  this.spaceMan.drawSelf(ctx);
  this.centerShape.drawCenterShape(ctx);
  ctx.restore();
  this.rotation += (this.rotationSpeed * (Math.PI / 180));
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

};

Game.prototype.step = function(time) {
  this.time = time;
  this.spaceMan.move();

  this.addWalls();

  var wallsToRemove = [];
  this.walls.forEach(function(wall, index){
    if (wall.distance < this.centerRadius) {
      wallsToRemove.push(index);
    } else {
      wall.move();
    }
  }.bind(this));

  wallsToRemove.forEach(function(index){
    this.walls.splice(index, 1);
  }.bind(this));

  var wallsToCheck = this.getRelevantWalls();
  this.checkForCollision(wallsToCheck);
  this.globalSpeed += 0.001;
  this.handleRotationSpeed();
};

Game.prototype.handleRotationSpeed = function () {
  var alternators = [-1, 1];
  var speeds = {
    smalls: [0.001, 0.002, 0.003],
    mids: [0.005, 0.006, 0.007],
    highs: [0.008, 0.009, 0.01],
    veryhighs: [0.05, 0.06, 0.07]
  };
  function randomSpeed(type){
    return speeds[type][Math.floor(Math.random() * 3)] * alternators[Math.floor(Math.random() * 2)] ;
  }

  function makeItWorse(){
    var wow = [-1, 1, 1, 1];
    return speeds["veryhighs"][Math.floor(Math.random() * 3)] * wow[Math.floor(Math.random() * 3)] ;
  }
  var newSpeed = this.rotationSpeed;
  if (400 < this.time && this.time < 900) {
    newSpeed += randomSpeed("smalls");
  } else if (900 < this.time && this.time < 1700) {
    newSpeed += randomSpeed("mids");
  } else if (1700 < this.time && this.time < 2300) {
    newSpeed += randomSpeed("highs");
  } else if (2300 < this.time && this.time < 3000) {
    newSpeed += randomSpeed("veryhighs");
  } else if (3000 < this.time && this.time < 6000){
    newSpeed += randomSpeed('veryhighs');
  } else if (6000 < this.time) {
    newSpeed += makeItWorse();
  }
  if (newSpeed > 5) {
    newSpeed = 5;
  }
  this.rotationSpeed = newSpeed;
};

//alternate implementation in progress
Game.prototype.handleRotationSpeed2 = function () {
  var globalExtrema = {
    smalls: [-1, 1],
    mids: [-2, 2],
    highs: [-3, 3],
    veryhighs: [-5, 5]
  };

  var speeds = {
    smalls: [0.001, 0.002, 0.003],
    mids: [0.005, 0.006, 0.007],
    highs: [0.008, 0.009, 0.01],
    veryhighs: [0.05, 0.06, 0.07]
  };

  var alternators = [-1, 1];

  function randomSpeed(type){
    if (type === "smalls") {
      // do somethign
    }
  }

  var newSpeed = this.rotationSpeed;
  if (400 < this.time && this.time < 900) {
    newSpeed += randomSpeed("smalls");
  } else if (900 < this.time && this.time < 1700) {
    newSpeed += randomSpeed("mids");
  } else if (1700 < this.time && this.time < 2300) {
    newSpeed += randomSpeed("highs");
  } else if (2300 < this.time && this.time < 3000) {
    newSpeed += randomSpeed("veryhighs");
  } else if (3000 < this.time && this.time < 6000){
    newSpeed += randomSpeed('veryhighs');
  } else if (6000 < this.time) {
    newSpeed += makeItWorse();
  }
};


Game.prototype.checkForCollision = function(walls) {
  walls.forEach(function(wall){
    if (wall.distance < 140 && 125 < wall.distance &&
        wall.section === this.spaceMan.currentSection) {
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
