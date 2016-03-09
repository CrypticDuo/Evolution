$(function()
{
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var interval = 20;

  var land = new Land();

  for (var i = 0; i < constant.POPULATION; i++)
  {
    land.population.push(createOrganism(land));
  }

  $(window).resize(function()
  {
    var e = document.getElementById("canvas");
    e.setAttribute("width", land.width);
    e.setAttribute("height", land.height);
  }).resize();

  setInterval(function(){ step (ctx, land); }, interval);
});

function step(ctx, land)
{
  land.draw(ctx);

  for (var i in land.population)
  {
    var organism = land.population[i];

    organism.move(land);
    organism.update(land);
    organism.draw(ctx);
  }
}

function createOrganism(land)
{
    var randomX = Math.random() * land.width;
    var randomY = Math.random() * land.height;

    // TODO: create 4 types of organisms.
    var randomMass = constant.MIN_MASS + (Math.random()*Math.random()) * constant.MAX_MASS;
    var randomMinSpeed =  (Math.random()*Math.random()*Math.random()*Math.random()) * constant.MAX_SPEED;
    var randomMaxSpeed = randomMinSpeed + (Math.random()*Math.random()) * constant.MAX_SPEED;
    
    // create Organism(generation, mass, x, y, vision_angle, vision_range, minSpeed, maxSpeed, fertility)
    return new Organism(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, randomMaxSpeed, 1);
}