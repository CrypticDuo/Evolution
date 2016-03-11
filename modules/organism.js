function Organism(generation, mass, x, y, visionRange, visionAngle, minSpeed, maxSpeed, fertility){
  this.ID = Organism.uid();
  this.generation = generation;
  this.mass = mass;
  this.maxSpeed = maxSpeed;
  this.minSpeed = minSpeed;
  this.maxForce = 1 / (this.mass); // amount of force it can exert [2, ]
  this.vision = new Vision(this, visionRange, visionAngle);
  this.fertility = fertility;
  this.energy = 0.5 * this.mass * this.maxSpeed * this.maxSpeed;
  this.age = 1;
  this.mature = false;
  this.blind = false;

  // F (force --> how nutritous the food is) = G * m1 * m2 / r^2
  // we calculate acceleration using force
  // a = F/m
  // v = v + a ; limited to [0, maxSpeed]
  this.location = new Vector(x, y);
  this.velocity = new Vector(1, 1);
  this.wandering = new Vector(.1, .1); // wandering velocity
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
    this.friends = this.findFriends(land.population, this.vision.range)
    this.wander();

    this.checkBoundaries(land);
  },

  findFriends: function(population, range)
  {
    var friends = [];
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
          friends.push(population[i]);
        }
      }
    }
    return friends;
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

    if(this.blind == false) {
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
    if (this.friends)
    {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "grey";
      ctx.beginPath();

      for(var i in this.friends)
      {
        ctx.stokeStyle = "#f1f1f1";
        ctx.moveTo(this.location.x, this.location.y);
        ctx.lineTo(this.friends[i].location.x, this.friends[i].location.y);
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

    this.acceleration.limit(this.maxForce);

    // decrease organism energy
    //this.age = this.age + 0.01;
    //console.log(this.age);

    // reset acceleration, forces, etc
    this.acceleration.mul(0);
  },

  getAngleOfDirection: function()
  {
    return this.velocity.angle();
  }
}
