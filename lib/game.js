var Polygon = require('./polygon');

var WIDTH = 800;
var HEIGHT = 600;

function Game(){
  this.time = 0;
  this.backgroundShape = new Polygon({
    sides: 6,
    width: WIDTH,
    height: HEIGHT,
    radius: 70,
    colors: ["red", "blue"]
  });
  this.centerShape = new Polygon({
    sides: 6,
    width: WIDTH,
    height: HEIGHT,
    radius: 500,
    colors: ["black", "green"]
  });
}

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  this.centerShape.drawPolygon(ctx);
  this.backgroundShape.drawPolygon(ctx);
};

Game.prototype.step = function () {
};

module.exports = Game;
