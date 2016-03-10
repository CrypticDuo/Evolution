
function Food(x, y, energy)
{
  this.location = new Vector(x, y);
  this.velocity = new Vector(.5, .5);
  this.energy = energy;
  this.depleted = false;

  // Make the food circle look bigger
  // Too small to have 1:1 size relationship with organism, 1:10 is reasonable
  this.RADIUS_RATIO = Constant.RADIUS_RATIO * 10;

  this.radius = this.energy * this.RADIUS_RATIO;

  // randomize direction
  this.velocity.rotate(Math.PI * 2 * Math.random());
}

Food.prototype = {
  draw: function(ctx)
  {
    ctx.beginPath();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#ddd";
    ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.font = "15px sans-serif";
    ctx.fillStyle = "black";
    ctx.fillText("FOOD", this.location.x - 23, this.location.y + 5);
  },

  update: function(land)
  {
    this.depleted = this.energy <= 0;

    var newRadius = this.energy > 0 ? this.energy * this.RADIUS_RATIO : 0;

    // decrease radius gradually
    this.radius += (newRadius - this.radius) / 5;

    this.location.add(this.velocity);

    // kill the food if out of bounds
    if (this.location.x < -10 || this.location.x > land.width + 10 ||
      this.location.y < -10 || this.location.y > land.height + 10)
    {
      this.energy = 0;
    }
  }
}
