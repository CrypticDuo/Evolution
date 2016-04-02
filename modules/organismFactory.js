var OrganismFactory = function() {}

OrganismFactory.prototype = {
  createOrganism: function(land, type)
  {
    randomX = Math.random() * land.width;
    randomY = Math.random() * land.height;

    switch(type) {
      case Type.MASS:
        return this.heavyMorphon(randomX, randomY);
      case Type.SPEED:
        return this.speedMorphon(randomX, randomY);
      case Type.VISION:
        return this.visionMorphon(randomX, randomY);
      case Type.FERTILITY:
        return this.fertilityMorphon(randomX, randomY);
    }
  },
  heavyMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.6, 0.7);
    visionRange = Util.getRandomArbitrary(120, 130);
    visionAngle = Util.getRandomArbitrary(110, 130);
    speed = Util.getRandomArbitrary(0.7, 1);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 2);
  },
  speedMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.15, 0.25);
    visionRange = Util.getRandomArbitrary(100, 110);
    visionAngle = Util.getRandomArbitrary(90, 100);
    speed = Util.getRandomArbitrary(1.5, Constant.MAX_MIN_SPEED);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 2);
  },
  visionMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.1, 0.2);
    visionRange = Util.getRandomArbitrary(160, 180);
    visionAngle = Util.getRandomArbitrary(180, 230);
    speed = Util.getRandomArbitrary(0.6, 0.8);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 2);
  },
  fertilityMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.1, 0.3);
    visionRange = Util.getRandomArbitrary(100, 120);
    visionAngle = Util.getRandomArbitrary(130, 160);
    speed = Util.getRandomArbitrary(0.5, 0.7);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 1);
  }
}

var Type = {
  MASS: 0,
  SPEED: 1,
  VISION: 2,
  FERTILITY: 3,
};
