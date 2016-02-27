function Organism(generation, mass, x, y, vision_range, max_speed, fertility){
  this.ID = Organism.uid();
  this.generation = generation;
  this.mass = mass;
  this.max_speed = max_speed;
  this.max_force = 1 / (this.mass); // amount of force it can exert [2, ]
  this.min_speed = 3;
  this.vision_range = vision_range;
  this.fertility = fertility;
  this.energy = 0.5 * this.mass * this.max_speed * this.max_speed;
  this.age = 1;
  this.mature = false;

  // F (force --> how nutritous the food is) = G * m1 * m2 / r^2
  // we calculate acceleration using force
  // a = F/m
  // v = v + a ; limited to [0, max_speed]
  this.location = new Vector(x, y);
  this.velocity = new Vector(1, 1);
  this.wandering = new Vector(1, 1); // wandering velocity
  this.acceleration = new Vector(0, 0);

  // TODO : Move to Constant class
  this.HALF_PI = Math.PI * .5;
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
    this.wander();

    this.check_boundaries(land);
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
    if (Math.random() < .05) {
      this.wandering.rotate(Math.PI * 2 * Math.random());
    }

    this.apply_force(this.wandering);
  },

  // apply force opposite to the boundary

  check_boundaries: function(land)
  {
    if (this.location.x < -10)
      this.apply_force(new Vector(this.max_force, 0));

    if (this.location.x > land.width + 10)
      this.apply_force(new Vector(-this.max_force, 0));

    if (this.location.y < -10)
      this.apply_force(new Vector(0, this.max_force));

    if (this.location.y > land.height + 10)
      this.apply_force(new Vector(0, -this.max_force));
  },

  apply_force: function(force)
  {
    this.acceleration.add(force);
  },

  draw: function(ctx)
  {
    var angle = this.velocity.angle();

    x1 = this.location.x + Math.cos(angle) * this.mass * 5;
    y1 = this.location.y + Math.sin(angle) * this.mass * 5;

    x = this.location.x - Math.cos(angle) * this.mass * 20;
    y = this.location.y - Math.sin(angle) * this.mass * 20;

    x2 = this.location.x + Math.cos(angle + this.HALF_PI) * this.mass * 10;
    y2 = this.location.y + Math.sin(angle + this.HALF_PI) * this.mass * 10;

    x3 = this.location.x + Math.cos(angle - this.HALF_PI) * this.mass * 10;
    y3 = this.location.y + Math.sin(angle - this.HALF_PI) * this.mass * 10;

    ctx.lineWidth = 2;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x2,y2,x,y);
    ctx.quadraticCurveTo(x3,y3,x1,y1);
    ctx.stroke();
    ctx.fill();
  },

  update: function()
  {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.max_speed);
    if(this.velocity.mag() < this.min_speed) // TODO
      this.velocity.setMag(this.min_speed);

    this.location.add(this.velocity);

    this.acceleration.limit(this.maxforce);

    // decrease organism energy
    //this.age = this.age + 0.01;
    //console.log(this.age);

    // reset acceleration, forces, etc
    this.acceleration.mul(0);
  }
}
