var Stats = {
  show: function(population)
  {
    $("table").show();
    $("#avgGeneration value").html(this.getAverageGeneration(population));
    $("#avgSpeed value").html(this.getAverageSpeed(population));
    $("#avgMass value").html(this.getAverageMass(population));
    $("#avgVisionRange value").html(this.getAverageVisionRange(population));
    $("#avgVisionAngle value").html(this.getAverageVisionAngle(population));
  },

  hide: function()
  {
    $("table").hide();
  },

  getAverageGeneration: function(population)
  {
    var totalGeneration = 0;
    for (var i in population)
    {
      var organism = population[i];

      totalGeneration += organism.generation;
    }

    return this.roundToDecimal(totalGeneration / population.length, 0);
  },

  getAverageSpeed: function(population)
  {
    var totalSpeed = 0;
    for (var i in population)
    {
      var organism = population[i];

      totalSpeed += organism.velocity.mag();
    }

    return this.roundToDecimal(totalSpeed / population.length, 3);
  },

  getAverageMass: function(population)
  {
    var totalMass = 0;
    for (var i in population)
    {
      var organism = population[i];

      totalMass += organism.mass;
    }

    return this.roundToDecimal(totalMass / population.length, 3);
  },

  getAverageVisionRange: function(population)
  {
    var totalRange = 0;
    for (var i in population)
    {
      var organism = population[i];

      totalRange += organism.vision.range;
    }

    return this.roundToDecimal(totalRange / population.length, 2);
  },

  getAverageVisionAngle: function(population)
  {
    var totalAngle = 0;
    for (var i in population)
    {
      var organism = population[i];

      totalAngle += organism.vision.angle;
    }

    return this.roundToDecimal(totalAngle / population.length, 2);
  },

  roundToDecimal: function(num, dec)
  {
    return Math.round(num * (Math.pow(10, dec))) / (Math.pow(10, dec));
  }
}
