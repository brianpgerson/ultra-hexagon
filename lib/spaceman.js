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
