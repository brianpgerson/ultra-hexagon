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
