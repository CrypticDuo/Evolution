$(function()
{
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');

  // default interval
  var interval = 20;

  var land = new Land(ctx);

  for (var i = 0; i < Constant.POPULATION; i++)
  {
    land.population.push(createOrganism(land));
  }

  for (var i = 0; i < Constant.FOOD_RATIO * Constant.POPULATION; i++)
  {
    land.food.push(createFood(land));
  }

  var e = document.getElementById("canvas");
  e.setAttribute("width", $("body").width());
  e.setAttribute("height", $("body").height());

  debug.init(land, interval);

  step(land);
});

function step(land)
{
  setTimeout(function(){ step(land); }, debug.getInterval());
  if(debug.isPaused())
  {
    return;
  }
  land.draw();
}

function createOrganism(land)
{
    var randomX = Math.random() * land.width;
    var randomY = Math.random() * land.height;

    // TODO: create 4 types of organisms.
    var randomMass = Constant.MIN_MASS + (Math.random()*Math.random()) * Constant.MAX_MASS;
    var randomMinSpeed =  (Math.random()) + Constant.MIN_SPEED;

    // create Organism(generation, mass, energy, x, y, vision_angle, vision_range, minSpeed, fertility)
    return new Organism(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
}

function createFood(land)
{
  var randomX = Math.random() * land.width;
  var randomY = Math.random() * land.height;

  // each food source is enough to feed maximum 20% of total organisms and minimum of 5%.
  var randomEnergy = Math.random() * (Constant.MAX_FOOD_ENERGY_RATIO - Constant.MIN_FOOD_ENERGY_RATIO) + Constant.MIN_FOOD_ENERGY_RATIO;

  randomEnergy = land.population.length * randomEnergy * Stats.getAverageMass(land.population) * Constant.ENERGY;

  return new Food(randomX, randomY, randomEnergy);
}
