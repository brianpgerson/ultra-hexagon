var Game = require('./game');

var INSTRUCTIONS = "<p>1 - SPACE to start<br><br>2 - LEFT and RIGHT to move<br><br>3 - EVADE WALLS for as long as you can.<br><br>4 - SPEED and DIFFICULTY will increase...quickly<br><br>5 - Only the FRONT EDGE of a wall will end your turn<br><br>6 - GOOD LUCK<br><br><span class='green'>PS - Headphones strongly advised. <br />'q' for music control.</span></p>";

function GameView() {
  this.highScore = 0;
  this.game = new Game();
  this.ctx = document.getElementById("game-canvas").getContext("2d");
  this.bindKeyListeners();
}

GameView.prototype.initialize = function(){
  this.game.draw(this.ctx);
};

GameView.prototype.start = function(){
  this.time = 0;
  this.startTimer();
  this.intervalGameStepper = setInterval(function() {
    this.time += 2;
    this.game.step(this.time);
    this.game.draw(this.ctx);
    if (!this.game.spaceMan.alive) {
      this.handleHighScore();
      this.restartGameAndWait();
    }
  }.bind(this), 20);
};

GameView.prototype.startTimer = function () {
  var timer = document.getElementById('running-timer');
  var highScore = document.getElementById('high-score');
  setInterval(function(){
    timer.innerHTML = (this.time/100).toFixed(2);
    if (this.time > this.highScore) {
      highScore.innerHTML = (this.time/100).toFixed(2);
    }
  }.bind(this), 10);
};

GameView.prototype.handleHighScore = function () {
  if (this.highScore < this.time) {
    this.highScore = this.time;
  }
};

GameView.prototype.handleMusic= function(){
  var audio = document.getElementsByTagName('audio')[0];
  var button = document.getElementById('big-play-button');
  if (button.innerHTML === "▶") {
    if (audio.currentTime === 0) {
      audio.currentTime = 3;
    }
    audio.play();
    button.className = "stupid";
    button.innerHTML = "▣";
  } else {
    audio.pause();
    button.className = "";
    button.innerHTML = "▶";
  }
};

GameView.prototype.restartMusic = function () {
  var audio = document.getElementsByTagName('audio')[0];
  var button = document.getElementById('big-play-button');
  audio.currentTime = 3;
  button.className = "stupid";
  button.innerHTML = "▣";
  audio.play();
};

GameView.prototype.restartGameAndWait = function () {
  clearInterval(this.intervalGameStepper);
  this.game = new Game();
  this.initialize();
};

GameView.prototype.restartGame  = function () {
  clearInterval(this.intervalGameStepper);
  this.game = new Game();
  this.start();
  this.restartMusic();
};

GameView.prototype.bindKeyListeners = function () {
  document.addEventListener("keydown", function(e){
    if (e.keyCode === 38) {
      this.game.sides += 1;
      if (this.sides > 10){
        this.game.sides = 10;
      }
      this.game.returnUpdatedObjects();
    } else if (e.keyCode === 40) {
      this.game.sides -= 1;
      if (this.game.sides < 3) {
        this.game.sides = 3;
      }
      this.game.returnUpdatedObjects();
    } else if (e.keyCode === 39) {
      this.game.spaceMan.leftDown = true;
    } else if (e.keyCode === 37) {
      this.game.spaceMan.rightDown = true;
    } else if (e.keyCode === 32) {
      this.handleHighScore();
      this.restartGame();
    } else if (e.keyCode === 81) {
      this.handleMusic();
    }
  }.bind(this));

  document.getElementById('big-play-button')
          .addEventListener("click", this.handleMusic);

  document.addEventListener("keyup", function(e){
    if (e.keyCode === 39) {
      this.game.spaceMan.leftDown = false;
    } else if (e.keyCode === 37) {
      this.game.spaceMan.rightDown = false;
    }
  }.bind(this));

  document.getElementsByClassName('close-tab')[0].addEventListener("click", function(e){
    var instructionsTab = document.getElementsByClassName('instructions-tab')[0];
    var instructions = document.getElementsByClassName('instructions')[0];
    var openTab = document.getElementsByClassName('open-tab')[0];
    openTab.id = "";
    openTab.addEventListener('click', function(event){
      instructionsTab.id = "";
      instructions.innerHTML = INSTRUCTIONS;
      openTab.id = "hidden";
    });
    instructions.innerHTML = "";
    instructionsTab.id = "hidden";
  });
};

module.exports = GameView;
