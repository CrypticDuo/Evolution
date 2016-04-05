var Util = {
  getRandomInt: function(min, max)
  {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getRandomArbitrary: function(min, max)
  {
    return Math.random() * (max - min) + min;
  },
  rgbToString: function(r, g, b)
  {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  },
  roundToDecimal: function(num, dec)
  {
    return Math.round(num * (Math.pow(10, dec))) / (Math.pow(10, dec));
  },
  isWithinCircle: function(pointX, pointY, circleX, circleY, radius)
  {
    return (Math.pow((pointX - circleX), 2) + Math.pow((pointY - circleY), 2)) < Math.pow(radius,2);
  }
}
