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
	gv.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var CenterShape = __webpack_require__(5);
	var Background = __webpack_require__(6);
	var SpaceMan = __webpack_require__(4);
	var Wall = __webpack_require__(7);
	
	var WIDTH = 800;
	var HEIGHT = 600;
	
	function Game(){
	  this.time;
	  this.centerRadius = 70;
	  this.playerRadius = 90;
	  this.sides = 6;
	  this.walls = [];
	  this.backgroundShape = new Background({
	    sides: this.sides,
	    width: WIDTH,
	    height: HEIGHT,
	    radius: 600,
	    colors: ["white", "lightblue"]
	  });
	  this.centerShape = new CenterShape({
	    sides: this.sides,
	    width: WIDTH,
	    height: HEIGHT,
	    radius: this.centerRadius,
	    colors: ["white", "purple"]
	  });
	  this.spaceMan = new SpaceMan({
	    width: WIDTH,
	    height: HEIGHT,
	    radius: this.playerRadius,
	    size: 10,
	    color: 'purple',
	    sides: this.sides
	  });
	  this.rotation =  (1 * (Math.PI / 180));
	  this.bindKeyListeners();
	}
	
	Game.prototype.bindKeyListeners = function () {
	  document.addEventListener("keydown", function(e){
	    if (e.keyCode === 38) {
	      this.sides += 1;
	      if (this.sides > 10){
	        this.sides = 10;
	      }
	      this.returnUpdatedObjects();
	    } else if (e.keyCode === 40) {
	      this.sides -= 1;
	      if (this.sides < 3) {
	        this.sides = 3;
	      }
	      this.returnUpdatedObjects();
	    } else if (e.keyCode === 39) {
	      this.spaceMan.leftDown = true;
	    } else if (e.keyCode === 37) {
	      this.spaceMan.rightDown = true;
	    }
	  }.bind(this));
	
	  document.addEventListener("keyup", function(e){
	    if (e.keyCode === 39) {
	      this.spaceMan.leftDown = false;
	    } else if (e.keyCode === 37) {
	      this.spaceMan.rightDown = false;
	    }
	  }.bind(this));
	};
	
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
	
	Game.prototype.handleWalls = function (wall, index) {
	  if (wall.distance < this.centerRadius) {
	    this.walls.splice(index, 1);
	  } else {
	    wall.move();
	  }
	};
	
	Game.prototype.addWalls = function () {
	  this.lastTime;
	  if (this.time < 1000) {
	    var interval = 500;
	  } else if (1000 < this.time && this.time < 3000) {
	    interval = 250;
	  } else {
	    interval = 100;
	  }
	  if (this.time % interval === 0 && this.time !== this.lastTime) {
	    this.lastTime = this.time;
			var maxNewWalls = 0;
			if ( this.time < 500 ) {
	      maxNewWalls = 2;
	    } else if (this.time < 1000) {
	      maxNewWalls = 3;
	    } else if (this.time < 3000) {
	      maxNewWalls = 4;
	    } else {
	      maxNewWalls = this.sides - 1;
	    }
	
	    var newWalls = Math.min(this.sides - 1, maxNewWalls);
	    var toAdd = [];
	    for (var i = 0; i < newWalls; i++){
	      toAdd.push(
	        new Wall({
	          section: Math.floor(1 + (Math.random() * (this.sides))),
	          sides: this.sides,
	          color: "purple"
	          })
	        );
	      }
	    this.walls = this.walls.concat(toAdd);
	    }
	
	};
	
	Game.prototype.step = function (time) {
	  this.time = time;
	  this.spaceMan.move();
	
	  this.addWalls();
	  this.walls.forEach(function(wall, index){
	    this.handleWalls(wall, index);
	  }.bind(this));
	
	  var wallsToCheck = this.getRelevantWalls();
	  this.checkForCollision(wallsToCheck);
	};
	
	
	Game.prototype.checkForCollision = function (walls) {
	  walls.forEach(function(wall){
	    if (this.playerRadius + 36 < wall.distance &&
	        wall.distance < this.playerRadius + 42 &&
	        wall.section === this.spaceMan.currentSection) {
	      alert(wall.section);
	      this.spaceMan.alive = false;
	    }
	  }.bind(this));
	};
	
	Game.prototype.getRelevantWalls = function () {
	  var currentSection = this.spaceMan.currentSection;
	  var relevantWalls = this.walls.filter(function(wall) {
	    return wall.section === currentSection;
	  });
	  return relevantWalls;
	};
	
	module.exports = Game;


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	function SpaceMan(optionsHash) {
	  this.radius = optionsHash['radius'];
	  this.angle = (Math.PI * 2 / 6);
	  this.size = optionsHash['size'];
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
	  console.log(currentSection);
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
	  ctx.beginPath();
	
	  ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.size,
	      0,
	      2 * Math.PI,
	      false
	    );
	
	    ctx.fill();
	};
	
	
	
	module.exports = SpaceMan;


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	function Wall(optionsHash) {
	  this.sides = optionsHash['sides'];
	  this.section = optionsHash['section'];
	  this.distance = 600;
	  this.width = 30;
	  this.collided = false;
	  this.color = optionsHash['color'];
	}
	
	Wall.prototype.move = function() {
	  this.distance -= 3;
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