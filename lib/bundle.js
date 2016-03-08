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
	  setInterval(function() {
	    this.game.step();
	    this.game.draw(this.ctx);
	  }.bind(this), 15);
	};
	
	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Polygon = __webpack_require__(3);
	var SpaceMan = __webpack_require__(4);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Polygon(optionsHash) {
	  this.sides = optionsHash['sides'];
	  this.width = optionsHash['width'];
	  this.height = optionsHash['height'];
	  this.radius = optionsHash['radius'];
	  this.colors = optionsHash['colors'];
	  this.origin = [this.width / 2, this.height / 2];
	  this.rotation = 0;
	}
	
	Polygon.prototype.drawPolygon =
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
	      ctx.moveTo(this.origin[0],this.origin[1]);
	      ctx.lineTo(w/2 + (Math.cos(angle*i) ) * r, h/2 + (Math.sin(angle*i)) * r);
	      ctx.stroke();
	      ctx.lineTo(w/2 + (Math.cos(angle*j) ) * r, h/2 + (Math.sin(angle * j)) * r);
	      ctx.stroke();
	      ctx.closePath();
	      ctx.fill();
	    }
	    this.rotation += -(Math.random() * 0.02);
	
	};
	
	module.exports = Polygon;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function SpaceMan(optionsHash) {
	  this.width = optionsHash['width'];
	  this.height = optionsHash['height'];
	  this.radius = optionsHash['radius'];
	  this.angle = Math.PI / 180;
	  this.size = optionsHash['size'];
	  this.alive = true;
	  this.color = optionsHash['color'];
	  this.pos = [this.width/2 + this.radius * Math.cos(this.angle),
	              this.height/2 + this.radius * Math.sin(this.angle)];
	  this.bindKeyListeners();
	}
	
	SpaceMan.prototype.bindKeyListeners = function () {
	  document.addEventListener("keydown", function(e){
	    if (e.keyCode === 37) {
	      this.leftDown = true;
	    } else if (e.keyCode === 39) {
	      this.rightDown = true;
	    }
	  }.bind(this));
	
	  document.addEventListener("keyup", function(e){
	    if (e.keyCode === 37) {
	      this.leftDown = false;
	    } else if (e.keyCode === 39) {
	      this.rightDown = false;
	    }
	  }.bind(this));
	
	};
	
	
	SpaceMan.prototype.move = function () {
	  var w = this.width;
	  var h = this.height;
	  var r = this.radius;
	  var angle = this.angle;
	
	
	  if (this.leftDown) {
	    angle += 8 * Math.PI / 180;
	  } else if (this.rightDown) {
	    angle -= 8 * Math.PI / 180;
	  } else {
	    return;
	  }
	  var newX = w/2 + r * Math.cos(angle);
	  var newY = h/2 + r * Math.sin(angle);
	  this.pos = [newX, newY];
	  this.angle = angle;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map