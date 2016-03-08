var Polygon = require('./polygon');
var SpaceMan = require('./spaceman');

var WIDTH = 800;
var HEIGHT = 600;

function Game(){
  this.time = 0;
  this.backgroundShape = new Polygon({
    sides: 6,
    width: WIDTH,
    height: HEIGHT,
    radius: 70,
    colors: ["blue", "lightblue"]
  });
  this.centerShape = new Polygon({
    sides: 6,
    width: WIDTH,
    height: HEIGHT,
    radius: 500,
    colors: ["black", "green"]
  });
  this.spaceMan = new SpaceMan({
    width: WIDTH,
    height: HEIGHT,
    radius: 90,
    size: 10,
    color: 'white'
  });
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  this.centerShape.drawPolygon(ctx);
  this.backgroundShape.drawPolygon(ctx);
  this.spaceMan.move();
  this.spaceMan.drawSelf(ctx);
};

Game.prototype.step = function () {
};

module.exports = Game;
