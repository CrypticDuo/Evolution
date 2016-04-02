function Organism(generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
{
  this.ID = Organism.uid();
  this.generation = generation;
  this.mass = (mass < Constant.MAX_MASS) ? mass : Constant.MAX_MASS;
  this.energy = mass * Constant.ENERGY;
  this.minSpeed = (minSpeed < Constant.MAX_MIN_SPEED) ? minSpeed : Constant.MAX_MIN_SPEED;
  this.maxSpeed = minSpeed * 2;
  this.maxForce = this.mass * 10;
  this.fertility = fertility;

  visionAngle = (visionAngle < Constant.MAX_VISION_ANGLE) ? visionAngle : Constant.MAX_VISION_ANGLE;
  this.vision = new Vision(this, visionRange, visionAngle);

  this.age = 0;
  this.mature = false;
  this.alive = true;

  this.bite = this.mass * Constant.ENERGY * Constant.BITE_RATIO;
  this.radius = this.mass * Constant.ENERGY * Constant.RADIUS_RATIO;

  this.location = new Vector(x, y);
  this.velocity = new Vector(1, 1);
  this.wandering = new Vector(.01, .01); // wandering velocity
  this.acceleration = new Vector(0, 0);

  var red = Math.floor((this.minSpeed / Constant.MAX_MIN_SPEED) * 255);
  var green = Math.floor((this.mass / Constant.MAX_MASS) * 255);
  var blue = Math.floor((visionAngle / Constant.MAX_VISION_ANGLE) * 255);
  this.color = Util.rgbToString(red, green, blue);
}

(function(){
  var id = 0;
  Organism.uid = function()
  {
    return id++;
  }
})();

Organism.prototype = {

  move: function(land)
  {
    this.nearByOrganisms = this.observe(land.population);
    this.nearByFood = this.findVisibleFood(land.food);

    if (this.nearByFood.length)
    {
      for (var i in this.nearByFood)
      {
        var food = this.nearByFood[i];
        if (!food.depleted)
        {
          this.follow(food, food.radius, food.mass/2);

          if (this.location.dist(food.location) < food.radius)
          {
            food.consumedBy(this);
          }
        }
      }
    }
    else
    {
      this.wander();
    }

    this.checkBoundaries(land);
  },

  findVisibleFood: function(foods)
  {
    var visibleFoods = [];
    for (var i in foods)
    {
      var food = foods[i];

      if (this.location.dist(food.location) < this.vision.getRange() + food.radius)
      {
        visibleFoods.push(food);
      }
    }

    return visibleFoods;
  },

  // follow until inside target's radius
  follow: function(target, radius, forceApplied)
  {
    var dest = target.location.copy().sub(this.location);
    var d = dest.mag();

    if (d >= radius)
    {
      dest.setMag(this.maxSpeed);
      this.applyForce(dest);
    }
    else if (d >= radius/2)
    {
      dest.setMag(forceApplied);
      this.applyForce(dest);
    }
  },

  observe: function(population)
  {
    var nearBy = [];
    for (var i in population)
    {
      if (population[i] != this)
      {
        var diff = this.location.copy().sub(population[i].location);
        var a = this.velocity.angleBetween(diff);
        var d = this.location.dist(population[i].location);
        // TODO: calculate mass to see if friend || enemy

        if (this.vision.isWithinVision(population[i]))
        {
          nearBy.push(population[i]);
        }
      }
    }
    return nearBy;
  },

  eat: function()
  {

  },

  reproduce: function()
  {
    // mass (strength) vs speed (fitness) vs sense/vision (adaptation) vs fertility
  },

  wander: function()
  {
    if (Math.random() < .02)
    {
      this.wandering.rotate(Math.PI * 2 * Math.random());
    }

    this.applyForce(this.wandering);
  },

  // apply force opposite to the boundary
  checkBoundaries: function(land)
  {
    if (this.location.x < -10)
      this.applyForce(new Vector(this.maxForce, 0));

    if (this.location.x > land.width + 10)
      this.applyForce(new Vector(-this.maxForce, 0));

    if (this.location.y < -10)
      this.applyForce(new Vector(0, this.maxForce));

    if (this.location.y > land.height + 10)
      this.applyForce(new Vector(0, -this.maxForce));
  },

  applyForce: function(force)
  {
    this.acceleration.add(force);
  },

  draw: function(land)
  {
    ctx = land.ctx;

    if (!debug.isPaused())
    {
      this.move(land);
      this.update(land);
    }

    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();

    if(debug.isDebugMode())
    {
      this.drawVision(ctx);
      this.drawRelationship(ctx);
    }
  },

  drawVision: function(ctx)
  {
    this.vision.draw(ctx);
  },

  drawRelationship: function(ctx)
  {
    if (this.nearByOrganisms)
    {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "grey";
      ctx.beginPath();

      for(var i in this.nearByOrganisms)
      {
        ctx.stokeStyle = "#f1f1f1";
        ctx.moveTo(this.location.x, this.location.y);
        ctx.lineTo(this.nearByOrganisms[i].location.x, this.nearByOrganisms[i].location.y);
      }
      ctx.stroke();
    }
  },

  update: function()
  {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);

    if(this.velocity.mag() < this.minSpeed)
      this.velocity.setMag(this.minSpeed);

    this.location.add(this.velocity);

    this.energy -= (this.mass * this.age * this.velocity.mag());
    this.age += 0.001;

    if (this.energy < 0) {
      this.alive = false;
    }

    this.acceleration.mul(0);
  },

  getAngleOfDirection: function()
  {
    return this.velocity.angle();
  }
}
