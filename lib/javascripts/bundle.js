/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var gameView = __webpack_require__ (1);
	
	var gv = new gameView();
	gv.initialize();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var CenterShape = __webpack_require__(3);
	var Background = __webpack_require__(4);
	var SpaceMan = __webpack_require__(5);
	var Wall = __webpack_require__(6);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function CenterShape(optionsHash) {
	  this.sides = optionsHash['sides'];
	  this.width = optionsHash['width'];
	  this.height = optionsHash['height'];
	  this.radius = optionsHash['radius'];
	  this.colors = optionsHash['colors'];
	  this.origin = [0, 0];
	  this.rotation = 0;
	}
	
	CenterShape.prototype.polygon =
	  function(ctx) {
	    if (this.sides < 3) {
	      this.sides = 3;
	    }
	    var angle = (Math.PI * 2)/this.sides;
	    var r = this.radius;
	
	    ctx.strokeStyle = this.colors[1];
	    ctx.fillStyle = this.colors[0];
	    ctx.lineWidth = 10;
	
	    ctx.save();
	    ctx.moveTo(r,0);
	    for (var i = 1; i < this.sides; i++) {
	      ctx.lineTo(r * Math.cos(angle * i),r * Math.sin(angle * i));
	      ctx.stroke();
	
	    }
	    ctx.closePath();
	    ctx.fill();
	    ctx.restore();
	
	};
	
	CenterShape.prototype.drawCenterShape = function (ctx) {
	  ctx.beginPath();
	  this.polygon(ctx);
	  ctx.stroke();
	};
	
	module.exports = CenterShape;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Background(optionsHash) {
	  this.sides = optionsHash['sides'];
	  this.width = optionsHash['width'];
	  this.height = optionsHash['height'];
	  this.radius = optionsHash['radius'];
	  this.colors = optionsHash['colors'];
	  this.rotation = 0;
	}
	
	Background.prototype.drawBackground =
	  function(ctx) {
	    if (this.sides < 3) {
	      this.sides = 3;
	    }
	    var angle = (Math.PI * 2)/this.sides;
	    var rotation = this.rotation + angle;
	    var w = this.width;
	    var h = this.height;
	    var r = this.radius;
	
	    for (var i = 1; i <= this.sides; i++) {
	      if (i % 2) {
	        ctx.fillStyle = this.colors[0];
	      } else {
	        ctx.fillStyle = this.colors[1];
	      }
	      var j = i + 1;
	      ctx.beginPath();
	      ctx.moveTo(0,0);
	      ctx.lineTo((Math.cos(angle*i) ) * r, (Math.sin(angle*i)) * r);
	      ctx.lineTo((Math.cos(angle*j) ) * r, (Math.sin(angle * j)) * r);
	      ctx.closePath();
	      ctx.fill();
	    }
	    this.rotation += -(Math.random() * 0.02);
	
	};
	
	module.exports = Background;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function SpaceMan(optionsHash) {
	  this.radius = optionsHash['radius'];
	  this.angle = (Math.PI * 2 / 6);
	  this.size = optionsHash['size'];
	  this.globalSpeed = optionsHash['gspeed'];
	  this.alive = true;
	  this.sides = optionsHash['sides'];
	  this.color = optionsHash['color'];
	  this.pos = [this.radius * Math.cos(this.angle),
	              this.radius * Math.sin(this.angle)];
	  this.sections = this.returnSections(this.sides);
	  this.currentSection = 1;
	  this.bindKeyListeners();
	}
	
	SpaceMan.prototype.returnSections = function (sides) {
	  var sections = [];
	  for (var i = 1; i <= this.sides; i++) {
	    sections.push((Math.PI * 2 / 6) * i);
	  }
	  return sections;
	};
	
	SpaceMan.prototype.bindKeyListeners = function () {
	
	
	};
	
	SpaceMan.prototype.updateSection = function (angle) {
	  var currentSection;
	  for (var i = 0; i < this.sections.length; i++) {
	    if (angle >= this.sections[i]) {
	      currentSection = i + 1;
	    } else if (angle < this.sections[0]) {
	      currentSection = 6;
	    }
	  }
	  this.currentSection = currentSection;
	};
	
	
	SpaceMan.prototype.move = function () {
	  var r = this.radius;
	  var angle = this.angle;
	
	  if (this.leftDown) {
	    angle += 8 * Math.PI / 180;
	  } else if (this.rightDown) {
	    angle -= 8 * Math.PI / 180;
	  } else {
	    return;
	  }
	
	  if (angle < 0) {
	    angle = angle + (Math.PI * 2);
	  } else {
	    angle = angle % (Math.PI * 2);
	  }
	  var newX = r * Math.cos(angle);
	  var newY = r * Math.sin(angle);
	  this.pos = [newX, newY];
	  this.angle = angle;
	
	  this.updateSection(angle);
	};
	
	SpaceMan.prototype.drawSelf = function(ctx){
	  ctx.fillStyle = this.color;
	  ctx.strokeStyle = 'white';
	  ctx.lineWidth = 2;
	  ctx.beginPath();
	
	  ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.size,
	      0,
	      2 * Math.PI,
	      false
	    );
	
	    ctx.stroke();
	    ctx.fill();
	};
	
	
	
	module.exports = SpaceMan;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function Wall(optionsHash) {
	  this.sides = optionsHash['sides'];
	  this.section = optionsHash['section'];
	  this.globalSpeed = optionsHash['gspeed'];
	  this.distance = 600;
	  this.width = 30;
	  this.collided = false;
	  this.color = optionsHash['color'];
	}
	
	Wall.prototype.move = function() {
	  this.distance -= (3 + this.globalSpeed);
	};
	
	Wall.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  var sides = this.sides;
	  var section = this.section;
	  var distance = this.distance;
	  var w = this.width;
	  var angle = (Math.PI * 2)/this.sides;
	  ctx.beginPath();
	  ctx.moveTo(Math.cos(angle * section) * distance, Math.sin(angle * section) * distance);
	  ctx.lineTo(Math.cos(angle * (section + 1)) * distance, Math.sin(angle * (section + 1)) * distance);
	  ctx.lineTo(Math.cos(angle * (section + 1)) * (distance - w), Math.sin(angle * (section + 1)) * (distance - w));
	  ctx.lineTo(Math.cos(angle * section) * (distance - w), Math.sin(angle * section) * (distance - w));
	  ctx.closePath();
	  ctx.fill();
	};
	
	module.exports = Wall;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map