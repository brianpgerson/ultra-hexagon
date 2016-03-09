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
