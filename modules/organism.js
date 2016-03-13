function Organism(generation, mass, energy, x, y, visionRange, visionAngle, minSpeed, maxSpeed, fertility){
  this.ID = Organism.uid();
  this.generation = generation;
  this.mass = mass;
  this.energy = energy;
  this.maxSpeed = maxSpeed;
  this.minSpeed = minSpeed;
  this.maxForce = this.mass * 10;
  this.vision = new Vision(this, visionRange, visionAngle);
  this.fertility = fertility;
  this.age = 0;
  this.mature = false;
  this.alive = true;
  this.bite = this.mass * Constant.Energy * Constant.BITE_RATIO;

  // F (force --> how nutritous the food is) = G * m1 * m2 / r^2
  // we calculate acceleration using force
  // a = F/m
  // v = v + a ; limited to [0, maxSpeed]
  this.location = new Vector(x, y);
  this.velocity = new Vector(1, 1);
  this.wandering = new Vector(.01, .01); // wandering velocity
  this.acceleration = new Vector(0, 0);
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
    this.nearByFood = this.observe(land.food);

    for (var i in this.nearByFood)
    {
      var food = this.nearByFood[i];
      if (!food.depleted)
      {
        this.follow(food.location, food.radius/10);

        if (this.location.dist(food.location) < food.radius)
        {
          food.consumedBy(this);
        }
      }
    }

    this.wander();

    this.checkBoundaries(land);
  },

  // follow until inside target's radius
  follow: function(target, radius)
  {
    var dest = target.copy().sub(this.location);
    var distance = dest.mag();

    if (distance > radius)
    {
      dest.setMag(this.maxSpeed);
    }

    this.applyForce(dest);
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

    this.velocity.add(this.wandering);
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
    this.acceleration.add(force.setMag(force.mag()/this.mass));
  },

  draw: function(ctx)
  {
    var angle = this.getAngleOfDirection();

    ctx.lineWidth = 1;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(this.location.x, this.location.y, this.mass * Constant.ENERGY * Constant.RADIUS_RATIO, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();

    this.drawVision(ctx);
    this.drawRelationship(ctx);
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
    if(this.velocity.mag() < this.minSpeed) // TODO
      this.velocity.setMag(this.minSpeed);

    this.location.add(this.velocity);

    this.energy -= (this.mass * this.age * this.velocity.mag() * 0.001);
    this.age += 0.005;

    if (this.energy < 0) {
      this.alive = false;
    }

    // reset acceleration, forces, etc
    this.acceleration.mul(0);
  },

  getAngleOfDirection: function()
  {
    return this.velocity.angle();
  }
}
