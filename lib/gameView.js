var Game = require('./game');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById("game-canvas").getContext("2d");
}

GameView.prototype.start = function(){
  this.bindKeyHandlers();
  setInterval(function() {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};


GameView.prototype.bindKeyHandlers = function () {
  key('left', function(){ alert("LEFT") }.bind(this));
  key('right', function(){}.bind(this));
};

module.exports = GameView;
