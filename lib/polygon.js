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
