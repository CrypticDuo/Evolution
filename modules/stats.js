var Stats = {
	show: function(land)
	{
		$("#avgGeneration value").html(this.getAverageGeneration(land));
		$("#avgSpeed value").html(this.getAverageSpeed(land));
		$("#avgMass value").html(this.getAverageMass(land));
		$("#avgVisionRange value").html(this.getAverageVisionRange(land));
		$("#avgVisionAngle value").html(this.getAverageVisionAngle(land));
	},

	getAverageGeneration: function(land)
	{
	  var totalGeneration = 0;
	  for (var i in land.population)
	  {
	    var organism = land.population[i];

	    totalGeneration += organism.generation;
	  }

	  return this.roundToDecimal(totalGeneration / Constant.POPULATION, 0);
	},

	getAverageSpeed: function(land)
	{
	  var totalSpeed = 0;
	  for (var i in land.population)
	  {
	    var organism = land.population[i];

	    totalSpeed += organism.velocity.mag();
	  }

	  return this.roundToDecimal(totalSpeed / Constant.POPULATION, 3);
	},

	getAverageMass: function(land)
	{
	  var totalMass = 0;
	  for (var i in land.population)
	  {
	    var organism = land.population[i];

	    totalMass += organism.mass;
	  }

	  return this.roundToDecimal(totalMass / Constant.POPULATION, 3);
	},

	getAverageVisionRange: function(land)
	{
	  var totalRange = 0;
	  for (var i in land.population)
	  {
	    var organism = land.population[i];

	    totalRange += organism.vision.range;
	  }

	  return this.roundToDecimal(totalRange / Constant.POPULATION, 2);
	},


	getAverageVisionAngle: function(land)
	{
	  var totalAngle = 0;
	  for (var i in land.population)
	  {
	    var organism = land.population[i];

	    totalAngle += organism.vision.angle;
	  }

	  return this.roundToDecimal(totalAngle / Constant.POPULATION, 2);
	},

	roundToDecimal: function(num, dec)
	{
		return Math.round(num * (Math.pow(10, dec))) / (Math.pow(10, dec));
	}
}