# Ultra Hexagon

[Ultra Hexagon](http://brianpgerson.github.io/public/ultra.html) is an object-oriented JavaScript and HTML5 canvas game inspired by Super Hexagon.


## How To Play

Ultra Hexagon couldn't be simpler: use the space bar to start a game, then avoid the incoming walls by using the left and right arrow keys. When you die, press space to try again.

Only the very front edges of walls count - feel free to wheel through the sides and overlap the back as you race to escape impending polygonal doom.

Control the music with Q. There are two options: rock out with Chipzel, or silence punctuated by your frantic keyboard tappings.

## Fun Implementation Stuff

HTML5 Canvas is great for certain things, but it's PERFECT for the ultra-geometric shapes required by a game like Ultra Hexagon. Creating the segments was done by brushing up on my trigonometry and breaking the canvas up into sections represented by radians.

Each wall section was simply a line of (2PI / the number of current sides) length, then given a section multiplier to determine which face of the center polygon the line corresponds to.

This design decision made it really easy to update the number of sections and faces of the center polygon, though collision detection doesn't quite catch up as well once you update the number of faces, so that remains an unofficial feature for now :) (hint: press up or down to change the number of faces, but don't do it during a game in which you care about the score)

```
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
```

Due to the nature of canvas games (drawing, redrawing, etc), the internal logic relies heavily on the global clock for the game that handles redraws of the game state. Every 20 milliseconds, we get a redraw (for around 50 fps) which also gives the game an updated clock state. Things like wall generation, rotation speed setters, and wall speed setters use this state to determine the difficulty of the game. For example:

```
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
```

## ToDos

[ ] Update implementation of rotation speed for more consistent fluxion
[ ] Change section collision checks to account for increase or decrease in section number
[ ] Add a server to keep track of all-time score leaders
[ ] Dynamic color changes
[ ] Pulsating inner polygon
