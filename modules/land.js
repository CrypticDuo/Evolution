function Land()
{
  this.width = $(window).width();
  this.height = $(window).height();

  this.population = [];
  this.tracker = {};
  this.food = [];
}

Land.prototype = {
  draw: function(ctx)
  {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalAlpha = 1;
  }
}
