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
        return this.sexMorphon(randomX, randomY);
    }
  },
  heavyMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(1.8, 2);
    visionRange = Util.getRandomArbitrary(100, 110);
    visionAngle = Util.getRandomArbitrary(100, 110);
    speed = Util.getRandomArbitrary(0.3, 0.5);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 1);
  },
  speedMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.5, 0.6);
    visionRange = Util.getRandomArbitrary(70, 90);
    visionAngle = Util.getRandomArbitrary(70, 90);
    speed = Util.getRandomArbitrary(2.5, 3);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 1);
  },
  visionMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(0.6, 0.8);
    visionRange = Util.getRandomArbitrary(180, 200);
    visionAngle = Util.getRandomArbitrary(180, 200);
    speed = Util.getRandomArbitrary(0.6, 0.8);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 1);
  },
  sexMorphon: function(x, y)
  {
    mass = Util.getRandomArbitrary(1, 1.2);
    visionRange = Util.getRandomArbitrary(90, 100);
    visionAngle = Util.getRandomArbitrary(90, 100);
    speed = Util.getRandomArbitrary(0.5, 0.7);
    return new Organism(1, mass, x, y, visionRange, visionAngle, speed, 3);
  }
}

var Type = {
  MASS: 0,
  SPEED: 1,
  VISION: 2,
  FERTILITY: 3,
};