var Game = require('./game');

function GameView() {
  this.game = new Game();
  this.ctx = document.getElementById("game-canvas").getContext("2d");
  this.bindKeyListeners();
}

GameView.prototype.initial = function(){
  this.game.draw(this.ctx);
};

GameView.prototype.start = function(){
  this.time = 0;
  this.startTimer();
  this.intervalGameStepper = setInterval(function() {
    this.time += 2;
    this.game.step(this.time);
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

GameView.prototype.startTimer = function () {
  var timer = document.getElementById('timer');
  setInterval(function(){
    timer.innerHTML = (this.time / 100).toFixed(2);
  }.bind(this), 10);
};

GameView.prototype.bindKeyListeners = function () {
  document.addEventListener("keydown", function(e){
    if (e.keyCode === 38) {
      this.game.sides += 1;
      if (this.sides > 10){
        this.game.sides = 10;
      }
      this.returnUpdatedObjects();
    } else if (e.keyCode === 40) {
      this.game.sides -= 1;
      if (this.game.sides < 3) {
        this.game.sides = 3;
      }
      this.returnUpdatedObjects();
    } else if (e.keyCode === 39) {
      this.game.spaceMan.leftDown = true;
    } else if (e.keyCode === 37) {
      this.game.spaceMan.rightDown = true;
    } else if (e.keyCode === 32) {
      clearInterval(this.intervalGameStepper);
      this.game = new Game();
      this.start();
    }
  }.bind(this));

  document.addEventListener("keyup", function(e){
    if (e.keyCode === 39) {
      this.game.spaceMan.leftDown = false;
    } else if (e.keyCode === 37) {
      this.game.spaceMan.rightDown = false;
    }
  }.bind(this));
};

module.exports = GameView;
