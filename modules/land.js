$(function()
{
  var POPULATION = 20;
  var MIN_MASS = 0.01;
  var MAX_MASS = 1;
  var FOOD_RATIO = .2;
  var SCREEN = 1;

  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');

  land = {
    width: 0,
    height: 0,
    population: [],
    food: [],
    canvas: ctx
  }

  var time = null;
  var interval = 20;
  var steps = 0;

  $(window).resize(function()
  {
    land.width = $(window).width() * SCREEN;
    land.height = $(window).height() * SCREEN;

    var e = document.getElementById("canvas");
    e.setAttribute("width", land.width);
    e.setAttribute("height", land.height);
  }).resize();

  for (var i = 0; i < POPULATION; i++)
  {
    var randomX = Math.random() * land.width;
    var randomY = Math.random() * land.height;

    // TODO: create 4 types of organisms.
    var randomMass = MIN_MASS + (Math.random()*Math.random()) * MAX_MASS;

    // create Organism(generation, mass, x, y, vision_range, max_speed, fertility)
    var organism = new Organism(1, randomMass, randomX, randomY, {range: 100, angle: 100}, 1, 1);

    land.population.push(organism);
  }

  var step = function()
  {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle="#ffffff";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    var deadList = [];

    for (var i in land.population)
    {
      var organism = land.population[i];

      organism.move(land);
      organism.update(land);
      organism.draw(ctx);
    }
  }

  setInterval(step, interval);
});
