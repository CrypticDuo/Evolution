$(function()
{
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var interval = 20;

  var land = new Land();

  for (var i = 0; i < Constant.POPULATION; i++)
  {
    land.population.push(OrganismFactory.createOrganism(land));
  }

  for (var i = 0; i < Constant.FOOD_RATIO * Constant.POPULATION; i++)
  {
    land.food.push(createFood(land));
  }

  var e = document.getElementById("canvas");
  e.setAttribute("width", $("body").width());
  e.setAttribute("height", $("body").height());

  setInterval(function(){ step (ctx, land); }, interval);

  debug.Start(land.population);
});

function step(ctx, land)
{
  land.draw(ctx);
  // remove dead organisms
  for (var i = land.population.length-1; i >= 0; i--) {
    if (!land.population[i].alive) {
      land.population.splice(i, 1);
    }
  }

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

function createFood(land)
{
  var randomX = Math.random() * land.width;
  var randomY = Math.random() * land.height;

  // each food source is enough to feed maximum 20% of total organisms and minimum of 5%.
  var randomEnergy = Math.random() * (Constant.MAX_FOOD_ENERGY_RATIO - Constant.MIN_FOOD_ENERGY_RATIO) + Constant.MIN_FOOD_ENERGY_RATIO;

  randomEnergy = land.population.length * randomEnergy * Stats.getAverageMass(land.population) * Constant.ENERGY;

  return new Food(randomX, randomY, randomEnergy);
}
