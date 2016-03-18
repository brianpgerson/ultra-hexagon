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
