var Game = require('./game');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById("game-canvas").getContext("2d");
}

GameView.prototype.start = function(){
  var time = 0;
  setInterval(function(){
    time += 1;
  }, 10);

  setInterval(function() {
    this.game.step(time);
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

module.exports = GameView;
