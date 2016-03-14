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
