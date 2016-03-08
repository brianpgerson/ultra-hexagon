var Game = require('./game');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById("game-canvas").getContext("2d");
}

GameView.prototype.start = function(){
  setInterval(function() {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 15);
};

module.exports = GameView;
