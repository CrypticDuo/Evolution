$(function()
{
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var interval = 20;

  var land = new Land();

  for (var i = 0; i < Constant.POPULATION; i++)
  {
    land.population.push(createOrganism(land));
  }

  for (var i = 0; i < Constant.FOOD_RATIO * Constant.POPULATION; i++)
  {
    land.food.push(createFood(land));
  }

  $(window).resize(function()
  {
    var e = document.getElementById("canvas");
    e.setAttribute("width", land.width);
    e.setAttribute("height", land.height);
  }).resize();

  // Vision & Vector toggle
  $(window).click(function()
  {
    if(Debug.VISIONHIDE == false)
    {
      Debug.VISIONHIDE = true;
    } 
    else 
    {
      Debug.VISIONHIDE = false;
    }
  }).click();

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

  for (var i in land.food)
  {
    var food = land.food[i];

    if (!food.depleted)
    {
      food.update(land);
      food.draw(ctx);
    }
    else
    {
      if(Math.random() <= Constant.FOOD_RESPAWN_CHANCE)
      {
        land.food[i] = createFood(land);
      }
    }
  }
}

function createOrganism(land)
{
    var randomX = Math.random() * land.width;
    var randomY = Math.random() * land.height;

    // TODO: create 4 types of organisms.
    var randomMass = Constant.MIN_MASS + (Math.random()*Math.random()) * Constant.MAX_MASS;
    var randomMinSpeed =  (Math.random()*Math.random()*Math.random()*Math.random()) * Constant.MAX_SPEED;
    var randomMaxSpeed = randomMinSpeed + (Math.random()*Math.random()) * Constant.MAX_SPEED;
    
    // create Organism(generation, mass, x, y, vision_angle, vision_range, minSpeed, maxSpeed, fertility)
    return new Organism(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, randomMaxSpeed, 1);
}

function createFood(land)
{
  var randomX = Math.random() * land.width;
  var randomY = Math.random() * land.height;

  // each food source is enough to feed maximum 20% of total organisms and minimum of 5%.
  var randomEnergy = Math.random() * (Constant.MAX_FOOD_ENERGY_RATIO - Constant.MIN_FOOD_ENERGY_RATIO) + Constant.MIN_FOOD_ENERGY_RATIO;

  randomEnergy = Constant.POPULATION * randomEnergy * getAverageMass(land) * Constant.ENERGY;

  return new Food(randomX, randomY, randomEnergy);
}

function getAverageMass(land)
{
  var totalMass = 0;
  for (var i in land.population)
  {
    var organism = land.population[i];

    totalMass += organism.mass;
  }

  return totalMass / Constant.POPULATION;
}