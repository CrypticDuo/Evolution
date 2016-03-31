function Land(ctx)
{
  this.ctx = ctx;
  this.width = $(window).width();
  this.height = $(window).height();

  this.population = [];
  this.food = [];
}

Land.prototype = {
  draw: function()
  {
    // remove dead organisms
    this.removeDeadOrganisms();

    this.ctx.globalAlpha = 0.8;
    this.ctx.fillStyle="#ffffff";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalAlpha = 1;

    this.drawOrganisms();
    this.drawFoods();
  },

  removeDeadOrganisms: function()
  {
    for (var i = this.population.length-1; i >= 0; i--) {
      if (!this.population[i].alive) {
        this.population.splice(i, 1);
      }
    }
  },

  drawOrganisms: function()
  {
    for (var i in this.population)
    {
      var organism = this.population[i];

      organism.draw(this);
    }
  },

  drawFoods: function()
  {
    for (var i in this.food)
    {
      var food = this.food[i];

      if (!food.depleted)
      {
        food.draw(this);
      }
      else
      {
        if(Math.random() <= Constant.FOOD_RESPAWN_CHANCE)
        {
          this.food[i] = createFood(this);
        }
      }
    }
  }
}
