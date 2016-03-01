function Organism(generation, mass, x, y, vision, max_speed, fertility){
  this.ID = Organism.uid();
  this.generation = generation;
  this.mass = mass;
  this.max_speed = max_speed;
  this.max_force = 1 / (this.mass); // amount of force it can exert [2, ]
  this.min_speed = 3;
  this.vision = vision;
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
  this.wandering = new Vector(.1, .1); // wandering velocity
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
    this.friends = this.find_friends(land.population, this.vision.range)
    this.wander();

    this.check_boundaries(land);
  },

  find_friends: function(population, range)
  {
    var friends = [];
    for (var i in population) {
      if (population[i] != this) {
        var diff = this.location.copy().sub(population[i].location);
        var a = this.velocity.angleBetween(diff);
        var d = this.location.dist(population[i].location);
        // TODO: calculate mass to see if friend || enemy

        a = (180 * a) / Math.PI;
        var visible = (a > 90 && a < 270) || (a < -90 && a > -270);

        if (d < this.vision.range && visible) {
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

    this.draw_relationship(ctx);
    this.draw_vision(ctx);
  },

  draw_relationship: function(ctx)
  {
    if (this.friends) {
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

  draw_vision: function(ctx)
  {
    var x = this.location.x;
    var y = this.location.y;
    var radius = this.vision.range;

    var side_angles = (180 - this.vision.angle) / 2;
    var facing_angle_rad = this.velocity.angle() / Math.PI;

    // perpendicular to horizontal line
    var start_bound = 1.5; // rad
    var end_bound = .5; // rad

    var start_angle = ((start_bound + facing_angle_rad) + side_angles / 180)
    var end_angle = ((end_bound + facing_angle_rad) - side_angles / 180);

    start_x = x + radius * Math.cos(start_angle * Math.PI);
    start_y = y + radius * Math.sin(start_angle * Math.PI);
    end_x = x + radius * Math.cos(end_angle * Math.PI);
    end_y = y + radius * Math.sin(end_angle * Math.PI);

    ctx.strokeStyle = '#ddd';

    // draw arc
    ctx.beginPath();
    ctx.arc(x, y, radius, (start_angle * Math.PI), (end_angle * Math.PI));
    ctx.stroke();

    // draw start of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(start_x, start_y);
    ctx.stroke();

    // draw end of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
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
