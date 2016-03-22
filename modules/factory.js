var Factory = function(land)
{
	this.land = new Land();
};

Factory.prototype = {
	createOrganism: function(land)
	{
		organismCounter = Util.getRandomInt(0,4);
		randomX = Math.random() * this.land.width;
		randomY = Math.random() * this.land.height;
		randomMass = Constant.MIN_MASS + (Math.random()*Math.random()) * Constant.MAX_MASS;
		randomMinSpeed =  (Math.random()) + Constant.MIN_SPEED;

		if(organismCounter == Type.MASS) {
		  return heavyMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
		} else if (organismCounter == Type.SPEED) {
		  return speedMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
		} else if (organismCounter == Type.VISION) {
		  return visionMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
		} else {
		  return sexMorphon(1, randomMass, randomX, randomY, 100, 100, randomMinSpeed, 1);
		}
	}
}

function heavyMorphon (generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
{
	return new Organism(generation, mass*4, x, y, visionRange, visionAngle, minSpeed/2, fertility);
}
function speedMorphon (generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
{
  return new Organism(generation, mass, x, y, visionRange, visionAngle, minSpeed*5, fertility);
}
function visionMorphon (generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
{
  return new Organism(generation, mass, x, y, visionRange*1.5, visionAngle*1.5, minSpeed, fertility);
}
function sexMorphon (generation, mass, x, y, visionRange, visionAngle, minSpeed, fertility)
{
  return new Organism(generation, mass, x, y, visionRange*2, visionAngle*2, minSpeed, fertility*2);
}

var Type = {
  MASS: 0,
  SPEED: 1,
  VISION: 2,
  FERTILITY: 3,
};

var factory = new Factory();