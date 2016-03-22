var OrganismFactory = {
	createOrganism: function(land)
	{
		organismCounter = Util.getRandomInt(0,4);
		randomX = Math.random() * land.width;
		randomY = Math.random() * land.height;
		randomMass = Constant.MIN_MASS + (Math.random()*Math.random()) * Constant.MAX_MASS;
		randomMinSpeed =  (Math.random()) + Constant.MIN_SPEED;

		switch(organismCounter) {
			case Type.MASS:
				return this.heavyMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
			case Type.SPEED:
				return this.speedMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
			case Type.VISION:
				return this.visionMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
			case Type.FERTILITY:
				return this.sexMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
		}
	},
	heavyMorphon: function(generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
	{
		return new Organism(generation, mass*4, x, y, visionRange, visionAngle, minSpeed/2, fertility);
	},
	speedMorphon: function(generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
	{
	  return new Organism(generation, mass, x, y, visionRange, visionAngle, minSpeed*5, fertility);
	},
	visionMorphon: function(generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
	{
	  return new Organism(generation, mass, x, y, visionRange*1.5, visionAngle*1.5, minSpeed, fertility);
	},
	sexMorphon: function(generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
	{
	  return new Organism(generation, mass, x, y, visionRange*2, visionAngle*2, minSpeed, fertility*2);
	}
}

var Type = {
  MASS: 0,
  SPEED: 1,
  VISION: 2,
  FERTILITY: 3,
};