var KeyCode = {
  DEBUG : 68, // 'D'
  PAUSE : 80  // 'P'
}
var Debug = function()
{
  this.land = null;
  this.debugMode = false;
  this.paused = false;
  this.statsInterval = null;

  var self = this;

  $(document).bind("keyup", function(e)
  {
    self.handleDebugMode(e);
    self.handlePaused(e);
  });
};


// TODO: move to util.js
function isWithinCircle(pointX, pointY, circleX, circleY, radius)
{
  return (Math.pow((pointX - circleX), 2) + Math.pow((pointY - circleY), 2)) < Math.pow(radius,2);
}

// Might be necessary if we want to build more functionality to Debug class
Debug.prototype = {
  init: function(land)
  {
    this.land = land;
  },

  start: function()
  {
    var self = this;
    Stats.show(self.land.population);
    this.statsInterval = setInterval(function(){ Stats.show(self.land.population); }, 1000);
  },

  stop: function()
  {
    Stats.hide();
    clearInterval(this.statsInterval);
  },

  pause: function()
  {
    $('.overlay')
      .show()
      .fadeOut(1200);

  },

  resume: function()
  {
    $('.overlay')
      .stop(true, true)
      .hide();
  },

  handleDebugMode: function(e)
  {
    if (e.shiftKey && e.keyCode == KeyCode.DEBUG)
    {
      this.debugMode = !this.debugMode;

      (this.debugMode) ? this.start() : this.stop();

      this.land.draw();
    }
  },

  handlePaused: function(e)
  {
    if (e.shiftKey && e.keyCode == KeyCode.PAUSE)
    {
      this.paused = !this.paused;

      if(!this.paused)
      {
        $(".tooltip").remove();
        this.resume();
        $(document).unbind("click");
        return;
      }

      this.pause();

      var self = this;
      $(document).bind("click", function(e)
      {
        $(".tooltip").remove();
        for(var i = 0; i < self.land.population.length; i++)
        {
          var organism = self.land.population[i];
          if (isWithinCircle(
            e.pageX - 9,
            e.pageY - 9,
            organism.location.x,
            organism.location.y,
            organism.radius))
          {
            var tooltip = new Tooltip();
            tooltip.show(organism);
          }
        }
      });
    }
  },

  isPaused: function()
  {
    return this.paused;
  },

  isDebugMode: function()
  {
    return this.debugMode;
  }
}

var debug = new Debug();
